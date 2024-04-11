import { combineReducers,configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";//actually this is reducer in the userSlice. But we rename it here to userReducer. 
import { persistReducer, persistStore} from "redux-persist";
import { version } from "mongoose";
import storage from "redux-persist/lib/storage";//this is used to store the data on the local storage.
const rootReducer = combineReducers({user:userReducer});//we are combining the reducers here.

const persistConfig = {
  key: "root",//this is just a name for storing data on the local storage.
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);//we are persisting the reducer here. Persisting helps to keep the user data even after refreshing the pages by the user. Unless the user logs out, the data will be there.

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
 export const persistor = persistStore(store);//this is used to persist the store.