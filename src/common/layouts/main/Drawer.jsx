import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  useTheme,
} from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import LogOutIcon from "../../../redux/feature/user/LogOutIcon";
import { RouterList } from "../../../routes/Routes";

const DrawerApp = ({ drawerWidth, open, onClose }) => {
  const theme = useTheme();
  const useStyle = makeStyles((theme) => ({
    paper: {
      background: theme.palette.secondary.main,
    },
    drawer: {
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
          {RouterList.map((route, index) => (
            <Link
              style={{ textDecoration: "none" }}
              to={route.linkTo}
              onClick={() => {
                onClose();
              }}
              key={route.id}
            >
              <ListItem button>
                <ListItemIcon>
                  <Box paddingLeft={1.3}>
                    <FontAwesomeIcon
                      icon={route.iconItem}
                      style={{
                        fontSize: "24",
                        textAlign: "center",
                        color: "#ffffff",
                      }}
                    />
                  </Box>
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      variant="subtitle1"
                      style={{ color: "#ffffff", fontWeight: "normal" }}
                    >
                      {route.name}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          ))}
          <LogOutIcon />
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerApp;
