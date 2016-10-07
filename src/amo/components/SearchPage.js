import React, { PropTypes } from 'react';

import Paginate from 'core/components/Paginate';
import SearchResults from 'core/components/Search/SearchResults';

import CategoryInfo from './CategoryInfo';
import SearchResult from './SearchResult';


export default class SearchPage extends React.Component {
  static propTypes = {
    category: PropTypes.string,
    count: PropTypes.number,
    lang: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    page: PropTypes.number,
    results: PropTypes.array,
    query: PropTypes.string,
  }

  render() {
    const { category, count, lang, loading, page, query, results } = this.props;
    const pathname = `/${lang}/firefox/search/`;
    const paginator = query && count > 0 ?
      <Paginate count={count} pathname={pathname} query={{ q: query }} currentPage={page} /> : [];
    return (
      <div className="search-page">
        <SearchResults results={results} query={query} loading={loading}
          category={category} count={count} lang={lang}
          CategoryInfoComponent={CategoryInfo} ResultComponent={SearchResult} />
        {paginator}
      </div>
    );
  }
}
