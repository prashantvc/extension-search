import { initializeIcons, Stack } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { Extension } from "./components/ResultCard";
import { MyExtension, ResultList } from "./components/MyList";
import Searchbox from "./components/Searchbox";

function App() {
    const [results, setResults] = useState<MyExtension[]>([]);

    initializeIcons();

    function addResults(extensions: Extension[]) {
        var localResults = extensions.map((result: Extension) => ({
            icon: getImageUrl(result),
            name: result.displayName,
            version: result.versions[0].version,
            publisher: result.publisher.displayName,
            description: result.shortDescription,
        }));

        setResults(localResults);
    }

    return (
        <div>
            <Stack tokens={{ childrenGap: 20 }}>
                <Stack className="centered">
                    <h2>Search Extensions</h2>
                    <Searchbox addResults={addResults} />
                </Stack>
                <div style={{ overflowY: "scroll", height: "70vh" }}>
                    <ResultList results={results} />
                </div>
            </Stack>
        </div>
    );
}

function getImageUrl(ext: Extension) {
    var imageSource =
        ext.versions[0].files.length > 0
            ? ext.versions[0].files[1].source
            : "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";

    return imageSource;
}

export default App;
