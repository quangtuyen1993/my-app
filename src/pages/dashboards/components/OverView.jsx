import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ColorsApp from "../../../common/colors";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import MCircleProgress from "../../../components/MCircleProgress";
import OverviewService from "../../../service/overview.service";

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
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { jwtToken } = useSelector((state) => state.authorReducer.userProfile);
  const timer = useRef(null);
  const [state, setState] = useState({
    listPr: [],
    listItem: [],
    max: 100,
    values: [1, 1, 1],
  });

  const onFetchData = async () => {
    var response = await OverviewService.fetchOverview(stationSelected);
    var dataNormal = [];
    response.forEach((item) => {
      let obj = createItem(item);
      dataNormal.push(obj);
    });
    setState((pre) => ({
      ...pre,
      listItem: dataNormal,
    }));
  };
  let timeRun=1
  useEffect(() => {
    if (timer !== null) {
      clearInterval(timer.current);
    }

    if (jwtToken === "" || stationSelected === undefined) return;
    
    onFetchData();
    
    timer.current = setInterval(async () => {
      timeRun++
      console.log("run timer",timeRun)
      onFetchData();
    }, 3000);


  }, [jwtToken, stationSelected]);

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
            <Typography variant="h5">
              {item.value} {item.unit}
            </Typography>
            <Typography variant="h6">{item.title}</Typography>
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

const Type = Object.freeze({
  ENG: "Energy",
  PR: "PR",
  POWER: "Power",
  RUN: "Running",
  TOTAL: "Total",
});

const getTypeField = (titleField) => {
  if (titleField.includes(Type.ENG.valueOf())) {
    return {
      type: Type.ENG.valueOf(),
      icon: IconApp.ENERGY,
      bg: ColorsApp.ENERGY_GRADIENT,
    };
  }
  if (titleField.includes(Type.PR.valueOf())) {
    return {
      type: Type.PR.valueOf(),
      icon: IconApp.PR,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
  if (titleField.includes(Type.POWER.valueOf())) {
    return {
      type: Type.POWER.valueOf(),
      icon: IconApp.POWER,
      bg: ColorsApp.POWER_GRADIENT,
    };
  }
  if (titleField.includes(Type.RUN.valueOf())) {
    return {
      type: Type.RUN.valueOf(),
      icon: IconApp.RUNNING,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
  if (titleField.includes(Type.TOTAL.valueOf())) {
    return {
      type: Type.TOTAL.valueOf(),
      icon: IconApp.RUNNING,
      bg: ColorsApp.RUNNING_GRADIENT,
    };
  }
  return {
    type: Type.TOTAL.valueOf(),
    icon: IconApp.RUNNING,
    bg: ColorsApp.RUNNING_GRADIENT,
  };
};

const createItem = ({
  title,
  unit,
  //  icon,
  quality,
  value,
  //  background
}) => {
  var objPatter = getTypeField(title);
  return { ...objPatter, title, unit, quality, value };
};
