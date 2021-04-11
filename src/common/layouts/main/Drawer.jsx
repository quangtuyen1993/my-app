import { faThermometerThreeQuarters } from "@fortawesome/free-solid-svg-icons";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogOutIcon from "../../../redux/feature/user/LogOutIcon";
import { RouterList } from "../../../routes/Routes";

const DrawerApp = ({ drawerWidth, open, onClose }) => {
  // const theme = useTheme();
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
  const { userProfile } = useSelector((state) => state.authorReducer);
  const theme = useTheme();
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
          {RouterList.map((route, index) =>
            route.role === "Admin" ? (
              userProfile.role==="Admin" && (
                <ListItem key={route.id} button style={{ paddingLeft: theme.spacing(1) }}>
                  <ListItemIcon>
                    <Box
                      flex={1}
                      display="flex"
                      justifyContent="center"
                      alignContent="center"
                      alignItems="center"
                    >
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
                        style={{
                          color: "#ffffff",
                          fontWeight: "normal",
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        {route.name}
                      </Typography>
                    }
                  />
                </ListItem>
              )
            ) : (
              <Link
                style={{ textDecoration: "none" }}
                to={route.linkTo}
                onClick={() => {
                  onClose();
                }}
                key={route.id}
              >
                <ListItem button style={{ paddingLeft: theme.spacing(1) }}>
                  <ListItemIcon>
                    <Box
                      flex={1}
                      display="flex"
                      justifyContent="center"
                      alignContent="center"
                      alignItems="center"
                    >
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
                        style={{
                          color: "#ffffff",
                          fontWeight: "normal",
                          paddingLeft: theme.spacing(1),
                        }}
                      >
                        {route.name}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            )
          )}
          <LogOutIcon />
        </List>
      </Drawer>
    </div>
  );
};

export default DrawerApp;
