import { SET_CITIES } from "../actions";


// Initial state
const initialState = {
  cities: [],
};

// Reducer function
const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default cityReducer;
