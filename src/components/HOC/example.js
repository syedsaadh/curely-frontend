import React from 'react';

function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    state = {};
    render() {
      const newProps = {
        user: currentLoggedInUser,
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}
