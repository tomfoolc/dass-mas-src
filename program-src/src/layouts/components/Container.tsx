import React from "react";

interface ContainerProps {
  contentModel: string;
  leftContent: any;
  rightContent: any;
}

export default function Container(props: ContainerProps) {
  const { contentModel, leftContent, rightContent } = props; // half, third, quarter

  let renderHtml = null;

  if (contentModel === "half")
    renderHtml = (
      <div className="row">
        <div className="w3-half">{leftContent}</div>

        <div className="w3-half">{rightContent}</div>
      </div>
    );
  else if (contentModel === "one_third")
    renderHtml = (
      <div className="row">
        <div className="w3-third">{leftContent}</div>

        <div className="w3-twothird">{rightContent}</div>
      </div>
    );
  else if (contentModel === "two_third")
    renderHtml = (
      <div className="row">
        <div className="w3-twothird">{leftContent}</div>

        <div className="w3-third">{rightContent}</div>
      </div>
    );
  else if (contentModel === "one_quarter")
    renderHtml = (
      <div className="row">
        <div className="w3-quarter">{leftContent}</div>

        <div className="w3-threequarter">{rightContent}</div>
      </div>
    );
  else if (contentModel === "three_quarter")
    renderHtml = (
      <div className="row">
        <div className="w3-threequarter">{props.leftContent}</div>

        <div className="w3-quarter">{props.rightContent}</div>
      </div>
    );
  else
    renderHtml = (
      <div className="row">
        <div className="w3-half" style={{ backgroundColor: "" }}>
          {props.leftContent}
        </div>

        <div className="w3-half">{props.rightContent}</div>
      </div>
    );

  return <div style={{ border: "0px solid red" }}> {renderHtml} </div>;
}
