import React from 'react';

export default class LinkBase extends React.Component {
  // static propTypes = {
  //   application: PropTypes.string.isRequired,
  //   lang: PropTypes.string.isRequired,
  // }

  render() {
    const { application, lang } = this.props.params;

    return (
      <a href=""></a>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { application, lang } = ownProps.params;
  return { application, lang };
}

export default connect(mapStateToProps)(LinkBase);
