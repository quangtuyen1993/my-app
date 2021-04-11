import { Container, Grid } from "@material-ui/core";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../common/icons";
import CardLayout from "../../common/layouts/CardLayout";
import GraphLineApp from "../../components/GraphLineApp";
import MDateTimePicker from "../../components/MDateTimePicker";
import { TIMER_TREND } from "../../const/TimerUpdateConst";
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

  const powerTrendTimer = useRef(null);
  useEffect(() => {
    if (sensorTable === "") return;
    const fetchPowerTrend = async () => {
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
    };
    fetchPowerTrend();
    if (powerTrendTimer.current !== null)
      clearInterval(powerTrendTimer.current);
    powerTrendTimer.current = setInterval(() => {
      fetchPowerTrend();
    }, TIMER_TREND);

    return () => {};
  }, [dateState.powerTrend.dateFrom, dateState.powerTrend.dateTo, sensorTable]);

  //power fetchPowerRadiation
  const fetchPowerRadiationTimer = useRef(null);

  useEffect(() => {
    if (sensorTable === "") return;

    const fetchPowerRadiation = async () => {
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
    };

    fetchPowerRadiation();

    if (fetchPowerRadiationTimer.current !== null)
      clearInterval(fetchPowerRadiationTimer.current);
    fetchPowerRadiationTimer.current = setInterval(() => {
      fetchPowerRadiation();
    }, TIMER_TREND);
  }, [dateState.radiation.dateFrom, dateState.radiation.dateTo, sensorTable]);

  //power fetchTemp
  const fetchTempTimer = useRef(null);
  useEffect(() => {

    if (sensorTable === "") return;
    if (fetchTempTimer.current !== null) clearInterval(fetchTempTimer.current);
    const fetchTemp = async () => {
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
    };
    fetchTemp();
    fetchTempTimer.current = setInterval(() => {
      fetchTemp();
    }, TIMER_TREND);
    
  }, [dateState.temp.dateFrom, dateState.temp.dateTo, sensorTable]);

  //power fetchTemp
  const fetchSummaryTimer = useRef(null);

  useEffect(() => {
    if (sensorTable === "") return;
    const fetchSummary = async () => {
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
    };

    fetchSummary();
    if (fetchSummaryTimer.current !== null)
      clearInterval(fetchSummaryTimer.current);
    fetchSummaryTimer.current = setInterval(() => {
      fetchSummary();
    }, TIMER_TREND);
  }, [dateState.summary.dateFrom, dateState.summary.dateTo, sensorTable]);

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
