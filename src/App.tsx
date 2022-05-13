import {
    initializeIcons,
    ISearchBoxStyles,
    SearchBox,
    Stack,
} from "@fluentui/react";
import "./App.css";

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 240 } };

function App() {
    initializeIcons();
    return (
        <div className="App centered">
            <Stack>
                <h2>Search Extensions</h2>
                <SearchBox
                    styles={searchBoxStyles}
                    placeholder="Search an extension"
                    onSearch={doSearch}
                />
            </Stack>
        </div>
    );
}

async function doSearch(newValue: string) {
    if (newValue === "") return;
    console.log("search value is: " + newValue);
    var data = await searchRequest(newValue);
    console.log(data);
}

async function searchRequest(searchValue: string) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            assetTypes: [
                "Microsoft.VisualStudio.Services.Icons.Default",
                "Microsoft.VisualStudio.Services.Icons.Branding",
                "Microsoft.VisualStudio.Services.Icons.Small",
            ],
            filters: [
                {
                    criteria: [
                        { filterType: 8, value: "Microsoft.VisualStudio.Code" },
                        {
                            filterType: 10,
                            value: searchValue,
                        },
                        { filterType: 12, value: "37888" },
                    ],
                    direction: 2,
                    pageSize: 25,
                    pageNumber: 1,
                    sortBy: 4,
                    sortOrder: 0,
                    pagingToken: null,
                },
            ],
            flags: 870,
        }),
    };

    var rsp = null;
    try {
        rsp = await fetch(
            "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery?api-version=7.1-preview.1",
            requestOptions
        );
        if (!rsp.ok) {
            console.error("Error: " + rsp.status);
        }
    } catch (error) {
        console.error("Error: " + error);
    }

    return await rsp?.json();
}

export default App;
