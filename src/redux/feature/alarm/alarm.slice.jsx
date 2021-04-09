import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlarmService from "../../../service/alarm.service";

const init = {
  alarmNotifications: [],
};

const fetchAlarmRealtime = createAsyncThunk(
  "alarmRedux",
  async (data, thunkApi) => {
    var res = await AlarmService.fetchRealTime({
      stationId: data.stationSelected,
    });
    console.log("Alarm", res);
    return res;
  }
);

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: init,
  reducers: {},
  extraReducers: {
    [fetchAlarmRealtime.fulfilled]: (state, action) => ({
      ...state,
      alarmNotifications: action.payload,
    }),
  },
});

export { fetchAlarmRealtime };
export default alarmSlice.reducer;
