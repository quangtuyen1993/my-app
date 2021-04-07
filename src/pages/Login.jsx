import { Button, Grid, OutlinedInput, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Colors from "../common/colors";
import { PUBLIC_ICON } from "../common/icons";
import { onLogin, refreshLogin } from "../redux/feature/user/user.slice";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "white",
    boxShadow: " 1px 1px 0.5px #9E9E9E;",
  },
  errorField: {
    fontSize: 12,
    fontStyle: "italic",
    color: theme.palette.error.main,
  },
}));
const defaultValues = {
  username: "",
  password: "",
};

export default function LoginScreen(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  const history = useNavigate();
  const { handleSubmit, register, errors } = useForm({
    defaultValues,
    mode: "onBlur",
  });
  const { isSuccess, message, isError } = useSelector(
    (state) => state.authorReducer
  );

  const dispatchToHome = useCallback(() => {
    history("/home");
  }, [history]);

  //call when login start
  // run a once time
  useEffect(() => {
    dispatch(refreshLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call when login success
  useEffect(() => {
    if (isSuccess) {
      dispatchToHome();
    }
  }, [isSuccess, dispatchToHome]);

  const onSubmit = (data) => {
    dispatch(onLogin(data));
  };

  return (
    <Grid container alignItems="stretch" spacing={2} direction="column">
      <Grid item xs={12} align="center">
        <img
          src={PUBLIC_ICON}
          alt="SKY SOFT WARE"
          height="130px"
          width="175px"
        />
      </Grid>
      {/* form */}
      <form>
        <Grid item>
          <Grid
            container
            alignItems="stretch"
            spacing={2}
            direction="column"
            className={classes.form}
          >
            <Grid item align="center">
              <Typography
                style={{
                  fontFamily: "SourceSansPro",
                  fontWeight: "700",
                  color: Colors.secondaryText,
                  fontSize: "22px",
                }}
              >
                Login
              </Typography>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <Typography className={classes.errorField} variant="subtitle1">
                  {errors.username && errors.username.message}
                </Typography>
                <OutlinedInput
                  name="username"
                  inputRef={register({
                    required: "Field is required",
                    minLength: {
                      value: 3,
                      message: "Min Length 3",
                    },
                  })}
                  variant="outlined"
                  error={errors.username ? true : false}
                  placeholder="Username"
                  endAdornment={
                    <InputAdornment position="end">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <Typography className={classes.errorField} variant="subtitle1">
                  {errors.password && errors.password.message}
                </Typography>
                <OutlinedInput
                  error={errors.password ? true : false}
                  variant="outlined"
                  type="password"
                  name="password"
                  placeholder="Password"
                  inputRef={register({
                    required: "Field is required",
                    minLength: {
                      message: "Min length 3",
                      value: 3,
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            {isError && (
              <Grid item style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant="subtitle1"
                  className={classes.errorField}
                  style={{ fontWeight: "bold" }}
                >
                  {message}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            </Grid>
            <Grid item align="center">
              <Typography
                variant="body2"
                component="p"
                style={{
                  color: Colors.secondaryText,
                }}
              >
                - IPC Solar -
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
