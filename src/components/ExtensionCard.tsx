import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardStatus,
    DocumentCardTitle,
    IDocumentCardDetailsProps,
    IDocumentCardPreviewProps,
    IDocumentCardStyles,
} from "@fluentui/react";
import React from "react";
import { IExtension } from "../models/Extension";

const detailsProps: IDocumentCardDetailsProps = {};
const cardStyles: IDocumentCardStyles = {
    root: { minWidth: 320 },
};
export class ExtensionCard extends React.Component<{
    extension: IExtension;
}> {
    constructor(props: any) {
        super(props);
        this._extension = props.extension;
    }

    render() {
        return (
            <DocumentCard
                styles={cardStyles}
                //onClickHref={`https://marketplace.visualstudio.com/items?itemName=${this._extension.key}`}
            >
                <DocumentCardPreview
                    {...this._getCardPreview(this._extension)}
                />
                <DocumentCardDetails {...detailsProps}>
                    <DocumentCardTitle
                        title={this._extension.name}
                        shouldTruncate
                    />
                    <DocumentCardTitle
                        title={this._extension.description}
                        showAsSecondaryTitle
                    />

                    {this._extension.isVerified && (
                        <DocumentCardStatus
                            statusIcon="VerifiedBrandSolid"
                            status={`Publisher verified: ${this._extension.domain}`}
                        />
                    )}

                    <DocumentCardActivity
                        activity={`Version : ${this._extension.version}`}
                        people={[
                            {
                                name: this._extension.publisher,
                                profileImageSrc: "",
                            },
                        ]}
                    ></DocumentCardActivity>
                </DocumentCardDetails>
            </DocumentCard>
        );
    }

    _getCardPreview(extension: IExtension): IDocumentCardPreviewProps {
        return {
            previewImages: [
                {
                    name: extension.name,
                    previewImageSrc: extension.highResImage,
                    height: 100,
                },
            ],
        };
    }

    _extension: IExtension;
}
