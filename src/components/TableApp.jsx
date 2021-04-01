/* eslint-disable no-loop-func */
import { Chip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ColorsApp from "../common/colors";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((themes) => ({
  cell: {
    textAlign: "center",
  },
}));

const TableApp = ({
  pagination,
  perPage,
  field,
  data,
  chipField,
  fieldTitle,
  showIndex,
  showLink,
  path,
  onChipClick,
  chipComponent,
  maxLength,
}) => {
  const classes = useStyles();
  const themes = useTheme();
  const [state, setState] = useState({
    //paging
    data: [],
    dataFilter: [],
    dataShow: [],
    pageNumber: 1,
    pageCount: 1,
    field: [],
    chipField: [],
    fieldTitle: [],
    showIndex: false,
    maxLength: 0,
  });

  useEffect(() => {
    setState((pre) => {
      return {
        ...pre,
        field: field,
        data: data,
        chipField: chipField,
        fieldTitle: fieldTitle,
        showIndex: showIndex ? showIndex : false,
        showLink: showLink ? showLink : false,
        dataShow: data,
        maxLength: maxLength,
      };
    });
  }, [field, data, chipField, fieldTitle, showIndex, maxLength, showLink]);

  const onChange = (e, pageNumber) => {
    setState((pre) => {
      return {
        ...pre,
        pageNumber: pageNumber,
      };
    });
  };

  const renderHeader = () => {
    var listHeader = [];
    if (state.fieldTitle === undefined) {
      listHeader = state.field;
    } else {
      listHeader = state.fieldTitle;
    }

    if (listHeader !== undefined && listHeader.length !== 0)
      return (
        <tr
          style={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            display: "flex",
            color: "white",
            background: themes.palette.secondary.main,
          }}
        >
          {state.showIndex === true ? (
            <th className={classes.cell} style={{ flex: 1 }}>
              #
            </th>
          ) : null}
          {listHeader.map((f, index) => (
            <th className={classes.cell} style={{ flex: 1 }} key={f}>
              {f}
            </th>
          ))}
        </tr>
      );
    return null;
  };

  const renderCompare = () => {
    if (state.maxLength) {
      var rowEmpty = state.maxLength - state.dataShow.length;
      if (rowEmpty <= 0) return null;
      for (var i = 0; i <= rowEmpty; i++) {
        return (
          <tr style={{ display: "flex" }}>
            {state.showIndex ? (
              <th style={{ flex: 1 }} className={classes.cell}>
                &nbsp;
              </th>
            ) : null}
            {state.field.map((f) => (
              <th style={{ flex: 1 }} className={classes.cell} key={f}>
                &nbsp;
              </th>
            ))}
            {showLink ? (
              <th style={{ flex: 1 }} className={classes.cell}>
                &nbsp;
              </th>
            ) : null}
          </tr>
        );
      }
    }
  };
  const renderBody = () => {
    if (state.dataShow !== undefined && state.dataShow.length !== 0)
      return state.dataShow.map((item, i) => (
        <tr style={{ display: "flex" }} key={i}>
          {state.showIndex ? (
            <th style={{ flex: 1 }} className={classes.cell}>
              {data.indexOf(item) + 1}
            </th>
          ) : null}
          {state.field.map((f) => (
            <th style={{ flex: 1 }} className={classes.cell} key={f}>
              {renderCell(item, f)}
            </th>
          ))}
          {/* render link */}
          {state.showLink ? (
            <th style={{ flex: 1 }} className={classes.cell}>
              <Link
                key={item.id}
                to={{
                  pathname: path + "/" + i+"0x001",
                  deviceId: item.id,
                }}
              >
                See Detail
              </Link>
            </th>
          ) : null}
        </tr>
      ));
    return null;
  };

  const renderCell = (item, f) => {
    if (state.chipField === undefined || !state.chipField.includes(f)) {
      return item[f];
    } else {
      if (chipComponent !== undefined) {
        return chipComponent(item, f);
      } else
        return (
          <ChipTag
            name={item[f]}
            onClick={(e) =>
              onChipClick ? onChipClick(item, f) : console.log("chip click")
            }
          />
        );
    }
  };

  return (
    <div className="table-responsive-lg" style={{ margin: 0, padding: 0 }}>
      <table
        style={{
          border: "none",
          flex: 3,
          flexGrow: 3,
        }}
        id="table_container"
        className="table table-bordered table-hover "
      >
        <thead>{renderHeader()}</thead>
        <tbody>
          {renderBody()}
          {renderCompare()}
        </tbody>
      </table>
      <>{renderPagination()}</>
    </div>
  );

  function renderPagination() {
    if (pagination)
      return (
        <div className={classes.root}>
          <Pagination
            count={state.pageCount}
            showFirstButton
            showLastButton
            onChange={onChange}
          />
        </div>
      );
  }

  function ChipTag(props) {
    return (
      <Chip
        {...props}
        label={props.name}
        size="small"
        style={{ backgroundColor: ColorsApp.ENERGY, color: "white" }}
      />
    );
  }
};

TableApp.propTypes = {
  field: PropTypes.array,
  data: PropTypes.array,
  chipField: PropTypes.array,
  fieldTitle: PropTypes.array,
  showLink: PropTypes.bool,
  onChipClick: PropTypes.func,
  showIndex: PropTypes.bool,
};
export default TableApp;
