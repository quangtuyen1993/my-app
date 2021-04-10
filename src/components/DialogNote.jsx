import DateFnsUtils from "@date-io/date-fns";
import { Box, Grid, TextareaAutosize, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SchedulerService from "../service/scheduler.service";
import ConfirmDialog from "./ConfirmDialog";

const initialState = {
  id: "",
  stationSelected: null,
  accountId: "",
  content: "",
  mode: "Insert",
  status: 0,
};
export const TYPE_HOUR_DATE = "dd/MM/yyyy HH:mm:ss";
export default function DialogNote({
  noteDefault,
  handleClose,
  open,
  onComplete,
}) {
  const theme = useTheme();
  const [state, setState] = useState(initialState);

  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { id: accountId } = useSelector(
    (state) => state.authorReducer.userProfile
  );

  const [dateFrom, handleDateFromChange] = useState(
    new Date().setHours(0, 0, 0)
  );
  const [dateTo, handleDateToChange] = useState(
    new Date().setHours(23, 59, 59)
  );

  const handleInputChange = (e) => {
    setState((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleClose = () => {
    setState(initialState);
    handleClose();
  };

  //init update
  useEffect(() => {
    if (noteDefault === undefined) return;
    if (noteDefault.id === undefined) {
      setState((pre) => ({
        ...pre,
        mode: "Insert",
      }));
      return;
    }
    setState((pre) => ({
      ...pre,
      id: noteDefault.id,
      content: noteDefault.content,
      mode: "Update",
    }));

    handleDateFromChange(moment.utc(noteDefault.startTime));
    handleDateToChange(moment.utc(noteDefault.endTime));
  }, [noteDefault]);

  const onInsertScheduler = async () => {
    var dT = moment.utc(dateTo).format("yyyy-hh-DDThh:mm:ss");
    var dF = moment.utc(dateFrom).format("yyyy-hh-DDThh:mm:ss");
    var data = await SchedulerService.insert({
      stationId: stationSelected.id,
      accountId: accountId,
      startTime: dF,
      endTime: dT,
      content: state.content,
    });
    onComplete(data);
  };

  const onUpdateScheduler = async () => {
    var dT = moment.utc(dateTo).format("yyyy-hh-DDThh:mm:ss");
    var dF = moment.utc(dateFrom).format("yyyy-hh-DDThh:mm:ss");
    var data = await SchedulerService.update({
      id: state.id,
      stationId: stationSelected.id,
      accountId: accountId,
      startTime: dF,
      endTime: dT,
      content: state.content,
    });
    onComplete(data);
  };

  const onSubmit = async () => {
    state.mode === "Insert" ? onInsertScheduler() : onUpdateScheduler();
    setState(initialState);
    handleClose();
  };

  return (
    <>
      <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
        <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleClose}>
          <form>
            <DialogTitle
              disableTypography
              style={{ backgroundColor: theme.palette.primary.main }}
              id="max-width-dialog-title"
            >
              <Typography variant="h6">
                {state.mode === "Insert" ? "Create Task" : "Update Task"}
              </Typography>
            </DialogTitle>

            <DialogContent>
              <Box p={2}>
                <Grid spacing={2} container direction="column">
                  <Grid item>
                    <KeyboardDateTimePicker
                      label="Start Date"
                      value={dateFrom}
                      onChange={handleDateFromChange}
                      okLabel="Done"
                      format={TYPE_HOUR_DATE}
                      inputVariant="outlined"
                      fullWidth
                      variant="dialog"
                    />
                  </Grid>

                  <Grid item>
                    <KeyboardDateTimePicker
                      label="End Date"
                      value={dateTo}
                      onChange={handleDateToChange}
                      okLabel="Done"
                      format={TYPE_HOUR_DATE}
                      inputVariant="outlined"
                      fullWidth
                      variant="dialog"
                    />
                  </Grid>

                  <Grid item lg={12}>
                    <TextareaAutosize
                      style={{ width: "100%" }}
                      rowsMin={6}
                      value={state.content}
                      onChange={handleInputChange}
                      rowsMax={12}
                      aria-label="Content"
                      placeholder="Enter content"
                      name="content"
                    />
                  </Grid>
                  <Grid item>
                    {/* <TextField
                    autoFocus
                    label="Password"
                    fullWidth
                    name="password"
                    inputRef={register({
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password have to least 6 character",
                      },
                    })}
                    variant="outlined"
                    error={errors.password ? true : false}
                    placeholder="Update Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                      {errors.password.message}
                    </Typography>
                  )} */}
                  </Grid>
                  {/* <Grid item>
                  <TextField
                    autoFocus
                    label="Confirm Password"
                    fullWidth
                    name="confirmPassword"
                    inputRef={register({
                      required: "confirm is require",
                      validate: (value) => value === watch("password"),
                    })}
                    variant="outlined"
                    error={errors.confirmPassword ? true : false}
                    placeholder="Update Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {errors.confirmPassword && (
                    <Typography variant="subtitle2" style={{ color: "red" }}>
                      {errors.confirmPassword.message}
                    </Typography>
                  )}
                </Grid> */}
                </Grid>
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="outlined" onClick={onSubmit} color="primary">
                Apply
              </Button>

              <Button
                variant="outlined"
                onClick={onHandleClose}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </MuiPickersUtilsProvider>
    </>
  );
}

DialogNote.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
};
