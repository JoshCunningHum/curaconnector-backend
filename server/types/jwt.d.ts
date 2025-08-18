import { JwtPayload } from "~/utils/tokens";

// Adds the jwt in the event context caused by the auth middlware

declare module "h3" {
    interface H3EventContext {
        jwt: JwtPayload;
    }
}
