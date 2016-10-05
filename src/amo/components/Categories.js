import React, { PropTypes } from 'react';

import translate from 'core/i18n/translate';
import CategoryLink from './CategoryLink';


export class CategoriesBase extends React.Component {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
  }

  render() {
    const { i18n } = this.props;

    const categories = {
      firefox: {
        dictionary: {
          'general': i18n.gettext('General'),
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
          'bookmarks': i18n.gettext('Bookmarks'),
        },
        themes: {
          'animals': i18n.gettext('Animals'),
        }
      }
    };

    const categoriesHTML = (
      <ul className="Categories-list" ref={(ref) => { this.categories = ref; }}>
        {categories.firefox.extensions.map((category) => {
          return <li><CategoryLink {...category} /></li>;
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
