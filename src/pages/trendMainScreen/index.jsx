import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid, IconButton } from "@material-ui/core";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import GraphBar, { MONTH_IN_YEAR } from "../../components/GraphBar";
import GraphLineApp from "../../components/GraphLineApp";
import AppDatePicker from "../../components/MDatePicker";
import MDateTimePicker from "../../components/MDateTimePicker";
import HistoricalService from "../../service/historycal.service";
import DataTrendParser from "../../utils/DataTrenParser";
export default function TrendMainScreen() {
  const [state, setState] = useState({
    powerTrend: [],
    radiation: [],
    temp: [],
    summary: [],
    pRHistory: [],
    dateFrom: null,
    dateTo: null,
  });
  const { sensorTable } = useSelector(
    (state) => state.stationReducer.stationSelected
  );
  const [dateState, setDateState] = useState({
    powerTrend: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
    },

    radiation: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
    },
    temp: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
    },
    pRHistory: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
    },
    summary: {
      dateFrom: moment().startOf("day"),
      dateTo: moment().endOf("day"),
    },
  });

  //power trend
  const fetchPowerTrend = useCallback(async () => {
    if (sensorTable === "") return;
    var res = await HistoricalService.fetchJustPower(
      dateState.powerTrend.dateFrom,
      dateState.powerTrend.dateTo,
      sensorTable
    );
    var cols = DataTrendParser.parserTrend(res.columns, res.rows);
    setState((pre) => ({
      ...pre,
      powerTrend: cols[0],
    }));
  }, [dateState.powerTrend.dateFrom, dateState.powerTrend.dateTo, sensorTable]);
  useEffect(() => {
    fetchPowerTrend();
  }, [fetchPowerTrend]);

  //power fetchPowerRadiation
  const fetchPowerRadiation = useCallback(async () => {
    if (sensorTable === "") return;
    var res = await HistoricalService.fetchJustRadiation(
      dateState.radiation.dateFrom,
      dateState.radiation.dateTo,
      sensorTable
    );
    var cols = DataTrendParser.parserTrend(res.columns, res.rows);
    setState((pre) => ({
      ...pre,
      radiation: cols[0],
    }));
  }, [dateState.radiation.dateFrom, dateState.radiation.dateTo, sensorTable]);

  useEffect(() => {
    fetchPowerRadiation();
  }, [fetchPowerRadiation]);

  //power fetchTemp
  const fetchTemp = useCallback(async () => {
    if (sensorTable === "") return;

    var res = await HistoricalService.fetchJustTemp(
      dateState.temp.dateFrom,
      dateState.temp.dateTo,
      sensorTable
    );
    var cols = DataTrendParser.parserTrend(res.columns, res.rows);
    setState((pre) => ({
      ...pre,
      temp: cols[0],
    }));
  }, [dateState.temp.dateFrom, dateState.temp.dateTo, sensorTable]);

  useEffect(() => {
    fetchTemp();
  }, [fetchTemp]);

  //power fetchTemp
  const fetchSummary = useCallback(async () => {
    if (sensorTable === "") return;
    var res = await HistoricalService.fetchData(
      dateState.summary.dateFrom,
      dateState.summary.dateTo,
      sensorTable
    );
    var cols = DataTrendParser.parserTrend(res.columns, res.rows);
    setState((pre) => ({
      ...pre,
      summary: cols,
    }));
  }, [dateState.summary.dateFrom, dateState.summary.dateTo, sensorTable]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const handleChangeDate = ({ name, value }) => {
    setDateState((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  return (
    <>
      <Container disableGutters direction="row" maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout
              icon={IconApp.POWER}
              title="Power Trend"
              export={state.powerTrend}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MDateTimePicker
                    name="powerTrend"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp
                minDate={dateState.powerTrend.dateFrom}
                maxDate={dateState.powerTrend.dateTo}
                data={[state.powerTrend]}
              />
            </CardLayout>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout
              icon={IconApp.RADIATION}
              title="Radiation"
              export={state.radiation}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MDateTimePicker
                    name="radiation"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp
                minDate={dateState.radiation.dateFrom}
                maxDate={dateState.radiation.dateTo}
                data={[state.radiation]}
              />
            </CardLayout>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout
              icon={IconApp.TEMP}
              title="Cell Temperature"
              export={state.temp}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MDateTimePicker
                    name="temp"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp
                minDate={dateState.temp.dateFrom}
                maxDate={dateState.temp.dateTo}
                data={[state.temp]}
              />
            </CardLayout>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout
              icon={IconApp.POWER_TREND}
              title="Sensors"
              export={state.summary}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MDateTimePicker
                    name="summary"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphLineApp
                minDate={dateState.summary.dateFrom}
                maxDate={dateState.summary.dateTo}
                data={state.summary}
              />
            </CardLayout>
          </Grid>

          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
            <CardLayout icon={IconApp.BROADCAST_TOWER} title="Cell Temperature ">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <MYearMonthPicker
                    type={YEAR}
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                  <MDateTimePicker
                    name="pRHistory"
                    typeFormat="dd/MM/yyyy HH:mm:ss"
                    isSingleDate={false}
                    onRangeDateChange={handleChangeDate}
                  />
                </Grid>
              </Grid>

              <GraphBar data={[listData_1]} />
            </CardLayout>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
const listData_1 = {
  name: "m2",
  data: [
    {
      date: "2021-02-25 07:47:00",
      value: 1590,
    },
    {
      date: "2021-03-25 07:47:00",
      value: 1590,
    },
    {
      date: "2021-04-01 12:47:00",
      value: 1408.34691682212,
    },
  ],
};
// const listData_2 = {
//   name: "m2",
//   data: [
//     {
//       date: "2021-04-25T07:47:00",
//       value: 1590,
//     },
//     {
//       date: "2021-05-26T08:47:00",
//       value: 1590.62827417463,
//     },
//     {
//       date: "2021-06-27T08:47:00",
//       value: 1366.8652333397,
//     },
//     {
//       date: "2021-07-28T09:47:00",
//       value: 1599.5579591784,
//     },
//     {
//       date: "2021-08-29T10:47:00",
//       value: 1261.06248709331,
//     },
//     {
//       date: "2021-09-30T11:47:00",
//       value: 1100.55752541558,
//     },
//     {
//       date: "2021-10-01T12:47:00",
//       value: 1408.34691682212,
//     },
//   ],
// };
