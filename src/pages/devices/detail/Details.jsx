import {
  Card,
  CardContent,
  Chip,
  Container,
  fade,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import ColorsApp from "../../../common/colors";
import IconApp from "../../../common/icons";
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

export default function DetailScreen(props) {
  let location = useLocation();
  const theme = useTheme();
  const timer = useRef(null);
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const history = useHistory();

  const [state, setState] = useState({
    mttp: [],
    phases: [],
    general: [],
    deviceId: "",
    stationSelected: -1,
    temp: {},
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
      history.goBack();
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
        } else {
          filterGeneral(f, obj,general);
        }
      });

      var generalShow = [].concat(general).sort((a, b) => {
        return a.type.priority > b.type.priority ? 1 : -1;
      });

      setState((pre) => ({
        ...pre,
        mttp: mppt,
        phases: phases,
        general: generalShow,
      }));
    };

    if(timer.current!==undefined) clearInterval(timer.current)

    onFetchData();
    timer.current = setInterval(() => {
      onFetchData();
    }, 10000);



    return (()=>{
      clearInterval(timer.current)
    })

  }, [state.deviceId]);

  return (
    <Container disableGutters direction="row" maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CardLayout title="General Info">
            <Grid
              container
              spacing={2}
              direction="row"
              justify="space-around"
              alignItems="stretch"
              style={{ display: "flex" }}
            >
              {state.general.map((item, index) => {
                return (
                  <Grid key={index} item xs={12} sm={6} md={3} lg={3}>
                    <Card variant="outlined" style={{ height: "100%" }}>
                      <CardContent>
                        <Grid container spacing={2} alignContent="stretch">
                          <Grid item xs={12} md={12} lg={12}>
                            <Typography variant="body1">
                              {item.type.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="body2">
                              {item.value}
                            </Typography>
                          </Grid>
                          {item.type.showProgress && (
                            <Grid item xs={12} md={12} lg={12}>
                              <BorderLinearProgress
                                variant="determinate"
                                value={50}
                              />
                            </Grid>
                          )}
                        </Grid>
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

const filterGeneral = (f, obj, general) => {
  var infoType = null;
  if (f.includes("total_dc_power")) {
    infoType = {
      type: GENERAL_TYPE.DC_INPUT,
    };
  } else if (f.includes("total_active_power")) {
    infoType = {
      type: GENERAL_TYPE.AC_OUTPUT,
    };
  } else if (f.includes("internal_temperature")) {
    infoType = {
      type: GENERAL_TYPE.INTERNAL_TEMP,
    };
  } else if (f.includes("total_reactive_power")) {
    infoType = {
      type: GENERAL_TYPE.TOTAL_ENERGY_PRODUCTION,
    };
  } else if (f.includes("grid_frequency")) {
    infoType = {
      type: GENERAL_TYPE.FREQUENCY,
    };
  } else if (f.includes("daily_power_yields")) {
    infoType = {
      type: GENERAL_TYPE.ENERGY_TO_DAY,
    };
  } else if (f.includes("monthly_power_yields")) {
    infoType = {
      type: GENERAL_TYPE.ENERGY_THIS_MONTH,
    };
  } else if (f.includes("total_power_yields")) {
    infoType = {
      type: GENERAL_TYPE.ENERGY_THIS_YEAR,
    };
  }
  if (infoType === null) return;
  general.push({
    ...infoType,
    value: obj[f],
  });
};
const GENERAL_TYPE = Object.freeze({
  DC_INPUT: {
    name: "DC_INPUT",
    priority: 1,
    icon: IconApp.DASHBOARD,
  },
  AC_OUTPUT: {
    name: "DC_OUTPUT",
    priority: 2,
    icon: IconApp.DASHBOARD,
  },
  FREQUENCY: {
    name: "FREQUENCY",
    priority: 3,
    icon: IconApp.DASHBOARD,
  },
  INTERNAL_TEMP: {
    name: "INTERNAL TEMP",
    priority: 4,
    icon: IconApp.DASHBOARD,
  },
  ENERGY_TO_DAY: {
    name: "ENERGY TO DAY",
    showProgress: true,
    priority: 5,
    icon: IconApp.DASHBOARD,
  },
  ENERGY_THIS_MONTH: {
    name: "ENERGY THIS MONTH",
    showProgress: true,
    priority: 6,
    icon: IconApp.DASHBOARD,
  },
  ENERGY_THIS_YEAR: {
    name: "ENERGY THIS YEAR",
    showProgress: true,

    priority: 7,
    icon: IconApp.DASHBOARD,
  },
  TOTAL_ENERGY_PRODUCTION: {
    name: "TOTAL ENERGY PRODUCTION",
    priority: 8,
    icon: IconApp.DASHBOARD,
  },
});
