// @flow
import React from 'react';
import './style.less';

type Props = {
  spinning?: boolean,
};

function Loader() {
  return <div className="loader" />;
}
function Spinner(props: Props) {
  const { spinning } = props;
  if (!spinning) return null;
  return (
    <div className="spinner-wrapper">
      <Loader />
    </div>
  );
}
export default Spinner;
export { Loader, Spinner };
Spinner.defaultProps = {
  spinning: true,
};
