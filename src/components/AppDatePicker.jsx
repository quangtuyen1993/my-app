
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
export default function AppDatePicker(props) {
    return (
        <>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                style={{
                }}
                    {...props}
                    clearable
                    minDate={new Date()}
                    format="MM/dd/yyyy"
                />
            </MuiPickersUtilsProvider>
        </>


    )

}