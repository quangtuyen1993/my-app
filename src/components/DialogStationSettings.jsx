import {
  Box,
  Checkbox,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import { Person, SupervisorAccount } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MTableMaterial from "../components/MTableMaterial";
import { fetchStation } from "../redux/feature/station/station.slice";
import StationService from "../service/station.service";
// eslint-disable-next-line no-unused-vars

const initState = {
  stations: [],
};
export default function DialogStationSettings({
  userDefault,
  handleClose,
  open,
}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.authorReducer);
  const [state, setState] = useState(initState);

  const refreshStation = () => {
    if (userDefault.id === userProfile.id) dispatch(fetchStation());
  };

  useEffect(() => {
    setState((pre) => ({
      ...pre,
      open: open,
    }));
  }, [open, setState]);

  useEffect(() => {
    if (userDefault === null) return;
    const fetchStationAvailable = async () => {
      var data = await StationService.getStationUser({
        accountId: userDefault.id,
      });
      setState((pre) => ({
        ...pre,
        stations: data,
      }));
    };
    fetchStationAvailable();
  }, [userDefault]);

  const onChange = (e) => {
    const { checked, value } = e.target;
    let stations = [...state.stations];
    stations.forEach((element, index) => {
      if (element.stationId === Number(value)) {
        var item = element;
        item.isSelected = checked;
        stations[index] = item;
      }
    });
    setState((pre) => ({
      ...pre,
      stations: [...stations],
    }));
  };

  const onUpdateStation = async () => {
    await StationService.updateStationAvailable(state.stations);
    refreshStation();
    onClose();
  };

  const onClose = () => {
    setState(initState);
    handleClose();
  };

  const enAble = {
    name: "Enable",
    component: (item, index) => (
      <Box
        key={index}
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        alignSelf="center"
      >
        <Checkbox
          value={item.stationId}
          checked={item.isSelected}
          onChange={onChange}
          size="medium"
        />
      </Box>
    ),
  };

  return (
    <>
      <Dialog fullWidth maxWidth={"xs"} open={open}>
        <form>
          <DialogTitle
            disableTypography
            style={{ backgroundColor: theme.palette.primary.main }}
            id="max-width-dialog-title"
          >
            <Typography variant="h6">Update Client Station</Typography>
          </DialogTitle>

          <DialogContent
            style={{ paddingTop: theme.spacing(2), maxHeight: "80vh" }}
          >
            <Grid wrap="nowrap" spacing={2} container direction="column">
              <Grid item>
                <TextField
                  value={userDefault ? userDefault.username : ""}
                  label="Username"
                  fullWidth
                  name="username"
                  variant="outlined"
                  placeholder="Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={userDefault ? userDefault.role : ""}
                  label="Role"
                  fullWidth
                  name="role"
                  variant="outlined"
                  placeholder="role"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SupervisorAccount color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item>
                <MTableMaterial
                  dataSource={state.stations}
                  fieldArray={["stationId", "name"]}
                  addControlColumns={[enAble]}
                />
              </Grid>{" "}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={onUpdateStation}
              color="primary"
            >
              Apply
            </Button>

            <Button variant="outlined" onClick={onClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

DialogStationSettings.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
};
