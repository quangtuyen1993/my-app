import { URL_SCHEDULER_TASK } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const SchedulerService = {
  fetchAll: async (stationId) => {
    var data = await AxiosAuthor.post(URL_SCHEDULER_TASK, {
      stationId: stationId,
    });
    return data;
  },
};
export default SchedulerService;
