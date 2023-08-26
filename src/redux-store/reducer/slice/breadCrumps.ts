import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { BreadcrumpInterface } from "../../../interface/redux-state/BreadcrumpInterface";

const initialState: BreadcrumpInterface = {
  links: [
    {
      name: "Companies",
      url: null,
    },
  ],
};

export const BreadcrumpSlice = createSlice({
  name: "Breadcrumps",
  initialState,
  reducers: {
    getBreadcrumpAddAction: (state: any, action: PayloadAction<any>) => {
      state.links = action.payload;
    },
  },
});

export const { getBreadcrumpAddAction } = BreadcrumpSlice.actions;

export default BreadcrumpSlice;
