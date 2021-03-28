import { Chip } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
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

const TableAppOverSize = forwardRef(
  (
    {
      pagination,
      perPage,
      field,
      data,
      chipField,
      fieldTitle,
      index,
      link,
      path,
      onChipClick,
      chipComponent,
    },
    ref
  ) => {
    const classes = useStyles();
    const [state, setState] = useState({
      //paging
      data: [],
      dataFilter: [],
      dataShow: [],
      pageNumber: 1,
      pageCount: 1,

      col: "col-3",
      field: [],
      chipField: [],
      fieldTitle: [],
      index: true,
    });

    useEffect(() => {
      setState((pre) => {
        return {
          ...pre,
          field: field,
          data: data,
          chipField: chipField,
          fieldTitle: fieldTitle,
          index: index,
        };
      });
    }, [field, data, chipField, fieldTitle, index]);

    useEffect(() => {
      var mPerPage = perPage ? perPage : state.data.length;
      var startIndex = (state.pageNumber - 1) * mPerPage;
      var endIndex = state.pageNumber * mPerPage;
      var mDataShow = data.slice(startIndex, endIndex);
      setState((pre) => {
        return {
          ...pre,
          perPage: mPerPage,
          dataShow: mDataShow,
          pageCount: Math.ceil(data.length / perPage),
        };
      });
    }, [data, perPage, state.data.length, state.pageNumber]);

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
            style={{ color: "white", background: themes.palette.primary.main }}
          >
            {state.index === true ? <th className={classes.cell}>#</th> : null}
            {listHeader.map((f, index) => (
              <th key={f} className={classes.cell}>
                {f}
              </th>
            ))}
          </tr>
        );
      return null;
    };

    const renderBody = () => {
      if (state.dataShow !== undefined && state.dataShow.length !== 0)
        return state.dataShow.map((item, index) => (
          <tr key={index}>
            {state.index ? <th>{data.indexOf(item) + 1}</th> : null}
            {state.field.map((f) => (
              <th className={classes.cell} key={f}>
                {renderRow(item, f)}
              </th>
            ))}
            {/* render link */}
            {link ? (
              <th className={classes.cell}>
                <Link key={item.id} to={path + "/" + item.id}>
                  See Detail
                </Link>
              </th>
            ) : null}
          </tr>
        ));
      return null;
    };
    const themes = useTheme();

    const renderRow = (item, f) => {
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
      <div
        ref={ref}
        className="table-responsive-lg"
        style={{ margin: 0, padding: 0 }}
      >
        <table
          style={{
            flex: 3,
            flexGrow: 3,
          }}
          id="table_container"
          className="table table-bordered table-hover "
        >
          <thead>{renderHeader()}</thead>
          <tbody>{renderBody()}</tbody>
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
          style={{ backgroundColor: ColorsApp.ENEGRY, color: "white" }}
        />
      );
    }
  }
);
TableAppOverSize.propTypes = {
  field: PropTypes.array,
  data: PropTypes.array,
  chipField: PropTypes.array,
  fieldTitle: PropTypes.array,
  link: PropTypes.bool,
  onChipClick: PropTypes.func,
};
export default TableAppOverSize;
