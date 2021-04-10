import { URL_STATIONS, URL_GET_STATION, URL_STATION_INFO } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const StationService = {
  getStation: async () => {
    var data = await AxiosAuthor.post(URL_STATIONS);
    return data;
  },
  getStationById: async (idStation) => {
    var url = URL_GET_STATION + idStation;
    var data = await AxiosAuthor.get(url);
    return data;
  },
  getStationInfo: async (idStation) => {
    var url = URL_STATION_INFO + "/" + idStation;
    var data = await AxiosAuthor.get(url);
    return data.data;
  },
};
export default StationService;
