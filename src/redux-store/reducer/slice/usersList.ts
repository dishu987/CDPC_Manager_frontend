import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UsersListInterface } from "../../../interface/redux-state/UsersListInterface";

const initialState: UsersListInterface = {
  users: [],
  isLoading: false,
  isSuccessful: false,
};

export const UsersListSlice = createSlice({
  name: "Users List",
  initialState,
  reducers: {
    getUsersListRequestAction: (state: any, action: PayloadAction<[]>) => {
      state.isLoading = true;
    },
    getUsersListSuccessAction: (state: any, action: PayloadAction<[]>) => {
      state.users = action.payload;
      state.isLoading = false;
      state.result = {};
      state.isSuccessful = true;
    },
    getUsersListFailedAction: (state: any, action: PayloadAction<{}>) => {
      state.users = [];
      state.isLoading = false;
      state.isSuccessful = false;
      state.result = action.payload;
    },
  },
});

export const {
  getUsersListFailedAction,
  getUsersListRequestAction,
  getUsersListSuccessAction,
} = UsersListSlice.actions;

export default UsersListSlice;
