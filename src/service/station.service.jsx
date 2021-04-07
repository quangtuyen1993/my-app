import { URL_STATIONS } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const StationService = {
  getStation: async () => {
    var data = await AxiosAuthor.post(URL_STATIONS);
    console.log("DATA",data)
    return data;
  },
};
export default StationService