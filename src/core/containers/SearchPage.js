import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { search } from 'core/api';
import { searchStart, searchLoad, searchFail } from 'core/actions/search';

export function mapStateToProps(state, ownProps) {
  const { location } = ownProps;
  const app = state.api.app || state.api.application;
  console.log('\n\n\n\n\n\n');
  console.log(app);
  console.log('\n\n\n\n\n\n');
  const lang = state.api.lang;
  if (location.query.q === state.search.query ||
      location.query.category === location.search.category) {
    return { lang, ...state.search };
  }
  return { lang };
}

function performSearch({ dispatch, page, query, api, auth = false,
  app, addonType, category
}) {
  if (!query && !(category && app && addonType)) {
    return Promise.resolve();
  }
  dispatch(searchStart(query, page, app, addonType, category));
  return search({ page, query, api, auth, app, category, type: addonType })
    .then((response) => dispatch(searchLoad({ page, query, app, addonType,
      category, ...response })))
    .catch(() => dispatch(searchFail({ page, query, app, addonType, category })));
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
    return performSearch({ dispatch, page, query, api: state.api, auth: state.auth, app, addonType, category });
  }
  return true;
}

export default function createSearchPage(SearchPageComponent) {
  return asyncConnect([{
    deferred: true,
    promise: loadSearchResultsIfNeeded,
  }])(connect(mapStateToProps)(SearchPageComponent));
}
