import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  makeStyles,
  Toolbar,
  useTheme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { useSelector } from "react-redux";
import AppBadge from "../../../redux/feature/AppBadge";
import Station from "../../../redux/feature/station/Station";
import ColorsApp from "../../colors";
import { PUBLIC_ICON_ISOLAR, PUBLIC_ICON_LIGHT } from "../../icons";
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

  appBarShift: (props) => ({
    marginLeft: props.drawerWidth,
    width: `calc(100% - ${props.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ drawerWidth, onToggleDrawer, open }) {
  const classes = useStyle({ drawerWidth });
  const theme = useTheme();
  const { username } = useSelector((state) => state.authorReducer.userProfile);
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

          <Box
            display="flex"
            justifyContent="flex-start"
            alignContent="center"
            alignItems="center"
            mr={2}
            style={{
              flexGrow: 3,
              height: "40px",
            }}
          >
            <img
              height={theme.spacing(6) + 1}
              alt="Sky Black SoftWare"
              src={PUBLIC_ICON_LIGHT}
            />
          </Box>

          <Box mr={1}>
            <Station device={10} />
          </Box>
          <Box mr={2}>
            <AppBadge />
          </Box>

          <Box>
            {username && (
              <Avatar
                variant="circular"
                style={{
                  width: theme.spacing(4),
                  height: theme.spacing(4),
                  textAlign: "center",
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <img
              height="40px"
              alt="Sky Black SoftWare"
              src={PUBLIC_ICON_ISOLAR}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
