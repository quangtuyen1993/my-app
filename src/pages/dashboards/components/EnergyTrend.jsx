import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import IconApp from "../../../common/icons";
import CardLayout from "../../../common/layouts/CardLayout";
import GraphBar from "../../../components/GraphBar";
import MYearMonthPicker, { MONTH } from "../../../components/MYearMonthPicker";
import { TIMER_TREND } from "../../../const/TimerUpdateConst";
import EnergyService from "../../../service/energy.service";
import DataTrendParser from "../../../utils/DataTrenParser";

export default function EnergyTrend() {
  const timer = useRef(null);
  const [state, setState] = useState({
    type: MONTH,
    data: [],
  });

  const [selectedDate, handleSelectedDate] = useState(new Date());
  const { stationSelected } = useSelector((state) => state.stationReducer);
  const onTypeChange = (type) => {
    setState((pre) => ({
      ...pre,
      type: type,
    }));
  };

  useEffect(() => {
    if (stationSelected.id === undefined) return;
    if (timer.current !== null) clearInterval(timer.current);
    const onFetchEnergyData = async () => {
      var dateFormat = moment.utc(selectedDate).format("yyyy-MM-DD HH:mm:ss");
      var res = await EnergyService.onFetchData({
        time: dateFormat,
        type: state.type,
        stationId: stationSelected.id,
      });
      var cols = DataTrendParser.parserTrend(res.columns, res.rows);
      setState((pre) => ({
        ...pre,
        data: cols,
      }));
    };
    onFetchEnergyData();
    timer.current = setInterval(() => {
      onFetchEnergyData();
    }, TIMER_TREND);
    return () => {
      if (stationSelected.id === undefined) return;
      clearInterval(timer.current);
      EnergyService.source().cancel("destroy")
    };
  }, [selectedDate, state.type, stationSelected.id]);

  return (
    <CardLayout
      icon={IconApp.BOTH}
      title="Historical Energy Trend"
      export={state.data}
    >
      <MYearMonthPicker
        showControl={true}
        defaultType={state.type}
        onTypeChange={onTypeChange}
        defaultDate={selectedDate}
        onDateChange={handleSelectedDate}
      />
      <GraphBar data={state.data} />
    </CardLayout>
  );
}
