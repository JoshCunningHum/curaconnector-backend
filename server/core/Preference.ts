/**
 * # Dynamic Preference Configuration
 *
 * * How it works?
 * Matching depends on demand and supply, a supply without demand is a waste.
 * Thus, we based the preferences based on this, a preference defines the kind of demands, and what supplies are available based on the demand.
 * In each preference, there should be 1 or more demand values, 1 or more supply values, and a function to check if the demand was satisfied.
 * If satisfied, then the preference is a match, un-match otherwise.
 *
 * Above covers how preference matching works, but it haven't said anything on how these are queried from both the supplier and the consumer
 * Preferably, this should also be defined here, but since we are going on the hardcoded approach (inputs/ui are hardcoded), we will skip this for now.
 * However, when going forward, it should be easy to define it here, although hardcoding special cases in the frontend might still be inevitable, the proposed system should still have a large impact on common preference values.
 *
 * The reason why a simple 'function' has to have a lot of types is because this is designed so that it can support fully independent from frontend
 *
 * This should also useful for assigning weights for each preference matches
 */

import { AnyObj, Prettify, RecordMap } from "~/types/Utils";
import { User } from "~~/schema/user";

type MatchFn<Demand extends AnyObj, Supply extends AnyObj> = (
    demand: Demand,
    supply: Supply
) => boolean;

type PipelineFailCallback = (
    message: string,
    name: string,
    pref: Preference<AnyObj, AnyObj>
) => void;

type ExtractDemand<T> = T extends Record<string, Preference<infer D, infer _>> ? D : never;
type ExtractSupply<T> = T extends Record<string, Preference<infer _, infer S>> ? S : never;

type MatcherRecord<T extends AnyObj> = Record<keyof T, T[keyof T] | ((v: T[keyof T]) => boolean)>;
type ExtractValues<T extends AnyObj> = T extends Record<string, infer V> ? V : never;

export class Preference<Demand extends AnyObj, Supply extends AnyObj> {
    protected invert?: boolean;
    protected name?: string;

    matchFn: MatchFn<Demand, Supply>;

    private constructor(config: { matchFn: MatchFn<Demand, Supply> }) {
        this.matchFn = config.matchFn;
    }

    Inverted() {
        this.invert = !(this.invert ?? false);
        return this;
    }

    Name(name: string) {
        this.name = name;
        return this;
    }

    SkipFalseyDemand(...keys: (keyof Demand)[]) {
        const odlfn = this.matchFn;
        this.matchFn = (demand, supply) => {
            const hasFalsey = keys.some((k) => !demand[k]);
            if (hasFalsey) return true;
            return odlfn(demand, supply);
        };
        return this;
    }

    SkipIfDemand(
        req: Partial<
            Record<keyof Demand, ExtractValues<Demand> | ((v: ExtractValues<Demand>) => boolean)>
        >
    ) {
        const oldfn = this.matchFn;
        this.matchFn = (demand, supply) => {
            const valid = Object.entries(req).every(([k, v]) => {
                const dv = demand[k];
                if (isCallable(v)) return v(dv);
                return dv === v;
            });

            // If all the required demand is valid, then skip this field
            if (valid) return true;

            return oldfn(demand, supply);
        };

        return this;
    }

    SkipIfSupply(
        req: Partial<
            Record<keyof Supply, ExtractValues<Supply> | ((v: ExtractValues<Supply>) => boolean)>
        >
    ) {
        const oldfn = this.matchFn;
        this.matchFn = (demand, supply) => {
            const valid = Object.entries(req).every(([k, v]) => {
                const dv = demand[k];
                if (isCallable(v)) return v(dv);
                return dv === v;
            });

            // If all the required supply is valid, then skip this field
            if (valid) return true;

            return oldfn(demand, supply);
        };

        return this;
    }

    // Static Builder
    static Custom<D extends AnyObj, S extends AnyObj>(
        matchFn: (demand: D, supply: S) => boolean
    ): Preference<D, S> {
        return new Preference<D, S>({ matchFn });
    }

    // Subset
    static Subset<Value>() {
        return <DK extends string, SK extends string>({
            demandKey,
            supplyKey,
        }: {
            demandKey: DK;
            supplyKey: SK;
        }) => {
            return new Preference<RecordMap<DK, Value[]>, RecordMap<SK, Value[]>>({
                matchFn: (demand, supply) =>
                    demand[demandKey].every((t) => supply[supplyKey].includes(t)),
            });
        };
    }
    // Match
    static Match<Value>() {
        return <DK extends string, SK extends string>({
            demandKey,
            supplyKey,
        }: {
            demandKey: DK;
            supplyKey: SK;
        }) =>
            new Preference<RecordMap<DK, Value>, RecordMap<SK, Value>>({
                matchFn: (demand, supply) => demand[demandKey] === supply[supplyKey],
            });
    }

    private static IntStrategies = {
        equal: (a: number, b: number) => a === b,
        atleast: (a: number, b: number) => a >= b,
        atmost: (a: number, b: number) => a <= b,
        greater: (a: number, b: number) => a > b,
        lesser: (a: number, b: number) => a < b,
    } as const;

    static Int<Value extends number>() {
        return <DK extends string, SK extends string>({
            demandKey,
            supplyKey,
            strategy = "equal",
        }: {
            demandKey: DK;
            supplyKey: SK;
            strategy: keyof typeof Preference.IntStrategies;
        }): Preference<RecordMap<DK, Value>, RecordMap<SK, Value>> => {
            return new Preference({
                matchFn(demand, supply) {
                    const d = demand[demandKey] as number;
                    const s = supply[supplyKey] as number;

                    return Preference.IntStrategies[strategy](d, s);
                },
            });
        };
    }

    // # Pipeline
    static Pipeline<PR extends Record<string, Preference<any, any>>>(
        preferences: PR,
        config: {
            onFail?: PipelineFailCallback;
        } = {}
    ) {
        const steps: Map<string, Preference<AnyObj, AnyObj>> = new Map();
        const onFail: Function = config.onFail || (() => {});

        Object.entries(preferences).forEach(([key, value]) => {
            if (!value.name) value.Name(key);
            steps.set(key, value);
        });

        return {
            $inferDemand: {} as Prettify<ExtractDemand<PR>>,
            $inferSupply: {} as Prettify<ExtractSupply<PR>>,
            check(a: Prettify<ExtractDemand<PR>>, b: Prettify<ExtractSupply<PR>>) {
                return [...steps.entries()].every(([key, p]) => {
                    let [result, err] = safeTry(() => p.matchFn(a, b));

                    if (!result && err) onFail(err.message, p.name, p);
                    else if (!result) onFail("Failed match", p.name, p);

                    // TODO: Add error handler for 'field' non existing error (for Preference.Required)

                    return result !== !!p.invert;
                });
            },
            process(base: User, compares: User[]) {
                const bPref = base.preferences;
                console.log(`________________ Process matching: ${base.email} ___________________`);
                console.log(bPref);
                return compares.filter((o) => {
                    const oPref = o.preferences;

                    //@ts-ignore
                    const result = this.check(bPref, oPref);
                    console.log(oPref);
                    console.log(`  ${!result ? "Failed" : "Successful"} Try: ${o.email}`);
                    if (!result) return false;
                    return true;
                });
            },
        };
    }
}
