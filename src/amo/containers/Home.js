import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import translate from 'core/i18n/translate';


export class HomeBase extends React.Component {
  static props = {
    i18n: PropTypes.object.isRequired,
  }

  render() {
    const { i18n } = this.props;
    const { application, lang } = this.props.params;

    return (
      <div>
        <Link to={`/${lang}/${application}/categories/`}>
          {i18n.gettext('Categories')}
        </Link>
      </div>
    );
  }
}

export default translate({ withRef: true })(HomeBase);
