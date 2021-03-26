import { Container, Grid, useTheme } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import CardLayout from "../../common/layouts/CardLayout";
import MDatePicker from "../../components/MDatePicker";
import SearchBar from "../../components/SearchBar";
import TableApp from "../../components/TableApp";

export default function AlarmScreen() {
    const theme = useTheme()
    const boundTable = useRef(null)
    const [state, setState] = useState({
        fromDate: null,
        toDate: null,
        heightTable: 100
    })


    useEffect(() => {
        try{
            var newHeight = boundTable.current.getBoundingClientRect()
            if (state.heightTable !== newHeight.height + theme.spacing(2) * 2)
                setState(pre => {
                    return {
                        ...pre,
                        heightTable: newHeight.height + theme.spacing(2) * 2
                    }
                })
        }catch(e){
            console.log(e.message)
        }


    }, [state.heightTable])


    const handleRangeDateChange = (from, to) => {
        console.log(from, to)
        setState(pre => {
            return {
                ...pre,
                fromDate: from,
                toDate: to
            }
        })
    }



    return (
        <>
            <Container
                disableGutters
                direction="row"
                maxWidth={false}
            >
                {console.log("Alarm is loading")}
                <Grid container
                    spacing={2}
                >
                    <Grid item sm={12} lg={12}>
                        <CardLayout>
                            <Grid container spacing={2} >
                                <Grid item sm={12}>
                                    <Grid container justify="flex-start" spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6} >
                                            <MDatePicker
                                                isSignleDate={false}
                                                onRangeDateChange={handleRangeDateChange} />
                                        </Grid>
                                        <Grid item sm={12} xs={12} md={6} lg={6}>
                                            <Grid container justify="flex-end">
                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                    <SearchBar  />
                                                </Grid>

                                            </Grid>


                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={12} xs={12} style={{
                                    overflow: "auto",
                                    whiteSpace: 'nowrap',
                                    position: "relative",
                                    height: state.heightTable,
                                    display: "inline-block",
                                }}>
                                    <div style={{
                                        whiteSpace: 'wrap',
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        right: 0
                                    }}>
                                        <TableApp
                                            ref={boundTable}
                                            onChipClick={(i, f) => console.log(i, f)}
                                            data={historycal}
                                            field={["Action", "State", "Name", "Incomming Time", "Alarm Text", "Value", "Limit", "Compare Mode", "Outgoing Time", "Ack Time"]}
                                            chipField={["Action"]}
                                        />
                                    </div>

                                </Grid>
                            </Grid>


                        </CardLayout>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
}
const historycal = [
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:29:23",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:29:25",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:31:37",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:31:38",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:32:58",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:32:59",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:33:16",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:33:18",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:39:46",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:39:47",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:40:23",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:40:26",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:43:06",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:43:07",
        "Ack Time": "2021-03-23 16:56:28"
    },

    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:29:23",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:29:25",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:31:37",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:31:38",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:32:58",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:32:59",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:33:16",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:33:18",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:39:46",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:39:47",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:40:23",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:40:26",
        "Ack Time": "2021-03-23 16:56:28"
    },
    {
        "Action": "Done",
        "State": "Ack",
        "Name": "Quality_Sensor_Wind",
        "Incomming Time": "2021-03-23 16:43:06",
        "Alarm Text": "Wind sensor was disconnected",
        "Value": "Bad",
        "Limit": "Bad",
        "Compare Mode": "Equal",
        "Outgoing Time": "2021-03-23 16:43:07",
        "Ack Time": "2021-03-23 16:56:28"
    }
]