import { PrimaryButton, Separator, Stack, TextField } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { MyDetailsListComponent } from "./components/DocumentList";
import { SearchInsights } from "./components/Insights";
import Searchbox from "./components/Searchbox";
import { IExtension } from "./models/Extension";

function App() {
    SearchInsights.Instance.appInsights.flush();

    const [results, setResults] = useState<IExtension[]>([]);

    return (
        <div className="centered" style={{ height: "100%" }}>
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack className="centered">
                    <h2>Search Extensions</h2>
                    <Searchbox addResults={setResults} />
                </Stack>
                <div
                    style={{
                        overflowY: "scroll",
                        height: "65vh",
                        width: "96vw",
                    }}
                >
                    <MyDetailsListComponent
                        results={results}
                        updateResults={setResults}
                    />
                </div>
                <Separator />
                <TextField label="Feedback" multiline rows={3} />
                <PrimaryButton>Submit</PrimaryButton>
            </Stack>
        </div>
    );
}

export default App;
