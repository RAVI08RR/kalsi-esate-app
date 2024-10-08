
export const SET_CITIES = 'SET_CITIES';

// Action creator to set cities
export const storeCitiesList = (cities) => ({
  type: SET_CITIES,
  payload: cities,
});