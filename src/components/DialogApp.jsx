import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Box, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconApp from '../common/icons';
const useStyles = makeStyles((theme) => ({
    form: {

        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '100%',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function DialogApp(props) {
    const theme = useTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [device, setDevice] = React.useState(1)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDevice = (e) => {
        setDevice(e.target.value)
    }

    return (
        <>
            <Box mr={2}>
                <Button style={{ backgroundColor: theme.palette.secondary.main }} onClick={handleClickOpen}>
                    <Box mr={2}>
                        <FontAwesomeIcon icon={IconApp.BROADCAST_TOWER} color="white" size="2x" />
                    </Box>
                    <Box >
                        <Typography variant="h6">
                            Device {device}
                        </Typography>
                    </Box>
                </Button>
            </Box>

            <Dialog
                fullWidth
                maxWidth={"xs"}
                open={open}
                onClose={handleClose}
            >
                <DialogTitle 
                
                    disableTypography
                    style={{ backgroundColor: theme.palette.primary.main }} id="max-width-dialog-title">
                    <Typography variant="h5">
                        Station
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="max-width">Choose Device</InputLabel>
                            <Select
                                fullWidth
                                autoFocus
                                value={device}
                                onChange={handleDevice}>
                                <MenuItem value={1}>Device 1</MenuItem>
                                <MenuItem value={2}>Device 2</MenuItem>
                                <MenuItem value={3}>Device 3</MenuItem>
                                <MenuItem value={4}>Device 4</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                        Open
                    </Button>

                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                  
                </DialogActions>
            </Dialog>
        </>
    );
}