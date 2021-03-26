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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouterList } from "../../../routes/Routes";

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
