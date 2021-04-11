import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { fade, makeStyles } from "@material-ui/core/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ColorsApp from "../../../common/colors";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import MCircleProgress from "../../../components/MCircleProgress";
import { TIMER_TREND } from "../../../const/TimerUpdateConst";
import OverviewService from "../../../service/overview.service";
import PRService from "../../../service/pr.service";

const useStyles = makeStyles((themes) => ({
  root: {},
  cardPrimary: {},
  cardIcon: {
    position: "absolute",
    top: "50%",
    right: "0%",
    marginRight: themes.spacing(4),
    transform: "translate(0, -50%)",
    opacity: 0.33,
  },
}));

export default function Overview() {
  const classes = useStyles();
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const timer = useRef(null);
  const [state, setState] = useState({
    listPr: [],
    listItem: [],
    max: 100,
    values: [1, 1, 1],
  });

  const onFetchPR = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    let day = await PRService.getPRofDay(stationSelected.id);
    let month = await PRService.getPRofMonth(stationSelected.id);
    day.name = "PR Day";
    month.name = "PR Month";
    var newList = [day, month];
    setState((pre) => {
      return {
        ...pre,
        listPr: newList,
      };
    });
  }, [stationSelected.id]);

  const onFetchData = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    var response = await OverviewService.fetchOverview(stationSelected.id);
    var dataNormal = [];
    response.forEach((item) => {
      let obj = createItem(item);
      dataNormal.push(obj);
    });
    setState((pre) => ({
      ...pre,
      listItem: dataNormal,
    }));
  }, [stationSelected.id]);

  useEffect(() => {
    if (timer !== null) {
      clearInterval(timer.current);
    }
    onFetchData();
    onFetchPR();
    timer.current = setInterval(async () => {
      onFetchData();
      onFetchPR();
    }, TIMER_TREND);

    return () => {
      clearInterval(timer.current);
    };
  }, [onFetchData, onFetchPR]);

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
            <Typography variant="h6">{item.title}</Typography>
            <Typography variant="h6">
              {item.value} {item.unit}
            </Typography>
            <Grid
              container
              justify="flex-end"
              alignItems="center"
              alignContent="center"
              style={{
                width: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                height: "100%",
              }}
            >
              <Grid item xs={3} md={3} sm={3} lg={3}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignContent="center"
                  alignItems="center"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{ color: fade(grey[800], 0.77) }}
                    size="3x"
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const renderCircle = (item, index) => {
    const { max } = state;
    return (
      <Grid key={index} item xs={12} sm={6} md={6} lg={6}>
        <MCircleProgress
          max={max}
          item={item}
          value={item.pR_Correct}
          progress={item.pR_Correct}
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
          <CardLayout
            title="PR Ratio"
            icon={IconApp.CALC}
            className={classes.root}
          >
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
