import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  findRenderedComponentWithType,
  renderIntoDocument,
} from 'react-addons-test-utils';

import Home from 'amo/containers/Home';
import I18nProvider from 'core/i18n/Provider';
import { getFakeI18nInst } from 'tests/client/helpers';


describe('Home', () => {
  function render(props) {
    return findRenderedComponentWithType(renderIntoDocument(
      <I18nProvider i18n={getFakeI18nInst()}>
        <Home {...props} />
      </I18nProvider>
    ), Home).getWrappedInstance();
  }

  it('renders a heading', () => {
    const root = render({ params: { application: 'firefox', lang: 'en-US' } });
    assert.equal(root.categoryLink.props.children, 'Categories');
  });
});
