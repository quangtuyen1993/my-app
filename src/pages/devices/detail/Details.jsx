import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  fade,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
  withStyles
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ColorsApp from "../../../common/colors";
import CardLayout from "../../../common/layouts/CardLayout";
import TableApp from "../../../components/TableApp";
import DeviceService from "../../../service/device.service";
import { CookieManger } from "../../../utils/CookieManager";
import PowerTrend from "../../dashboards/components/PowerTrend";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const filterMPPT = (f, obj, mppt) => {
  var res = f.toString().split(/(_\d+_)/);
  var current = "";
  var voltage = "";
  var key = "MPPT" + res[1].toString().replaceAll("_", "");
  var mpt = mppt.find((e) => e.name === key);
  if (mpt === undefined) {
    mpt = {
      name: key,
      current: current,
      voltage: voltage,
    };
    mppt.push(mpt);
  }
  if (f.toString().includes(`_current`)) {
    mpt.current = obj[f];
  } else if (f.toString().includes(`_voltage`)) {
    mpt.voltage = obj[f];
  }
};

const filterPhase = (f, obj, phases) => {
  var nameByVoltage = f.toString().match(/^([a|b|c]._)/g);
  var nameByCurrent = f.toString().match(/(phase)_./);
  if (nameByVoltage === null && nameByCurrent === null) return;
  var name = "";
  if (nameByVoltage !== null) {
    name = "phase " + nameByVoltage[0].toString().charAt(0);
  } else {
    name = nameByCurrent[0].toString().replace("_", " ");
  }

  var endLength = name.length - 1;
  var type = name[endLength].toLocaleUpperCase();
  name =
    name.charAt(0).toUpperCase() +
    name.slice(1, endLength) +
    name.charAt(endLength).toUpperCase();
  var phase = phases.find((p) => p.name === name);
  if (phase === undefined) {
    phase = {
      name: name,
      current: "",
      voltage: "",
      type: type,
    };
    phases.push(phase);
  }

  if (nameByVoltage !== null) {
    phase.voltage = obj[f];
  } else {
    phase.current = obj[f];
  }
};
export default function DetailScreen(props) {
  let location = useLocation();

  const theme = useTheme();
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const history = useHistory();

  const [state, setState] = useState({
    mttp: [],
    phases: [],
    general: [],
    deviceId: "",
    stationSelected: -1,
  });

  useEffect(() => {
    if (stationSelected !== undefined) {
      setState((pre) => ({
        ...pre,
        stationSelected: stationSelected,
      }));
    }
    if (
      state.stationSelected !== -1 &&
      state.stationSelected !== stationSelected
    ) {
      history.goBack()
    }
  }, [history, state.stationSelected, stationSelected]);
  useEffect(() => {
    let { deviceId } = location;
    if (deviceId === undefined) {
      deviceId = CookieManger.getCurrentDevice();
    } else {
      CookieManger.revokeCurrentDevice();
      CookieManger.setCurrentDevice(deviceId);
    }
    console.log("device", deviceId);
    setState((pre) => ({
      ...pre,
      deviceId: deviceId,
    }));
  }, [location]);

  useEffect(() => {
    if (state.deviceId === "" || state.deviceId === undefined) return;
    const onFetchData = async () => {
      var mppt = [];
      var phases = [];
      var general = [];
      var obj = await DeviceService.fetchDeviceDetail(state.deviceId);
      var fields = Object.keys(obj);
      fields.forEach((f) => {
        if (f.includes("mppt") || f.includes("mptt")) {
          filterMPPT(f, obj, mppt);
        } else if (
          f.includes("ab", 0) ||
          f.includes("bc", 0) ||
          f.includes("ca", 0) ||
          f.includes("phase")
        ) {
          filterPhase(f, obj, phases);
        } else if (
          f.includes("total_dc_power") ||
          f.includes("total_active_power") ||
          f.includes("total_reactive_power") ||
          f.includes("grid_frequency") ||
          f.includes("daily_power_yields") ||
          f.includes("monthly_power_yields") ||
          f.includes("internal_temperature") ||
          f.includes("total_power_yields")
        ) {
          general.push({
            name:
              f.charAt(0).toLocaleUpperCase() + f.slice(1).replaceAll("_", " "),
            value: obj[f],
          });
        }
      });
      setState((pre) => ({
        ...pre,
        mttp: mppt,
        phases: phases,
        general: general,
      }));
    };
    onFetchData();
  }, [state.deviceId]);

  return (
    <Container disableGutters direction="row" maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CardLayout title="General Info">
            <Grid container spacing={2}>
              {state.general.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      borderRadius="5px 5px 0 0"
                      paddingLeft={2}
                      style={{ background: theme.palette.secondary.main }}
                    >
                      <Typography variant="h6">{item.name}</Typography>
                    </Box>
                    <Card variant="outlined">
                      <CardContent>
                        {/* <BorderLinearProgress
                          variant="determinate"
                          value={50}
                        /> */}
                        <Typography variant="body2">{item.value}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardLayout>
        </Grid>

        <Grid item sm={12}>
          <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="DC Input">
                <TableApp
                  showIndex={true}
                  data={state.mttp}
                  fieldTitle={["DC", "Voltage", "Current"]}
                  field={["name", "voltage", "current"]}
                />
              </CardLayout>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="DC OutPut">
                <TableApp
                  showIndex={true}
                  chipField={["name"]}
                  chipComponent={(item, f) => {
                    var color;
                    if (item.type === "A") {
                      color = ColorsApp.POWER_LIGHT;
                    } else if (item.type === "B") {
                      color = ColorsApp.ENERGY;
                    } else {
                      color = ColorsApp.RUNNING;
                    }
                    return (
                      <Chip
                        label={item.name}
                        style={{ backgroundColor: fade(color, 1) }}
                      />
                    );
                  }}
                  data={state.phases}
                  fieldTitle={["AC", "Voltage", "Current"]}
                  field={["name", "voltage", "current"]}
                />
              </CardLayout>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12}>
          <PowerTrend />
        </Grid>
      </Grid>
    </Container>
  );
}

