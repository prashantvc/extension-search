import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardTitle,
    DocumentCardType,
    IDocumentCardPreviewProps,
    DocumentCardPreview,
    initializeIcons,
    IDocumentCardDetailsProps,
} from "@fluentui/react";

const detailProps: IDocumentCardDetailsProps = {};

function ResultCard({ extension }: { extension: Extension }) {
    initializeIcons();
    return (
        <DocumentCard
            type={DocumentCardType.compact}
            aria-label={extension.shortDescription}
        >
            <DocumentCardPreview {...getCardPreview(extension)} />
            <DocumentCardDetails {...detailProps}>
                <DocumentCardTitle
                    title={extension.displayName}
                    shouldTruncate
                />
                <DocumentCardActivity
                    activity={`Version: ${extension.versions[0].version}`}
                    people={[
                        {
                            name: extension.publisher.displayName,
                            profileImageSrc: "",
                        },
                    ]}
                />
            </DocumentCardDetails>
        </DocumentCard>
    );
}

function getCardPreview(ext: Extension): IDocumentCardPreviewProps {
    var imageSource =
        ext.versions[0].files.length > 0
            ? ext.versions[0].files[0].source
            : "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";

    return {
        previewImages: [
            {
                name: "One",
                linkProps: {
                    href: "http://prashantvc.com",
                    target: "_blank",
                },
                previewImageSrc: imageSource,
                iconSrc: ext.publisher.isDomainVerified
                    ? "/images/check.png"
                    : "",
                width: 100,
            },
        ],
    };
}

export default ResultCard;

export class Extension {
    constructor(
        public extensionId: string,
        public displayName: string,
        public shortDescription: string,
        public publisher: Publisher,
        public versions: Version[],
        public lastUpdated: string,
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
