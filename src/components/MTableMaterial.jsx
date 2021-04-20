import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { ExpandLess, Search } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import React, { Fragment, useEffect, useState } from "react";
import { getColorCell } from "../common/colors";
import StringUtils from "../utils/StringConvert";

const StyledTableCell = withStyles((theme) => ({
  root: {
    // border: `1px solid ${grey[300]}`,
  },
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  body: {
    fontSize: 12,
    textAlign: "center",
    maxHeight: "20px",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  cellBorder: (props) => ({
    border: props.noneBorder ? "0x white" : `1px solid ${grey[300]}`,
  }),
}));

const MTableMaterial = ({
  dataSource,
  fieldArray,
  addControlColumns,
  rowsPerPage,
  showSearch,
  addControlFirst,
  refresh,
  askAll,
  showIndex,
  multiColor,
  isHover,
  contentField,
  noneBorder,
}) => {
  const [state, setState] = useState({
    renderControl: null,
    percentW: 0,
    page: 1,
    dataShow: [],
    emptyRows: 0,
    count: 1,
    additionalFields: [],
    search: "",
    listComponentBody: [],
  });
  const theme = useTheme();
  const classes = useStyles({ noneBorder });
  useEffect(() => {
    var additionalFields = [];
    if (addControlColumns) {
      addControlColumns.forEach((item) => {
        additionalFields.push(item.name);
      });
    }
    var colIndex = showIndex ? 1 : 0;
    var sumCols = additionalFields.length + fieldArray.length + colIndex;
    var w = Math.round(100 / sumCols);
    setState((pre) => ({
      ...pre,
      additionalFields: additionalFields,
      percentW: w,
    }));
  }, [addControlColumns, fieldArray, showIndex]);

  //pagination
  useEffect(() => {
    var mPerPage = rowsPerPage ? rowsPerPage : dataSource.length;
    var startIndex = (state.page - 1) * mPerPage;
    var endIndex = state.page * mPerPage;
    if (dataSource === undefined) return;
    var dataFilter = dataSource.filter((item) => {
      if (state.search === "") return true;
      return fieldArray.find((f) => {
        if (typeof item[f] === "string") {
          return item[f].toUpperCase().includes(state.search.toUpperCase());
        }
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

  const renderControl = (user, index) => {
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
    <>
      <Grid container spacing={2} direction="column">
        {/* Utils Bar */}
        <Grid item lg={12} md={12} sm={12}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              lg={3}
              sm={12}
              xs={12}
              md={6}
              style={{
                display: "flex",
                flexGrow: 2,
              }}
            >
              {showSearch && (
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  name="search"
                  fullWidth
                  value={state.search}
                  onChange={handleChangeText}
                  label="Search"
                  variant="outlined"
                  holder="search"
                />
              )}
            </Grid>
            {refresh && (
              <Grid
                onClick={() => {
                  refresh();
                }}
                item
                xs={6}
                sm={6}
                md={3}
                lg={2}
              >
                <Button fullWidth color="secondary" variant="contained">
                  Refresh
                </Button>
              </Grid>
            )}

            {askAll && (
              <Grid
                onClick={() => {
                  askAll();
                }}
                item
                xs={6}
                sm={6}
                md={3}
                lg={2}
              >
                <Button fullWidth color="secondary" variant="contained">
                  Ack all
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* table */}
      {/* <Grid item> */}
      <Box mt={2} overflow="auto">
        <Table style={{ border: "1px rgba(0,0,0,0.4) solid" }}>
          <TableHead>
            <StyledTableRow>
              {showIndex && (
                <StyledTableCell
                  className={classes.cellBorder}
                  width={`${state.percentW}%`}
                >
                  #
                </StyledTableCell>
              )}
              {addControlFirst &&
                addControlFirst &&
                state.additionalFields &&
                state.additionalFields.map((field, index) => (
                  <StyledTableCell
                    className={classes.cellBorder}
                    width={`${state.percentW}%`}
                    key={index}
                  >
                    {StringUtils.convertCamelToTextNormal(field)}
                  </StyledTableCell>
                ))}

              {fieldArray.map(
                (item, index) =>
                  item !== contentField && (
                    <StyledTableCell
                      className={classes.cellBorder}
                      width={`${state.percentW}%`}
                      key={index}
                    >
                      {StringUtils.convertCamelToTextNormal(item)}
                    </StyledTableCell>
                  )
              )}

              {!addControlFirst &&
                state.additionalFields &&
                state.additionalFields.map((item, index) => (
                  <StyledTableCell
                    className={classes.cellBorder}
                    width={`${state.percentW}%`}
                    key={index}
                  >
                    {StringUtils.convertCamelToTextNormal(item)}
                  </StyledTableCell>
                ))}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {state.dataShow &&
              state.dataShow.map((dataRow, index) => (
                <Fragment key={index}>
                  <StyledTableRow
                    key={index}
                    style={{
                      backgroundColor: multiColor
                        ? getColorCell(dataRow.name)
                        : isHover
                        ? index % 2 === 0 && theme.palette.action.hover
                        : "white",
                    }}
                  >
                    {showIndex && (
                      <StyledTableCell
                        className={classes.cellBorder}
                        width={`${state.percentW}%`}
                      >
                        {index + 1}
                      </StyledTableCell>
                    )}
                    {addControlFirst &&
                      state.additionalFields.map((f, index) => (
                        <StyledTableCell
                          className={classes.cellBorder}
                          key={index}
                        >
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
                    {fieldArray.map(
                      (f) =>
                        f !== contentField && (
                          <StyledTableCell
                            className={classes.cellBorder}
                            size="small"
                            key={f}
                          >
                            {f.toLowerCase().includes("date") ||
                            f.toLowerCase().includes("time")
                              ? dataRow[f].replace("T", " ")
                              : dataRow[f]}
                          </StyledTableCell>
                        )
                    )}
                    {!addControlFirst &&
                      state.additionalFields &&
                      state.additionalFields.map((f, index) => (
                        <StyledTableCell
                          className={classes.cellBorder}
                          key={index}
                        >
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
                  {contentField && (
                    <StyledTableRow>
                      <StyledTableCell
                        className={classes.cellBorder}
                        colSpan={
                          state.additionalFields?.length + fieldArray?.length
                        }
                      >
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandLess />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                          >
                            <Typography className={classes.heading}>
                              Content
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography style={{ textAlign: "start" }}>
                              {dataRow[contentField]}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </Box>
      {/* </Grid> */}

      {rowsPerPage && (
        <Box m={2}>
          <Pagination
            size="medium"
            color="secondary"
            count={state.count}
            onChange={handleChangePage}
            variant="text"
          />
        </Box>
      )}
    </>
  );
};

export default MTableMaterial;
