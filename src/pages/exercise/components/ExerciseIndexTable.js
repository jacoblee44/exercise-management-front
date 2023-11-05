import React, { Component } from "react";
import DataTable from "../../../components/DataTable";
import Button from "../../../components/Button";
import ReactDom from "react-dom";
import { withRouter } from "react-router";
import ShowAnswerModal from "./ShowAnswerModal";

class ExerciseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  gotoExercise = row => {
    let id = row.id;
    this.props.history.push("/exercise/" + id);
  };

  showAnswer = row => {
    this.refs.answerModal.showModal(row);
  };

  renderControl = (td, cellData, rowData, row, col) => {
    return ReactDom.render(
      <React.Fragment>
        <Button
          text="View Answers"
          icon="arrow_next.svg#Arrow_next"
          iconWidth={18}
          iconHeight={13}
          className={`button mr-3 py-1 px-4`}
          disabled={cellData === false}
          onClick={() => this.showAnswer(rowData)}
        />
        <Button
          text="View Exercise"
          icon="arrow_next.svg#Arrow_next"
          iconWidth={18}
          iconHeight={13}
          className="button green mr-3 py-1 px-4"
          iconClassName="button__icon button__icon-green"
          onClick={() => this.gotoExercise(rowData)}
        />
      </React.Fragment>,
      td
    );
  };
  render() {
    return (
      <div className="content-block box-shadow">
        <div className="card__content-wrapper">
          <div className="card-content">
            <DataTable
              options={{
                data: this.props.data,
                order: [[1, "desc"]],
                columns: [
                  { data: "name" },
                  {
                    data: "date",
                    orderDataType: "date-uk"
                  },
                  {
                    data: "state",
                    createdCell: this.renderControl,
                    orderable: false,
                    className: "actions w-50 p-10 text-center"
                  }
                ],
                deferRender: true
              }}
              className="table table-borderless"
              width="100%"
            >
              <thead>
                <tr>
                  <th
                    data-class="name"
                    className="table__header table__header-sortable"
                  >
                    Exercise name
                  </th>
                  <th
                    data-hide="date"
                    className="table__header table__header-sortable"
                  >
                    Date created
                  </th>
                  <th data-hide="state" className="" />
                </tr>
              </thead>
            </DataTable>
          </div>
        </div>
        <ShowAnswerModal ref="answerModal" />
      </div>
    );
  }
}

export default withRouter(ExerciseTable);
