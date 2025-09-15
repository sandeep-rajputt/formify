import { createSlice } from "@reduxjs/toolkit";
import type { DashboardSidebarSlice } from "@/types/store-types";

const initialState: DashboardSidebarSlice = {
  isOpen: false,
};

const dashboardSidebarSlice = createSlice({
  name: "dashboardSidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  dashboardSidebarSlice.actions;
export default dashboardSidebarSlice.reducer;
