import React from 'react';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import Categories from 'amo/components/Categories';
import translate from 'core/i18n/translate';


export default class CategoriesPage extends React.Component {

  render() {
    const { application, lang } = this.props.params;

    return (
      <div className="Categories-Page">
        <Categories application={application} lang={lang} />
      </div>
    );
  }
}
