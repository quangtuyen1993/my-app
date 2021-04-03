import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
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
import IconApp from "../../../common/icons";
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
    borderRadius: "3px",
    paddingTop: "5px",
    paddingBottom: "5px",
    backgroundColor: theme.palette.primary.main,
    paddingLeft: "5px",
    paddingRight: "5px",
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
      <Grid
        container
        justify="center"
        alignContent="center"
        alignItems="center"
        className={classes.chip}
        onClick={handleOpen}
      >
        <Grid item>
          <IconNotify
            chipColor={theme.palette.primary.main}
            tooltip={
              stations.find((item) => item.id === stationSelected)
                ? stations.find((item) => item.id === stationSelected).name
                : "None"
            }
          />
        </Grid>
        <Grid item>
          <Box display={{ xs: "none", sm: "none", md: "flex", lg: "flex" }}>
            <Box>
              {stations.length !== 0 && (
                <Typography style={{ textAlign: "center" }} variant="subtitle1">
                  {stations.find((item) => item.id === stationSelected).name}
                </Typography>
              )}
            </Box>

            <Box
              ml={1}
              display="flex"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
            >
              <FontAwesomeIcon icon={IconApp.ARROW_DOWN} />
            </Box>
          </Box>
        </Grid>
      </Grid>

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
