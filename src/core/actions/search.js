import { OPTIONAL_SEARCH_PARAMS } from 'amo/constants';


export function searchStart({ page, query, app, addonType, category }) {
  let params = { page };
  OPTIONAL_SEARCH_PARAMS.forEach((param) => {
    if (arguments[0][param] !== undefined) {
      params[param] = arguments[0][param];
    }
  });

  return {
    type: 'SEARCH_STARTED',
    payload: params,
  };
}

export function searchLoad({ query, entities, result, app, category, addonType }) {
  let params = { entities, result };
  OPTIONAL_SEARCH_PARAMS.forEach((param) => {
    if (arguments[0][param] !== undefined) {
      params[param] = arguments[0][param];
    }
  });

  return {
    type: 'SEARCH_LOADED',
    payload: params,
  };
}

export function searchFail({ page, query, app, category, addonType }) {
  let params = { page };
  OPTIONAL_SEARCH_PARAMS.forEach((param) => {
    if (arguments[0][param] !== undefined) {
      params[param] = arguments[0][param];
    }
  });

  return {
    type: 'SEARCH_FAILED',
    payload: params,
  };
}
