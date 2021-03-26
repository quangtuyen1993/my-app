import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";

import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";

export const YEAR = "year";
export const MONTH = "month";

export default function MYearMonthPicker({ type, showControl }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = React.useState({
    type: YEAR,
  });

  useEffect(() => {
    if (type !== undefined) {
      setState({ type: type });
    }
    console.log(type);
  }, [type]);

  const handleTypeChange = (event) => {
    setState((pre) => {
      return {
        ...pre,
        type: event.target.value,
      };
    });
  };

  const onHandleDateChange = (date, value) => {
    handleDateChange(date, value);
  };

  const renderFormControl = () => {
    if (showControl) {
      return (
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel color="primary" component="legend" filled>
              View
            </FormLabel>
            <RadioGroup
              row
              aria-label="view"
              name="view"
              value={state.type}
              onChange={handleTypeChange}
            >
              <FormControlLabel value={YEAR} control={<Radio />} label="Year" />
              <FormControlLabel
                value={MONTH}
                control={<Radio />}
                label="Month"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {renderFormControl()}
        <Grid item>
          <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="dialog"
              autoOk={true}
              openTo="year"
              views={state.type === YEAR ? ["year"] : ["month"]}
              label={state.type === YEAR ? "Year" : "Month"}
              helperText="Choose date"
              value={selectedDate}
              inputVariant="outlined"
              onChange={onHandleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </div>
  );
}
MYearMonthPicker.propTypes = {
  // types: PropTypes.oneOf(["year", "month"]),
};
