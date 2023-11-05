import React, { Component } from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
export default class Column extends Component {
  render() {
    return (
      <Droppable droppableId={this.props.column}>
        {(provided, snapshot) => {
          this.draggingOver = snapshot.isDraggingOver;
          this.props.setDraggingOver();
          return (
            <div
              className="col-md-4 item-column"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.items.map((item, index) => {
                return <Item item={item} index={index} key={item.id} />;
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    );
  }
}
