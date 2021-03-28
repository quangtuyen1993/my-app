import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,

  Grid,
  makeStyles,
  Tooltip
} from "@material-ui/core";
import React from "react";
import IconApp from "../../common/icons";
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
}));
export default function AppBadge({ handleClickOpen }) {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="notify">
        <Grid container>
          <Grid item onClick={handleClickOpen}>
              <Badge className={classes.chip} badgeContent={4} color="error">
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={IconApp.ALARM}
                  color="white"
                />
              </Badge>
          </Grid>
        </Grid>
      </Tooltip>
    </div>
  );
}
