import {
  Box,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import StringUtils from "../utils/StringConvert";
const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "1px solid white",
  },
  head: {
    backgroundColor: theme.palette.secondary.main,
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

const useStyle = makeStyles((theme) => ({
  box: {},
}));

const MTableMaterial = ({
  dataSource,
  fieldArray,
  addControlColumns,
  rowsPerPage,
  showSearch,
}) => {
  const theme = useTheme();
  const classes = useStyle();
  const matchesDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesDownMD = useMediaQuery(theme.breakpoints.down("md"));

  const [state, setState] = useState({
    renderControl: null,
    percentW: 0,
    page: 1,
    dataShow: [],
    emptyRows: 0,
    count: 1,
    additionalFields: [],
    search: "",
  });

  useEffect(() => {
    var additionalFields = [];
    if (addControlColumns) {
      addControlColumns.forEach((item) => {
        additionalFields.push(item.name);
      });
    }
    var sumCols = additionalFields.length + fieldArray.length;
    var w = Math.round(100 / sumCols);
    setState((pre) => ({
      ...pre,
      additionalFields: additionalFields,
      percentW: w,
    }));
  }, [addControlColumns, fieldArray]);

  //pagingnation
  useEffect(() => {
    var mPerPage = rowsPerPage ? rowsPerPage : dataSource.length;
    var startIndex = (state.page - 1) * mPerPage;
    var endIndex = state.page * mPerPage;
    var dataFilter = dataSource.filter((item) => {
      if (state.search === "") return true;
      return fieldArray.find((f) => {
        return item[f].toUpperCase().includes(state.search.toUpperCase());
      });
    });
    var count = Math.ceil(dataFilter.length / rowsPerPage);
    var mDataShow = dataFilter.slice(startIndex, endIndex);

    setState((pre) => ({
      ...pre,
      dataShow: mDataShow,
      count: count,
    }));
  }, [dataSource, fieldArray, rowsPerPage, state.page, state.search]);

  const renderControl = (user) => {
    return addControlColumns.map((item, index) => item.component(user, index));
  };

  const handleChangePage = (e, newPage) => {
    setState((pre) => ({
      ...pre,
      page: newPage,
    }));
  };

  const handleChangeText = (e) => {
    setState((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box style={{ overflowX: "auto" }}>
      {showSearch && (
        <Box
          pt={1}
          mb={2}
          className={classes.box}
          style={{
            width: !matchesDownMD ? "24%" : !matchesDownSM ? "49.3%" : "100%",
          }}
        >
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            name="search"
            value={state.search}
            onChange={handleChangeText}
            fullWidth
            label="Search"
            variant="outlined"
            holder="search"
          />
        </Box>
      )}

      <Box mb={2}>
        <Table style={{ border: "1px rgba(0,0,0,0.4) solid" }}>
          <TableHead>
            <StyledTableRow>
              {fieldArray.map((item) => (
                <StyledTableCell width={`${state.percentW}%`} key={item}>
                  {StringUtils.convertCamelToTextNormal(item)}
                </StyledTableCell>
              ))}
              {state.additionalFields &&
                state.additionalFields.map((item) => (
                  <StyledTableCell width={`${state.percentW}%`} key={item}>
                    {StringUtils.convertCamelToTextNormal(item)}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {state.dataShow &&
              state.dataShow.map((dataRow, index) => (
                <StyledTableRow key={index}>
                  {fieldArray.map((f) => (
                    <StyledTableCell size="small" key={f}>
                      {dataRow[f]}
                    </StyledTableCell>
                  ))}
                  {state.additionalFields &&
                    state.additionalFields.map((f, index) => (
                      <StyledTableCell key={index}>
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
                    ))}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </Box>

      {rowsPerPage && (
        <Box m={2}>
          <Pagination
            size="large"
            color="secondary"
            count={state.count}
            onChange={handleChangePage}
            variant="text"
          />
        </Box>
      )}
    </Box>
  );
};

export default MTableMaterial;
