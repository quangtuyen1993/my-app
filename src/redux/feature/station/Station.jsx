import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import IconNotify from "../IconNotify";
import { onSelected } from "./station.slice";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },

  chip: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      icon: {
        color: "white !importain",
      },
    },
  },
}));

export default function Station(props) {
  const { stations, stationSelected } = useSelector(
    (state) => state.stationReducer
  );

  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [state, setState] = useState({
    stations: [...stations],
    stationSelected: stationSelected,
  });

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    dispatch(onSelected(state.stationSelected));
    setOpen(false);
  };

  const handleCancel = () => {
    setState((pre)=>({
      ...pre,
      stationSelected:stationSelected
    }))
    setOpen(false);

  };

  const handleDevice = (e) => {
    setState((pre) => ({
      ...pre,
      stationSelected: e.target.value,
    }));
  };

  return (
    <>
      <IconNotify
        handleClickOpen={handleClickOpen}
        tooltip={"Current device:" + stations}
      />
      <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleSubmit}>
        <DialogTitle
          disableTypography
          style={{ backgroundColor: theme.palette.primary.main }}
          id="max-width-dialog-title"
        >
          <Typography variant="h5">Station</Typography>
        </DialogTitle>
        <DialogContent>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="max-width">Choose Device</InputLabel>
              <Select
                fullWidth
                autoFocus
                value={state.stationSelected}
                onChange={handleDevice}
              >
                {state.stations.map((sta) => (
                  <MenuItem key={sta.id} value={sta}>
                    {sta.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Open
          </Button>
          <Button onClick={handleCancel} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
