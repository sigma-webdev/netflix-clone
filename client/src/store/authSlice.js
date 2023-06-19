import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  isLoggedIn: false,
  userData: {},
  signInLoading: false,
  signOutLoading: false,
  signUpLoading: false,
  getUserLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data, { rejectedWithValue }) => {
    try {
      let response = await axiosInstance.post("auth/userexist", data);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const SIGN_IN = createAsyncThunk(
  "auth/signin",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const SIGN_UP = createAsyncThunk(
  "auth/signup",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const SIGN_OUT = createAsyncThunk(
  "/auth/signout",
  async (data, { rejectedWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/signout");
      return response.data;
    } catch (error) {
      return rejectedWithValue(error.response.data);
    }
  }
);

export const GET_USER = createAsyncThunk(
  "/auth/user",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const FORGOT_PASSWORD = createAsyncThunk(
  "/auth/forgotpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/forgotpassword", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const RESET_PASSWORD = createAsyncThunk(
  `/auth/resetpassword`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/resetpassword/${data.resetPasswordToken}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   signIn
      .addCase(SIGN_IN.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(SIGN_IN.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.signInLoading = false;
      })
      .addCase(SIGN_IN.rejected, (state) => {
        state.signInLoading = false;
      })

      // signUp
      .addCase(SIGN_UP.pending, (state) => {
        state.signUpLoading = true;
      })
      .addCase(SIGN_UP.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.signUpLoading = false;
      })
      .addCase(SIGN_UP.rejected, (state) => {
        state.signUpLoading = false;
      })

      // get user
      .addCase(GET_USER.pending, (state) => {
        state.getUserLoading = true;
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.isLoggedIn = true;
        state.getUserLoading = false;
      })
      .addCase(GET_USER.rejected, (state, action) => {
        state.getUserLoading = false;
      })

      // sign out
      .addCase(SIGN_OUT.pending, (state) => {
        state.signOutLoading = true;
      })
      .addCase(SIGN_OUT.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userData = {};
        state.signOutLoading = false;
      })
      .addCase(SIGN_OUT.rejected, (state) => {
        state.signOutLoading = false;
      })

      // forgotPassword
      .addCase(FORGOT_PASSWORD.pending, (state) => {
        state.forgotPasswordLoading = true;
      })
      .addCase(FORGOT_PASSWORD.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(FORGOT_PASSWORD.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
      })

      // reset Password
      .addCase(RESET_PASSWORD.pending, (state) => {
        state.resetPasswordLoading = true;
      })
      .addCase(RESET_PASSWORD.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
      })
      .addCase(RESET_PASSWORD.rejected, (state, action) => {
        state.resetPasswordLoading = false;
      });
  }
});

export const {} = authSlice.actions;
export default authSlice.reducer;
