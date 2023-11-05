import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Group from "./Group";
import Button from "../../../components/Button";
import ItemRow from "./ItemRow";
import BaseAPIComponent from "../../../lib/BaseAPIComponent";
import _ from "underscore";
import { getExerciseId } from "../helper";
export default class GroupList extends BaseAPIComponent {
  constructor(props) {
    super(props);
    let exerciseId = getExerciseId();

    this.state = {
      url: "/api/student/exercise-data/" + exerciseId,
      data: this.convertData({})
    };
  }

  convertData = data => {
    let columns = _.groupBy(data, "color");
    let tempGroup = {
      name: "Group 1",
      list: ["column-1", "column-2", "column-3"]
    };

    data = {
      groups: [],
      columns: _.mapObject(columns, column => _.pluck(column, "id")),
      items: data,
      itemSets: _.keys(columns)
    };

    data.groups.push(tempGroup);
    for (let col in tempGroup.list) data.columns[tempGroup.list[col]] = [];

    return data;
  };

  onDragEnd = result => {
    const data = this.state.data;
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const column = sourceColumn;
      const newColumn = Array.from(column);
      newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [source.droppableId]: newColumn
        }
      };

      this.setState({ data: newState });
      return;
    }

    sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, draggableId);

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn
      }
    };

    this.setState({ data: newState });
  };

  addGroup = () => {
    const data = this.state.data;
    let groupCount = data.groups.length;
    let columnCount = Object.keys(data.columns).length;
    let columns = { ...data.columns };
    let list = new Array(3);
    for (let i = 0; i < 3; i++) {
      list[i] = "list-" + (i + columnCount);
      columns[list[i]] = [];
    }

    let newState = {
      ...data,
      groups: [
        ...data.groups,
        { name: "Group " + (groupCount + 1), list: list }
      ],
      columns: columns
    };

    this.setState({ data: newState });
  };

  apiRender() {
    let data = this.state.data || {};
    const groups = data.groups || [];
    const items = data.items || {};
    const columns = data.columns || {};
    const itemSets = data.itemSets || [];

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="groups-wrapper">
          {groups.map((group, index) => {
            let groupColumns = group.list;
            let groupItems = groupColumns.map(column => ({
              id: column,
              items: columns[column] || []
            }));
            return (
              <Group
                key={index}
                name={group.name}
                columns={groupItems}
                items={items}
              />
            );
          })}

          <div className="group">
            <Button
              text="Create new"
              className="button"
              icon="plus.svg#plus"
              onClick={this.addGroup}
              style={{ margin: "10px" }}
            />
          </div>
        </div>
        <div className="card-sets row">
          {itemSets.map((column, index) => {
            column = { id: column, items: columns[column] };

            const rowItems = column.items.map(itemId => items[itemId]);

            return (
              <ItemRow key={column.id} column={column.id} items={rowItems} />
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}
