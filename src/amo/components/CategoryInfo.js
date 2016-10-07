import classNames from 'classnames';
import React, { PropTypes } from 'react';

// import translate from 'core/i18n/translate';
// import CategoryLink from './CategoryLink';
import { CATEGORIES } from './Categories';

import './CategoryInfo.scss';


export default class CategoryInfo extends React.Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
  }

  render() {
    const { application, i18n, lang, slug, type } = this.props;

    const match = CATEGORIES[application || 'firefox'][type || 'extensions'].filter((category) => {
      return category.slug == slug;
    });

    if (!match) {
      return null;
    }

    const category = match[0];

    return (
      <div className={classNames('CategoryInfo', category.slug)}>
        <h2 className="CategoryInfo-header">{category.name}</h2>

        <p className="CategoryInfo-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique nibh eget mi vestibulum, vel pulvinar elit.
        </p>
      </div>
    );
  }
}

// export default translate({ withRef: true })(CategoryInfoBase);
