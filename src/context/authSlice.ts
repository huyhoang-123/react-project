import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../services/api";

type LoginUser = {
  username: string;
  password: string;
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginUser) => {
    try {
      const response = await api.post("/auth/login", data);
      const token = response.data.data.accessToken;
      setAuthToken(token); // lưu token vào localStorage
      return { user: response.data, token };
    } catch (error: any) {
      return console.error(error.response?.data?.message || "Login failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: { loading: false, error: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
