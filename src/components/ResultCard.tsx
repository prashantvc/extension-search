import { FontIcon, Image, initializeIcons, Link } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";

function ResultCard({ extension }: { extension: Extension }) {
    initializeIcons();
    return (
        <div className="ms-Grid">
            <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm2 ms-md1 ms-lg1">
                    <Image
                        src={getImage(extension)}
                        height={48}
                        width={48}
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

    function getImage(ext: Extension) {
        if (ext.versions[0].files.length > 0) {
            return ext.versions[0].files[1].source;
        }
        return "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";
    }
}

export default ResultCard;

export class Extension {
    constructor(
        public extensionId: string,
        public displayName: string,
        public shortDescription: string,
        public publisher: Publisher,
        public versions: Version[],
        public statistics: { statisticName: string; value: number }[]
    ) {}
}

export class File {
    constructor(public assetType: string, public source: string) {}
}

export class Version {
    constructor(public version: string, public files: File[]) {}
}

export class Publisher {
    constructor(
        public publisherName: string,
        public displayName: string,
        public flags: string,
        public domain: string,
        public isDomainVerified: boolean
    ) {}
}
