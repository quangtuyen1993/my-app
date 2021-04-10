import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import IconApp from "../../../common/icons";
import { onLogOut } from "./user.slice";

export default function LogOutIcon() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(onLogOut());
  };
  return (
    <ListItem onClick={() => onLogout()} button>
      <ListItemIcon>
        <Box paddingLeft={1}>
          <FontAwesomeIcon
            icon={IconApp.SIGN_OUT}
            style={{ fontSize: "24", textAlign: "center" }}
            color="#ffffff"
          />
        </Box>
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="h6" style={{ color: "#ffffff" }}>
            LogOut
          </Typography>
        }
      />
    </ListItem>
  );
}
