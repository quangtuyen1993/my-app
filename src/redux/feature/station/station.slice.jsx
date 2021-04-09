import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StationService from "../../../service/station.service";
import { CookieManger } from "../../../utils/CookieManager";

const init = {
  isLoading: false,
  message: "",
  isError: false,
  stations: [],
  stationSelected: { },
};

const fetchStation = createAsyncThunk(
  "/fetch_station",
  async (data, { getState, rejectWithValue }) => {
    return StationService.getStation()
      .then((response) => {
        var currentStation;
        var stations = response.data;
        var stringCookie = CookieManger.GetStationCurrent();
        console.info("ATAT", response.data);
        if (response.data.length<=0) {
          throw new Error("No Have Station Available");
        }
        if (stringCookie !== "" && stringCookie !== undefined) {
          currentStation = response.data.find(
            (d) => d.id === JSON.parse(stringCookie).id
          );
          if (currentStation === undefined) {
            CookieManger.revokeCurrentDevice();
            currentStation = response.data[0];
          }
        } else {
          currentStation = response.data[0];
        }
        return {
          stations: stations,
          stationSelected: currentStation,
        };
      })
      .catch((err) => {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data);
      });
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
        isLoading: false,
        isError: false,
        message: "",
      };
    },
    [fetchStation.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchStation.rejected]: (state, action) => {
      console.info(action)
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.error.message,
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
