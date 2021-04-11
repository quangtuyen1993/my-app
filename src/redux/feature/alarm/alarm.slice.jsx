import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AlarmService from "../../../service/alarm.service";

const init = {
  alarmNotifications: [],
  alarmCount: 0,
  message:""
};

const fetchAlarmRealtime = createAsyncThunk(
  "alarmRedux",
  async (data, thunkApi) => {
    var res = await AlarmService.fetchRealTime({
      stationId: data.stationSelected,
    });
    return res;
  }
);
const fetchAlarmCount = createAsyncThunk(
  "alarmRedux",
  async (data, thunkApi) => {
    var count = await AlarmService.alarmNotification(data.stationSelected);
    return count;
  }
);

export const alarmSlice = createSlice({
  name: "alarm",
  initialState: init,
  reducers: {},
  extraReducers: {
    [fetchAlarmRealtime.fulfilled]: (state, action) => ({
      ...state,
      alarmNotifications: [...action.payload],
    }),
    [fetchAlarmCount.fulfilled]: (state, action) => ({
      ...state,
      alarmCount: action.payload,
      message:""
    }),
    [fetchAlarmCount.rejected]: (state, action) => ({
      ...state,
      alarmCount: 0,
      message:"Alarm error"
    }),
  },
});

export { fetchAlarmRealtime, fetchAlarmCount };
export default alarmSlice.reducer;
