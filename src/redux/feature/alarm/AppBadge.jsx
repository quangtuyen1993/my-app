import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Grid, makeStyles, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconApp from "../../../common/icons";
import { fetchAlarmCount } from "./alarm.slice";
const useStyles = makeStyles((theme) => ({
  chip: {
    backgroundColor: theme.palette.secondary.main,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      icon: {
        color: "white",
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


const AppBadge = ({ handleClickOpen }) => {
  const classes = useStyles();
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const { alarmCount } = useSelector((state) => state.alarmReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (stationSelected.id === undefined) return;
    dispatch(fetchAlarmCount({ stationSelected: stationSelected.id }));
  }, [dispatch, stationSelected.id]);

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
              badgeContent={alarmCount}
              color="error"
            >
              <FontAwesomeIcon
                className={clsx([
                  classes.icon,
                  {
                    [classes.animatedItem]: alarmCount > 0,
                  },
                ])}
                icon={IconApp.ALARM}
                color="white"
              />
            </Badge>
          </Grid>
        </Grid>
      </Tooltip>
    </div>
  );
};
export default React.memo(AppBadge);
