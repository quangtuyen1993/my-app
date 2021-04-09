import { URL_ENERGY } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const EnergyService = {
  onFetchData: async ({ time, stationId, type }) => {
    var data = await AxiosAuthor.post(URL_ENERGY, {
      time: time,
      stationId: stationId,
      type: type,
    });
    return data.data;
  },
};

export default EnergyService;
