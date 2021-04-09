import { Chip, Container, Grid } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import TableApp from "../../components/TableApp";
import { TIMER_TABLE } from "../../const/TimerUpdateConst";
import DeviceService from "../../service/device.service";

export default function DeviceScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);

  const timer = useRef(null);

  const [state, setState] = useState({
    Inverters: [],
    MCCB_ABC: [],
    Power_meters: [],
    Sensors: [],
  });

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
                    fieldTitle={["Name", "Status", "Operate"]}
                    showLink={true}
                    path="/device/inverter"
                    chipComponent={(item, f) => {
                      return (
                        <Chip
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
                <CardLayout icon={IconApp.TABLE} title="MCCB ACB" isCap>
                  <TableApp
                    chipComponent={(item, f) => {
                      return (
                        <Chip
                          label={item[f]}
                          style={{
                            backgroundColor: item.background,
                            color: "white",
                          }}
                        />
                      );
                    }}
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
                <CardLayout icon={IconApp.TABLE} title="POWER METER">
                  <TableApp
                    chipComponent={(item, f) => {
                      return (
                        <Chip
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
                    fieldTitle={["Name", "Status", "Operate"]}
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
                    fieldTitle={["Name", "Status", "Values", "Unit"]}
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
