import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { CookieManger } from "../../../utils/CookieManager";
import { URL_LOGIN, URL_REFRESH_TOKEN, URL_REVOKE_TOKEN } from "../../URL";
const init = {
  // isSuccess: false,
  isError: false,
  isLoading: false,
  isSuccess: false,
  isLoginComplete: false,
  //get when re-fresh token
  userProfile: {
    jwtToken: "",
    id: "",
    role: "",
    username: "",
  },
  message: "",
};

const onLogin = createAsyncThunk(
  "/authenticate",
  async (data, { rejectWithValue }) => {
    const { username, password } = data;
    try {
      var userData = await axios.post(URL_LOGIN, {
        username: username,
        password: password,
      });
      CookieManger.SetRefreshCookie(
        userData.data.refreshToken,
        userData.data.expires
      );
      return userData.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const onRefreshToken = createAsyncThunk(
  "/refreshToken",
  async (api, { rejectWithValue }) => {
    try {
      var refresh = CookieManger.GetRefreshCookie();
      var userData = await axios.post(URL_REFRESH_TOKEN, {
        RefreshToken: refresh,
      });
      CookieManger.SetRefreshCookie(
        userData.data.refreshToken,
        userData.data.expires
      );
      return userData.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
const onLogOut = createAsyncThunk(
  "/logOut",
  async (api, { getState, dispatch }) => {
    try {
      let jwtToken = getState().authorReducer.userProfile.jwtToken;
      let refresh = Cookies.get("refreshToken");
      let result = await axios.post(
        URL_REVOKE_TOKEN,
        {
          Token: refresh,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      CookieManger.RevokeAllCookies()
      return result.data;
    } catch (e) {
      return e.message;
    }
  }
);

export const authorSlice = createSlice({
  name: "author",
  initialState: init,
  reducers: {
    refreshLogin: (state, action) => {
      state = init;
    },
  },
  extraReducers: {
    [onLogin.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      };
    },
    [onLogin.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),
    [onLogin.rejected]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
        isError: true,
      };
    },
    [onRefreshToken.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload,
        isSuccess: true,
        isLoginComplete: true,
        isError: false,
      };
    },
    [onRefreshToken.pending]: (state, action) => ({
      ...state,
      isLoading: true,
    }),

    [onRefreshToken.rejected]: (state, action) => ({
      ...state,
      isLoading: false,
      message: action.payload,
      isError: true,
      isSuccess: false,
      isLoginComplete: false,
    }),
    [onLogOut.fulfilled]: (state, action) => {
      return {
        ...init,
      };
    },
    [onLogOut.pending]: (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [onLogOut.rejected]: (state, action) => {
      return {
        ...state,
        isError: true,
        message: action.payload,
        isLoading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export { onLogin, onRefreshToken, onLogOut };
export const { refreshLogin } = authorSlice.actions;
export default authorSlice.reducer;
