import { URL_PR_DATE, URL_PR_MONTH, URL_PR_OF_TIME } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const PRService = {
  getPRofDay: async (stationId) => {
    var res = await AxiosAuthor.post(URL_PR_DATE, {
      stationId: stationId,
    });
    return res.data;
  },

  getPRofMonth: async (stationId) => {
    var res = await AxiosAuthor.post(URL_PR_MONTH, {
      stationId: stationId,
    });
    return res.data;
  },
  getPRofTime: async ({ stationId, fromTime, toTime, t_ref, g_hor, g_inc }) => {
    console.log(stationId, fromTime, toTime, t_ref, g_hor, g_inc);
    var res = await AxiosAuthor.post(URL_PR_OF_TIME, {
      stationId: stationId,
      fromTime: fromTime,
      toTime: toTime,
      t_ref: t_ref,
      g_hor: g_hor,
      g_inc: g_inc,
    });
    return res.data;
  },
};
export default PRService;
