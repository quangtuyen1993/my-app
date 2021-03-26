import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const init = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  isLogin:false,
  message: "",
  token: "",
};
const onLogin = createAsyncThunk("/authenticate", async (data, thunkApi) => {
  const getToken = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Bearer kadsjkjakdjfkadjsoiwjfadsjfkajkfjdlkafdasf.ads.lfjdlkafj.lkdsaj.fdfkladsjf");
    }, 1000);
    // console.log(authoApi)
  });
  var token = await getToken;
  localStorage.setItem("_TOKEN_ACCESS_", token);
  return await getToken;
});
export const authorSlice = createSlice({
  name: "author",
  initialState: init,
  reducers: {},
  extraReducers: {
    [onLogin.fulfilled]: (state, action) => ({
      ...state,
      token:action.payload,
      isLoading: false,
      isLogin:true
    }),

    [onLogin.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [onLogin.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      message: action.payload,
      isError: true,
    }),
  },
});

// Action creators are generated for each case reducer function
export { onLogin };

export default authorSlice.reducer;
