import {
    ISearchBoxStyles,
    ProgressIndicator,
    SearchBox,
} from "@fluentui/react";
import React, { Dispatch, SetStateAction } from "react";
import { Search } from "../App";
import { Extension } from "../models/Extension";
import { SearchInsights } from "./Insights";

export class SearchComponent extends React.Component<
    {
        onSearchComplete: Dispatch<SetStateAction<Search>>;
    },
    { isSearching: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { isSearching: false };
    }

    render() {
        return (
            <div>
                <SearchBox
                    styles={this._searchBoxStyles}
                    placeholder="Search an extension"
                    onSearch={this._doSearch}
                />
                {this.state.isSearching && <ProgressIndicator />}
            </div>
        );
    }

    _doSearch = async (newValue: string) => {
        if (newValue === "") {
            this.setState({ isSearching: false });
            return;
        }
        console.log(`Searching for ${newValue}`);

        try {
            this.setState({ isSearching: true });
            var data = await searchRequest(newValue);
            var extensions: Extension[] = data.results[0].extensions;
            console.info(`Total results ${extensions.length}`);

            var localResults = extensions.map((result: Extension, index) => ({
                originalIndex: index,
                domain: result.publisher.domain,
                key: `${result.publisher.publisherName}.${result.extensionName}`,
                iconName: getImageUrl(result),
                highResImage: getImageUrl(result, true),
                name: result.displayName,
                modifiedBy: result.lastUpdated,
                version: result.versions[0].version,
                description: result.shortDescription,
                publisher: result.publisher.displayName,
                isVerified: result.publisher.isDomainVerified,
                downloads: getStatisticsData(result.statistics, "install"),
                rating: getStatisticsData(result.statistics, "weightedRating"),
            }));

            this.props.onSearchComplete({
                query: newValue,
                results: localResults,
            });

            SearchInsights.Instance.appInsights.trackEvent({
                name: "search",
                properties: {
                    searchValue: newValue,
                },
            });
        } finally {
            this.setState({ isSearching: false });
        }
    };
    _searchBoxStyles: Partial<ISearchBoxStyles> = {
        root: { minWidth: "40vw" },
    };
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
                    sortBy: 0,
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
            "https://experiment-default-and.azurewebsites.net/_apis/public/gallery/extensionquery",
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

function getImageUrl(ext: Extension, highRes: boolean = false) {
    var imageSource =
        ext.versions[0].files.length > 0
            ? highRes
                ? ext.versions[0].files[0].source
                : ext.versions[0].files[1].source
            : "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";

    return imageSource;
}

function getStatisticsData(
    stat: { statisticName: string; value: number }[],
    name: string
) {
    var result = stat.find((s) => s.statisticName === name);
    return result ? result.value : 0;
}
