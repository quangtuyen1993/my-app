import {
  URL_STATIONS,
  URL_GET_STATION,
  URL_STATION_INFO,
  URL_STATIONS_USERS,
  URL_STATIONS_USERS_UPDATE,
} from "../redux/URL";
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
  getStationUser: async ({ accountId }) => {
    var data = await AxiosAuthor.post(URL_STATIONS_USERS, {
      accountId: accountId,
    });
    return data.data;
  },
  updateStationAvailable: async (arrayData) => {
    var res = await AxiosAuthor.post(URL_STATIONS_USERS_UPDATE, arrayData);
    return res.data;
  },
};
export default StationService;
