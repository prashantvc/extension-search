import { initializeIcons, ISearchBoxStyles, SearchBox } from "@fluentui/react";
import React from "react";
import "./App.css";

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200 } };

function App() {
    initializeIcons();
    return (
        <div className="App">
            <header className="App-header">
                <SearchBox
                    styles={searchBoxStyles}
                    placeholder="Search an extension"
                    onSearch={(newValue) => {
                        if (newValue === "") return;
                        console.log("search value is: " + newValue);
                    }}
                />
            </header>
        </div>
    );
}

export default App;
