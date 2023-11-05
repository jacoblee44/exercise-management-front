import React, { Component } from "react";
import Column from "./Column";
export default class Group extends Component {
  constructor(props) {
    super(props);
    this.draggingOver = 0;
  }

  setDraggingOver = dragging => {
    let draggingOver = false;
    for (let idx in this.refs) {
      let item = this.refs[idx];
      if (item.draggingOver) draggingOver = true;
    }
    if (this.refs.content) {
      if (draggingOver)
        this.refs.content.className = "group-list-wrapper grop-dragging";
      else this.refs.content.className = "group-list-wrapper";
    }
  };
  render() {
    return (
      <div className="group">
        <div className="group-content">
          <div className="group-header">
            <p>{this.props.name}</p>
          </div>
          <div ref="content" className="group-list-wrapper">
            <div className="column_wrapper">
              {this.props.columns.map(column => {
                const items = column.items.map(
                  itemId => this.props.items[itemId]
                );
                return (
                  <Column
                    ref={"column-" + column.id}
                    key={column.id}
                    column={column.id}
                    items={items}
                    setDraggingOver={this.setDraggingOver}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
