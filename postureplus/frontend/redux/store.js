import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import bookmarkReducer from "./bookmarkReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  bookmarkReducer,
  themeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export {
  store,
  // appPersist
};
