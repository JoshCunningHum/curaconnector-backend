import { LocationSharingManager } from "~/core/LocationSharing";

const interval = 1000;
const max = 60_000 / interval;

export const locationSharing = new LocationSharingManager();

export default defineTask({
    meta: {
        name: "broadcast:locshare",
        description:
            "Broadcasts the location of every location-sharing sessions",
    },
    run({ payload, context }) {
        let n = 1;

        const id = setInterval(() => {
            if (n >= max) clearInterval(id);
            n++;

            locationSharing.updateLocationPools();
        }, interval);

        return { result: "Success" };
    },
});
