import React, { Dispatch, SetStateAction } from "react";
import {
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
import { IExtension } from "../models/Extension";
import moment from "moment";

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
    numberCell: {
        textAlign: "right",
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
    {
        results: IExtension[];
        updateResults: Dispatch<SetStateAction<IExtension[]>>;
    },
    IDetailsListComponentState
> {
    constructor(props: any) {
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

        const columns = this._getColumns();

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
        const items = this.props.results;
        return (
            <div>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        items={items}
                        columns={this.state.columns}
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

        const insertIndex = this.props.results.indexOf(item);
        const items = this.props.results.filter(
            (itm) => draggedItems.indexOf(itm) === -1
        );

        items.splice(insertIndex, 0, ...draggedItems);

        this.props.updateResults(items);
    }

    _getColumns(): IColumn[] {
        return [
            {
                key: "column1",
                name: "File Type",
                className: classNames.fileIconCell,
                iconClassName: classNames.fileIconHeaderIcon,
                iconName: "Page",
                fieldName: "name",
                minWidth: 16,
                maxWidth: 16,
                isIconOnly: true,
                onRender: (item: IExtension) => (
                    <TooltipHost content={`${item.name}`}>
                        <img
                            src={item.iconName}
                            className={classNames.fileIconImg}
                            alt={`${item.name}`}
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
                name: "Publisher",
                fieldName: "publisher",
                minWidth: 120,
                maxWidth: 140,
                isRowHeader: true,
                isResizable: true,
                data: "string",
                isPadded: true,
            },
            {
                key: "column4",
                name: "Version",
                fieldName: "version",
                className: classNames.numberCell,
                minWidth: 80,
                maxWidth: 120,
                isRowHeader: true,
                isResizable: true,
                data: "string",
                isPadded: true,
            },
            {
                key: "column5",
                name: "Downloads",
                fieldName: "downloads",
                className: classNames.numberCell,
                minWidth: 50,
                maxWidth: 80,
                isRowHeader: true,
                isResizable: true,
                data: "number",
                isPadded: true,
            },
            {
                key: "column6",
                name: "Rating",
                fieldName: "rating",
                className: classNames.numberCell,
                minWidth: 50,
                maxWidth: 80,
                isRowHeader: true,
                isResizable: true,
                data: "number",
                isPadded: true,
            },
            {
                key: "column7",
                name: "Date Modified",
                fieldName: "modifiedBy",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: "string",
                isPadded: true,
                onRender: (item: IExtension) => {
                    var m = moment(item.modifiedBy);
                    return (
                        <TooltipHost content={`${m.format("MMMM DD, YYYY")}`}>
                            <span>{moment(item.modifiedBy).fromNow()}</span>
                        </TooltipHost>
                    );
                },
            },
        ];
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
