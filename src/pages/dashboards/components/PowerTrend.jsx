import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import GraphLineApp from "../../../components/GraphLineApp";
import AppDatePicker from "../../../components/MDatePicker";

export default function PowerTrend() {

    // eslint-disable-next-line no-unused-vars
    const [state,setState]=useState({
        data:[],
        dateFrom:null,
        dateTo:null
    })


    const handleChangeDate=(from,to)=>{

        setState(pre=>{
            return{
                ...pre,
                dateFrom: from,
                dateTo:to
            }
            
        })
    }

    return (
        <CardLayout icon={IconApp.RATIO} title="24h Power Trend">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AppDatePicker
                        isSignleDate={true}
                        onRangeDateChange={handleChangeDate}
                    />
                </Grid>
            </Grid>


            <GraphLineApp type="HourInDate" data={[listData_1, listData_2, listData_3,listData_4]} />
        </CardLayout>

    )
}

const listData_1 = {
    name: "m2",
    data: [
        {
            "date": "Tue Mar 24 2021 00:10:59 GMT+0700",
            "value": 0
        },
        {
            "date": "Tue Mar 24 2021 8:59:59 GMT+0700",
            "value": 1590.62827417463
        },
        {
            "date": "Tue Mar 24 2021 9:59:59 GMT+0700",
            "value": 1366.8652333397
        },
        {
            "date": "Tue Mar 24 2021 10:59:59 GMT+0700",
            "value": 1599.5579591784
        },
        {
            "date": "Tue Mar 24 2021 11:59:59 GMT+0700",
            "value": 1261.06248709331
        },
        {
            "date": "Tue Mar 24 2021 12:59:59 GMT+0700",
            "value": 1100.55752541558
        },
        {
            "date": "Tue Mar 24 2021 13:59:59 GMT+0700",
            "value": 1408.34691682212
        },
        {
            "date": "Tue Mar 24 2021 14:59:59 GMT+0700",
            "value": 1358.54880124382
        },
        {
            "date": "Tue Mar 24 2021 15:59:59 GMT+0700",
            "value": 1589.24026375938
        },
        {
            "date": "Tue Mar 24 2021 16:59:59 GMT+0700",
            "value": 1078.95355730707
        },
        {
            "date": "Tue Mar 24 2021 17:59:59 GMT+0700",
            "value": 1937.29400870586
        },
        {
            "date": "Tue Mar 24 2021 18:59:59 GMT+0700",
            "value": 1619.25576594587
        },
        {
            "date": "Tue Mar 24 2021 19:59:59 GMT+0700",
            "value": 1786.66417814591
        },
        {
            "date": "Tue Mar 24 2021 20:59:59 GMT+0700",
            "value": 1784.25154110894
        },
        {
            "date": "Tue Mar 24 2021 21:59:59 GMT+0700",
            "value": 1791.64107647077
        },

    ]
}
const listData_2 = {
    name: "m1",
    data: [
        {
            "date": "Tue Mar 24 2021 7:59:59 GMT+0700",
            "value": 0
        },
        {
            "date": "Tue Mar 24 2021 8:59:59 GMT+0700",
            "value": 1136.7157763014
        },
        {
            "date": "Tue Mar 24 2021 9:59:59 GMT+0700",
            "value": 1608.28515428007
        },
        {
            "date": "Tue Mar 24 2021 10:59:59 GMT+0700",
            "value": 1065.39646821389
        },
        {
            "date": "Tue Mar 24 2021 11:59:59 GMT+0700",
            "value": 1420.85216966458
        },
        {
            "date": "Tue Mar 24 2021 12:59:59 GMT+0700",
            "value": 1490.44787670509
        },
        {
            "date": "Tue Mar 24 2021 13:59:59 GMT+0700",
            "value": 1292.5441340756
        },
        {
            "date": "Tue Mar 24 2021 14:59:59 GMT+0700",
            "value": 1128.7117154481
        },
        {
            "date": "Tue Mar 24 2021 15:59:59 GMT+0700",
            "value": 1641.52038119099
        },
        {
            "date": "Tue Mar 24 2021 16:59:59 GMT+0700",
            "value": 1245.40482536979
        },
        {
            "date": "Tue Mar 24 2021 17:59:59 GMT+0700",
            "value": 1855.42481368824
        },
        {
            "date": "Tue Mar 24 2021 18:59:59 GMT+0700",
            "value": 1914.422509408
        },
        {
            "date": "Tue Mar 24 2021 19:59:59 GMT+0700",
            "value": 1084.55070654265
        },
        {
            "date": "Tue Mar 24 2021 20:59:59 GMT+0700",
            "value": 1041.2696646868
        },
        {
            "date": "Tue Mar 24 2021 21:59:59 GMT+0700",
            "value": 1418.50817109964
        },

    ]
}
const listData_3 = {
    name: "M3",
    data: [
        {
            "date": "Tue Mar 24 2021 7:59:59 GMT+0700",
            "value": 0
        },
        {
            "date": "Tue Mar 24 2021 8:59:59 GMT+0700",
            "value": 1641.88258125647
        },
        {
            "date": "Tue Mar 24 2021 9:59:59 GMT+0700",
            "value": 1390.44433486406
        },
        {
            "date": "Tue Mar 24 2021 10:59:59 GMT+0700",
            "value": 1612.13636975058
        },
        {
            "date": "Tue Mar 24 2021 11:59:59 GMT+0700",
            "value": 1115.72321673704
        },
        {
            "date": "Tue Mar 24 2021 12:59:59 GMT+0700",
            "value": 1021.83330786308
        },
        {
            "date": "Tue Mar 24 2021 13:59:59 GMT+0700",
            "value": 1627.99014142781
        },
        {
            "date": "Tue Mar 24 2021 14:59:59 GMT+0700",
            "value": 1386.28814515247
        },
        {
            "date": "Tue Mar 24 2021 15:59:59 GMT+0700",
            "value": 1985.58605420089
        },
        {
            "date": "Tue Mar 24 2021 16:59:59 GMT+0700",
            "value": 1985.60324867091
        },
        {
            "date": "Tue Mar 24 2021 17:59:59 GMT+0700",
            "value": 1085.65925705816
        },
        {
            "date": "Tue Mar 24 2021 18:59:59 GMT+0700",
            "value": 1308.46576588809
        },
        {
            "date": "Tue Mar 24 2021 19:59:59 GMT+0700",
            "value": 1833.59508195656
        },
        {
            "date": "Tue Mar 24 2021 20:59:59 GMT+0700",
            "value": 1038.58543797822
        },
        {
            "date": "Tue Mar 24 2021 21:59:59 GMT+0700",
            "value": 1285.49791134709
        },
        {
            "date": "Tue Mar 24 2021 22:59:59 GMT+0700",
            "value": 1238.4989741254
        },
        {
            "date": "Tue Mar 24 2021 23:59:59 GMT+0700",
            "value": 1299.94120546731
        }
    ]
}
const listData_4={
    name:"M4",
    data:[
        {
          "date": "7:59:59 GMT+0700",
          "value": 0
        },
        {
          "date": "8:59:59 GMT+0700",
          "value": 1954.24803048587
        },
        {
          "date": "9:59:59 GMT+0700",
          "value": 1824.80876093296
        },
        {
          "date": "10:59:59 GMT+0700",
          "value": 1833.27232976373
        },
        {
          "date": "11:59:59 GMT+0700",
          "value": 1878.20257085542
        },
        {
          "date": "12:59:59 GMT+0700",
          "value": 1336.38788197172
        },
        {
          "date": "13:59:59 GMT+0700",
          "value": 1468.75103313664
        },
        {
          "date": "14:59:59 GMT+0700",
          "value": 1744.97490554029
        },
        {
          "date": "15:59:59 GMT+0700",
          "value": 1997.30627331414
        },
        {
          "date": "16:59:59 GMT+0700",
          "value": 1236.66975069662
        },
        {
          "date": "17:59:59 GMT+0700",
          "value": 1282.41070855347
        },
        {
          "date": "18:59:59 GMT+0700",
          "value": 1855.08775801428
        },
        {
          "date": "19:59:59 GMT+0700",
          "value": 1426.81000769842
        },
        {
          "date": "20:59:59 GMT+0700",
          "value": 1527.85281285478
        },
        {
          "date": "21:59:59 GMT+0700",
          "value": 1707.99351952768
        },
        {
          "date": "22:59:59 GMT+0700",
          "value": 1621.76211614228
        },
        {
          "date": "23:59:59 GMT+0700",
          "value": 1436.65105280133
        }
       ]
}