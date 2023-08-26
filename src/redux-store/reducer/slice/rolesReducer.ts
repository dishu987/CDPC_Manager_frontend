import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RoleGroupListInterface } from "../../../interface/redux-state/RolesGroupInterface";

const initialState: RoleGroupListInterface = {
  roles: [],
  isLoading: false,
  isSuccessful: false,
};

export const RolesListSlice = createSlice({
  name: "Company Tags",
  initialState,
  reducers: {
    getRolesListRequestAction: (state: any, action: PayloadAction<[]>) => {
      state.isLoading = true;
    },
    getRolesListSuccessAction: (state: any, action: PayloadAction<[]>) => {
      state.roles = action.payload;
      state.isLoading = false;
      state.result = {};
      state.isSuccessful = true;
    },
    getRolesListFailedAction: (state: any, action: PayloadAction<{}>) => {
      state.roles = false;
      state.isLoading = false;
      state.result = action.payload;
    },
  },
});

export const {
  getRolesListFailedAction,
  getRolesListRequestAction,
  getRolesListSuccessAction,
} = RolesListSlice.actions;

export default RolesListSlice;
