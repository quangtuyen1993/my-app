import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  CardContent,

  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import ColorsApp from "../../../common/colors";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import MCircleProgress from "../../../components/MCircleProgress";

const object = {
  Active_Power: "-0.04 kW",
  Reactive_Power: "0 kVar",
  Inverter_Running: "8/8",
  Energy_to_day: "2.73 MWh",
  Energy_this_month: "46.44 MWh",
  Energy_this_year: "258.35 MWh",
  Total_Energy: "458.18 MWh",
  PR_Of_Day: "75.53 %",
  PR_Of_Month: " 79.14 %",
  PR_Of_Year: " 0.00 %",
};
const Type = Object.freeze({
  ENG: "Energy",
  PR: "PR",
  POWER: "Power",
  RUN: "Running",
  TOTAL: "Total",
});

const getTypeField = (fieldStr) => {
  if (fieldStr.includes(Type.ENG.valueOf())) {
    return {
      type: Type.ENG.valueOf(),
      icon: IconApp.ENERGY,
      bg: ColorsApp.ENERGY_GRADIENT,
    };
  }
  if (fieldStr.includes(Type.PR.valueOf())) {
    return {
      type: Type.PR.valueOf(),
      icon: IconApp.PR,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
  if (fieldStr.includes(Type.POWER.valueOf())) {
    return {
      type: Type.POWER.valueOf(),
      icon: IconApp.POWER,
      bg: ColorsApp.POWER_GRADIENT,
    };
  }
  if (fieldStr.includes(Type.RUN.valueOf())) {
    return {
      type: Type.RUN.valueOf(),
      icon: IconApp.RUNNING,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
  if (fieldStr.includes(Type.TOTAL.valueOf())) {
    return {
      type: Type.TOTAL.valueOf(),
      icon: IconApp.RUNNING,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
};

const createListItem = (object) => {
  var listItem = [];
  var listPr = [];
  var field = Object.keys(object);

  field.forEach((f) => {
    var obPattern = getTypeField(f);
    var name = f.toLocaleUpperCase();
    var value = object[f];
    var obj = {
      ...obPattern,
      name,
      value,
    };

    if (obj.type === Type.PR) {
      listPr.push(obj);
    } else {
      listItem.push(obj);
    }
  });
  return {
    listPr: listPr,
    listItem: listItem,
  };
};

const useStyles = makeStyles((themes) => ({
  root: {},
  cardPrimary: {},
  cardIcon: {
    position: "absolute",
    top: "50%",
    right: "0%",
    marginRight: themes.spacing(4),
    transform: "translate(0, -50%)",
    opacity: 0.4,
  },
}));

export default function Overview() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = useState({
    listPr: [],
    listItem: [],
    max: 100,
    values: [1, 1, 1],
  });
  useEffect(function () {
    var data = createListItem(object);
    setState((pre) => ({
      ...pre,
      listPr: data.listPr,
      listItem: data.listItem,
    }));
  }, []);

  useEffect(() => {
//    var interval= startTimeOut();
//     return () => {
//         clearInterval(interval)
//     };
  }, []);

  const renderItem = (item, index) => {
    return (
      <Grid item sm={6} xs={12} md={4} lg={3} key={index}>
        <Card
          variant="outlined"
          color="primary"
          style={{ background: item.bg }}
          className={classes.cardPrimary}
        >
          <CardContent style={{ position: "relative" }}>
            <FontAwesomeIcon
              style={{
                opacity: 0.5,
                position: "absolute",
                right: 0 + theme.spacing(2),
              }}
              icon={item.icon}
              size={"3x"}
            />
            <Typography variant="h5">{item.value}</Typography>
            <Typography variant="h6">{item.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderCircle = (item, index) => {
    const { max } = state;
    return (
      <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
        <MCircleProgress
          max={max}
          item={item}
          value={state.values[index]}
          progress={state.values[index]}
          size={100}
        />
      </Grid>
    );
  };
  // const startTimeOut = () => {
  //   var intervalInstance = setInterval(() => {
  //     let values = [];
  //     for (var i = 0; i <= 3; i++) {
  //       const value = Math.random() * 100;
  //       values.push(value);
  //     }
  //     setState((pre) => ({
  //       ...pre,
  //       values: values,
  //     }));
  //   }, 500);
  //   return intervalInstance
  // };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <CardLayout title="Overview" className={classes.root}>
            <Grid container spacing={2}>
              {state.listItem.map((item, index) => renderItem(item, index))}
            </Grid>
          </CardLayout>
        </Grid>

        <Grid item lg={12} sm={12} md={12} xs={12}>
          <CardLayout title="PR Radio" className={classes.root}>
            <Grid container spacing={2}>
              {state.listPr.map((item, index) => renderCircle(item, index))}
            </Grid>
          </CardLayout>
        </Grid>
      </Grid>
    </>
  );
}
