import dayjs from "dayjs";
import { Preference } from "~/core/Preference";

// Gender
const gender = Preference.Match<"both" | "male" | "female">()({
    demandKey: "prefGender",
    supplyKey: "gender",
}).SkipIfDemand({ prefGender: (v) => v === "both" || !v });

// Titles
enum Titles {
    // Skilled
    "Nurse Practitioner",
    "Registered Nurse",
    "Licensed Vocational Nurse",
    "Physician Assistant",
    "Medical Interpreter",

    // Therapy
    "Speech Therapist",
    "Occupational Therapist",
    "Physical Therapist",
    "Respiratory Therapist",
    "Registered Behavioral Therapist",

    // Non-Medical
    "Home Health Aide",
    "Caregiver",
    "Phlebotomies",
    "Certified Medical Assistant",
    "Certified Medication Aide",
    "Certified Nurse Assistant",

    // Allied Health
    "Counselor",
    "Life Planner",
    "Social Worker",
    "Case Manger",
    "Senior Case Advisor",
    "Healthcare Student",
}

const title = Preference.Subset<keyof typeof Titles>()({
    demandKey: "prefTitle",
    supplyKey: "hasTitle",
});

// Veteran
const veteran = Preference.Match<boolean | null>()({
    demandKey: "prefVeteran",
    supplyKey: "veteran",
}).SkipIfDemand({ prefVeteran: (v) => v === null });

// Lifting
enum LiftLImits {
    "0-25",
    "25-50",
    "50-80",
}

const lifting = Preference.Int<LiftLImits>()({
    demandKey: "prefLift",
    supplyKey: "liftLimit",
    strategy: "atMost",
});

// Religion
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

// Religion
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

// Skills
enum Skills {
    // Medical
    "Skilled Nursing",
    "Wound Care",
    "Administer Medication",
    "Palliative Care",
    "Speech Therapy",
    "Physical Therapist",
    "Respiratory Therapy",
    "Occupation Therapy",
    "Hospice",
    "DME",
    "IV THERAPY",
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

const skill = Preference.Subset<keyof typeof Skills>()({
    demandKey: `prefTitle`,
    supplyKey: "title",
});

// Location
const location = Preference.Subset()({
    demandKey: "location",
    supplyKey: "location",
});

// ? When supply says yes on canTelemed, it should be skip
const telemedicine = Preference.Match<boolean>()({
    demandKey: "prefTelemed",
    supplyKey: "canTelemed",
});

// Date Availability
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

// Schedule Availability
enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

enum TimeOfDay {
    Morning,
    Afternoon,
    Evening,
}

type ScheduleRecord = Partial<
    Record<keyof typeof Day, (keyof typeof TimeOfDay)[]>
>;

const schedule = Preference.Custom<
    { schedule?: ScheduleRecord },
    { schedule?: ScheduleRecord }
>((d, s) => {
    // If any of the demand/supply doesn't have limited schedule, automatic true
    if (!d.schedule || !s.schedule) return true;

    const demand = d.schedule;
    const supply = s.schedule;

    // There should at least 1 'time' in at least a day for this match to work
    return Object.entries(demand).some(([day, time]) => {
        // If supplier is not available in the specific day, then not a match
        const supplyTime = supply[day as keyof typeof Day];
        if (!supplyTime) return false;

        // Check if at least 1 'time' exists in the supply
        return time.every((t) => supplyTime.includes(t));
    });
});

// Smoking
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

enum PayRates {
    "10-18",
    "18-28",
    "28-50",
}

const privatepay = Preference.Int<PayRates>()({
    demandKey: "prefHourlyPay",
    supplyKey: "hourlyRate",
    strategy: "atMost",
});

export const preferences = Preference.Pipeline(
    {
        skill,
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
