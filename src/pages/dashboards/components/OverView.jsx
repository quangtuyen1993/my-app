
import { useState, useEffect } from "react"
import CardLayout from "../../../common/layouts/CardLayout"
import { makeStyles ,useTheme} from '@material-ui/core/styles';

import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconApp from "../../../common/icons";
import ColorsApp from "../../../common/colors";

const useStyles = makeStyles((themes) => ({
    root: {
    },
    cardPrimary: {
    },
    cardIcon: {
        position: 'absolute',
        top: '50%',
        right: '0%',
        marginRight: themes.spacing(4),
        transform: 'translate(0, -50%)',
        opacity: 0.4,
    }
}));

export default function Overview() {
    const classes = useStyles();
    const theme=useTheme()
    const [data, setData] = useState([])
    useEffect(function () {
        setData([{
            data: "-0.04 kW",
            name: " Active Power",
            type: "Power"
        },
        {
            data: "-0.04 kW",
            name: " Active Power",
            type: "Power"

        },
        {
            data: "0 kVar",
            name: " Reactive Power",
            type: "Power"

        },
        {
            data: "8/8",
            name: "Inverter Running",
            type: "Running"

        },
        {
            data: "2.73 MWh",
            name: "Energy to day",
            type: "Energy"

        },
        {
            data: "46.44 MWh",
            name: "Energy this month",
            type: "Energy"

        },
        {
            data: "258.35 MWh",
            name: "Energy this year",
            type: "Energy"

        },
        {
            data: "458.18 MWh",
            name: "Total Energy",
            type: "Energy"

        },
        {
            data: "75.53 %",
            name: " PR Of Day",
            type: "PR"

        },
        {
            data: " 79.14 %",
            name: " PR Of Month",
            type: "PR"

        },
        {
            data: " 0.00 %",
            name: "PR Of Year",
            type: "PR"

        }]
        )
    }, [])

 
    const getIconBackground = (type) => {
        switch (type) {
            case "Energy":
                return new ItemCard(IconApp.ENEGRY, ColorsApp.ENEGRY_GRADIENT)
            case "Running":
                return new ItemCard(IconApp.RUNNING, ColorsApp.RUNNING_GRADIENT)
            case "Power":
                return new ItemCard(IconApp.POWER, ColorsApp.POWER_GRADIENT)
            default:
                return new ItemCard(IconApp.PR, ColorsApp.RUNNING_GRADIENT)
        }
    }

    return (
        <CardLayout title="Overview" className={classes.root}>
            <Grid container alignItems="stretch" alignContent="stretch" spacing={2}>
                {
                    data.map((item, index) => {
                        var icon = getIconBackground(item.type)
                        return (

                            <Grid item sm={6} xs={12} md={4} lg={3} key={index}>
                                <Card variant="outlined" color="primary"
                                    style={{ background: icon.background }}
                                    className={classes.cardPrimary} >



                                    <CardContent style={{ position: "relative" }} >
                                        <FontAwesomeIcon
                                            style={{
                                                opacity: 0.5,
                                                position: "absolute",
                                                right: 0+theme.spacing(2),
                                            }}
                                            icon={icon.icon} size={"4x"} />
                                        <Typography variant="h5">{item.data}</Typography>
                                        <Typography variant="h6">{item.name}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </CardLayout>
    )
}

class ItemCard {
    constructor(icon, background) {
        this.icon = icon;
        this.background = background;
    }
}