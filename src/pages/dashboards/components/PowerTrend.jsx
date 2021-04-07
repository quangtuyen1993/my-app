import { Grid } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import GraphLineApp from "../../../components/GraphLineApp";
import MDatePicker from "../../../components/MDatePicker";
import HistoricalService from "../../../service/historycal.service";
import DataTrendParser from "../../../utils/DataTrenParser";
export default function PowerTrend() {
  const { sensorTable } = useSelector(
    (state) => state.stationReducer.stationSelected
  );
  const timer = useRef(null);

  const [state, setState] = useState({
    dataSet: [],
    dateFrom: moment().startOf("day"),
    dateTo: moment().endOf("day"),
  });

  useEffect(() => {
    const onFetchData = async () => {
      if (sensorTable === "") return;
      var res = await HistoricalService.fetchData(
        state.dateFrom,
        state.dateTo,
        sensorTable
      );

      var cols =  DataTrendParser.parserTrend(res.columns, res.rows);

      setState((pre) => ({
        ...pre,
        dataSet: [...cols],
      }));
    };
    onFetchData();
  }, [sensorTable, state.dateFrom, state.dateTo]);

  const handleChangeDate = (from, to) => {
    setState((pre) => {
      return {
        ...pre,
        dateFrom: from,
        dateTo: to,
      };
    });
  };

  return (
    <CardLayout icon={IconApp.RATIO} title="24h Power Trend" >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <MDatePicker
            isSingleDate={true}
            onRangeDateChange={handleChangeDate}
          />
        </Grid>
      </Grid>
      <GraphLineApp
        minDate={state.dateFrom}
        maxDate={state.dateTo}
        type="HourInDate"
        data={state.dataSet}
      />
    </CardLayout>
  );
}
