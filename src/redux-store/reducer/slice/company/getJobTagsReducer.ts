import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CompanyJobTagsListInterface } from "../../../../interface/company/tag";

const initialState: CompanyJobTagsListInterface = {
  tags: [],
  isLoading: false,
  isSuccessful: false,
};

export const CompanyJobTagListSlice = createSlice({
  name: "Company JobTag",
  initialState,
  reducers: {
    getCompanyJobTagRequestAction: (state: any, action: PayloadAction<[]>) => {
      state.isLoading = true;
    },
    getCompanyJobTagSuccessAction: (state: any, action: PayloadAction<[]>) => {
      state.tags = action.payload;
      state.isLoading = false;
      state.result = {};
      state.isSuccessful = true;
    },
    getCompanyJobTagFailedAction: (state: any, action: PayloadAction<{}>) => {
      state.isSuccessful = false;
      state.isLoading = false;
      state.result = action.payload;
    },
  },
});

export const {
  getCompanyJobTagFailedAction,
  getCompanyJobTagRequestAction,
  getCompanyJobTagSuccessAction,
} = CompanyJobTagListSlice.actions;

export default CompanyJobTagListSlice;
