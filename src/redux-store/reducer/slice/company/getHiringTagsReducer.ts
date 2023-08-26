import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CompanyHiringTagsListInterface } from "../../../../interface/company/tag";

const initialState: CompanyHiringTagsListInterface = {
  tags: [],
  isLoading: false,
  isSuccessful: false,
};

export const CompanyHiringTagListSlice = createSlice({
  name: "Company HiringTag",
  initialState,
  reducers: {
    getCompanyHiringTagRequestAction: (
      state: any,
      action: PayloadAction<[]>
    ) => {
      state.isLoading = true;
    },
    getCompanyHiringTagSuccessAction: (
      state: any,
      action: PayloadAction<[]>
    ) => {
      state.tags = action.payload;
      state.isLoading = false;
      state.result = {};
      state.isSuccessful = true;
    },
    getCompanyHiringTagFailedAction: (
      state: any,
      action: PayloadAction<{}>
    ) => {
      state.isSuccessful = false;
      state.isLoading = false;
      state.result = action.payload;
    },
  },
});

export const {
  getCompanyHiringTagFailedAction,
  getCompanyHiringTagRequestAction,
  getCompanyHiringTagSuccessAction,
} = CompanyHiringTagListSlice.actions;

export default CompanyHiringTagListSlice;
