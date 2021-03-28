import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const stationDefault = [
  { id: 1, name: "station 1" },
  { id: 2, name: "station 2" },
  { id: 3, name: "station 3" },
  { id: 4, name: "station 4" },
  { id: 5, name: "station 5" },
  { id: 6, name: "station 6" },
];

const init = {
  stations: stationDefault,
  stationSelected: stationDefault[0],
};

const onFetchStation = createAsyncThunk(
  "/station",
  async (req, thunkApi) => {}
);
export const stationSlice = createSlice({
  name: "station",
  initialState: init,
  reducers: {
    onSelected: (state, action) => {
      state.stationSelected = action.payload;
    },
  },
});

export const { onSelected } = stationSlice.actions;
export default stationSlice.reducer;
