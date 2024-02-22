import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    login: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      console.log(action.payload);
      state.user = user;
      state.token = token;
      state.login = true;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.login = false;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentLogin = (state) => state.auth.login;
