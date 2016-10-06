/* global window */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router';
import { compose } from 'redux';

import 'core/fonts/fira.scss';
import 'amo/css/App.scss';
import SearchForm from 'amo/components/SearchForm';
import translate from 'core/i18n/translate';
import { startLoginUrl } from 'core/api';
import MastHead from 'amo/components/MastHead';


export class AppBase extends React.Component {
  static propTypes = {
    application: PropTypes.string.isRequired,
    children: PropTypes.node,
    handleLogIn: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    lang: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    MastHeadComponent: PropTypes.node,
  }

  static defaultProps = {
    MastHeadComponent: MastHead,
  }

  accountButton() {
    const { handleLogIn, i18n, isAuthenticated, location } = this.props;
    return (
      <button className="button AccountButton"
              onClick={() => handleLogIn(location)}
              ref={(ref) => { this.logInButton = ref; }}>
        <span>{ isAuthenticated ? i18n.gettext('Log out') : i18n.gettext('Log in/Sign up') }</span>
      </button>
    );
  }

  render() {
    const { MastHeadComponent, application, children, i18n, lang,
            location } = this.props;
    const query = location.query ? location.query.q : null;
    return (
      <div className="amo">
        <Helmet defaultTitle={i18n.gettext('Add-ons for Firefox')} />
        <MastHeadComponent SearchFormComponent={SearchForm} lang={lang}
                           application={application} query={query}>
          {this.accountButton()}
        </MastHeadComponent>
        {children}
      </div>
    );
  }
}

export const setupMapStateToProps = (_window) => (state, ownProps) => ({
  application: ownProps.params.application,
  lang: state.api.lang,
  params: state.params,
  isAuthenticated: !!state.auth.token,
  handleLogIn(location) {
    // eslint-disable-next-line no-param-reassign
    (_window || window).location = startLoginUrl({ location });
  },
});

export default compose(
  connect(setupMapStateToProps()),
  translate({ withRef: true }),
)(AppBase);
