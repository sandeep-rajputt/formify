import { configureStore } from "@reduxjs/toolkit";
import dashboardSidebarReducer from "@/Store/slice/dashboardSidebarSlice";
import formReducer from "@/Store/slice/formSlice";
import { baseApi } from "@/lib/api/baseApi";

const store = configureStore({
  reducer: {
    dashboardSidebar: dashboardSidebarReducer,
    form: formReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
