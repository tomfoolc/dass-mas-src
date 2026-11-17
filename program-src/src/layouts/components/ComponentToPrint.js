import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  render() {
    const { content } = this.props;

    let renderHtml = null;

    renderHtml = (
      <div
        style={{
          //width: "210mm",
          margin: "0",
          padding: "0",
          //overflow: "hidden",
          border: "0px solid blue",
        }}
      >
        {content}
      </div>
    );

    return renderHtml;
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} content={props.content} />;
});
