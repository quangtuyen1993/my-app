import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import ConfirmDialog from "../../components/ConfirmDialog";
import TableApp from "../../components/TableApp";
import { TIMER_TABLE } from "../../const/TimerUpdateConst";
import DeviceService from "../../service/device.service";

export default function DeviceScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { userProfile } = useSelector((state) => state.authorReducer);
  const theme = useTheme();
  const timer = useRef(null);

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = useState({
    Inverters: [],
    MCCB_ABC: [],
    Power_meters: [],
    Sensors: [],
    isOpenAdminDialog: false,
    isLoadingItem: false,
    itemSelected: {},
  });

  const onOpen = (item) => {
    setState((pre) => ({
      ...pre,
      itemSelected: item,
      isLoadingItem: true,
    }));
  };

  const onClose = (item) => {
    setState((pre) => ({
      ...pre,
      isOpenAdminDialog: false,
    }));
  };

  useEffect(() => {
    setState((pre) => ({
      ...pre,
      isOpenAdminDialog: true,
      isLoadingItem: false,
    }));
  }, [state.isLoadingItem]);

  useEffect(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }

    const onFetchData = async () => {
      if (stationSelected.id === undefined) return;
      var inverters = await DeviceService.fetchAllInverterDevice(
        stationSelected.id
      );
      setState((pre) => ({
        ...pre,
        Inverters: inverters,
      }));
    };

    const onFetchSensorService = async () => {
      if (stationSelected.id === undefined) return;
      var sensors = await DeviceService.fetchAllSensor(stationSelected.id);
      setState((pre) => ({
        ...pre,
        Sensors: sensors,
      }));
    };

    const onFetchPowerMeter = async () => {
      if (stationSelected.id === undefined) return;

      var powerMeters = await DeviceService.fetchAllPowerMeter(
        stationSelected.id
      );
      setState((pre) => ({
        ...pre,
        Power_meters: powerMeters,
      }));
    };

    const onFetchMCCB = async () => {
      if (stationSelected.id === undefined) return;
      var mccb = await DeviceService.fetchAllMCCB(stationSelected.id);
      setState((pre) => ({
        ...pre,
        MCCB_ABC: mccb,
      }));
    };

    onFetchData();
    onFetchSensorService();
    onFetchPowerMeter();
    onFetchMCCB();

    timer.current = setInterval(() => {
      onFetchData();
      onFetchSensorService();
      onFetchPowerMeter();
      onFetchMCCB();
    }, TIMER_TABLE);
    return () => {
      clearInterval(timer.current);
    };
  }, [stationSelected]);

  const renderControl = (item) => {
    return (
      <Box
        onClick={() => onOpen(item)}
        display="flex"
        justifyContent="center"
        justifyItems="center"
        alignSelf="center"
        ml={2}
        mr={2}
      >
        <Box
          width={smDown ? "100%" : "50%"}
          style={{
            cursor: "pointer",
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "5px",
            color: "white",
          }}
        >
          <Typography style={{ color: "white" }}>Open</Typography>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="Inverters">
                  <TableApp
                    data={state.Inverters}
                    chipField={["state"]}
                    field={["name", "state"]}
                    fieldTitle={["Name", "Status", "Action"]}
                    showLink={true}
                    path="/device/inverter"
                    chipComponent={(item, f) => {
                      return (
                        <Chip
                          size="small"
                          label={item[f]}
                          style={{
                            backgroundColor: item.stateBackground,
                            color: "white",
                          }}
                        />
                      );
                    }}
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="ACB - MCCB">
                  <TableApp
                    chipComponent={(item, f) => {
                      return (
                        <Chip
                          size="small"
                          label={item[f]}
                          style={{
                            backgroundColor: item.background,
                            color: "white",
                          }}
                        />
                      );
                    }}
                    // addControlComponent
                    addControlComponent={
                      userProfile.role === "Admin"
                        ? (item, f) => renderControl(item, f)
                        : false
                    }
                    data={state.MCCB_ABC}
                    chipField={["status"]}
                    field={["name", "status"]}
                    fieldTitle={["Name", "Status"]}
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="Power Meters">
                  <TableApp
                    chipComponent={(item, f) => {
                      return (
                        <Chip
                          size="small"
                          label={item[f]}
                          style={{
                            backgroundColor: item.background,
                            color: "white",
                          }}
                        />
                      );
                    }}
                    data={state.Power_meters}
                    chipField={["status"]}
                    field={["name", "status"]}
                    fieldTitle={["Name", "Status", "Action"]}
                    showLink={true}
                    path="/device/power_meter"
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="Sensors">
                  <TableApp
                    chipComponent={(item, f) => {
                      return (
                        <Chip
                          size="small"
                          label={item[f]}
                          style={{
                            backgroundColor: item.background,
                            color: "white",
                          }}
                        />
                      );
                    }}
                    data={state.Sensors}
                    chipField={["status"]}
                    field={["name", "status", "value", "unit"]}
                    fieldTitle={["Name", "Status", "Value", "Unit"]}
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ConfirmDialog open={state.isOpenAdminDialog} onClose={onClose} deviceDefault={state.itemSelected} />
      </Container>
    </>
  );
}
