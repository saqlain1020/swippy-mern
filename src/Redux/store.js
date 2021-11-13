import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { persistStore } from "redux-persist";
import { LOADER_START, LOADER_STOP } from "./loader/loaderConstants";

const middlewares = [asyncLoading, thunk];

//Custom middleware to initate loading screen if promise is called
function asyncLoading(store) {
  return (next) => async (action) => {
    //Send the action to dispatch
    let res = next(action);
    //If it is a promise
    if (res instanceof Promise) {
      next({
        type: LOADER_START,
      });
      await res;
      next({
        type: LOADER_STOP,
      });
    }
    return res;
  };
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export default store;
