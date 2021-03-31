import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DirectionsIcon from '@material-ui/icons/Directions';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBar() {
    const classes = useStyles();

    return (
        <div style={{backgroundColor:"yellow",display:"flex",width:"100%"}}>

            <Paper component="form" className={classes.root}>
                <IconButton className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search information"
                    inputProps={{ 'aria-label': 'Search information' }}
                />

                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>
            </Paper>
        </div>

    );
}
