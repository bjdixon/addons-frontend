import React, { PropTypes } from 'react';
import { Link } from 'react-router';


export default class SearchResult extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    result: PropTypes.object.isRequired,
  }

  render() {
    const { lang, result } = this.props;
    return (
      <li className="SearchResult">
        <Link to={`/${lang}/firefox/addon/${result.slug}/`}
              className="SearchResult-link"
              ref={(el) => { this.name = el; }}>
          <section className="SearchResult-main">
            <h2 className="SearchResult-heading">
              <span className="SearchResult-name">
                {result.name}
              </span>
            </h2>
          </section>
        </Link>
      </li>
    );
  }
}
