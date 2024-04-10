import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";//actually this is reducer in the userSlice. But we rename it here to userReducer. 
export const store = configureStore({
  reducer: {user:userReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
