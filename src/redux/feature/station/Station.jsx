import { Box, Typography } from "@material-ui/core";
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
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import IconNotify from "../IconNotify";
import { fetchStation, onSelected } from "./station.slice";
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
        color: "white ",
      },
    },
  },
}));

export default function Station(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { stations, stationSelected } = useSelector(
    (state) => state.stationReducer
  );

  const [state, setState] = useState({
    selected: "",
  });

  useEffect(() => {
    setState({
      selected: stationSelected,
    });
  }, [stationSelected]);

  useEffect(() => {
    dispatch(fetchStation());
  }, [dispatch]);

  const onChange = (e) => {
    setState((pre) => ({
      ...pre,
      selected: e.target.value,
    }));
  };

  const handleSelect = () => {
    dispatch(onSelected(state.selected));
    setOpen(false);
  };

  const handleCancel = () => {
    setState((pre) => ({
      ...pre,
      selected: stationSelected,
    }));
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        className={classes.chip}
        onClick={handleOpen}
        justifyContent="center"
        alignContent="center"
        display="flex"
      >
        <Box mr={1}>
          <IconNotify
            handleClickOpen={handleOpen}
            tooltip={"Current device:" + stations}
          />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          {stations.length!==0 && (
            <Typography style={{ textAlign: "center" }} variant="h6">
             {stations.find((item)=>item.id===stationSelected).name}
            </Typography>
          )}
        </Box>
      </Box>

      <Dialog fullWidth maxWidth={"xs"} open={open}>
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
                value={state.selected}
                onChange={onChange}
              >
                {stations.map((sta, index) => (
                  <MenuItem key={sta.id} value={sta.id}>
                    {sta.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelect} color="primary">
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
