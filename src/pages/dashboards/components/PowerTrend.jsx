import IconApp from "../../../common/icons"
import React, { useState } from "react"
import CardLayout from "../../../common/layouts/CardLayout"
import GraphLineApp from "../../../components/GraphLineApp";
import AppDatePicker from "../../../components/AppDatePicker";
import { Grid } from "@material-ui/core";

export default function PowerTrend() {

    //date picker state
    const [selectedFrom, handleDateFromChange] = useState(new Date())
    const [selectedTo, handleDateToChange] = useState(new Date())

    const onPickerFromChange = (e) => {
        console.log(JSON.stringify(e))
        var datePicker = new Date(e.toString());
        console.log(datePicker)
        handleDateFromChange(e)
    }
    return (
        <CardLayout icon={IconApp.POWERTREND} title="24h Power Trend">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <AppDatePicker fullWidth label="From" value={selectedFrom} onChange={onPickerFromChange} />

                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3}>
                    <AppDatePicker fullWidth label="To" value={selectedTo} onChange={handleDateToChange} />
                </Grid>
            </Grid>


            <GraphLineApp type="HourInDate" />
        </CardLayout>

    )
}
