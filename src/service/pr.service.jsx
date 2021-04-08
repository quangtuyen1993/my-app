import { URL_PR_DATE } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const PRService = {
  getPRofDay: async (stationId) => {
    var res = await AxiosAuthor.post(URL_PR_DATE, {
      stationId: stationId,
    });
    return res.data;
  },

  getPRofMonth: async (stationId) => {
    var res = await AxiosAuthor.post(URL_PR_DATE, {
      stationId: stationId,
    });
    return res.data;
  },
};
export default PRService;
