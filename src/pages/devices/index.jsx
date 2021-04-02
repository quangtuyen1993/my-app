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
    POWER_METER: [],
    Sensors: [],
  });

  useEffect(() => {
    const onFetchData = async () => {
      var inverters = await DeviceService.fetchAllDevice(stationSelected);
      setState((pre) => ({
        ...pre,
        Inverters: inverters,
      }));
    };
    if (interval !== null) {
      clearInterval(interval.current);
    }
    onFetchData();
    interval.current = setInterval(() => {
      onFetchData();
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

          {/* <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="POWER_METER">
                  <TableApp
                    data={state.POWER_METER}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status", "Operate"]}
                    showLink={true}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CardLayout title="Sensors">
                  <TableApp
                    data={state.Sensors}
                    chipField={["Status"]}
                    field={["Name", "Status"]}
                    fieldTitle={["Name", "Status"]}
                    path="/device"
                  />
                </CardLayout>
              </Grid>
            </Grid>
          </Grid> */}
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

