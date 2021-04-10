import { URL_SCHEDULER, URL_SCHEDULER_TASK } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

// "id": 0,
// "startTime": "2021-04-09T20:06:38.145Z",
// "endTime": "2021-04-09T20:06:38.145Z",
// "status": 0,
// "content": "string",
// "stationId": 0,
// "accountId": 0

const SchedulerService = {
  fetchAll: async (stationId) => {
    var data = await AxiosAuthor.post(URL_SCHEDULER_TASK, {
      stationId: stationId,
    });
    return data;
  },
  insert: async ({ stationId, accountId, startTime, endTime, content }) => {
    var data = await AxiosAuthor.post(URL_SCHEDULER, {
      stationId: stationId,
      accountId: accountId,
      startTime: startTime,
      endTime: endTime,
      content: content,
      status: 0,
    });
    return data;
  },

  update: async ({ id, stationId, accountId, startTime, endTime, content }) => {
    var data = await AxiosAuthor.put(URL_SCHEDULER + "/" + id, {
      id: id,
      stationId: stationId,
      accountId: accountId,
      startTime: startTime,
      endTime: endTime,
      content: content,
      status: 0,
    });
    return data;
  },
  remove: async ({ id }) => {
    var data = await AxiosAuthor.delete(URL_SCHEDULER + "/" + id, {
      id: id,
    });
    return data;
  },
};
export default SchedulerService;
