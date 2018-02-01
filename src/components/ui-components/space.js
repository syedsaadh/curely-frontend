import React from "react";
type Props = {
  h: string,
  w: string,
  padTop?: string,
  padBottom?: string,
  padLeft?: string,
  padRight?: string,
  pad?: string,
  marginTop?: string,
  marginBottom?: string,
  marginLeft?: string,
  marginRight?: string,
  margin?: string,
  background?: string
};
function Space(props: Props) {
  const {
    pad,
    padBottom,
    padLeft,
    padRight,
    padTop,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    background,
    h,
    w
  } = props;
  return (
    <div
      style={{
        display: "block",
        background: background,
        width: w,
        height: h,
        padding: pad,
        paddingLeft: padLeft,
        paddingRight: padRight,
        paddingBottom: padBottom,
        paddingTop: padTop,
        margin: margin,
        marginBottom: marginBottom,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop
      }}
    />
  );
}
Space.defaultProps = {
  h: "100%",
  w: "100%",
  padTop: "0",
  padBottom: "0",
  padLeft: "0",
  padRight: "0",
  pad: "0",
  marginTop: "0",
  marginBottom: "0",
  marginLeft: "0",
  marginRight: "0",
  margin: "0",
  background: "transparent"
};
export default Space;
