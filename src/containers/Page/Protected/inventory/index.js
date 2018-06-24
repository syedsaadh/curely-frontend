import React from 'react';
import { connect } from 'react-redux';
import Router from './inventory.router';
import './style.less';

class Inventory extends React.Component {
  state = {};
  render() {
    const { url } = this.props.match;
    return <Router url={url} />;
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
