
import { useState, useEffect } from "react"
import CardLayout from "../../../common/layouts/CardLayout"
import { makeStyles ,useTheme} from '@material-ui/core/styles';

import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconApp from "../../../common/icons";
import ColorsApp from "../../../common/colors";


const object=
{
        Active_Power: "-0.04 kW",
        Reactive_Power: "0 kVar",
        Inverter_Running: "8/8",
        Energy_to_day: "2.73 MWh",
        Energy_this_month: "46.44 MWh",
        Energy_this_year: "258.35 MWh",
        Total_Energy: "458.18 MWh",
        PR_Of_Day: "75.53 %",
        PR_Of_Month: " 79.14 %",
        PR_Of_Year: " 0.00 %",

}
const Type=Object.freeze({
    ENG:"Energy",
    PR:"PR",
    POWER:"Power",
    RUN:"Running",
    TOTAL:"Total"
})


const getTypeField=(fieldStr)=>{
    if(fieldStr.includes(Type.ENG.valueOf())) {
        return {
            type:Type.ENG.valueOf(),
            icon:IconApp.ENERGY,
            bg: ColorsApp.ENERGY_GRADIENT
        } 
    }
    if(fieldStr.includes(Type.PR.valueOf())){
        return{
            type: Type.PR.valueOf(),
            icon:IconApp.PR,
            bg: ColorsApp.RUNNING_GRADIENT
        } 
    }
    if(fieldStr.includes(Type.POWER.valueOf())){
        return{
            type: Type.POWER.valueOf(),
            icon:IconApp.POWER,
            bg: ColorsApp.POWER_GRADIENT
        } 
    }
    if(fieldStr.includes(Type.RUN.valueOf())){

        return{
            type: Type.RUN.valueOf(),
            icon:IconApp.RUNNING,
            bg: ColorsApp.RUNNING_GRADIENT
        } 
       

    }
    if(fieldStr.includes(Type.TOTAL.valueOf())){
        return{
            type: Type.TOTAL.valueOf(),
            icon:IconApp.RUNNING,
            bg: ColorsApp.RUNNING_GRADIENT
        }

    }
}

const createListItem=(object)=>{
    var listItem=[]
    var field=Object.keys(object)
    field.forEach((f)=>{
      var obPattern = getTypeField(f)



      var name= f.toLocaleUpperCase()
      var value=object[f]
      
      var obj={
          ...obPattern,
          name,
          value
      }
      
      listItem.push(obj)
    })
    return listItem

}
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
        console.log(createListItem(object))
       var data = createListItem(object)
        setData([...data])
    }, [])

 

    return (
        <CardLayout title="Overview" className={classes.root}>
            <Grid container alignItems="stretch" alignContent="stretch" spacing={2}>
                {
                   data.map((item, index) => {
                        return (
                            <Grid item sm={6} xs={12} md={4} lg={3} key={index}>
                                <Card variant="outlined" color="primary"
                                    style={{ background: item.bg }}
                                    className={classes.cardPrimary} >
                                    <CardContent style={{ position: "relative" }} >
                                        <FontAwesomeIcon
                                            style={{
                                                opacity: 0.5,
                                                position: "absolute",
                                                right: 0+theme.spacing(2),
                                            }}
                                            icon={item.icon} size={"3x"} />
                                        <Typography variant="h5">{item.value}</Typography>
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
