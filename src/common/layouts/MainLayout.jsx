import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ColorsApp from '../colors';
import IconApp, { PUBLIC_ICON_ISOLAR, PUBLIC_ICON_LIGHT } from "../icons/index"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DialogApp from '../../components/DialogApp';
import { Badge, Box } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        background: theme.palette.secondary.main
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(6) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down('sm')]: {
            width: 0
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        display: 'block',
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    customBadge: {
        backgroundColor: red[600],
        color: "white"
    },
    footer: {
        display: "flex",
        borderTop: "0.5px rgba(0,0,0,0.3) solid",
        padding: theme.spacing(3)
    }
}));


const routes = [
    { id: 1, iconItem: IconApp.DASHBOARD, name: "Overview", linkTo: "/admin" },
    { id: 2, iconItem: IconApp.DEVICE, name: "Devices", linkTo: "/admin/device" },
    { id: 3, iconItem: IconApp.ALARM, name: "Alarms", linkTo: "/admin/alarm" },
    { id: 7, iconItem: IconApp.TRENT, name: "Alarms", linkTo: "/admin/trend" },
    { id: 4, iconItem: IconApp.CACL, name: "PR Calculation", linkTo: "/admin/prcalculation" },
    { id: 5, iconItem: IconApp.INFO, name: "System info", linkTo: "/admin/systeminfor" },
    { id: 6, iconItem: IconApp.SIGN_OUT, name: "Log Out", linkTo: "/login" },
]


export default function MainLayout(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const onToggleDrawer = () => {
        setOpen(!open)
    }

    return (
        <div className={classes.root}>
            <AppBar
                style={{ display: "flex" }}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {<IconButton
                        aria-label="open drawer"
                        onClick={onToggleDrawer}
                        edge="start"
                    >
                        <MenuIcon style={{
                            color: ColorsApp.secondary
                        }} />
                    </IconButton>}

                    <Box mr={2}>
                        <img height={theme.spacing(6) + 1} alt="Sky Black SoftWare" src={PUBLIC_ICON_LIGHT} />
                    </Box>
                    <Box style={{
                        flexGrow: 3
                    }}>
                        Sky
                    </Box>
                    <Box mr={2}>
                        <Badge badgeContent={4} classes={{ badge: classes.customBadge }}>
                            <FontAwesomeIcon icon={IconApp.ALARM} />
                        </Badge>
                    </Box>
                    <Box>
                        <DialogApp />
                    </Box>
                    <Box>
                        <img height={theme.spacing(6) + 1} alt="Sky Black SoftWare" src={PUBLIC_ICON_ISOLAR} />
                    </Box>

                </Toolbar>
            </AppBar>
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
                    {routes.map((text, index) => (
                        <Link style={{ textDecoration: "none" }} to={text.linkTo} onClick={() => { setOpen(false) }} key={text.id}>
                            <ListItem button>
                                <ListItemIcon>
                                    <Box paddingLeft={1}>
                                        <FontAwesomeIcon icon={text.iconItem} style={{ fontSize: "24", textAlign: "center" }} color="#ffffff" />
                                    </Box>
                                </ListItemIcon>
                                <ListItemText disableTypography
                                    primary={<Typography variant="h6" style={{ color: '#ffffff' }}>{text.name}</Typography>}
                                />

                            </ListItem>
                        </Link>

                    ))}
                </List>

            </Drawer>
            <div style={{ display: "block", flex: 1, flexGrow: "1" }}>
                <div style={{ display: "flex", alignItems: "stretch", flexDirection: "column", }}>
                    <div style={{ flex: 1 }}>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {props.children}
                            </div>

                        </main>
                    </div>
                    <div style={{ flex: 1 }}>
                        <footer className={classes.footer}>
                            <p>
                                Copyright © 2020 <a href="/">PHUC THINH CO., LTD</a>. All rights reserved.</p>
                        </footer>
                    </div>

                </div>


            </div>

        </div >
    )
}