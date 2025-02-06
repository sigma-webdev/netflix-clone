import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axiosInstance";
import toast from "react-hot-toast";
import isEqual from "lodash/isEqual";
const initialState = {
  isLoggedIn: false,
  userData: {},
  loading: false,
};

export const IS_USER_EXIST = createAsyncThunk(
  "auth/userexist",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/auth/user-exist", data);
      return response.data;
    } catch (error) {
      let errMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);

export const SIGN_IN = createAsyncThunk(
  "/auth/signin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      if (response?.data) {
        return response.data;
      }
    } catch (error) {
      let errMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Failed to login";
      return rejectWithValue(errMessage);
    }
  }
);

export const SIGN_UP = createAsyncThunk(
  "/auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.post("/auth/signup", data);
      if (response.data) {
        return response?.data;
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Failed to create account";
      return rejectWithValue(errorMessage); // Return error for rejection handling
    }
  }
);

export const SIGN_OUT = createAsyncThunk(
  "/auth/signout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/signout");
      return response.data;
    } catch (error) {
      let errMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Failed to logout";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const GET_USER = createAsyncThunk(
  "auth/user",
  async (_, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get("/auth/user");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

export const FORGOT_PASSWORD = createAsyncThunk(
  "/auth/forgotpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", data);
      return response.data;
    } catch (error) {
      let errMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Failed to forget password";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const RESET_PASSWORD = createAsyncThunk(
  `/auth/resetpassword`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${data.token}`,
        data.formData
      );
      return response.data;
    } catch (error) {
      let errMessage = error?.response?.data?.message
        ? error?.response?.data?.message
        : "Failed to reset password";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
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
      .addCase(SIGN_IN.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(SIGN_IN.fulfilled, (state, action) => {
        try {
          if (action?.payload?.token) {
            const newToken = action.payload.token;
            const newUserData = action.payload.data;

            if (
              !isEqual(state.userData, newUserData) ||
              localStorage.getItem("token") !== newToken
            ) {
              localStorage.setItem("token", newToken);
              state.userData = newUserData;
              if (state.isLoggedIn === false) {
                state.isLoggedIn = true;
              }
            }
          }
        } catch (error) {
          console.error("Error setting token in localStorage:", error);
        }
        state.loading = false; // Ensure loading is set regardless
      })
      .addCase(SIGN_IN.rejected, (state, action) => {
        state.loading = false;
      })

      // signUp
      .addCase(SIGN_UP.pending, (state) => {
        state.loading = true;
      })
      .addCase(SIGN_UP.fulfilled, (state, action) => {
        state.loading = false; // Ensure loading is set regardless
      })
      .addCase(SIGN_UP.rejected, (state, action) => {
        state.loading = false;
        console.error("Signup Error:", action.payload);
      })

      // get user
      .addCase(GET_USER.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_USER.fulfilled, (state, action) => {
        const newUserData = action.payload?.data;
        if (!isEqual(state.userData, newUserData)) {
          state.userData = newUserData; // Update only if data changes
          state.isLoggedIn = true;
        }
        state.loading = false;
      })

      .addCase(GET_USER.rejected, (state, action) => {
        state.userData = null;
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
        state.userData = null;
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
  },
});

export default authSlice.reducer;
