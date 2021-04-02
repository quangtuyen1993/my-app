import { Container, Grid } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardLayout from "../../common/layouts/CardLayout";
import TableApp from "../../components/TableApp";
import DeviceService from "../../service/device.service";

export default function DeviceScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);

  const interval = useRef(null);

  const [state, setState] = useState({
    Inverters: [],
    MCCB_ABC: [],
    Power_meters: [],
    Sensors: [],
  });

  useEffect(() => {
    const onFetchData = async () => {
      var inverters = await DeviceService.fetchAllInverterDevice(
        stationSelected
      );
      setState((pre) => ({
        ...pre,
        Inverters: inverters,
      }));
    };

    const onFetchSensorService = async () => {
      var sensors = await DeviceService.fetchAllSensor(stationSelected);
      setState((pre) => ({
        ...pre,
        Sensors: sensors,
      }));
    };

    if (interval !== null) {
      clearInterval(interval.current);
    }

    const onFetchPowerMeter = async () => {
      var powerMeters = await DeviceService.fetchAllPowerMeter(stationSelected);
      console.log(powerMeters);
      setState((pre) => ({
        ...pre,
        Power_meters: powerMeters,
      }));
    };

    onFetchData();
    onFetchSensorService();
    onFetchPowerMeter();


    interval.current = setInterval(() => {
      onFetchData();
      onFetchSensorService();
      onFetchPowerMeter();
    }, 10000);
    return () => {
      clearInterval(interval.current);
    };
  }, [stationSelected]);

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="Inverters">
                  <TableApp
                    data={state.Inverters}
                    chipField={["state"]}
                    field={["name", "state"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    showLink={true}
                    showIndex={true}
                    path="/device"
                    maxLength={Math.max(
                      state.Inverters.length,
                      state.MCCB_ABC.length
                    )}
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="MCCB_ABC">
                  <TableApp
                    maxLength={Math.max(
                      state.Inverters.length,
                      state.MCCB_ABC.length
                    )}
                    data={state.MCCB_ABC}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status"]}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="POWER_METER">
                  <TableApp
                    showIndex={true}
                    data={state.Power_meters}
                    chipField={["status"]}
                    field={["name", "status"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    showLink={true}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="Sensors">
                  <TableApp
                    showIndex={true}
                    data={state.Sensors}
                    chipField={["sensorType"]}
                    field={["name", "sensorType"]}
                    fieldTitle={["Name", "Status"]}
                    path="/device"
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

const createItem = (
  id,
  logInterval,
  manufacturer,
  maxPower,
  model,
  nominalPower,
  state,
  stateBackground,
  stationId,
  tagPrefix
) => {
  return {
    logInterval,
    manufacturer,
    maxPower,
    model,
    nominalPower,
    state,
    stateBackground,
    stationId,
    tagPrefix,
  };
};
