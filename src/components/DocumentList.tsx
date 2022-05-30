import React from "react";
import {
    Announced,
    DetailsList,
    DetailsListLayoutMode,
    IColumn,
    initializeIcons,
    mergeStyleSets,
    Selection,
    SelectionMode,
    Toggle,
    TooltipHost,
} from "@fluentui/react";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: "16px",
    },
    fileIconCell: {
        textAlign: "center",
        selectors: {
            "&:before": {
                content: ".",
                display: "inline-block",
                verticalAlign: "middle",
                height: "100%",
                width: "0px",
                visibility: "hidden",
            },
        },
    },
    fileIconImg: {
        verticalAlign: "middle",
        maxHeight: "16px",
        maxWidth: "16px",
    },
    controlWrapper: {
        display: "flex",
        flexWrap: "wrap",
    },
    exampleToggle: {
        display: "inline-block",
        marginBottom: "10px",
        marginRight: "30px",
    },
    selectionDetails: {
        marginBottom: "20px",
    },
});

const controlStyles = {
    root: {
        margin: "0 30px 20px 0",
        maxWidth: "300px",
    },
};

export class MyDetailsListComponent extends React.Component<
    { results: IExtension[] },
    IDetailsListComponentState
> {
    constructor(props: { results: IExtension[] }) {
        super(props);

        initializeIcons();

        this._selection = new Selection({
            onSelectionChanged: () => {
                this.setState({
                    selectionDetails: this._getSelectionDetails(),
                });
            },
        });

        const columns: IColumn[] = [
            {
                key: "column1",
                name: "File Type",
                className: classNames.fileIconCell,
                iconClassName: classNames.fileIconHeaderIcon,
                iconName: "Page",
                fieldName: "name",
                minWidth: 16,
                maxWidth: 16,
                //TODO: onColumnClick: this._onColumnClick,
                isIconOnly: true,
                onRender: (item: IExtension) => (
                    <TooltipHost content={`${item.name} file`}>
                        <img
                            src={item.iconName}
                            className={classNames.fileIconImg}
                            alt={`${item.name} file`}
                        />
                    </TooltipHost>
                ),
            },
            {
                key: "column2",
                name: "Name",
                fieldName: "name",
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                data: "string",
                isPadded: true,
            },
            {
                key: "column3",
                name: "Date Modified",
                fieldName: "modifiedBy",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: "string",
                isPadded: true,
            },
        ];

        this.state = {
            items: this.props.results,
            columns: columns,
            selectionDetails: this._getSelectionDetails(),
            isModalSelection: false,
            isCompactMode: false,
            announcedMessage: undefined,
        };
    }

    _getSelectionDetails(): string {
        const selectionCount = this._selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return "No items selected";
            case 1:
                var selectedItem =
                    this._selection.getSelection()[0] as IExtension;
                return "1 item selected: " + selectedItem.name;
            default:
                return `${selectionCount} items selected`;
        }
    }

    public render() {
        const { columns, items, selectionDetails, announcedMessage } =
            this.state;

        return (
            <div>
                <div className={classNames.selectionDetails}>
                    {selectionDetails}
                </div>
                <Announced message={selectionDetails} />
                {announcedMessage ? (
                    <Announced message={announcedMessage} />
                ) : undefined}
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={this.props.results}
                        columns={columns}
                        selectionMode={SelectionMode.multiple}
                        getKey={(item: IExtension) => item.key}
                        setKey="multiple"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        onItemInvoked={(item: IExtension) =>
                            alert(`Item invoked: ${item.name}`)
                        }
                        enterModalSelectionOnTouch={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                    />
                </MarqueeSelection>
            </div>
        );
    }

    _selection: Selection;
}

export interface IDetailsListComponentState {
    columns: IColumn[];
    items: IExtension[];
    selectionDetails: string;
    isModalSelection?: boolean;
    isCompactMode?: boolean;
    announcedMessage?: string;
}

export interface IExtension {
    key: string;
    name: string;
    modifiedBy: string;
    iconName: string;
}
