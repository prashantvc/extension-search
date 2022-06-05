import React, { Dispatch, SetStateAction } from "react";
import {
    DetailsList,
    DetailsListLayoutMode,
    getTheme,
    HoverCard,
    HoverCardType,
    IColumn,
    IDragDropContext,
    IDragDropEvents,
    IPlainCardProps,
    mergeStyles,
    mergeStyleSets,
    Selection,
    SelectionMode,
    TooltipHost,
} from "@fluentui/react";
import { IExtension } from "../models/Extension";
import moment from "moment";
import { SearchInsights } from "./Insights";
import { Search } from "../App";
import { ExtensionCard } from "./ExtensionCard";

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
    itemClass: {
        selectors: {
            "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
            },
        },
    },
});

const onRenderPlainCard = (item: IExtension) => {
    return <ExtensionCard extension={item} />;
};

const onRenderItemColumn = (
    item?: IExtension,
    index?: number,
    column?: IColumn
) => {
    const plainCardProps: IPlainCardProps = {
        onRenderPlainCard: onRenderPlainCard,
        renderData: item,
    };
    if (column!.key === "nameColumn") {
        return (
            <HoverCard
                plainCardProps={plainCardProps}
                instantOpenOnClick
                type={HoverCardType.plain}
            >
                <div className={classNames.itemClass}>{item!.name}</div>
            </HoverCard>
        );
    }
    return item![column!.key as keyof IExtension];
};

export class MyDetailsListComponent extends React.Component<
    {
        search: Search;
        updateResults: Dispatch<SetStateAction<Search>>;
    },
    IDetailsListComponentState
> {
    constructor(props: any) {
        super(props);

        this._selection = new Selection();

        this._dragDropEvents = this._getDragDropEvents();
        this._draggedIndex = -1;

        const columns = this._getColumns();

        this.state = {
            items: this.props.search.results,
            columns: columns,
            isModalSelection: false,
            isCompactMode: false,
            announcedMessage: undefined,
        };
    }

    public render() {
        const items = this.props.search.results;
        return (
            <div>
                <DetailsList
                    onRenderItemColumn={onRenderItemColumn}
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

        const insertIndex = this.props.search.results.indexOf(item);
        const items = this.props.search.results.filter(
            (itm) => draggedItems.indexOf(itm) === -1
        );

        items.splice(insertIndex, 0, ...draggedItems);

        draggedItems.forEach((e) => {
            SearchInsights.Instance.appInsights.trackEvent({
                name: "result_moved",
                properties: {
                    query: this.props.search.query,
                    extension_id: e.key,
                    originalIndex: e.originalIndex,
                    newIndex: items.indexOf(e),
                },
            });
        });

        this.props.updateResults({
            query: this.props.search.query,
            results: items,
        });
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
                key: "nameColumn",
                name: "Name",
                fieldName: "name",
                minWidth: 210,
                maxWidth: 240,
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
                onRender: (item: IExtension) => (
                    <div style={{ verticalAlign: "middle" }}>
                        {item.isVerified ? (
                            <i
                                className="ms-Icon ms-Icon--VerifiedBrandSolid"
                                aria-hidden="true"
                            />
                        ) : (
                            ""
                        )}{" "}
                        <span>{item.publisher}</span>
                    </div>
                ),
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
                onRender: (item: IExtension) => (
                    <span>
                        {Number(item.downloads)
                            .toLocaleString("en-US")
                            .padStart(12, " ")}
                    </span>
                ),
            },
            {
                key: "column6",
                name: "Rating",
                fieldName: "rating",
                className: classNames.numberCell,
                minWidth: 20,
                maxWidth: 50,
                isRowHeader: true,
                isResizable: true,
                data: "number",
                isPadded: true,
                onRender: (item: IExtension) => {
                    return (
                        <span>
                            <i
                                className="ms-Icon ms-Icon--FavoriteStarFill"
                                aria-hidden="true"
                            />{" "}
                            {item.rating.toFixed(1)}
                        </span>
                    );
                },
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
    isModalSelection?: boolean;
    isCompactMode?: boolean;
    announcedMessage?: string;
}
