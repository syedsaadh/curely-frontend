import React from 'react';
import { connect } from 'react-redux';

class BlankPage extends React.Component {
  state = {};
  render() {
    return (
      <div className="content" style={{ overflow: 'auto' }}>
        <h1 style={{ color: '#3f56d1' }}>Typography</h1>
        <br />
        <h1>
          {'<h1>'} Nisi eu veniam aliquip occaecat fugiat non do do fugiat excepteur dolore
          proident.
        </h1>
        <h2>
          {'<h2>'} Commodo non voluptate magna commodo est eiusmod laborum voluptate eiusmod aliqua
          cupidatat aliquip culpa eu.
        </h2>
        <h3>{'<h3>'} Aute adipisicing nulla occaecat velit magna occaecat elit.</h3>
        <h4>
          {'<h4>'} Consequat veniam tempor dolore dolor dolor sunt tempor eiusmod anim sit et.
        </h4>
        <br />
        <p>
          {'<p>'} Sunt ea est occaecat culpa fugiat ipsum irure. Laborum veniam culpa qui amet do
          adipisicing. Non mollit ut eu laboris. Mollit ut velit ex laboris dolore quis sunt non
          incididunt ad elit cillum. Voluptate exercitation esse cupidatat incididunt culpa et
          ullamco ex cupidatat nostrud irure sunt. Incididunt labore qui non consequat culpa sit
          eiusmod ut fugiat excepteur ea.
        </p>
        <br />
      </div>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(BlankPage);
