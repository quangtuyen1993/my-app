import { Box, Container, Grid, TextField } from "@material-ui/core";
import { useState } from "react";
import CardLayout from "../../common/layouts/CardLayout";
import AppDatePicker from "../../components/AppDatePicker";
import TableApp from "../../components/TableApp";

export default function AlarmScreen() {
    const [selectedFrom, handleDateFromChange] = useState(new Date())
    const [selectedTo, handleDateToChange] = useState(new Date())
    const onPickerFromChange = (e) => {
        console.log(JSON.stringify(e))
        var datePicker = new Date(e.toString());
        console.log(datePicker)
        handleDateFromChange(e)
    }

    return (
        <>
            <Container
                disableGutters
                direction="row"
                maxWidth={false}
            >
                <Grid container
                    maxWidth={false}
                    spacing={2}
                >
                    <Grid item sm={12} lg={12}>

                        <CardLayout>
                            <Box m={2}>
                                <AppDatePicker label="From" value={selectedFrom} onChange={onPickerFromChange} />

                            </Box>
                            <Box m={2}>
                                <AppDatePicker label="To" value={selectedTo} onChange={handleDateToChange} />

                            </Box>
                            <Box m={2}>
                                <TextField
                                    placeholder="search" />
                            </Box>


                            <Grid item sm={12} lg={12}>
                                <TableApp
                                    data={historycal}
                                    field={["Action", "State", "Name", "Incomming Time", "Alarm Text", "Value", "Limit", "Compare Mode", "Outgoing Time", "Ack Time"]}
                                    chipField={["Action"]}

                                />
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