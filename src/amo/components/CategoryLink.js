import React, { PropTypes } from 'react';

import { Link } from 'react-router'


export class Category extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }

  render() {
    const { application, lang, name, slug } = this.props;
    const type = 'extension';

    return (
      <Link className="Category-link"
        to={`/${lang}/${application}/search/?app=${application}&category=${slug}&type=${type}`}>
        {name}
      </Link>
    );
  }
}

export default Category;
