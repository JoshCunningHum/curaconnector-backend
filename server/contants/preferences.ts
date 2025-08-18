import dayjs from "dayjs";
import { Preference } from "~/core/Preference";

enum Titles {
    // Medical
    "Skilled Nursing",
    "Wound Care",
    "Administer Medication",
    "Palliative Care",
    "Speech Therapy",
    "Physical Therapist",
    "Respiratory Theraphy",
    "Occupation Therapy",
    "Hospice",
    "DME",
    "IV THERAPHY",
    "OTHER",

    // Non-Medical
    "Bathing",
    "Grooming",
    "Toileting",
    "Medication Reminders",
    "Groceries & Shopping",
    "Transferring & Mobility",
    "Exercise",
    "Transportation",
    "Meal Prep",
    "Housekeeping",
    "Companionship",
    "Dementia Care",
}

const skill = Preference.Subset<keyof typeof Titles>()({
    demandKey: `prefTitle`,
    supplyKey: "title",
});

enum Language {
    "Chinese",
    "English",
    "Hindu",
    "Italian",
    "Spanish",
    "Vietnamese",
}

const language = Preference.Subset<keyof typeof Language>()({
    demandKey: "prefLanguage",
    supplyKey: "knownLanguage",
});

enum Religion {
    "Agnostic",
    "Hindu",
    "Catholic",
    "Muslim",
}

const religion = Preference.Subset<keyof typeof Religion>()({
    demandKey: "religion",
    supplyKey: "religionAwareness",
});

const gender = Preference.Match<"both" | "male" | "female">()({
    demandKey: "prefGender",
    supplyKey: "gender",
}).SkipIfDemand({
    prefGender: (v) => v === "both" || !v,
});

// Supposed to be exact match since user might want to hire someone cheap (usually less experience)
enum Experience {
    "0-3",
    "3-6",
    "7-10",
    "10+",
}

const experience = Preference.Match<Experience>()({
    demandKey: "prefExperience" as const,
    supplyKey: "experience" as const,
});

// ? When demand says yes on veterans, it should be skip
const veteran = Preference.Match<boolean>()({
    demandKey: "prefVeteran",
    supplyKey: "veteran",
});

// ? When supply says yes on canTelemed, it should be skip
const telemedicine = Preference.Match<boolean>()({
    demandKey: "prefTelemed",
    supplyKey: "canTelemed",
});

const smoking = Preference.Match<boolean>()<
    "allowSmoke" | "smokes",
    "allowSmoke" | "smokes"
>({
    demandKey: "smokes",
    supplyKey: "smokes",
})
    // If any of the demander or supplier allows smoking, skip this check
    .SkipIfDemand({ allowSmoke: true })
    .SkipIfSupply({ allowSmoke: true });

enum PayRates {
    "10-18",
    "18-28",
    "28-50",
}

const privatepay = Preference.Int<PayRates>()({
    demandKey: "prefHourlyPay",
    supplyKey: "hourlyRate",
    strategy: "atmost",
});

enum LiftLImits {
    "0-25",
    "25-50",
    "50-80",
}

const lifting = Preference.Int<LiftLImits>()({
    demandKey: "prefLift",
    supplyKey: "liftLimit",
    strategy: "atleast",
});

const dateRange = Preference.Custom<
    Record<"prefStart" | "prefEnd", string>,
    Record<"canStart" | "canEnd", string>
>((demand, supply) => {
    const dS = dayjs(demand.prefStart);
    const dE = dayjs(demand.prefEnd);
    const sS = dayjs(supply.canStart);
    const sE = dayjs(supply.canEnd);

    // Make sure both dS and dE is between sS and sE
    const startValid = dS.isBetween(sS, sE, "day", "[]");
    const endValid = dE.isBetween(sS, sE, "day", "[]");

    return startValid && endValid;
});

export const preferences = Preference.Pipeline(
    {
        title: skill,
        language,
        religion,
        gender,
        experience,
        veteran,
        smoking,
        telemedicine,
        lifting,
        dateRange,
        privatepay,
    },
    {
        onFail: (message, name, pref) =>
            console.log(`\t${message}\n\t\t@${name}`),
    }
);

export type PatientPreference = typeof preferences.$inferDemand;
export type ProviderPreference = typeof preferences.$inferSupply;

// const t: ProviderPreference = {
//     title: [
//         "Bathing",
//         "Companionship",
//         "DME",
//         "Dementia Care",
//         "Groceries & Shopping",
//         "Grooming",
//         "Hospice",
//         "Meal Prep",
//         "Medication Reminders",
//         "Palliative Care",
//         "Toileting",
//         "Transferring & Mobility",
//         "Wound Care",
//     ],
//     knownLanguage: ["English", "Chinese", "Spanish", "Vietnamese"],
//     religionAwareness: ["Agnostic", "Catholic", "Hindu", "Muslim"],
//     gender: "female",
//     experience: 1,
//     veteran: false,
//     allowSmoke: true,
//     smokes: false,
//     canTelemed: false,
//     liftLimit: 1,
//     canStart: "2025-01-01T10:36:54.000Z",
//     canEnd: "2027-01-01T10:36:54.000Z",
//     hourlyRate: 1,
// };
