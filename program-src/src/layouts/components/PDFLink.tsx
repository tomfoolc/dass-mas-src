import React from "react";

interface PDFLinkProps {
  name: string;
  href: string;
}

export default function PDFLink(props: PDFLinkProps) {
  const { name, href } = props;

  const cssStyles = {
    image: {
      height: 20,
      width: 20,
    },

    text: {
      color: "black",
      textDecorationLine: "none",
      paddingRight: "10px",
    },
  };

  let renderHtml = null;

  renderHtml = (
    <div>
      <img 
        style={cssStyles.image} 
        src={require("@/assets/images/pdf.jpg")}
        alt="PDF Document" 
      />
      <a
        style={cssStyles.text}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {name}
      </a>
    </div>
  );

  return renderHtml;
}
