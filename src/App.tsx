import { initializeIcons, Stack } from "@fluentui/react";
import { useState } from "react";
import "./App.css";
import { IExtension, MyDetailsListComponent } from "./components/DocumentList";
import Searchbox from "./components/Searchbox";
import { Extension } from "./models/Extension";

function App() {
    const [results, setResults] = useState<IExtension[]>([]);

    initializeIcons();

    function addResults(extensions: Extension[]) {
        var localResults = extensions.map((result: Extension) => ({
            key: result.extensionId,
            iconName: getImageUrl(result),
            name: result.displayName,
            modifiedBy: result.lastUpdated,
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
                    <MyDetailsListComponent results={results} />
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
