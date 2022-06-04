import { ApplicationInsights } from "@microsoft/applicationinsights-web";

// create singleton class SearchInsights
export class SearchInsights {
    public static get Instance(): SearchInsights {
        SearchInsights._instance =
            SearchInsights._instance ??
            (SearchInsights._instance = new SearchInsights());

        return SearchInsights._instance;
    }

    private constructor() {
        this._appInsights.loadAppInsights();
    }
    private _appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: "e7f7da7f-c69d-4a0d-b71b-d9b237bd98a1",
        },
    });

    public get appInsights() {
        return this._appInsights;
    }
    static _instance: SearchInsights;
}
