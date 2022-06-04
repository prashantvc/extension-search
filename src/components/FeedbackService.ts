import { SearchInsights } from "./Insights";

export class FeedbackService {
    public async sendFeedBack(feedback: {
        query: string;
        items: { key: String; index: Number; originalIndex: Number }[];
        feedback: string;
    }) {
        const requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedback),
        };

        var response = null;
        try {
            response = await fetch(
                "https://extension-functions.azurewebsites.net/api/saveuserfeedback",
                requestOption
            );
            if (!response.ok) {
                SearchInsights.Instance.appInsights.trackEvent({
                    name: "FeedbackService_sendFeedBack_Error",
                    properties: {
                        status: response.status,
                        statusText: response.statusText,
                    },
                });
            }
        } catch (error: any) {
            SearchInsights.Instance.appInsights.trackEvent({
                name: "FeedbackService_sendFeedBack_Exception",
                properties: {
                    error: error,
                },
            });
        }
    }

    public static get Instance(): FeedbackService {
        FeedbackService._instance =
            FeedbackService._instance ??
            (FeedbackService._instance = new FeedbackService());

        return FeedbackService._instance;
    }

    private constructor() {}

    static _instance: FeedbackService;
}
