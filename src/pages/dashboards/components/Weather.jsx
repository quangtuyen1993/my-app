import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {Card, CardContent, Grid, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import IconApp from "../../../common/icons"
import CardLayout from "../../../common/layouts/CardLayout"
import { makeStyles } from '@material-ui/core/styles';
import ColorsApp from "../../../common/colors"

const title = "Weather"
var list = [{
    type: "Radiation",
    value: "0 W/m2",
    name: "Radiation"
},
{
    type: "Wind",
    value: "3.7 m/s",
    name: "Wind Speed"
},
{
    type: "Temp",
    value: "26.2 °C",
    name: "Cell Temp"
}
]


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    icon: {
        display: 'flex',
        grow: 1,
        background:ColorsApp.RUNNING_GRADIENT
    },

}));
export default function Weather(props) {

    const classes = useStyles();



    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        setdataSource(list)
    }, [])


    const getIcon = (type) => {
        switch (type) {
            case `Wind`:
                return IconApp.WIND
            case `Radiation`:
                return IconApp.RATATION
            default:
                return IconApp.TEMP
        }
    }

    return (
        <CardLayout icon={IconApp.WEATHER} title={title}>
            <Grid container spacing={2}>
                {
                    dataSource.map((item, index) => {
                        let icon=getIcon(item.type)
                        return (
                            <Grid item key={index} xs={12}   sm={6} md={4} lg={3}>
                                <Card className={classes.root}>
                                    <CardContent  className={classes.icon}>
                                        <FontAwesomeIcon color="white" icon={icon} size={"4x"} />
                                    </CardContent>
                                    <div className={classes.details}>
                                        <CardContent className={classes.content} >
                                            <Typography>
                                                {item.name}
                                            </Typography>
                                            <Typography>
                                                {item.value}
                                            </Typography>
                                        </CardContent>
                                    </div>

                                </Card>

                            </Grid>
                        )
                    })
                }
            </Grid>

        </CardLayout>
    )
}

