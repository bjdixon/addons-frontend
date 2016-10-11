import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { OPTIONAL_SEARCH_PARAMS } from 'amo/constants';
import { search } from 'core/api';
import { searchStart, searchLoad, searchFail } from 'core/actions/search';

export function mapStateToProps(state, ownProps) {
  const { location } = ownProps;
  const { application } = ownProps.params;
  const lang = state.api.lang;

  if (location.query.q === state.search.query) {
    return { application, lang, ...state.search };
  }

  return { application, lang };
}

function performSearch({
  dispatch, page, api, auth = false, app, addonType, category, query,
}) {
  let params = {};
  OPTIONAL_SEARCH_PARAMS.forEach((param) => {
    if (arguments[0][param] !== undefined) {
      params[param] = arguments[0][param];
    }
  });

  // If none of the optional search params are found, we aren't searching for
  if (Object.keys(params).length === 0) {
    return Promise.resolve();
  }

  dispatch(searchStart({ page, ...params }));
  return search({ page, api, auth, ...params })
    .then((response) => dispatch(searchLoad({ page, ...params, ...response })))
    .catch(() => dispatch(searchFail({ page, ...params })));
}

export function isLoaded({ page, query, app, addonType, category, state }) {
  return state.query === query && state.page === page && state.app === app &&
    state.category === category && state.addonType === addonType &&
    !state.loading;
}

export function parsePage(page) {
  const parsed = parseInt(page, 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

export function loadSearchResultsIfNeeded({ store: { dispatch, getState }, location }) {
  const app = location.query.app;
  const addonType = location.query.type;
  const category = location.query.category;
  const query = location.query.q;
  const page = parsePage(location.query.page);
  const state = getState();
  if (!isLoaded({ state: state.search, query, page, app, addonType, category
    })) {
    return performSearch({ dispatch, page, api: state.api, auth: state.auth,
      app, addonType, category, query });
  }
  return true;
}

export default function createSearchPage(SearchPageComponent) {
  return asyncConnect([{
    deferred: true,
    promise: loadSearchResultsIfNeeded,
  }])(connect(mapStateToProps)(SearchPageComponent));
}
