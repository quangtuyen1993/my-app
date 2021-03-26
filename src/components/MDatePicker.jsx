
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from "@material-ui/core";
import {useEffect, useState } from "react";
import moment from "moment";
import DateUtils from "../utils/DateUtils";
import PropTypes from 'prop-types';

export const TYPE_DATE = "MM/dd/yyyy"
export const TYPE_HOUR_DATE = "MM/dd/yyyy HH:mm:ss"

export default function MDatePicker(props) {
    const [selectedFrom, handleDateFromChange] = useState(new Date().setHours(0, 0, 0))
    const [selectedTo, handleDateToChange] = useState(new Date().setHours(23, 59, 59))
    const [isSignleDate, setIsSignleDate] = useState(false)
    const [typeFormat,setTypeFormat]=useState(TYPE_DATE)


    useEffect(() => {
        if (props.isSignleDate !== undefined) {
            setIsSignleDate(props.isSignleDate)
        }
    }, [props.isSignleDate])

    useEffect(()=>{
       if(props.typeFormat!==undefined){
           setTypeFormat(props.typeFormat)
       }
       console.log(props.typeFormat)
    },[props.typeFormat])


    useEffect(() => {
        if (props.onRangeDateChange !== undefined) {
            props.onRangeDateChange(selectedFrom, selectedTo)
        }
    }, [selectedFrom, selectedTo])

    const onDateChangeFrom = (date, value) => {
        var dateFrom = DateUtils.setHourBeginOfDate(date)
        handleDateFromChange(dateFrom, value)

    }

    const onDateChangeTo = (date, value) => {
        if (!isSignleDate) {
            onDateChangeFrom(date, value)
        }
        var dateTo = DateUtils.setHourEndDay(date)
        handleDateToChange(dateTo, value)
    }


    const renderFromDate = () => {
        if (!isSignleDate) {
            return (
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <KeyboardDatePicker
                        label="From date"
                        inputVariant="outlined"
                        fullWidth
                        variant="inline"
                        autoOk={true}
                        value={selectedFrom}
                        onChange={onDateChangeFrom}
                        format={typeFormat}
                    />
                </Grid>

            )
        }
        return (<div />)
    }

    return (
        <>
            <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}>
                <Grid container spacing={2}>
                    {renderFromDate()}
                    <Grid item xs={12} sm={12} md={6} lg={6}>

                        <KeyboardDatePicker
                            label={isSignleDate ? "Pick date":"To Date"}
                            inputVariant="outlined"
                            fullWidth
                            variant="inline"
                            autoOk={true}
                            value={selectedTo}
                            onChange={onDateChangeTo}
                            format={typeFormat}
                        />
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>

        </>
    )

}
MDatePicker.propTypes = {
    onChangeDateFrom: PropTypes.func,
    onChangeDateTo: PropTypes.func,
    isSignleDate: PropTypes.bool,
    onRangeDateChange: PropTypes.func
}