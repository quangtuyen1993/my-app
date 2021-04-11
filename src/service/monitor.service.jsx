import { URL_STRING_MONITOR } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const MonitorService = {
  fetchData: async (stationId) => {
    var data = await AxiosAuthor.post(URL_STRING_MONITOR, {
      StationId: stationId,
    });
    return data.data;
  },
};

export default MonitorService;
