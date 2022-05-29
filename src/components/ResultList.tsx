import {
    DetailsList,
    DetailsRow,
    IColumn,
    IDetailsListProps,
    SelectionMode,
} from "@fluentui/react";
import React from "react";
import { ExtensionRow } from "../models/Extension";

export class ResultList extends React.Component<
    { results: ExtensionRow[] },
    {}
> {
    public render() {
        return (
            <DetailsList
                setKey="set"
                items={this.props.results}
                onRenderRow={this._onRenderRow}
                selectionMode={SelectionMode.single}
                onRenderItemColumn={_renderItemColumn}
            />
        );
    }

    _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
        if (props) {
            return <DetailsRow {...props} />;
        }
        return null;
    };
}

function _renderItemColumn(
    item: ExtensionRow,
    index?: number,
    column?: IColumn
) {
    const fieldContent = item[
        column?.fieldName as keyof ExtensionRow
    ] as string;

    if (column && column.fieldName === "icon") {
        return <img src={fieldContent} height={24} alt="{fildContent}" />;
    }

    return <span>{fieldContent}</span>;
}
