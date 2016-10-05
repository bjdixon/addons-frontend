import React, { PropTypes } from 'react';
import { Link } from 'react-router'


export class Category extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }

  render() {
    const { name, slug } = this.props;
    const app = 'firefox';
    const type = 'extension';
    console.log('\n\n\n\n\n');
    console.log('\n\n\n\n\n');
    console.log('\n\n\n\n\n');
    console.log(this.props.params);
    console.log('\n\n\n\n\n');
    console.log('\n\n\n\n\n');
    console.log('\n\n\n\n\n');

    return (
      <Link className="Category-link"
        to={`/en-GB/firefox/search/?app=${app}&category=${slug}&type=${type}`}>
        {name}
      </Link>
    );
  }
}

export default Category;
