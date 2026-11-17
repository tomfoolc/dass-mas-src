import React from "react";

interface LinkProps {
  page: string;
  target: string;
  children: any;
}

export default function Link(props: LinkProps) {
  const { page, target, children } = props;

  const cssStyles = {
    link: {
      color: "black",
    },
  };

  let renderHtml = null;

  renderHtml = (
    <a style={cssStyles.link} href={page || "#"} target={target}>
      {children}
    </a>
  );

  return renderHtml;
}
