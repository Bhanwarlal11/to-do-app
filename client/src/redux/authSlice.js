import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    token: localStorage.getItem('authToken') || null,
    loading: false,
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('isAuthenticated', 'true');
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setError, setLoading } = authSlice.actions;

export default authSlice.reducer;
