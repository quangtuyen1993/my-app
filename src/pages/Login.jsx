import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { Button, Grid, Typography, OutlinedInput } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../common/colors";
import { PUBLIC_ICON } from "../common/icons";
import { useSelector, useDispatch } from "react-redux";
import { onLogin } from "../redux/feature/user/user.slice";
const useStyles = makeStyles({
  form: {
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "white",
    boxShadow: " 1px 1px 0.5px #9E9E9E;",
  },
});

export default function LoginScreen(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();

  return (
    <Grid container alignItems="stretch" spacing={2} direction="column">
      {/*image */}
      <Grid item xs={12} align="center">
        <img
          src={PUBLIC_ICON}
          alt="SKY SOFT WARE"
          height="130px"
          width="175px"
        />
      </Grid>
      {/* form */}
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
              ĐĂNG NHẬP
            </Typography>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <OutlinedInput
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
              <OutlinedInput
                placeholder="Password"
                type="password"
                endAdornment={
                  <InputAdornment position="end">
                    <LockIcon color="action" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={()=>dispatch(onLogin({
                username:"quangtuyen",
                password:"123456"
              }))}
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
    </Grid>
  );
}
