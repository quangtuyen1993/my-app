import { Box, Button, Container, Grid } from "@material-ui/core";
import { KeyboardReturnOutlined } from "@material-ui/icons";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import MDateTimePicker from "../../components/MDateTimePicker";
import MTableMaterial from "../../components/MTableMaterial";
import { fetchAlarmCount } from "../../redux/feature/alarm/alarm.slice";
import AlarmService from "../../service/alarm.service";

export default function AlarmScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const dispatch = useDispatch();
  const timer = useRef(null);
  const [state, setState] = useState({
    fromDate: null,
    toDate: null,
    alarmRealTime: [],
    alarmHistorical: [],
    historical: {
      dateFrom: "",
      dateTo: "",
    },
  });

  const handleChangeDate = ({ name, value }) => {
    setState((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const refreshData = async () => {

    if (stationSelected.id === undefined) return;
    
    var realTime = await AlarmService.fetchRealTime({
      stationId: stationSelected.id,
    });

    var history = await AlarmService.fetchHistorical({
      stationId: stationSelected.id,
      fromTime: state.historical.dateFrom,
      toTime: state.historical.dateTo,
    });
    
    setState((pre) => ({
      ...pre,
      alarmHistorical: history,
      alarmRealTime: realTime,

    }));
  };

  useEffect(() => {
    if (stationSelected.id === undefined) return;
    const refreshAlarmRealtime = async () => {
      var data = await AlarmService.fetchRealTime({
        stationId: stationSelected.id,
      });
      setState((pre) => ({
        ...pre,
        alarmRealTime: data,
      }));
    };
    refreshAlarmRealtime();
    if (timer.current !== null) clearInterval(timer.current);
    timer.current = setInterval(() => {
      refreshAlarmRealtime();
    }, 10000);
    return () => {
      if (stationSelected.id === undefined) return;
      clearInterval(timer.current);
      AlarmService.source().cancel();
    };
  }, [stationSelected.id]);

  useEffect(() => {
    const { dateFrom, dateTo } = state.historical;
    if (dateFrom === "" || dateTo === "" || stationSelected.id === undefined)
      return;
    const fetchHistoricalData = async () => {
      if (stationSelected.id === undefined) return;
      var data = await AlarmService.fetchHistorical({
        stationId: stationSelected.id,
        fromTime: dateFrom,
        toTime: dateTo,
      });
      setState((pre) => ({
        ...pre,
        alarmHistorical: data,
      }));
    };
    fetchHistoricalData();
  }, [state.historical, stationSelected.id]);

  const ackAlarm = async (item) => {
    var data = await AlarmService.ackAlarm(
      stationSelected.id,
      item.name,
      item.alarmType,
      item.incommingTime.replace("T", " "),
      "comment"
    );
    dispatch(fetchAlarmCount({ stationSelected: stationSelected.id }));
    if (data.success) {
      refreshData();
    }
  };

  const ackAlarmAll = async () => {
    var data = await AlarmService.ackAllAlarm(stationSelected.id);
    if (data.success) {
      refreshData();
    }
  };

  const ackAction = {
    name: "Action",
    component: (item, index) => (
      <Box
        key={index}
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        alignSelf="center"
      >
        <Button
          disabled={item.state !== "Out"}
          onClick={() => ackAlarm(item)}
          color="secondary"
          style={{ borderRadius: 50, color: "white" }}
          variant="contained"
        >
          Ack
        </Button>
      </Box>
    ),
  };

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12} xs={12} lg={12}>
            <CardLayout title="Realtime Alarms" icon={IconApp.ALARM}>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                  <Box style={{ overflowX: "auto" }}></Box>
                </Grid>
              </Grid>
              <MTableMaterial
                askAll={ackAlarmAll}
                addControlFirst={true}
                showSearch={true}
                rowsPerPage={5}
                dataSource={state.alarmRealTime}
                addControlColumns={[ackAction]}
                fieldArray={[
                  "name",
                  "incommingTime",
                  "alarmText",
                  "value",
                  "limit",
                  "compareMode",
                  "outgoingTime",
                  "ackTime",
                  "state",
                ]}
              />
            </CardLayout>
          </Grid>

          {/*history  */}
          <Grid item sm={12} md={12} xs={12} lg={12}>
            <CardLayout title="Historical Alarms" icon={IconApp.CLOCK}>
              <Grid container spacing={2}>
                <Grid item sm={12} lg={6}>
                  <MDateTimePicker
                    name="historical"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Box style={{ overflowX: "auto" }}></Box>
                </Grid>
              </Grid>
              <MTableMaterial
                refresh={refreshData}
                askAll={ackAlarmAll}
                addControlFirst={true}
                showSearch={true}
                rowsPerPage={50}
                dataSource={state.alarmHistorical}
                addControlColumns={[ackAction]}
                fieldArray={[
                  "name",
                  "incommingTime",
                  "alarmText",
                  "value",
                  "limit",
                  "compareMode",
                  "outgoingTime",
                  "ackTime",
                  "state",
                ]}
              />
            </CardLayout>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
