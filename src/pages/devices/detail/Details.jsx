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
import { blue, red, yellow } from "@material-ui/core/colors";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import GraphLineApp from "../../../components/GraphLineApp";
import MDatePicker from "../../../components/MDatePicker";
import TableApp from "../../../components/TableApp";
import { TIMER_TABLE, TIMER_TREND } from "../../../const/TimerUpdateConst";
import DeviceService from "../../../service/device.service";
import { CookieManger } from "../../../utils/CookieManager";
import DataTrendParser from "../../../utils/DataTrenParser";
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

export default function DetailScreen() {
  const theme = useTheme();
  const timer = useRef(null);
  const { stationSelected } = useSelector((state) => state.stationReducer);

  const navigate = useNavigate();
  let location = useLocation();

  const [state, setState] = useState({
    mttp: [],
    phases: [],
    general: [],
    deviceId: "",
    tableName: "",
    stationSelected: null,
    temp: {},
    dataTrend: [],
    dateFrom: moment().startOf("day"),
    dateTo: moment().endOf("day"),
  });

  const handleChangeDate = (from, to) => {
    setState((pre) => {
      return {
        ...pre,
        dateFrom: from,
        dateTo: to,
      };
    });
  };

  useEffect(() => {
    if (state.stationSelected === null) {
      setState((pre) => ({
        ...pre,
        stationSelected: stationSelected,
      }));
    } else if (state.stationSelected.id !== stationSelected.id) {
      CookieManger.revokeCurrentDevice();
      navigate("/device", {
        replace: true,
      });
      return;
    }
  }, [navigate, state.stationSelected, stationSelected]);

  useEffect(() => {
    let deviceId;
    if (location.state !== null) {
      deviceId = location.state.deviceId;
    }
    if (deviceId === undefined) {
      deviceId = CookieManger.getCurrentDevice();
    } else {
      CookieManger.setCurrentDevice(deviceId);
    }
    setState((pre) => ({
      ...pre,
      deviceId: deviceId,
    }));
  }, [location.state]);

  const onFetchTableData = useCallback(async () => {
    var mppt = [];
    var phases = [];
    var general = [];

    var obj = await DeviceService.fetchInverterDetail(state.deviceId);
    var fields = Object.keys(obj);
    fields.forEach((f) => {
      if (f === "tableName") {
        setState((pre) => ({
          ...pre,
          tableName: obj[f],
        }));
      } else if (f.includes("mppt") || f.includes("mptt")) {
        filterMPPT(f, obj, mppt);
      } else if (
        f.includes("ab", 0) ||
        f.includes("bc", 0) ||
        f.includes("ca", 0) ||
        f.includes("phase")
      ) {
        filterPhase(f, obj, phases);
      } else {
        filterGeneral(f, obj, general);
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
  }, [state.deviceId]);

  const onFetchDataTrend = useCallback(async () => {
    if (state.tableName === "") return;
    var data = await DeviceService.fetchDataPowerMeterInverter({
      fromDate: state.dateFrom,
      toDate: state.dateTo,
      tableName: state.tableName,
    });
    var cols = DataTrendParser.parserTrend(data.columns, data.rows);
    setState((pre) => ({
      ...pre,
      dataTrend: cols,
    }));
  }, [state.dateFrom, state.dateTo, state.tableName]);

  useEffect(() => {
    if (state.deviceId === "" || state.deviceId === undefined) return;
    if (timer.current !== undefined) clearInterval(timer.current);
    onFetchTableData();
    timer.current = setInterval(() => {
      onFetchTableData();
    }, TIMER_TABLE);

    return () => {
      clearInterval(timer.current);
    };
  }, [onFetchTableData, state.deviceId]);

  useEffect(() => {
    if (state.deviceId === "" || state.deviceId === undefined) return;
    if (timer.current !== undefined) clearInterval(timer.current);
    onFetchDataTrend();
    timer.current = setInterval(() => {
      onFetchDataTrend();
    }, TIMER_TREND);

    return () => {
      clearInterval(timer.current);
    };
  }, [onFetchDataTrend, state.deviceId]);

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
              <CardLayout title="DC Output">
                <TableApp
                  showIndex={true}
                  chipField={["name"]}
                  chipComponent={(item, f, i, getColor) => {
                    var color;
                    if (item.type === "A") {
                      color = "#ff8a80";
                    } else if (item.type === "B") {
                      color = "#ffee58";
                    } else {
                      color = "#81d4fa";
                    }
                    getColor(color, i);
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
          <CardLayout
            icon={IconApp.RATIO}
            title="24h Power Trend"
            export={state.dataTrend}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <MDatePicker
                  isSingleDate={true}
                  onRangeDateChange={handleChangeDate}
                />
              </Grid>
            </Grid>

            <GraphLineApp
              minDate={state.dateFrom}
              maxDate={state.dateTo}
              type="HourInDate"
              data={state.dataTrend}
            />
          </CardLayout>
        </Grid>
      </Grid>
      <Outlet />
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
  } else if (f.includes("yearly_power_yields")) {
    infoType = {
      type: GENERAL_TYPE.ENERGY_THIS_YEAR,
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
      type: GENERAL_TYPE.TOTAL_ENERGY_PRODUCTION,
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
