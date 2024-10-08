import { createStore, combineReducers } from "redux";
import cityReducer from "./reducers/cityReducer";

// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
  city: cityReducer,
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
