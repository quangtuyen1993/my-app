import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Grid, makeStyles, Tooltip } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
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

export default function IconNotify({ handleClickOpen, tooltip }) {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip}>
      <Grid container>
        <Grid item onClick={handleClickOpen}>
          <Avatar className={classes.chip}>
            <FontAwesomeIcon
              className={classes.icon}
              icon={IconApp.BROADCAST_TOWER}
              size={"sm"}
            />
          </Avatar>
        </Grid>
      </Grid>
     
    </Tooltip>
  );
}
