import { initializeIcons, Stack } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { IExtension, MyDetailsListComponent } from "./components/DocumentList";
import Searchbox from "./components/Searchbox";

function App() {
    const [results, setResults] = useState<IExtension[]>([]);
    initializeIcons();

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
                        width: "90vw",
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
