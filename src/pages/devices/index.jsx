import { Chip, Container, Grid } from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
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
        stationSelected.id
      );
      setState((pre) => ({
        ...pre,
        Inverters: inverters,
      }));
    };

    const onFetchSensorService = async () => {
      var sensors = await DeviceService.fetchAllSensor(stationSelected.id);
      console.info(sensors);
      setState((pre) => ({
        ...pre,
        Sensors: sensors,
      }));
    };

    if (interval !== null) {
      clearInterval(interval.current);
    }

    const onFetchPowerMeter = async () => {
      var powerMeters = await DeviceService.fetchAllPowerMeter(
        stationSelected.id
      );
      console.info("POWER", powerMeters);
      setState((pre) => ({
        ...pre,
        Power_meters: powerMeters,
      }));
    };

    const onFetchMCCB = async () => {
      var mccbs = await DeviceService.fetchAllMCCB(stationSelected.id);
      console.log(mccbs);
    };

    onFetchData();
    onFetchSensorService();
    onFetchPowerMeter();
    onFetchMCCB();
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
                <CardLayout icon={IconApp.TABLE} title="Inverters">
                  <TableApp
                    data={state.Inverters}
                    chipField={["state"]}
                    field={["name", "state"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    showLink={true}
                    path="/device/inverter"
                    chipComponent={(item, f) => {
                      var color = "";

                      switch (item[f]) {
                        case "danger":
                          color = red[500];
                          break;
                        default:
                          color = green[500];
                      }
                      return (
                        <Chip
                          label={item[f]}
                          style={{
                            backgroundColor: color,
                            color:"white"
                          }}
                        />
                      );
                    }}
                    maxLength={Math.max(
                      state.Inverters.length,
                      state.MCCB_ABC.length
                    )}
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="MCCB_ABC">
                  <TableApp
                    maxLength={Math.max(
                      state.Inverters.length,
                      state.MCCB_ABC.length
                    )}
                    data={state.MCCB_ABC}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status"]}
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout icon={IconApp.TABLE} title="POWER_METER">
                  <TableApp
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
                    data={state.Sensors}
                    chipField={["status"]}
                    field={["name", "status"]}
                    fieldTitle={["Name", "Status"]}
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
