import { URL_OVERVIEW } from "../redux/URL";
import axiosAuthor from "../utils/AxiosAuthor";

const OverviewService = {
  fetchOverview: async (idStation) => {
    var response = await axiosAuthor.post(URL_OVERVIEW, {
      stationId: idStation,
    });
    var data = response.data
    return data;
  },
};
export default OverviewService;
