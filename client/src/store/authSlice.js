import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
  isLoggedIn: false,
  userData: {},
  loading: false,
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("auth/user-exist", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SIGN_IN = createAsyncThunk(
  "auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SIGN_UP = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SIGN_OUT = createAsyncThunk(
  "/auth/signout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/signout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.loading = true;
      })
      .addCase(SIGN_IN.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.loading = false;
        toast.success("Logged in successfully");
      })
      .addCase(SIGN_IN.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })

      // signUp
      .addCase(SIGN_UP.pending, (state) => {
        state.loading = true;
      })
      .addCase(SIGN_UP.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        localStorage.removeItem("netflixCloneEmail");
        toast.success("Account created successfully");
      })
      .addCase(SIGN_UP.rejected, (state, action) => {
        state.loading = false;
        toast.error(action?.payload?.message);
      })

      // get user
      .addCase(GET_USER.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
        state.userData = action.payload.data;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(GET_USER.rejected, (state, action) => {
        state.loading = false;
      })

      // sign out
      .addCase(SIGN_OUT.pending, (state) => {
        state.loading = true;
      })
      .addCase(SIGN_OUT.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.userData = {};
        state.loading = false;
        localStorage.clear()
      })
      .addCase(SIGN_OUT.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to log out")
      })

      // forgotPassword
      .addCase(FORGOT_PASSWORD.pending, (state) => {
        state.loading = true;
      })
      .addCase(FORGOT_PASSWORD.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(FORGOT_PASSWORD.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })

      // reset Password
      .addCase(RESET_PASSWORD.pending, (state) => {
        state.loading = true;
      })
      .addCase(RESET_PASSWORD.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("successfully updated the password");
      })
      .addCase(RESET_PASSWORD.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload.message);
      })
      .addCase(IS_USER_EXIST.pending, (state) => {
        state.isUserExistLoading = true;
      })
      .addCase(IS_USER_EXIST.fulfilled, (state, action) => {
        state.isUserExistLoading = false;
        localStorage.setItem("netflixCloneEmail", action.payload.data.email);
      })
      .addCase(IS_USER_EXIST.rejected, (state) => {
        state.isUserExistLoading = false;
      });
  },
});

export default authSlice.reducer;
