import {
    DetailsList,
    DetailsRow,
    IColumn,
    IDetailsListProps,
    SelectionMode,
} from "@fluentui/react";
import React from "react";

export class ResultList extends React.Component<
    { results: MyExtension[] },
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

    private _onRenderRow: IDetailsListProps["onRenderRow"] = (props) => {
        if (props) {
            return <DetailsRow {...props} />;
        }
        return null;
    };
}

function _renderItemColumn(
    item: MyExtension,
    index?: number,
    column?: IColumn
) {
    const fieldContent = item[column?.fieldName as keyof MyExtension] as string;

    if (column && column.fieldName === "icon") {
        return <img src={fieldContent} height={24} alt="{fildContent}" />;
    }

    return <span>{fieldContent}</span>;
}

export class MyExtension {
    constructor(
        public icon: string,
        public name: string,
        public version: string,
        public publisher: string,
        public description: string
    ) {}
}
