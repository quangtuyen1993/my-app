import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import IconApp from "../../icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouterList } from "../../../routes/Routes";

const routes = [
  { id: 1, iconItem: IconApp.DASHBOARD, name: "Overview", linkTo: "/admin" },
  { id: 2, iconItem: IconApp.DEVICE, name: "Devices", linkTo: "/admin/device" },
  { id: 3, iconItem: IconApp.ALARM, name: "Alarms", linkTo: "/admin/alarm" },
  { id: 7, iconItem: IconApp.TRENT, name: "Alarms", linkTo: "/admin/trend" },
  {
    id: 4,
    iconItem: IconApp.CACL,
    name: "PR Calculation",
    linkTo: "/admin/prcalculation",
  },
  {
    id: 5,
    iconItem: IconApp.INFO,
    name: "System info",
    linkTo: "/admin/systeminfor",
  },
  { id: 6, iconItem: IconApp.SIGN_OUT, name: "Log Out", linkTo: "/login" },
];

const DrawerApp = ({ drawerWidth, open, onClose }) => {
  const useStyle = makeStyles((theme) => ({
    paper: {
      background: theme.palette.secondary.main,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(6) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
      [theme.breakpoints.down("sm")]: {
        width: 0,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
  }));

  const classes = useStyle();

  return (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {RouterList.map((text, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={text.linkTo}
              onClick={() => {
                onClose();
              }}
              key={text.id}
            >
              <ListItem button>
                <ListItemIcon>
                  <Box paddingLeft={1}>
                    <FontAwesomeIcon
                      icon={text.iconItem}
                      style={{ fontSize: "24", textAlign: "center" }}
                      color="#ffffff"
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="h6" style={{ color: "#ffffff" }}>
                      {text.name}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerApp;
