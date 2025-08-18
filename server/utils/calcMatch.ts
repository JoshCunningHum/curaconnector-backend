import { Company, companies } from "~~/schema/company";
import { Provider, providers } from "~~/schema/provider";
import { Recipient, recipients } from "~~/schema/recipient";
import { isTableMember } from "./typeguards";

// Exposed calculate-match function
export function calcMatch(recipient: Recipient, provider: Provider): boolean;
export function calcMatch(recipent: Recipient, company: Company): boolean;
export function calcMatch(provider: Provider, company: Company): boolean;
export function calcMatch(a: Recipient | Provider, b: Provider | Company) {
    if (isTableMember(recipients, a) && isTableMember(providers, b)) {
        return RecipientVsProvider(a, b);
    } else if (isTableMember(recipients, a) && isTableMember(companies, b)) {
        return RecipientVsCompany(a, b);
    } else if (isTableMember(providers, a) && isTableMember(companies, b)) {
        return ProviderVsCompany(a, b);
    }

    return false;
}

// ------------------------
//        Recipient Vs Provider
// ------------------------

const RecipientVsProvider = (recipient: Recipient, provider: Provider): boolean => {
    return false;
};

// ------------------------
//        Recipient Vs Company
// ------------------------

const RecipientVsCompany = (recipient: Recipient, company: Company): boolean => {
    return false;
};

// ------------------------
//        Provider Vs Company
// ------------------------

const ProviderVsCompany = (provider: Provider, company: Company): boolean => {
    return false;
};
