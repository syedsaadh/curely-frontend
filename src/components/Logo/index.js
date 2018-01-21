// @flow
import React from 'react';
import logoTextWhite from '../../image/logo-text-white.svg';
import logoTextLight from '../../image/logo-text-light.svg';
import logoTextDark from '../../image/logo-text-dark.svg';
import logoLight from '../../image/logo-light.svg';
import logoDark from '../../image/logo-dark.svg';

type Props = {
  text?: boolean,
  type?: string,
  height?: string,
};

function Logo(props: Props) {
  const { type, text, height } = props;
  let logo = logoTextDark;
  if (text) {
    if (type === 'dark') logo = logoTextDark;
    else if (type === 'light') logo = logoTextLight;
    else if (type === 'whiteText') logo = logoTextWhite;
  } else if (type === 'dark') logo = logoDark;
  else logo = logoLight;
  return (
    <div className="logo-wrapper">
      <img
        style={{
          height,
        }}
        src={logo}
        alt="logo"
      />
    </div>
  );
}
Logo.defaultProps = {
  type: 'default',
  height: '60px',
  text: true,
};
export default Logo;
