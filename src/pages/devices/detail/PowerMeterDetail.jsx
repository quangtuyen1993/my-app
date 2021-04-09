import {
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import CardLayout from "../../../common/layouts/CardLayout";
import MTableMaterial from "../../../components/MTableMaterial";
import TableApp from "../../../components/TableApp";
import DeviceService from "../../../service/device.service";
import { CookieManger } from "../../../utils/CookieManager";
import StringUtils from "../../../utils/StringConvert";

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

export default function PowerMeterDetail() {
  let location = useLocation();
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const timer = useRef(null);
  const [state, setState] = useState({
    voltage: [],
    current: [],
    activePower: [],
    reactivePower: [],
    general: [],
  });

  useEffect(() => {
    if (stationSelected !== undefined) {
      setState((pre) => ({
        ...pre,
        stationSelected: stationSelected,
      }));
    }
    if (
      state.stationSelected !== null &&
      state.stationSelected !== stationSelected
    ) {
      // navigator
    }
  }, [state.stationSelected, stationSelected]);

  //save to cookies

  useEffect(() => {
    let deviceId;
    if (location.state !== null) {
      deviceId = location.state.deviceId;
    }

    if (deviceId === undefined) {
      deviceId = CookieManger.getCurrentDevice();
    } else {
      CookieManger.revokeCurrentDevice();
      CookieManger.setCurrentDevice(deviceId);
    }
    setState((pre) => ({
      ...pre,
      deviceId: deviceId,
    }));
  }, [location.state]);
  //fetch data

  const onFetchData = useCallback(async () => {
    var pws = await DeviceService.fetchAllPowerMeterDetail(state.deviceId);
    const {
      voltage,
      current,
      activePower,
      reactivePower,
      general,
    } = parserData(pws);
    setState((pre) => ({
      ...pre,
      voltage: voltage,
      current: current,
      activePower: activePower,
      reactivePower: reactivePower,
      general: general,
    }));
  }, [state.deviceId]);
  useEffect(() => {
    onFetchData();
  }, [onFetchData]);

  useEffect(() => {
    if (timer.current !== null) clearInterval(timer.current);
    timer.current = setInterval(() => {
      onFetchData();
    }, 10000);
    return () => {
      clearInterval(timer.current);
    };
  });

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
                            <Typography variant="body1">{item.name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="body2">
                              {item.value}
                            </Typography>
                          </Grid>
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
              <CardLayout title="Voltage">
                <MTableMaterial
                  multiColor
                  showIndex
                  dataSource={state.voltage}
                  fieldArray={["name", "value"]}
                />
              </CardLayout>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="Current">
                <MTableMaterial
                  multiColor
                  showIndex
                  dataSource={state.current}
                  fieldArray={["name", "value"]}
                />
              </CardLayout>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12}>
          <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="Active Power">
                <MTableMaterial
                  multiColor
                  showIndex
                  dataSource={state.activePower}
                  fieldArray={["name", "value"]}
                />
              </CardLayout>
            </Grid>

            <Grid item lg={6} md={6} xs={12} sm={12}>
              <CardLayout title="Reactive Power">
                <MTableMaterial
                  multiColor
                  showIndex
                  dataSource={state.reactivePower}
                  fieldArray={["name", "value"]}
                />
              </CardLayout>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
const checkIncludesArray = (f, array) => {
  var check = false;
  for (let index = 0; index < array.length; index++) {
    if (f.includes(array[index])) {
      check = true;
      break;
    }
  }
  return check;
};
const parserData = (pws) => {
  var fields = Object.keys(pws);
  var voltage = [];
  var current = [];
  var activePower = [];
  var reactivePower = [];
  var general = [];

  for (let index = 0; index < fields.length; index++) {
    var f = fields[index];

    let isGeneral = checkIncludesArray(f, [
      "active_power_total",
      "reactive_power_total",
      "active_energy_delivered",
      "frequency",
    ]);
    if (isGeneral) {
      var name = f.toString().replace("_total").replace("_delivered").replaceAll("_"," ");
      var value = pws[f];
      general.push({
        name: StringUtils.capitalize(name),
        value: value,
      });
    } else if (f.toString().match(/^(voltage)_./)) {
      let check = checkIncludesArray(f, ["ab", "bc", "ca", "ll"]);
      if (check) {
        let name = f.replace("voltage_", "").replace("ll_", "");
        let value = pws[f];
        voltage.push({
          name: name.toUpperCase(),
          value: value,
        });
      }
    } else if (f.toString().match(/^(current)_./)) {
      let check = checkIncludesArray(f, ["_a", "_b", "_c", "avg"]);
      if (check) {
        let name = f.replace("current_", "");
        let value = pws[f];
        current.push({
          name: name.toUpperCase(),
          value: value,
        });
      }
    } else if (f.toString().match(/^(active_power)_./)) {
      let check = checkIncludesArray(f, ["_a", "_b", "_c"]);
      if (check) {
        let name = f.replace("active_power_", "");
        let value = pws[f];
        activePower.push({
          name: name.toUpperCase(),
          value: value,
        });
      }
    } else if (f.toString().match(/^(reactive_power)_./)) {
      let check = checkIncludesArray(f, ["_a", "_b", "_c"]);
      if (check) {
        let name = f.replace("reactive_power_", "");
        let value = pws[f];
        reactivePower.push({
          name: name.toUpperCase(),
          value: value,
        });
      }
    }
  }
  return {
    voltage: voltage,
    current: current,
    activePower: activePower,
    reactivePower: reactivePower,
    general: general,
  };
};
