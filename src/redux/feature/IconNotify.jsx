import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Box, Grid, makeStyles, Tooltip } from "@material-ui/core";
import React from "react";
import IconApp from "../../common/icons";
const useStyles = makeStyles((theme) => ({}));

export default function IconNotify({
  handleClickOpen,
  tooltip,
  chipColor,
  ...rest
}) {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip} {...rest}>
      <Box>
        <Avatar
          style={{
            backgroundColor: chipColor,
          }}
        >
          <FontAwesomeIcon
            className={classes.icon}
            icon={IconApp.BROADCAST_TOWER}
            size={"sm"}
          />
        </Avatar>
      </Box>
    </Tooltip>
  );
}
