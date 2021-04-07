import {
  URL_DEVICES,
  URL_DEVICES_DETAIL,
  URL_HISTORICAL,
  URL_MCCB,
  URL_POWER_METER,
  URL_POWER_METER_DETAIL,
  URL_SENSOR,
} from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const DeviceService = {
  fetchAllInverterDevice: async (idStation) => {
    let response = await AxiosAuthor.post(URL_DEVICES, {
      stationId: idStation,
    });
    return response.data;
  },

  fetchInverterDetail: async (idDevice) => {
    let response = await AxiosAuthor.post(URL_DEVICES_DETAIL, {
      inverterId: idDevice,
    });
    return response.data;
  },

  fetchAllSensor: async (idStation) => {
    let response = await AxiosAuthor.post(URL_SENSOR, {
      stationId: idStation,
    });
    return response.data;
  },

  fetchAllPowerMeter: async (idStation) => {
    let response = await AxiosAuthor.post(URL_POWER_METER, {
      stationId: idStation,
    });
    return response.data;
  },

  fetchAllPowerMeterDetail: async (idPowerMeter) => {
    let response = await AxiosAuthor.post(URL_POWER_METER_DETAIL, {
      id: idPowerMeter,
    });
    return response.data;
  },

  fetchAllMCCB: async (idStation) => {
    let response = await AxiosAuthor.post(URL_MCCB, {
      stationId: idStation,
    });
    return response.data;
  },

  fetchDataPowerMeterInverter: async ({fromDate, toDate, tableName}) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL, {
      fromTime: fromDate,
      toTime: toDate,
      tableName: tableName,
      columns: ["total_active_power", "Radiation"],
    });
    return data.data;
  },
};
export default DeviceService;
