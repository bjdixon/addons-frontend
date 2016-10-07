import React, { PropTypes } from 'react';

import translate from 'core/i18n/translate';
import CategoryLink from './CategoryLink';

import './Categories.scss';


export const CATEGORIES = {
  firefox: {
    dictionary: {
      'general': 'General',
    },
    extensions: [
      { name: 'Alerts & Updates', slug: 'alerts-updates', },
      { name: 'Appearance', slug: 'appearance', },
      { name: 'Bookmarks', slug: 'bookmarks', },
      { name: 'Download Management', slug: 'download-management', },
      { name: 'Feeds, News & Blogging', slug: 'feeds-news-blogging', },
      { name: 'Games & Entertainment', slug: 'games-entertainment', },
    ],
    search: {
      'bookmarks': 'Bookmarks',
    },
    themes: {
      'animals': 'Animals',
    }
  }
};

export class CategoriesBase extends React.Component {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
  }

  render() {
    const { application, i18n, lang } = this.props;

    const categoriesHTML = (
      <ul className="Categories-list" ref={(ref) => { this.categories = ref; }}>
        {CATEGORIES.firefox.extensions.map((category) => {
          return (
            <li className="Categories-listItem">
              <CategoryLink application={application} lang={lang}
                {...category} />
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className="Categories">
        {categoriesHTML}
      </div>
    );
  }
}

export default translate({ withRef: true })(CategoriesBase);
