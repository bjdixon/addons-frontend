import { OPTIONAL_SEARCH_PARAMS } from 'amo/constants';


const initialState = {
  count: 0,
  loading: false,
  page: 1,
  query: null,
  results: [],
};

export default function search(state = initialState, action) {
  const { payload } = action;
  let params;

  switch (action.type) {
    case 'SET_QUERY':
      params = { ...state };
      OPTIONAL_SEARCH_PARAMS.forEach((param) => {
        if (payload[param] !== undefined) {
          params[param] = payload[param];
        }
      });

      return params;
    case 'SEARCH_STARTED':
      return { ...state, ...payload, count: 0, loading: true, results: [] };
    case 'SEARCH_LOADED':
      params = {
        ...state,
        count: payload.result.count,
        loading: false,
        results: payload.result.results.map((slug) => payload.entities.addons[slug]),
      };
      OPTIONAL_SEARCH_PARAMS.forEach((param) => {
        if (payload[param] !== undefined) {
          params[param] = payload[param];
        }
      });

      return params;
    case 'SEARCH_FAILED':
      params = { ...initialState, page: payload.page };
      OPTIONAL_SEARCH_PARAMS.forEach((param) => {
        if (payload[param] !== undefined) {
          params[param] = payload[param];
        }
      });

      return params;
    default:
      return state;
  }
}
