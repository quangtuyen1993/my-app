import { URL_DEVICES, URL_DEVICES_DETAIL, URL_POWER_METER, URL_SENSOR } from "../redux/URL";
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

  fetchAllPowerMeter: async(idStation)=>{
    let response = await AxiosAuthor.post(URL_POWER_METER, {
      stationId: idStation,
    });
    return response.data;
  }
};
export default DeviceService;
