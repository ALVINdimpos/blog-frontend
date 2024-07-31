import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User as ApiUser } from "./api";
export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface User {
  _id: number | undefined;
  username: string;
  email: string;
  role?: number;
}

export const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: ApiUser; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
