import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { reducer as notificationsReducer } from "reapop";
import loaderReducer from "./loader/loaderReducer";

const persistConfig = {
  key: "root",
  whitelist: ["user"],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationsReducer(),
  loading: loaderReducer,
});

export default persistReducer(persistConfig, rootReducer);
