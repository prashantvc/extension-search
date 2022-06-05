import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardType,
    IDocumentCardDetailsProps,
    IDocumentCardPreviewProps,
} from "@fluentui/react";
import React from "react";
import { IExtension } from "../models/Extension";

const detailsProps: IDocumentCardDetailsProps = {};
export class ExtensionCard extends React.Component<{
    extension: IExtension;
}> {
    constructor(props: any) {
        super(props);
        this._extension = props.extension;
    }

    render() {
        return (
            <DocumentCard type={DocumentCardType.compact}>
                <DocumentCardPreview
                    {...this._getCardPreview(this._extension)}
                ></DocumentCardPreview>
                <DocumentCardDetails {...detailsProps}>
                    <DocumentCardTitle
                        title={this._extension.description}
                        shouldTruncate
                    />
                    <DocumentCardActivity
                        activity={`Version : ${this._extension.version}`}
                        people={[
                            {
                                name: this._extension.publisher,
                                profileImageSrc: this._extension.isVerified
                                    ? "/images/verified-icon.png"
                                    : "",
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
                    width: 100,
                    height: 100,
                },
            ],
        };
    }

    _extension: IExtension;
}
