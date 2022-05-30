import React from "react";
import {
    Announced,
    DetailsList,
    DetailsListLayoutMode,
    getTheme,
    IColumn,
    IDragDropContext,
    IDragDropEvents,
    initializeIcons,
    mergeStyles,
    mergeStyleSets,
    Selection,
    SelectionMode,
    TooltipHost,
} from "@fluentui/react";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";

const theme = getTheme();
const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
});

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

        this._dragDropEvents = this._getDragDropEvents();
        this._draggedIndex = -1;

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
        const { columns, selectionDetails, announcedMessage } = this.state;

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
                        dragDropEvents={this._dragDropEvents}
                    />
                </MarqueeSelection>
            </div>
        );
    }

    private _getDragDropEvents(): IDragDropEvents {
        return {
            canDrop: (
                dropContext?: IDragDropContext,
                dragContext?: IDragDropContext
            ) => true,
            canDrag: (item?: any) => true,
            onDrop: (item?: any, event?: DragEvent) => {
                if (this._draggedItem) {
                    this._insertBeforeItem(item);
                }
            },
            onDragStart: (
                item?: any,
                itemIndex?: number,
                selectedItems?: any[],
                event?: MouseEvent
            ) => {
                this._draggedItem = item;
                this._draggedIndex = itemIndex!;
            },
            onDragEnd: (item?: any, event?: DragEvent) => {
                this._draggedItem = undefined;
                this._draggedIndex = -1;
            },
            onDragEnter: (item?: any, event?: DragEvent) => dragEnterClass,
        };
    }

    private _insertBeforeItem(item: IExtension): void {
        const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
            ? (this._selection.getSelection() as IExtension[])
            : [this._draggedItem!];

        const insertIndex = this.state.items.indexOf(item);
        const items = this.state.items.filter(
            (itm) => draggedItems.indexOf(itm) === -1
        );

        items.splice(insertIndex, 0, ...draggedItems);

        this.setState({ items });
    }

    _selection: Selection;
    _dragDropEvents: IDragDropEvents;
    _draggedItem: IExtension | undefined;
    _draggedIndex: number;
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
function mergeStyle(arg0: { backgroundColor: string }) {
    throw new Error("Function not implemented.");
}
