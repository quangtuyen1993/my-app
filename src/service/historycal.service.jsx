import { URL_HISTORICAL } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const EntityTable = Object.freeze({
  POWER: "Power",
  RADIATION: "Radiation",
  TEMP: "Temp",
});

const HistoricalService = {
  fetchData: async (fromDate, toDate, tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: [EntityTable.POWER, EntityTable.RADIATION, EntityTable.TEMP],
    });
    return data.data;
  },
  fetchJustPower: async (fromDate, toDate, tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: [EntityTable.POWER],
    });
    return data.data;
  },
  fetchJustRadiation: async (fromDate, toDate, tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: [EntityTable.RADIATION],
    });
    return data.data;
  },
  fetchJustTemp: async (fromDate, toDate, tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: [EntityTable.TEMP],
    });
    return data.data;
  },
  fetchJustTotal: async (fromDate, toDate, tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: [EntityTable.TOTAL],
    });
    return data.data;
  },
};

export default HistoricalService;
