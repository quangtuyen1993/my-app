import DateFnsUtils from "@date-io/date-fns";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import React, { useEffect, useState } from "react";

export const YEAR = "year";
export const MONTH = "month";

export default function MYearMonthPicker({
  defaultType,
  showControl,
  onTypeChange,
  onDateChange,
  defaultDate,
}) {
  // const [selectedDate, handleDateChange] = useState(new Date());
  const [state, setState] = React.useState({
    type: YEAR,
    selectedDate: new Date(),
  });

  useEffect(() => {
    if (defaultType !== undefined) {
      setState({ type: defaultType });
    }
  }, [defaultType]);

  useEffect(() => {
    if (defaultDate) {
      setState((pre) => ({
        ...pre,
        selectedDate: defaultDate,
      }));
    }
  }, [defaultDate]);

  const handleTypeChange = (event) => {
    if (onTypeChange) onTypeChange(event.target.value);
    else
      setState((pre) => {
        return {
          ...pre,
          type: event.target.value,
        };
      });
  };

  const onHandleDateChange = (date, value) => {
    if (onDateChange) onDateChange(date, value);
  };




  const renderFormControl = () => {
    if (showControl) {
      return (
        <Grid item>
          <FormControl component="fieldset">
            <FormLabel color="primary" component="legend" filled>
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
              format={state.type === YEAR ? "yyyy" : "yyyy-MM"}
              views={state.type === YEAR ? ["year"] : ["month"]}
              label={state.type === YEAR ? "Year" : "Month"}
              value={state.selectedDate}
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
