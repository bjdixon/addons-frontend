/* eslint-disable import/prefer-default-export */

// Action types.
export const SET_USER_RATING = 'SET_USER_RATING';

// Search params that are only added to actions/reducers if set; many of
// these are optional.
export const OPTIONAL_SEARCH_PARAMS = [
  'app',
  'addonType',
  'category',
  'query',
];
