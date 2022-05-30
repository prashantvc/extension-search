import * as React from "react";
import { Link } from "@fluentui/react/lib/Link";
import {
    DetailsList,
    Selection,
    IColumn,
    buildColumns,
    IDragDropEvents,
    IDragDropContext,
} from "@fluentui/react/lib/DetailsList";
import { MarqueeSelection } from "@fluentui/react/lib/MarqueeSelection";
import { createListItems, IExampleItem } from "@fluentui/example-data";
import { getTheme, mergeStyles } from "@fluentui/react/lib/Styling";

const theme = getTheme();
const dragEnterClass = mergeStyles({
    backgroundColor: theme.palette.neutralLight,
});

interface IDetailsListDragDropExampleState {
    items: IExampleItem[];
    columns: IColumn[];
}

export class DetailsListDragDropExample extends React.Component<
    {},
    IDetailsListDragDropExampleState
> {
    private _selection: Selection;
    private _dragDropEvents: IDragDropEvents;
    private _draggedItem: IExampleItem | undefined;
    private _draggedIndex: number;

    constructor(props: {}) {
        super(props);

        this._selection = new Selection();
        this._dragDropEvents = this._getDragDropEvents();
        this._draggedIndex = -1;
        const items = createListItems(10, 0);

        this.state = {
            items: items,
            columns: buildColumns(items, true),
        };
    }

    public render(): JSX.Element {
        const { items, columns } = this.state;

        return (
            <div>
                <MarqueeSelection selection={this._selection}>
                    <DetailsList
                        setKey="items"
                        items={items}
                        columns={columns}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
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
            ) => {
                return true;
            },
            canDrag: (item?: any) => {
                return true;
            },
            onDragEnter: (item?: any, event?: DragEvent) => {
                // return string is the css classes that will be added to the entering element.
                return dragEnterClass;
            },
            onDragLeave: (item?: any, event?: DragEvent) => {
                return;
            },
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
        };
    }

    private _insertBeforeItem(item: IExampleItem): void {
        const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
            ? (this._selection.getSelection() as IExampleItem[])
            : [this._draggedItem!];

        const insertIndex = this.state.items.indexOf(item);
        const items = this.state.items.filter(
            (itm) => draggedItems.indexOf(itm) === -1
        );

        items.splice(insertIndex, 0, ...draggedItems);

        this.setState({ items });
    }
}
