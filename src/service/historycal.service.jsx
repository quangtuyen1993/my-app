import { URL_HISTORICAL } from "../redux/URL";
import AxiosAuthor from "../utils/AxiosAuthor";

const HistoricalService = {
  fetchData: async (fromDate,toDate,tableName) => {
    var data = await AxiosAuthor.post(URL_HISTORICAL,{
        "fromTime": fromDate,
        "toTime": toDate,
        "tableName": tableName,
        "columns": [
                "Power",
                "Radiation",
                "Temp"
        ]
    });
    return data.data;
  },

};



export default HistoricalService;
