/* eslint-disable no-loop-func */
import { Chip, Link } from "@material-ui/core";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    listColor: [],
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

  useEffect(() => {
    var list = [];
    for (var i = 0; i < state.dataShow; i++) {
      list.push("white");
    }
    setState((pre) => ({
      ...pre,
      listColor: list,
    }));
  }, [state.dataShow]);

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
        <tr
          style={{
            display: "flex",
            backgroundColor: state.listColor ? state.listColor[i] : "white",
          }}
          key={i}
        >
          {state.showIndex ? (
            <th style={{ flex: 1 }} className={classes.cell}>
              {data.indexOf(item) + 1}
            </th>
          ) : null}
          {state.field.map((f) => (
            <th style={{ flex: 1 }} className={classes.cell} key={f}>
              {renderCell(item, f, i)}
            </th>
          ))}
          {/* render link */}
          {state.showLink ? (
            <th
              style={{ flex: 1 }}
              className={classes.cell}
              onClick={() => {
                navigate(path, {
                  state: {
                    deviceId: item.id,
                  },
                });
              }}
            >
              <Link style={{ cursor: "pointer" }}>See Detail</Link>
            </th>
          ) : null}
          <Outlet />
        </tr>
      ));
    return null;
  };

  const getColor = (color, i) => {
    if (state.listColor === undefined) return;
    var ln = state.listColor;
    var item = ln[i];
    if (item !== color) {
      console.log("COLOR", color);
      ln[i] = color;
      setState((pre) => ({
        ...pre,
        listColor: ln,
      }));
    }
  };

  const renderCell = (item, f, i) => {
    if (state.chipField === undefined || !state.chipField.includes(f)) {
      return item[f];
    } else {
      if (chipComponent !== undefined) {
        return chipComponent(item, f, i, getColor);
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
