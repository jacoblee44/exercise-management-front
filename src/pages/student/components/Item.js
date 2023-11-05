import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
export default class Item extends Component {
  render() {
    let item = this.props.item;
    return (
      <Draggable draggableId={item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className="card-item"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className={classNames({
                "card-name": true,
                "card-dragging": snapshot.isDragging
              })}
              style={{
                border: "4px solid " + item.color
              }}
            >
              <p>{item.content}</p>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
