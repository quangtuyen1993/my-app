import {
    Card,
    CardHeader,
    Divider,
    Grid,
    CardContent,
    Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';

const CardLayout = (props) => {

    const useStyles = makeStyles((theme) => ({
        header: {
            padding: theme.spacing(2),
        },
        lineHeader: {
            backgroundColor: theme.palette.primary.dark,
            height: "3px"
        },
        form: {
            padding: "10px",
            borderRadius: "2px",
            backgroundColor: "white",
            boxShadow: " 1px 1px 0.5px #9E9E9E;"
        },
        cardContent: {
            "&:last-child": {
              paddingBottom: 0
            }
          }
    }));

    const classes = useStyles();

    return (
        <>
            <Card variant="elevation" >
                <CardHeader
                    component={() => (
                        <div>
                            <div className={classes.lineHeader} />
                            <Grid className={classes.header} direction="row" container alignItems="center" spacing={1}>
                                <Grid item>
                                    <FontAwesomeIcon icon={props.icon ? props.icon : faTachometerAlt} size={"1x"} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1"> {props.title ? props.title : "SkyBlack"}</Typography>
                                </Grid>
                            </Grid>

                        </div>
                    )}
                />
                <Divider />
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </>
    )
}
export default CardLayout