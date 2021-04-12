import axios from "axios";
import {
  URL_ALARM_ACK,
  URL_ALARM_ALL,
  URL_ALARM_COUNT,
  URL_ALARM_HISTORY,
  URL_ALARM_REALTIME,
} from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const AlarmService = {
  source:()=> axios.CancelToken.source(),
  fetchRealTime: async ({ stationId }) => {
    var data = await AxiosAuthor.post(URL_ALARM_REALTIME, {
      stationId: stationId,
    },{
      cancelToken:AlarmService.source().token
    }
    );
    return data.data;
  },
  fetchHistorical: async ({ stationId, fromTime, toTime }) => {
    var data = await AxiosAuthor.post(URL_ALARM_HISTORY, {
      fromTime: fromTime,
      toTime: toTime,
      stationId: stationId,
    },{
      cancelToken:AlarmService.source().token
    });
    return data.data;
  },
  ackAlarm: async (stationId, alarmName, alarmType, incommingTime, comment) => {
    var data = await AxiosAuthor.post(URL_ALARM_ACK, {
      stationId: stationId,
      alarmName: alarmName,
      alarmType: alarmType,
      incommingTime: incommingTime,
      comment: comment,
    },{
      cancelToken:AlarmService.source().token
    });
    return data.data;
  },

  ackAllAlarm: async (stationId) => {
    var data = await AxiosAuthor.post(URL_ALARM_ALL, {
      stationId: stationId,
    },{
      cancelToken:AlarmService.source().token
    });
    return data.data;
  },
  alarmNotification: async (stationId) => {
    var data = await AxiosAuthor.post(URL_ALARM_COUNT, {
      stationId: stationId,
    });
    return data.data.count;
  },
};
export default AlarmService;
