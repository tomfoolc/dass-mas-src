import React from "react";

interface LabelProps {
  text: any;
  symbol?: string;
  style?: {};
}

export default function Label(props: LabelProps) {
  const { text, symbol = null, style } = props;

  const cssStyles = {
    container: {
      display: "flex",
    },

    symbol: {
      width: "40px",
    },

    text: {
      color: "black",
      paddingRight: "5px",
      border: "0px solid blue",
      borderRadius: "5px",
    },
  };

  let renderHtml = null;

  renderHtml = (
    <div style={{ ...cssStyles.container }}>
      {symbol ? <div style={cssStyles.symbol}> {symbol} </div> : null}
      <div style={{ ...cssStyles.text, ...style }}>{text}</div>
    </div>
  );

  return renderHtml;
}
