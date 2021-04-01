import { URL_DEVICES, URL_DEVICES_DETAIL } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const DeviceService = {
  
    fetchAllDevice: async (idStation) => {
    let response = await AxiosAuthor.post(URL_DEVICES, {
      stationId: idStation,
    });
    return response.data;
  },

  fetchDeviceDetail: async (idDevice) => {
    let response = await AxiosAuthor.post(URL_DEVICES_DETAIL, {
      inverterId: idDevice,
    });
    return response.data;
  },
};
export default DeviceService;
