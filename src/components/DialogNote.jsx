import {
    Box,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";
import { Lock, Person, SupervisorAccount } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

  const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  export default function DialogNote({
    userDefault,
    onSubmit,
    handleClose,
    open,
  }) {
    const theme = useTheme();
  
    const { handleSubmit, register, errors, watch, reset } = useForm({
      defaultValues: initialState,
      mode: "onBlur",
      // shouldUnregister: false,
    });
  
    const onHandleSubmit = (data) => {
      onSubmit({
        username: userDefault.username,
        role: userDefault.role,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      onHandleClose();
    };
  
    useEffect(() => {
      reset(userDefault);
    }, [reset, userDefault]);
  
    const onHandleClose = () => {
      reset();
      handleClose();
    };
  
    return (
      <>
        <Dialog fullWidth maxWidth={"xs"} open={open} onClose={onHandleClose}>
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
                    <TextField
                      value={userDefault.username}
                      label="Username"
                      fullWidth
                      name="username"
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
                    <TextField
                      value={userDefault.role}
                      label="Role"
                      fullWidth
                      name="role"
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
                      inputRef={register({
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password have to least 6 character",
                        },
                      })}
                      variant="outlined"
                      error={errors.password ? true : false}
                      placeholder="Update Password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.password && (
                      <Typography variant="subtitle2" style={{ color: "red" }}>
                        {errors.password.message}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <TextField
                      autoFocus
                      label="Confirm Password"
                      fullWidth
                      name="confirmPassword"
                      inputRef={register({
                        required: "confirm is require",
                        validate: (value) => value === watch("password"),
                      })}
                      variant="outlined"
                      error={errors.confirmPassword ? true : false}
                      placeholder="Update Password"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.confirmPassword && (
                      <Typography variant="subtitle2" style={{ color: "red" }}>
                        {errors.confirmPassword.message}
                      </Typography>
                    )}
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
  
              <Button variant="outlined" onClick={onHandleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
  
  DialogNote.propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
  };
  