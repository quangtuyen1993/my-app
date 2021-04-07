import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import {
  Fingerprint,
  Lock,
  Person,
  SupervisorAccount,
} from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },

  chip: {
    backgroundColor: theme.palette.primary.main,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      icon: {
        color: "white !important",
      },
    },
  },
}));

export default function DialogApp({
  userDefault,
  onSubmit,
  handleClose,
  open,
}) {
  const theme = useTheme();

  const onHandleSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  //handler form
  const { handleSubmit, register, setValue, errors, getValues } = useForm({
    mode: "onBlur",
    shouldUnregister: false,
  });
  useEffect(() => {
    setValue("username", userDefault.username);
    setValue("role", userDefault.role);
  }, [setValue, userDefault]);
  const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 1)",
        backgroundColor: "white",
      },
    },
  })(TextField);

  return (
    <>
      <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleClose}>
        <form>
          <DialogTitle
            disableTypography
            style={{ backgroundColor: theme.palette.primary.main }}
            id="max-width-dialog-title"
          >
            <Typography variant="h6">Update Client Account</Typography>
          </DialogTitle>

          <DialogContent>
            <Box p={2}>
              <Grid spacing={2} container direction="column">
                <Grid item>
                  <DarkerDisabledTextField
                    disabled
                    label="Username"
           
                    fullWidth
                    name="username"
                    inputRef={register}
                    variant="outlined"
                    placeholder="Username"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item>
                  <DarkerDisabledTextField
                    disabled
                
                    label="Role"
                    fullWidth
                    name="role"
                    inputRef={register}
                    variant="outlined"
                    placeholder="role"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SupervisorAccount color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    autoFocus
                    label="Password"
                    fullWidth
                    name="password"
                    inputRef={register}
                    variant="outlined"
                    error={errors.username ? true : false}
                    placeholder="Update Password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              variant="outlined"
              onClick={handleSubmit(onHandleSubmit)}
              color="primary"
            >
              Apply
            </Button>

            <Button variant="outlined" onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

DialogApp.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  onSubmit: PropTypes.func,
};
