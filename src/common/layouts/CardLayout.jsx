import {
  Card,
  CardHeader,
  Divider,
  Grid,
  CardContent,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Camera } from "react-feather";
const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
  lineHeader: {
    backgroundColor: theme.palette.secondary.main,
    height: "5px",
  },
  form: {
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "white",
    boxShadow: " 1px 1px 0.5px #9E9E9E;",
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));
const CardLayout = (props) => {
  const classes = useStyles();
  const themes = useTheme();
  return (
    <>
      <Card
        variant="elevation"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: props.minHeight ? props.minHeight : "auto",
        }}
      >
        <CardHeader
          component={() => (
            <div>
              <div className={classes.lineHeader} />
              <Grid
                className={classes.header}
                direction="row"
                container
                alignItems="center"
                spacing={1}
              >
                <Grid item>
                  <FontAwesomeIcon
                    icon={props.icon ? props.icon : faTachometerAlt}
                    size={"2x"}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {" "}
                    {props.title ? props.title : "SkyBlack"}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )}
        />
        <Divider style={{ backgroundColor: themes.palette.primary.main }} />
        <CardContent
          style={{
            height: "100%",
            flexGrow: 1,
          }}
        >
          {props.children}
        </CardContent>
      </Card>
    </>
  );
};
export default CardLayout;
