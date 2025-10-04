import { configureStore } from "@reduxjs/toolkit";
import dashboardSidebarReducer from "@/Store/slice/dashboardSidebarSlice";
import formReducer from "@/Store/slice/formSlice";

const store = configureStore({
  reducer: {
    dashboardSidebar: dashboardSidebarReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
