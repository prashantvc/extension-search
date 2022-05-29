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

export class ExtensionRow {
    constructor(
        public icon: string,
        public name: string,
        public version: string,
        public publisher: string,
        public description: string
    ) {}
}
