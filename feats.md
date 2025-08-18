### Summary

This application is some form of "_dating app but health care_", it all revolves around connecting users to each other with the context of healthcare. This will be explained more after explaining the user types, which are:

-   **Recipients**
    -   Users who **requires**/**needs** healthcare services
    -   Demand sources
-   **Provider**
    -   Users who **provides** health care services
    -   Supply sources
-   **Company**
    -   Users who acts as an **agency** who recruits **providers** (demand) and exposes **\*roster providers** (indirect supply)
        -   \*Roster Providers are just providers with company affiliation
        -   Existing providers can be converted to a roster provider
        -   Existing _healthcare provider_ under a new company will be given a roster provider account by the company, thus the role of roster provider is to have a provider that is managed by a company rather than being independent
        -   The company acts as the middleman when a recipient connects to a roster provider
    -   Both Demand and Indirect Supply Sources

With this relationship with each other, the general idea of the application should be clear.
These are then the necessary core features that are needed by the application:

-   **Preferences**
    -   Both Recipients and Companies have preferences that they are looking for from a provider
    -   A Provider (roster included) have a profile for what they are able to offer
-   **Matching**
    -   Recipients and Companies should be able to 'match' with a Provider based on the preferences they have set and the profile of the providers
        -   only the recipients are able to match with roster providers, companies cannot match with them
    -   For companies, in order to execute matching, they must have credits

> [!CAUTION]
> This can be easily circumvented by companies by creating a recipient user instead to test match results

-   **Favorites**
    -   Just a list of favorited providers by a user/company
    -   This should be a subset of the matches, if a match gets disabled/not applicable due to changes of preferences(demand) and profile(supply), then it should not be shown as a favorite
-   **Messaging**
    -   When a Recipient/Company matches with a provider, they should be able to message them
    -   Only Recipient/Company are able to initiate a message
    -   When a provider becomes a former match caused by a changed in profile/pereference, this shouldn't remove their ability to message the other party (this should also apply to recipients and companies)
    -   This should also be realtime (websocket) for ease of access
-   **Ratings**
    -   When a recipient/company(?) has started messaging with a provider, they are able to rate the said provider
    -   This includes value (stars) and description for more details
    -   Of course this feature could be abused, that is why when a rating has been made, the provider can dispute the rating and provide why the rating should be invalidated, this should be sent/managed in the super admin
        -   For now, I don't know where/what the super admin can do
    -   This should also be shown in matching, to let the recipients and companies see a provider's reputation
-   **Notifications**
    -   Messages (all user types)
    -   Ratings (only for providers or roster providers)
        -   \*Companies might want to retrieve their own roster rating notifications
    -   \*More (subscriptions etc)
