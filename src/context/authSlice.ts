import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthToken } from '../services/Api';

export type BaseFormType = {
  username: string;
  password: string;
  confirmPassword?: string;
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data: BaseFormType) => {
    try {
      const response = await api.post('/auth/login', data);
      const token = response.data.data.accessToken;
      setAuthToken(token); // lưu token vào localStorage
      return { user: response.data, token };
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error: error might have response property
        return console.error(error.response?.data?.message || 'Login failed');
      }
      return console.error('Login failed');
    }
  }
);

export const createUser = createAsyncThunk(
  'auth/register',
  async (data: BaseFormType) => {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error(`error: ${error}`);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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

    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default authSlice.reducer;
