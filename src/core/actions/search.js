export function searchStart(query, page, app, addonType, category) {
  return {
    type: 'SEARCH_STARTED',
    payload: { page, query, app, addonType, category },
  };
}

export function searchLoad({ query, entities, result, app, category, addonType }) {
  return {
    type: 'SEARCH_LOADED',
    payload: { entities, query, result, app, category, addonType },
  };
}

export function searchFail({ page, query, app, category, addonType }) {
  return {
    type: 'SEARCH_FAILED',
    payload: { page, query, app, category, addonType },
  };
}
