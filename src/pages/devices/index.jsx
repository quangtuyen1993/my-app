import { Box, Chip, Container, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useCallback, useEffect, useRef, useState } from "react";
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
  // const theme = useTheme();
  const timer = useRef(null);
  const timeOut = useRef(null);

  // const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [state, setState] = useState({
    Inverters: [],
    MCCB_ABC: [],
    Power_meters: [],
    Sensors: [],
    alertState: {
      severity: "error",
      open: false,
      message: "Open ACB1 was send",
    },
    openConfirmDialog: false,
    itemSelected: {},
    updatingPassword: false,
  });

  useEffect(() => {
    if (state.alertState.open) {
      timeOut.current = setTimeout(() => {
        setState((pre) => ({
          ...pre,
          alertState: {
            ...pre.alertState,
            open: false,
          },
        }));
      }, 5000);

      return () => {
        clearTimeout(timeOut.current);
      };
    }
  }, [state.alertState]);

  const chooseItem = (item) => {
    if (timeOut.current !== null) {
      clearTimeout(timeOut.current);
    }
    setState((pre) => {
      return {
        ...pre,
        itemSelected: item,
        openConfirmDialog: true,
        alertState: {
          ...pre.alertState,
          open: false,
        },
      };
    });
  };

  useEffect(() => {
    if (state.isLoadingItem)
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

  const onSubmit = (password) => {
    setState((pre) => ({
      ...pre,
      password: password,
      openConfirmDialog: false,
      updatingPassword: true,
    }));
  };

  useEffect(() => {
    if (state.updatingPassword) {
      const sendNotifyMCCB = async () => {
        try {
          await DeviceService.mccbSendCommand({
            stationId: stationSelected.id,
            mccbAcbId: state.itemSelected.id,
            password: state.password,
          });
          setState((pre) => ({
            ...pre,
            alertState: {
              severity: "success",
              open: true,
              message: "Open was send",
            },
          }));
        } catch {
          setState((pre) => ({
            ...pre,
            alertState: {
              severity: "error",
              open: true,
              message: "Sens open fail",
            },
          }));
        }
      };
      sendNotifyMCCB();
    }
    setState((pre) => ({
      ...pre,
      updatingPassword: false,
    }));
  }, [
    state.itemSelected.id,
    state.password,
    state.updatingPassword,
    stationSelected.id,
  ]);

  const renderControl = (item) => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        justifyItems="center"
        alignSelf="center"
        ml={2}
        mr={2}
      >
        <Chip
          onClick={() => chooseItem(item)}
          size="small"
          color="secondary"
          style={{
            cursor: "pointer",
          }}
          label="Open"
        />
      </Box>
    );
  };

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <div style={{ position: "fixed", zIndex: 10000, right: 0 }}>
          <Alert
            variant="filled"
            style={{
              display: state.alertState.open ? "inline-flex" : "none",
            }}
            severity={state.alertState.severity}
          >
            {state.alertState.message} {state.itemSelected.name}
          </Alert>
        </div>

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
        <ConfirmDialog
          // onChange={onChange}
          onSubmit={onSubmit}
          value={state.password}
          name="password"
          open={state.openConfirmDialog}
        />
      </Container>
    </>
  );
}
