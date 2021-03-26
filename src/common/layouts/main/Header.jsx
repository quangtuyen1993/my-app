import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  useTheme,
} from "@material-ui/core";

import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import IconApp, { PUBLIC_ICON_ISOLAR, PUBLIC_ICON_LIGHT } from "../../icons";
import clsx from "clsx";
import ColorsApp from "../../colors";
import DialogApp from "../../../components/DialogApp";
import AppBadge from "../../../redux/feature/AppBadge";

export default function Header({ drawerWidth, onToggleDrawer, open }) {
  const useStyle = makeStyles((theme) => ({
    root: {
      display: "flex",
    },

    appBarUnShift: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }));

  const classes = useStyle();

  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.root, {
          [classes.appBarShift]: open,
          [classes.appBarUnShift]: !open,
        })}
      >
        <Toolbar>
          {
            <IconButton
              aria-label="open drawer"
              onClick={onToggleDrawer}
              edge="start"
            >
              <MenuIcon
                style={{
                  color: ColorsApp.secondary,
                }}
              />
            </IconButton>
          }

          <Box mr={2}>
            <img
              height={theme.spacing(6) + 1}
              alt="Sky Black SoftWare"
              src={PUBLIC_ICON_LIGHT}
            />
          </Box>
          <Box
            style={{
              flexGrow: 3,
            }}
          >
            Sky
          </Box>
          <Box mr={2}>
            <DialogApp />
          </Box>
          <Box mr={2}>
            <AppBadge/>
          </Box>

          <Box>
            <img
              height={theme.spacing(6) + 1}
              alt="Sky Black SoftWare"
              src={PUBLIC_ICON_ISOLAR}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
