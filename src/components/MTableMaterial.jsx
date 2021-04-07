import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
  withStyles,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "1px solid white",
  },
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    textAlign: "center",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const MTableMaterial = ({ dataSource, fieldArray, controls, rowsPerPage }) => {
  const [state, setState] = useState({
    fields: [],
    renderControl: null,
    percentW: 0,

    page: 1,
    dataShow: [],
    emptyRows: 0,
    count: 1,
  });

  useEffect(() => {
    var sumField = [...fieldArray];
    if (controls) {
      sumField.push("Controls");
    }
    var w = Math.round(100 / sumField.length);

    setState((pre) => ({
      ...pre,
      fields: sumField,
      percentW: w,
    }));
  }, [controls, fieldArray]);

  useEffect(() => {
    var mPerPage = rowsPerPage ? rowsPerPage : dataSource.length;
    var startIndex = (state.page - 1) * mPerPage;
    var endIndex = state.page * mPerPage;
    var mDataShow = dataSource.slice(startIndex, endIndex);
    setState((pre) => ({
      ...pre,
      dataShow: mDataShow,
    }));
  }, [dataSource, rowsPerPage, state.page]);

  useEffect(() => {
    var count = Math.ceil(dataSource.length / rowsPerPage);
    setState((pre) => ({
      ...pre,
      count: count,
    }));
  }, [dataSource.length, rowsPerPage]);

  // useEffect(() => {
  //   if (!state.dataShow) return;
  //   const emptyRows = rowsPerPage - state.dataShow.length;
  //   setState((pre) => ({
  //     ...pre,
  //     emptyRows: emptyRows,
  //   }));
  // }, [state.dataShow]);

  const renderControl = (user) => {
    return controls(user);
  };

  const handleChangePage = (e, newPage) => {
    setState((pre) => ({
      ...pre,
      page: newPage,
    }));
  };

  return (
    <Box style={{ overflowX: "auto" }}>
      <Table style={{ border: "1px rgba(0,0,0,0.2) solid" }}>
        <TableHead>
          <StyledTableRow>
            {state.fields &&
              state.fields.map((item) => (
                <StyledTableCell width={`${state.percentW}%`} key={item}>
                  {item.toUpperCase()}
                </StyledTableCell>
              ))}
          </StyledTableRow>
        </TableHead>

        <TableBody>
          {state.dataShow &&
            state.dataShow.map((dataRow, index) => (
              <StyledTableRow key={index}>
                {state.fields.map((f) =>
                  f === "Controls" ? (
                    <StyledTableCell key={f}>
                      <Box
                        justifyContent="space-between"
                        alignContent="center"
                        alignItems="center"
                        display="flex"
                        flexDirection="row"
                        alignSelf="center"
                      >
                        {renderControl(dataRow)}
                      </Box>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell size="small" key={f}>
                      {dataRow[f]}
                    </StyledTableCell>
                  )
                )}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      {rowsPerPage && (
        <Pagination
          count={state.count}
          onChange={handleChangePage}
          variant="outlined"
        />
      )}

      {/* <TablePagination
        // rowsPerPageOptions={[rowsPerPage]}
        // component="div"
        // count={dataSource.length}
        // rowsPerPage={rowsPerPage}
        // // page={state.page}
        // onChangePage={handleChangePage}
        ActionsComponent={({ count, rowsPerPage, onChangePage }) => (
          <Pagination
            count={Math.ceil(count / rowsPerPage)}
            onChange={handleChangePage}
            variant="outlined"
          />
        )}
      /> */}
    </Box>
  );
};

export default MTableMaterial;
