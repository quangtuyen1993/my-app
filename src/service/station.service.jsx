import { URL_STATIONS, URL_GET_STATION } from "../redux/URL";
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
};
export default StationService