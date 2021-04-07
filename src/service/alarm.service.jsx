import { URL_ALARM_HISTORY, URL_ALARM_REALTIME } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const AlarmService = {
  fetchRealTime: async ({ stationId }) => {
    var data = await AxiosAuthor.post(URL_ALARM_REALTIME, {
      stationId: stationId,
    });
    return data.data;
  },
  fetchHistorical: async ({ stationId }) => {
    var data = await AxiosAuthor.post(URL_ALARM_HISTORY, {
      fromTime: "2021-04-05 00:00:00",
      toTime: "2021-04-06 00:00:00",
      stationId: stationId,
    });
    return data.data;
  },
};
export default AlarmService;
