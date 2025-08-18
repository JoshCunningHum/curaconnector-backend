import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

export default defineNitroPlugin(() => {
    dayjs.extend(isBetween);
    console.log("Loaded dayjs plugin");
});
