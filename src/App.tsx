import { PrimaryButton, Separator, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { MyDetailsListComponent } from "./components/DocumentList";
import { SearchInsights } from "./components/Insights";
import Searchbox from "./components/Searchbox";
import { IExtension } from "./models/Extension";

function App() {
    SearchInsights.Instance.appInsights.flush();

    const [searchData, setSearchData] = useState<Search>({
        query: "",
        results: [],
    });

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
                <TextField label="Feedback" multiline rows={3} />
                <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
            </Stack>
        </div>
    );

    function onSubmit() {
        console.log(searchData);
    }
}

export default App;

export interface Search {
    query: string;
    results: IExtension[];
}
