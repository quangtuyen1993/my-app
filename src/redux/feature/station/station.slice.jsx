import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApp from "../../../utils/AxiosApp";
import { CookieManger } from "../../../utils/CookieManager";
import { URL_STATIONS } from "../../URL";

const init = {
  stations: [],
  stationSelected: 1,
};

const fetchStation = createAsyncThunk(
  "/fetch_station",
  async (data, { getState, rejectWithValue }) => {
    try {
      return axiosApp.get(URL_STATIONS).then((response) => {
        var currentStation;
        var stations = response.data;
        var stringCookie = CookieManger.GetStationCurrent();
        if (stringCookie !== "" && stringCookie !== undefined) {
          currentStation = JSON.parse(stringCookie);
        } else {
          currentStation = response.data[0].id;
        }
        return {
          stations: stations,
          stationSelected: currentStation,
        };
      });
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      rejectWithValue(err.response.data);
    }
  }
);

const onSelected = createAsyncThunk(
  "/selected_station",
  (data, { getState }) => {
    CookieManger.SetStationCurrent(data);
    return data;
  }
);

export const stationSlice = createSlice({
  name: "station",
  initialState: init,
  reducers: {},
  extraReducers: {
    [fetchStation.fulfilled]: (state, action) => {
      return {
        ...state,
        stations: [...action.payload.stations],
        stationSelected: action.payload.stationSelected,
      };
    },
    [onSelected.fulfilled]: (state, action) => {
      return {
        ...state,
        stationSelected: action.payload,
      };
    },
  },
});
export { fetchStation, onSelected };
// export const { onSelected } = stationSlice.actions;
export default stationSlice.reducer;
