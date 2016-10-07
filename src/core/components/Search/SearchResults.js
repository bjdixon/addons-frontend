import classNames from 'classnames';
import React, { PropTypes } from 'react';

import translate from 'core/i18n/translate';

import 'core/css/SearchResults.scss';

import SearchResult from './SearchResult';


class SearchResults extends React.Component {
  static propTypes = {
    CategoryInfoComponent: PropTypes.object.isRequired,
    ResultComponent: PropTypes.object.isRequired,
    app: PropTypes.string,
    category: PropTypes.string,
    count: PropTypes.number,
    i18n: PropTypes.object.isRequired,
    lang: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    type: PropTypes.string,
  }

  static defaultProps = {
    // app: null,
    // category: null,
    CategoryInfoComponent: null,
    ResultComponent: SearchResult,
    count: 0,
    query: null,
    results: [],
    // type: null,
  }

  render() {
    const { CategoryInfoComponent, ResultComponent, app, category, count, i18n,
            lang, loading, query, results, type } = this.props;

    let searchResults;
    let messageText;
    let hideMessageText = false;

    let resultHeader;

    if (category && CategoryInfoComponent) {
      resultHeader = <CategoryInfoComponent slug={category} />
    }

    if (count > 0) {
      hideMessageText = true;
      messageText = i18n.sprintf(
        i18n.ngettext(
          'Your search for "%(query)s" returned %(count)s result.',
          'Your search for "%(query)s" returned %(count)s results.',
          count,
        ),
        { query, count }
      );
      searchResults = (
        <ul className="SearchResults-list"
            ref={(ref) => { this.results = ref; }}>
          {results.map((result) => (
            <ResultComponent result={result} key={result.slug} lang={lang} />
          ))}
        </ul>
      );
    } else if (loading) {
      messageText = i18n.gettext('Searching...');
    } else if (query && results.length === 0) {
      messageText = i18n.sprintf(
        i18n.gettext('No results were found for "%(query)s".'), { query });
    } else if (query !== null) {
      messageText = i18n.gettext('Please supply a valid search');
    }

    const message = messageText ?
      <p ref={(ref) => { this.message = ref; }} className={classNames({
        'visually-hidden': hideMessageText,
        'SearchReuslts-message': !hideMessageText,
      })}>{messageText}</p> : null;

    return (
      <div ref={(ref) => { this.container = ref; }} className="SearchResults">
        {message}
        {resultHeader}
        {searchResults}
      </div>
    );
  }
}

export default translate({ withRef: true })(SearchResults);
