import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { fetchAlarmRealtime } from "./alarm.slice";
import IconApp from "../../../common/icons";
const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      icon: {
        color: "white !importain",
      },
    },
  },
  animatedItem: {
    animation: `$myEffect 3000ms linear infinite`,
  },
  animatedItemExiting: {
    animation: `$myEffectExit 3000ms ${theme.transitions.easing.easeInOut}`,
    opacity: 0,
    transform: "translateY(-200%)",
  },
  "@keyframes myEffect": {
    " 0% ": { transform: "rotateZ(0deg) " },
    "1%": { transform: "rotateZ(30deg)" },
    "3%": { transform: "rotateZ(-28deg)" },
    " 5%": { transform: "rotateZ(34deg)" },
    "7% ": { transform: "rotateZ(-32deg)" },
    "9% ": { transform: "rotateZ(30deg)" },
    "11%": { transform: "rotateZ(-28deg)" },
    "13%": { transform: "rotateZ(26deg)" },
    "15%": { transform: "rotateZ(-24deg)" },
    "17%": { transform: "rotateZ(22deg)" },
    "19%": { transform: "rotateZ(-20deg)" },
    "21%": { transform: "rotateZ(18deg)" },
    " 23%": { transform: "rotateZ(-16deg)" },
    " 25%": { transform: "rotateZ(14deg)" },
    " 27%": { transform: " rotateZ(-12deg)" },
    " 29%": { transform: "rotateZ(10deg)" },
    " 31%": { transform: "rotateZ(-8deg) " },
    " 33%": { transform: "rotateZ(6deg)" },
    " 35%": { transform: "rotateZ(-4deg)" },
    " 37%": { transform: "rotateZ(2deg)" },
    " 39%": { transform: "rotateZ(-1deg)" },
    " 41%": { transform: "rotateZ(1deg) " },
    " 43% ": { transform: "rotateZ(0deg)" },
    "  100% ": { transform: "rotateZ(0deg)" },
  },
  "@keyframes myEffectExit": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "100%": {
      opacity: 0,
      transform: "translateY(-200%)",
    },
  },
}));
const initState = {
  alarmNotifications: [],
};
export default function AppBadge({ handleClickOpen }) {
  const classes = useStyles();
  const { isLoginComplete } = useSelector((state) => state.authorReducer);
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { alarmNotifications } = useSelector((state) => state.alarmReducer);
  const [state, setState] = useState(initState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoginComplete)
      dispatch(fetchAlarmRealtime({ stationSelected: stationSelected.id }));
  }, [dispatch, isLoginComplete, stationSelected.id]);

  useEffect(() => {
    if (alarmNotifications) {
      console.log(alarmNotifications);
      setState((pre) => ({
        ...pre,
        alarmNotifications: alarmNotifications,
      }));
    }
  }, [alarmNotifications]);

  return (
    <div>
      <Tooltip title="notify">
        <Grid container>
          <Grid item onClick={handleClickOpen}>
            <Badge
              style={{
                padding: "5px",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              overlap="circle"
              className={classes.chip}
              badgeContent={state.alarmNotifications.length}
              color="error"
            >
              <FontAwesomeIcon
                className={clsx([
                  classes.icon,
                  {
                    [classes.animatedItem]: state.alarmNotifications.length > 0,
                  },
                ])}
                icon={IconApp.ALARM}
                style={{
                  fontSize: "px",
                }}
                color="white"
              />
            </Badge>
          </Grid>
        </Grid>
      </Tooltip>
    </div>
  );
}
