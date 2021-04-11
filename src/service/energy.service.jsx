import axios from "axios";
import { URL_ENERGY } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const EnergyService = {
  source: () => axios.CancelToken.source(),
  onFetchData: async ({ time, stationId, type }) => {
    var data = await AxiosAuthor.post(
      URL_ENERGY,
      {
        time: time,
        stationId: stationId,
        type: type,
      },
      {
        cancelToken: EnergyService.source().token,
      }
    );
    return data.data;
  },
};

export default EnergyService;
