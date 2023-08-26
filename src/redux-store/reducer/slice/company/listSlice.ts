import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CompanyListInterface } from "../../../../interface/company/info";

const initialState: CompanyListInterface = {
  companies: [],
  isLoading: false,
  isSuccessful: false,
};

export const CompanyListSlice = createSlice({
  name: "Company List",
  initialState,
  reducers: {
    getCompanyListRequestAction: (state: any, action: PayloadAction<{}>) => {
      state.isLoading = true;
    },
    getCompanyListSuccessAction: (state: any, action: PayloadAction<[]>) => {
      state.companies = action.payload;
      state.isLoading = false;
      state.result = {};
      state.isSuccessful = true;
    },
    getCompanyListFailedAction: (state: any, action: PayloadAction<{}>) => {
      state.isSuccessful = false;
      state.isLoading = false;
      state.result = action.payload;
    },
  },
});

export const {
  getCompanyListFailedAction,
  getCompanyListRequestAction,
  getCompanyListSuccessAction,
} = CompanyListSlice.actions;

export default CompanyListSlice;
