import React from 'react';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import Categories from 'amo/components/Categories';
import translate from 'core/i18n/translate';


export class CategoriesBase extends React.Component {

  render() {
    return (
      <div className="Categories-Page">
        <Categories />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // const { slug } = ownProps.params;
  // return {
  //   addon: state.addons[slug],
  //   slug,
  // };
  return {};
}

export default compose(
  connect(mapStateToProps),
  translate({ withRef: true }),
)(CategoriesBase);
