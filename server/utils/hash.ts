import { hash } from "argon2";
import {
    ARGON_MEMORYCOST,
    ARGON_PARALLELISM,
    ARGON_TIMECOST,
} from "~/contants/config";

export const hashString = (str: string) =>
    hash(str, {
        memoryCost: ARGON_MEMORYCOST,
        timeCost: ARGON_TIMECOST,
        parallelism: ARGON_PARALLELISM,
    });
