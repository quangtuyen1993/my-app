import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import { makeStyles } from "@material-ui/core/styles";
import ColorsApp from "../../../common/colors";
import { useSelector } from "react-redux";
import DeviceService from "../../../service/device.service";
import { TIMER_TREND } from "../../../const/TimerUpdateConst";

const title = "Weather";
// var list = [
//   {
//     type: "Radiation",
//     value: "0 W/m2",
//     name: "Radiation",
//   },
//   {
//     type: "Wind",
//     value: "3.7 m/s",
//     name: "Wind Speed",
//   },
//   {
//     type: "Temp",
//     value: "26.2 °C",
//     name: "Cell Temp",
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    display: "flex",
    grow: 0,
    background: ColorsApp.RUNNING_GRADIENT,
  },
}));
const Weather = () => {
  const classes = useStyles();

  const timer = useRef(null);

  const [state, setState] = useState({
    dataSource: [],
  });

  const { stationSelected } = useSelector((state) => state.stationReducer);

  const fetchSensor = useCallback(async () => {
    if (stationSelected.id !== undefined)
      var res = await DeviceService.fetchAllSensor(stationSelected.id);
    setState((pre) => ({
      ...pre,
      dataSource: res,
    }));
  }, [stationSelected.id]);

  useEffect(() => {
    fetchSensor();
  }, [fetchSensor]);

  //call timer
  useEffect(() => {
    if (timer.current !== null) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      fetchSensor();
    }, TIMER_TREND);
    return () => {
      clearInterval(timer.current);
    };
  }, [fetchSensor]);

  const createSensor = ({ name, status, value, unit }) => {
    var icon = "";
    if (name.includes("Radiation")) {
      icon = IconApp.RADIATION;
    } else if (name.includes("Wind")) {
      icon = IconApp.WIND;
    } else {
      icon = IconApp.TEMP;
    }

    return {
      name: name,
      icon: icon,
      status: status,
      value: value,
      unit: unit,
    };
  };

  return (
    <CardLayout icon={IconApp.WEATHER} title={title}>
      <Grid container spacing={2}>
        {state.dataSource &&
          state.dataSource.map((item, index) => {
            var itemSensor = createSensor(item);
            return (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card className={classes.root} variant="outlined">
                  <CardContent className={classes.icon}>
                    <FontAwesomeIcon
                      color="white"
                      icon={itemSensor.icon}
                      size={"3x"}
                    />
                  </CardContent>
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography>{itemSensor.name}</Typography>
                      <Typography>
                        {itemSensor.value} {itemSensor.unit}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </CardLayout>
  );
};
export default Weather;
