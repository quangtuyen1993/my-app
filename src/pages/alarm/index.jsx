import { Box, Button, Container, Grid } from "@material-ui/core";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import MDateTimePicker from "../../components/MDateTimePicker";
import MTableMaterial from "../../components/MTableMaterial";
import AlarmService from "../../service/alarm.service";

export default function AlarmScreen() {
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const timer = useRef(null);
  const [state, setState] = useState({
    fromDate: null,
    toDate: null,
    alarmRealTime: [],
    alarmHistorical: [],
    historical: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
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
  const fetchRealTimeData = useCallback(async () => {
    if (stationSelected.id === undefined) return;
    var data = await AlarmService.fetchRealTime({
      stationId: stationSelected.id,
    });
    console.info(data);
    setState((pre) => ({
      ...pre,
      alarmRealTime: data,
    }));
  }, [stationSelected]);

  const fetchHistoricalData = useCallback(async () => {
    if (stationSelected.id === undefined) return;

    var data = await AlarmService.fetchHistorical({
      stationId: stationSelected.id,
      fromTime: state.historical.dateFrom,
      toTime: state.historical.dateTo,
    });

    setState((pre) => ({
      ...pre,
      alarmHistorical: data,
    }));
  }, [state.historical.dateFrom, state.historical.dateTo, stationSelected]);

  useEffect(() => {
    fetchRealTimeData();
    fetchHistoricalData();
  }, [fetchHistoricalData, fetchRealTimeData, stationSelected.id]);

  //timer
  useEffect(() => {
    if (timer.current !== null) clearInterval(timer.current);
    timer.current = setInterval(() => {
      fetchRealTimeData();
    }, 10000);
    return () => {
      clearInterval(timer.current);
    };
  }, [fetchHistoricalData, fetchRealTimeData]);

  const ackAlarm = useCallback(
    async (item) => {
      var data = await AlarmService.ackAlarm(
        stationSelected.id,
        item.name,
        item.alarmType,
        item.incommingTime.replace("T", " "),
        "comment"
      );
      if (data.success) {
        fetchRealTimeData();
        fetchHistoricalData();
      }
    },
    [fetchHistoricalData, fetchRealTimeData, stationSelected.id]
  );

  const ackAlarmAll = async () => {
    var data = await AlarmService.ackAllAlarm(stationSelected.id);
    if (data.success) {
      fetchRealTimeData();
      fetchHistoricalData();
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
          disabled={item.state !== "out"}
          onClick={()=>ackAlarm(item)}
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
                refresh={fetchHistoricalData}
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
