import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardTitle,
    DocumentCardType,
    IDocumentCardPreviewProps,
    DocumentCardPreview,
    initializeIcons,
} from "@fluentui/react";

const previewProps: IDocumentCardPreviewProps = {
    previewImages: [
        {
            name: "One",
            linkProps: {
                href: "http://prashantvc.com",
                target: "_blank",
            },
            previewImageSrc:
                "https://raw.githubusercontent.com/prashantvc/prashantvc.github.com/master/img/profile.jpg",
            width: 144,
        },
    ],
};

function ResultCard({ extension }: { extension: Extension }) {
    initializeIcons();
    return (
        <DocumentCard
            type={DocumentCardType.compact}
            aria-label={extension.shortDescription}
        >
            <DocumentCardPreview {...previewProps}/>
            <DocumentCardDetails>
                <DocumentCardTitle
                    title={extension.displayName}
                    shouldTruncate
                />
                <DocumentCardActivity
                    activity="Sent few minutes ago"
                    people={[
                        {
                            name: "Prashant C",
                            profileImageSrc: "",
                            initials: "PC",
                        },
                    ]}
                />
            </DocumentCardDetails>
        </DocumentCard>
    );
}

function getImage(ext: Extension) {
    if (ext.versions[0].files.length > 0) {
        return ext.versions[0].files[1].source;
    }
    return "https://cdn.vsassets.io/v/M203_20220518.4/_content/Header/default_icon_128.png";
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
