import { FontIcon, Image, initializeIcons, Link } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import { format } from "react-string-format";

function ResultCard({ extension }: { extension: Extension }) {
    initializeIcons();
    return (
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg1">
                    <Image
                        src={extension.versions[0].files[0].source}
                        height={96}
                        width={96}
                        alt="{extension.displayName}"
                    />
                </div>
                <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
                    <Text variant="xLarge" block>
                        {extension.displayName}
                    </Text>
                    <Link href={extension.publisher.domain}>
                        <Text variant="mediumPlus">
                            {extension.publisher.displayName}
                        </Text>
                        &nbsp;
                        <FontIcon iconName="VerifiedBrandSolid" />
                    </Link>
                    <Text block>{extension.shortDescription}</Text>
                </div>
            </div>
            <div className="ms-Grid-row">
                <div className="ms-Grid-col">
                    <FontIcon iconName="CloudDownload" />
                    <Text variant="mediumPlus">
                        {extension.statistics[0].value}
                    </Text>
                </div>
                <div className="ms-Grid-col">
                    <FontIcon iconName="FavoriteStarFill" />
                    <Text variant="mediumPlus">
                        {extension.statistics[1].value}
                    </Text>
                </div>
            </div>
        </div>
    );
}

export default ResultCard;

class Extension {
    constructor(
        public displayName: string,
        public shortDescription: string,
        public publisher: Publisher,
        public versions: Version[],
        public statistics: { statisticName: string; value: number }[]
    ) {}
}

class File {
    constructor(public assetType: string, public source: string) {}
}

class Version {
    constructor(public version: string, public files: File[]) {}
}

class Publisher {
    constructor(
        public publisherName: string,
        public displayName: string,
        public flags: string,
        public domain: string,
        public isDomainVerified: boolean
    ) {}
}

//  publisher: {
//         publisherId: "998b010b-e2af-44a5-a6cd-0b5fd3b9b6f8",
//         publisherName: "ms-python",
//         displayName: "Microsoft",
//         flags: "verified",
//         domain: "https://microsoft.com",
//         isDomainVerified: true,
//     }
