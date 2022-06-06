import {
    PrimaryButton,
    ProgressIndicator,
    Separator,
    Stack,
    TextField,
} from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { MyDetailsListComponent } from "./components/DocumentList";
import { FeedbackService } from "./components/FeedbackService";
import { SearchInsights } from "./components/Insights";
import { SearchComponent } from "./components/SearchComponent";
import { IExtension } from "./models/Extension";

function App() {
    SearchInsights.Instance.appInsights.flush();

    const [searchData, setSearchData] = useState<Search>({
        query: "",
        results: [],
    });

    const [feedBack, setFeedBack] = useState<string>("");
    const [isSubmit, setSubmit] = useState<boolean>(false);

    return (
        <div
            className="centered"
            style={{
                display: "flex",
                flexWrap: "wrap",
            }}
        >
            <Stack tokens={{ childrenGap: 4 }}>
                <Stack className="centered">
                    <h2>Search Extensions</h2>
                    <SearchComponent onSearchComplete={setSearchData} />
                </Stack>
                <div
                    style={{
                        overflow: "auto",
                        height: "calc(100vh - 25vh)",
                        width: "80vw",
                    }}
                >
                    <MyDetailsListComponent
                        search={searchData}
                        updateResults={setSearchData}
                    />
                </div>
                <Separator />
                <Stack>
                    {isSubmit && (
                        <ProgressIndicator label="Submitting feedback..." />
                    )}
                    <TextField
                        placeholder="Please provide your feedback, and reason to why you rearranged the searh results."
                        disabled={isSubmit}
                        value={feedBack}
                        label="Feedback"
                        multiline
                        rows={3}
                        onChange={(e, nv) => setFeedBack(nv ?? "")}
                    />
                    <PrimaryButton disabled={isSubmit} onClick={onSubmit}>
                        Submit
                    </PrimaryButton>
                </Stack>
            </Stack>
        </div>
    );

    async function onSubmit() {
        try {
            setSubmit(true);
            const items = searchData.results.map((ext: IExtension) => ({
                key: ext.key,
                index: searchData.results.indexOf(ext),
                originalIndex: ext.originalIndex,
            }));

            await FeedbackService.Instance.sendFeedBack({
                query: searchData.query,
                items: items,
                feedback: feedBack,
            });

            setFeedBack("");
            setSearchData({ query: "", results: [] });
        } finally {
            setSubmit(false);
        }
    }
}

export default App;

export interface Search {
    query: string;
    results: IExtension[];
}
