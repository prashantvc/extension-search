import { initializeIcons, Stack } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { MyDetailsListComponent } from "./components/DocumentList";
import { SearchInsights } from "./components/Insights";
import Searchbox from "./components/Searchbox";
import { IExtension } from "./models/Extension";

function App() {
    const [results, setResults] = useState<IExtension[]>([]);
    initializeIcons();

    SearchInsights.Instance.appInsights.trackPageView();

    return (
        <div className="centered">
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack className="centered">
                    <h2>Search Extensions</h2>
                    <Searchbox addResults={setResults} />
                </Stack>
                <div
                    style={{
                        overflowY: "scroll",
                        height: "70vh",
                        width: "96vw",
                    }}
                >
                    <MyDetailsListComponent
                        results={results}
                        updateResults={setResults}
                    />
                </div>
            </Stack>
        </div>
    );
}

export default App;
