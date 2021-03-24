import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: 0,
        margin: 0,
        height: '100vh',
        backgroundColor: "#e9ecef"
    },
    form: {
        padding: "10px",
        borderRadius: "2px",
        backgroundColor: "white",
        boxShadow: " 1px 1px 0.5px #9E9E9E;"
    }

});

export default function DefaultLayout(props) {
    const classes = useStyles(props);
    return (
        <Grid className={classes.root}
            container
            alignItems="center"
            justify="center" >
            <Grid item lg={3}>
                {props.children}
            </Grid>
        </Grid>
    )
}