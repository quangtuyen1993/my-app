import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const TYPE_DATE = "dd/MM/yyyy";
export const TYPE_HOUR_DATE = "dd/MM/yyyy HH:mm:ss";

export default function MDateTimePicker(props) {
  const [selectedFrom, handleDateFromChange] = useState(
    new Date().setHours(0, 0, 0)
  );
  const [selectedTo, handleDateToChange] = useState(
    new Date().setHours(23, 59, 59)
  );
  const [isSingleDate, setIsSingleDate] = useState(false);

  const [typeFormat, setTypeFormat] = useState(TYPE_DATE);

  useEffect(() => {
    if (props.isSingleDate !== undefined) {
      setIsSingleDate(props.isSingleDate);
    }
  }, [props.isSingleDate]);

  useEffect(() => {
    if (props.typeFormat !== undefined) {
      setTypeFormat(props.typeFormat);
    }
  }, [props.typeFormat]);

  useEffect(() => {
    if (props.onRangeDateChange !== undefined) {
      var dateFrom = moment(selectedFrom).format("yyyy-MM-DD HH:mm:ss");
      var dateTo = moment(selectedTo).format("yyyy-MM-DD HH:mm:ss");
      props.onRangeDateChange({
        name: props.name,
        value: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
      });
    }
  }, [selectedFrom, selectedTo]);

  const onDateChangeFrom = (date, value) => {
    handleDateFromChange(date, value);
  };

  const onDateChangeTo = (date, value) => {
    if (isSingleDate) {
      onDateChangeFrom(date, value);
    }
    handleDateToChange(date, value);
  };

  const renderFromDate = () => {
    if (!isSingleDate) {
      return (
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <KeyboardDateTimePicker
            label="From date"
            inputVariant="outlined"
            fullWidth
            variant="dialog"
            onChange={onDateChangeFrom}
            value={selectedFrom}
            format={typeFormat}
          />
        </Grid>
      );
    }
    return <div />;
  };

  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
        <Grid container spacing={2}>
          {renderFromDate()}
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <KeyboardDateTimePicker
              okLabel="Done"
              label={isSingleDate ? "Pick date" : "To Date"}
              inputVariant="outlined"
              fullWidth
              onChange={onDateChangeTo}
              variant="dialog"
              value={selectedTo}
              format={typeFormat}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </>
  );
}
MDateTimePicker.propTypes = {
  onChangeDateFrom: PropTypes.func,
  onChangeDateTo: PropTypes.func,
  isSingleDate: PropTypes.bool,
  onRangeDateChange: PropTypes.func,
  name: PropTypes.string,
};
