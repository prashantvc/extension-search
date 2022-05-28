import { initializeIcons, Stack } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { Extension } from "./components/ResultCard";
import ResultList from "./components/ResultList";
import Searchbox from "./components/Searchbox";

function App() {
    const [results, setResults] = useState<Extension[]>([]);

    initializeIcons();

    function addResults(extensions: Extension[]) {
        setResults(extensions);
    }

    return (
        <div className="centered">
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack>
                    <h2>Search Extensions</h2>
                    <Searchbox addResults={addResults} />
                </Stack>
                <ResultList results={results} />
            </Stack>
        </div>
    );
}

export default App;
