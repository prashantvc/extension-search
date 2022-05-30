import { initializeIcons, ISearchBoxStyles, SearchBox } from "@fluentui/react";
import { Dispatch, SetStateAction } from "react";
import { Extension } from "../models/Extension";
import { IExtension } from "./DocumentList";

const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "50vw" } };

function Searchbox({
    addResults,
}: {
    addResults: Dispatch<SetStateAction<IExtension[]>>;
}) {
    initializeIcons();

    async function doSearch(newValue: string) {
        if (newValue === "") return;
        var data = await searchRequest(newValue);
        var extensions: Extension[] = data.results[0].extensions;
        console.info(`Total results ${extensions.length}`);

        var localResults = extensions.map((result: Extension) => ({
            key: result.extensionId,
            iconName: getImageUrl(result),
            name: result.displayName,
            modifiedBy: result.lastUpdated,
        }));

        addResults(localResults);
    }

    return (
        <SearchBox
            styles={searchBoxStyles}
            placeholder="Search an extension"
            onSearch={doSearch}
        />
    );
}

function getImageUrl(ext: Extension) {
    var imageSource =
        ext.versions[0].files.length > 0
            ? ext.versions[0].files[1].source
            : "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";

    return imageSource;
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

export default Searchbox;
