import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import $ from "jquery";
require("datatables.net");

export default class DataTable extends React.Component {
  componentDidMount() {
    this.table = this.datatable(this.props.data);
  }

  componentWillUnmount() {
    this.table.destroy(true);
  }

  shouldComponentUpdate = nextProps => {
    this.refresh(nextProps.options.data);
    return false;
  };

  refresh = data => {
    this.table.clear();
    this.table.rows.add(data);
    this.table.draw();
  };

  datatable() {
    const element = $(this.refs.table);
    let { options } = { ...this.props } || {};

    options = _.extend(options, {
      dom:
        "t" +
        "<'row' l i><'pagination d-flex align-items-center ml-0 justify-content-end' p>",
      oLanguage: {
        sSearch: "<div class='search'></div>",
        sInfo: "<div class='total__entries'>Total:  <span>_TOTAL_</span></div>",
        sLengthMenu: "<span class='name'>Show entries</span> _MENU_",
        oPaginate: {
          sPrevious:
            '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"></path><path d="M0-.5h24v24H0z" fill="none"></path></svg>',
          sNext:
            '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"></path><path d="M0-.25h24v24H0z" fill="none"></path></svg>'
        }
      },
      autoWidth: false,
      retrieve: false,
      responsive: false
    });

    const _dataTable = element.DataTable(options);

    if (this.props.filter) {
      // Apply the filter
      element.on("keyup change", "thead th input[type=text]", function() {
        _dataTable
          .column(
            $(this)
              .parent()
              .index() + ":visible"
          )
          .search(this.value)
          .draw();
      });
    }

    if (this.props.detailsFormat) {
      const format = this.props.detailsFormat;
      element.on("click", "td.details-control", function() {
        const tr = $(this).closest("tr");
        const row = _dataTable.row(tr);
        if (row.child.isShown()) {
          row.child.hide();
          tr.removeClass("shown");
        } else {
          row.child(format(row.data())).show();
          tr.addClass("shown");
        }
      });
    }

    return _dataTable;
  }

  render() {
    const {
      children,
      options,
      detailsFormat,
      paginationLength,
      ...props
    } = this.props;
    return (
      <table {...props} ref="table">
        {children}
      </table>
    );
  }
}

DataTable.defaultProps = {};

DataTable.propTypes = {
  data: PropTypes.array,
  options: PropTypes.object.isRequired,
  paginationLength: PropTypes.bool,
  columnsHide: PropTypes.bool,
  filter: PropTypes.bool,
  detailsFormat: PropTypes.object,
  children: PropTypes.object
};
