import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
const initialState = {
  isLoggedIn: false,
  userData: {},
  loading: false
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data) => {
    try {
      let response = await axiosInstance.post("/auth/user-exist", data);
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Something went wrong");
    }
  }
);

export const SIGN_IN = createAsyncThunk("auth/signin", async (data) => {
  try {
    let response = axiosInstance.post("/auth/signin", data);
    toast.promise(response, {
      loading: "Please wait! Signing to your account!",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to signin"
    });
    response = await response;
    return response?.data;
  } catch (error) {
    error?.response?.data?.message
      ? toast.error(error?.response?.data?.message)
      : toast.error("Failed to login");
  }
});

export const SIGN_UP = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);

    return response.data;
  } catch (error) {
    error?.response?.data?.message
      ? toast.error(error?.response?.data?.message)
      : toast.error("Failed to create account");
  }
});

export const SIGN_OUT = createAsyncThunk("/auth/signout", async () => {
  try {
    const response = await axiosInstance.get("/auth/signout");
    return response.data;
  } catch (error) {
    error?.response?.data?.message
      ? toast.error(error?.response?.data?.message)
      : toast.error("Failed to logout");
  }
});

export const GET_USER = createAsyncThunk("auth/user", async () => {
  try {
    let response = axiosInstance.get("/auth/user");
    toast.promise(response, {
      loading: "fetching user data",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to fetch user data"
    });
    response = await response;
    return response;
  } catch (error) {
    error?.response?.data?.message
      ? toast.error(error?.response?.data?.message)
      : toast.error("Failed to load data");
  }
});

export const FORGOT_PASSWORD = createAsyncThunk(
  "/auth/forgotpassword",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to forget password");
    }
  }
);

export const RESET_PASSWORD = createAsyncThunk(
  `/auth/resetpassword`,
  async (data) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${data.token}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      error?.response?.data?.message
        ? toast.error(error?.response?.data?.message)
        : toast.error("Failed to reset password");
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
        if (action?.payload?.token) {
          localStorage.setItem("token", action?.payload?.token);
          state.userData = action?.payload?.data;
          state.isLoggedIn = true;
        }
        state.loading = false;
      })
      .addCase(SIGN_IN.rejected, (state, action) => {
        state.loading = false;
      })

      // signUp
      .addCase(SIGN_UP.pending, (state) => {
        state.loading = true;
      })
      .addCase(SIGN_UP.fulfilled, (state, action) => {
        localStorage.setItem("token", action?.payload?.token);
        state.loading = false;
      })

      .addCase(SIGN_UP.rejected, (state, action) => {
        state.loading = false;
      })

      // get user
      .addCase(GET_USER.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action?.payload?.data;
          state.isLoggedIn = true;
        }
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
        localStorage.clear();
        toast.success("Logout successfully");
      })
      .addCase(SIGN_OUT.rejected, (state) => {
        state.loading = false;
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
      })

      // is user exist
      .addCase(IS_USER_EXIST.pending, (state) => {
        state.loading = true;
      })
      .addCase(IS_USER_EXIST.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.setItem("netflixCloneEmail", action?.payload?.data?.email);
      })
      .addCase(IS_USER_EXIST.rejected, (state) => {
        state.loading = false;
      });
  }
});

export default authSlice.reducer;
