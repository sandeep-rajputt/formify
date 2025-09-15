import { configureStore } from "@reduxjs/toolkit";
import dashboardSidebarReducer from "@/Store/slice/dashboardSidebarSlice";

const store = configureStore({
  reducer: {
    dashboardSidebar: dashboardSidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
