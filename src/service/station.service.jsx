import { URL_STATIONS } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const StationService = {
  getStation: async () => {
    var data = await AxiosAuthor.post(URL_STATIONS);
    return data;
  },
};
export default StationService