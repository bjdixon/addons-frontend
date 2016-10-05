const initialState = {
  count: 0,
  loading: false,
  page: 1,
  query: null,
  results: [],
};

export default function search(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: payload.query, app: payload.app, category:
               payload.category, addonType: payload.addonType };
    case 'SEARCH_STARTED':
      return { ...state, ...payload, count: 0, loading: true, results: [] };
    case 'SEARCH_LOADED':
      return {
        ...state,
        app: payload.app,
        category: payload.category,
        addonType: payload.addonType,
        count: payload.result.count,
        loading: false,
        query: payload.query,
        results: payload.result.results.map((slug) => payload.entities.addons[slug]),
      };
    case 'SEARCH_FAILED':
      return {
        ...initialState,
        app: payload.app,
        category: payload.category,
        addonType: payload.addonType,
        page: payload.page,
        query: payload.query,
      };
    default:
      return state;
  }
}
