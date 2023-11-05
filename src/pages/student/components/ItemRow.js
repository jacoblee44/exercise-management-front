import React, { Component } from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import classNames from "classnames";
export default class ItemRow extends Component {
  render() {
    return (
      <div className="col-6">
        <Droppable droppableId={this.props.column} direction="horizontal">
          {(provided, snapshot) => {
            return (
              <div
                className={classNames({
                  "cards-set": true,
                  dragging: snapshot.isDraggingOver
                })}
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
      </div>
    );
  }
}
