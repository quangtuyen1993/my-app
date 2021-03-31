import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Resources,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DragDropProvider,
  DateNavigator,
  WeekView,
  Toolbar,
  ViewSwitcher,
} from "@devexpress/dx-react-scheduler-material-ui";
import { appointments, resourcesData } from "./resource";
export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resources: [
        {
          fieldName: "deviceId",
          title: "Device",
          instances: resourcesData,
        },
      ],
    };

    this.commitChanges = this.commitChanges.bind(this);
  }
  dataShow = () => {
    var mList = [];
    appointments.forEach((item) => {
      var position = resourcesData.map((rs) => rs.id).indexOf(item.deviceId);
      var { text } = resourcesData[position];
      var mObj = { ...item, title: text.toLocaleUpperCase() };
      mList.push(mObj);
    });
    return mList;
  };

  componentDidMount = () => {
    var newList = this.dataShow();

    this.setState({
      data: newList,
      resources: this.state.resources,
    });
  };

  //handle change in scheduler
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { data, resources } = this.state;

    return (
      <Paper>
        <Scheduler data={data}
        
      
        >
          <ViewState defaultCurrentDate="2017-05-25" />
          <EditingState onCommitChanges={this.commitChanges} />
          <EditRecurrenceMenu />

          <WeekView startDayHour={7} endDayHour={17}  />
          <MonthView startDayHour={7} endDayHour={17} />
          <Appointments  />
          <AppointmentTooltip showOpenButton />
          <AppointmentForm
            booleanEditorComponent={() => null}
            weeklyRecurrenceSelectorComponent={() => null}
            selectComponent={() => null}
            radioGroupComponent={() => null}
          />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />

          <Resources data={resources} mainResourceName="deviceId"  />
          <DragDropProvider />
        </Scheduler>
      </Paper>
    );
  }
}
