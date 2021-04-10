import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React from "react";
const StyledTableCell = withStyles((theme) => ({
  root: {
    border: "1px solid black",
  },
  head: {},
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function MTableInfo({
  bodyRows,
  bodyFooter,
  bodyLabel,
}) {
  return (
    <div>
      <Table>
        <TableHead>
          <StyledTableRow>
            {bodyLabel.map((item, index) =>
              index === 0 ? (
                <StyledTableCell key={index}>{item}</StyledTableCell>
              ) : (
                <StyledTableCell key={index} colSpan={2}>
                  {item}
                </StyledTableCell>
              )
            )}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {bodyRows.map((item, index) => (
            <StyledTableRow key={index}>
              {item.map((row, i) => (
                <StyledTableCell key={i}>{row}</StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
          {bodyFooter.map((item, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell colSpan={3}>{item}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
