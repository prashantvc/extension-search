import { PrimaryButton, Separator, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { MyDetailsListComponent } from "./components/DocumentList";
import { FeedbackService } from "./components/FeedbackService";
import { SearchInsights } from "./components/Insights";
import Searchbox from "./components/Searchbox";
import { IExtension } from "./models/Extension";

function App() {
    SearchInsights.Instance.appInsights.flush();

    const [searchData, setSearchData] = useState<Search>({
        query: "",
        results: [],
    });

    const [feedBack, setFeedBack] = useState<string>("");

    return (
        <div className="centered" style={{ height: "100%" }}>
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack className="centered">
                    <h2>Search Extensions</h2>
                    <Searchbox addResults={setSearchData} />
                </Stack>
                <div
                    style={{
                        overflowY: "scroll",
                        height: "65vh",
                        width: "96vw",
                    }}
                >
                    <MyDetailsListComponent
                        search={searchData}
                        updateResults={setSearchData}
                    />
                </div>
                <Separator />
                <TextField
                    value={feedBack}
                    label="Feedback"
                    multiline
                    rows={3}
                    onChange={(e, nv) => setFeedBack(nv ?? "")}
                />
                <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
            </Stack>
        </div>
    );

    function onSubmit() {
        const items = searchData.results.map((ext: IExtension) => ({
            key: ext.key,
            index: searchData.results.indexOf(ext),
            originalIndex: ext.originalIndex,
        }));

        FeedbackService.Instance.sendFeedBack({
            query: searchData.query,
            items: items,
            feedback: feedBack,
        });

        setFeedBack("");
        setSearchData({ query: "", results: [] });
    }
}

export default App;

export interface Search {
    query: string;
    results: IExtension[];
}
