export type RequiredOnlyBy<K, T extends keyof K> = Partial<K> & Required<Pick<K, T>>;

export type RecordMap<Keys extends string, Value> = {
    [K in Keys]: Value;
};

export type Prettify<K> = {
    [key in keyof K]: K[key];
} & {};

export type NonEmptyArray<T> = [T, ...T[]];
export type AnyObj = Record<string, any>;
export type UnkObj = Record<string, unknown>;

export type TypeOfReturns =
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";
