import React from "react";

interface PanelProps {
  Header?: any;
  SubHeader?: any;
  Content?: any;
  Remark?: any;
  Footer?: any;
  IsExpand?: boolean;
  IsDisabled?: boolean;
  onExpand?: () => void;
}

export default function Panel(props: PanelProps) {
  const {
    Header,
    SubHeader,
    Content,
    Remark,
    Footer,
    IsExpand = true,
    IsDisabled = false,
    onExpand = null,
  } = props;

  const cssStyles = {
    container: {
      color: "black",
      padding: "0px",
      margin: "0px",
      border: "0px solid silver",
    },

    header: {
      color: "white",
      width: "100%",
      height: "24px",
      display: "flex",
      border: "0px solid red",
      backgroundColor: "rgb(13, 113, 166)",
      paddingLeft: "10px",
    },

    subheader: {
      color: "white",
      width: "100%",
      display: "flex",
      border: "0px solid red",
      backgroundColor: "rgb(13, 113, 166)",
      paddingLeft: "10px",
    },

    disabledHeader: {
      backgroundImage: `url("/images/menubg_disabled.png")`,
    },

    content: {
      paddingTop: "0px",
      backgroundColor: "",
      border: "0px solid rgb(192, 192, 192)",
    },

    remark: {
      paddingTop: "5px",
      border: "0px solid rgb(192, 192, 192)",
    },

    footer: {
      padding: "5px",
      border: "0px solid rgb(192, 192, 192)",
      textAlign: "right" as const,
    },

    button: {
      marginTop: "0px",
      marginLeft: "auto",
      marginRight: "5px",
    },

    image: {
      height: 18,
      width: 18,
    },
  };

  let headerHtml = null;
  let subHeaderHtml = null;
  let contentHtml = null;
  let expandButton = null;
  let renderHtml = null;

  const handleKeyDown = (event: any) => {
    event.preventDefault();
  } 
  if (onExpand !== null) {
    if (IsExpand) {
      expandButton = (
        <img
          style={cssStyles.image}
          src={require("@/assets/images/expand.png")}
          alt=""
          onClick={onExpand}
          onKeyDown={handleKeyDown}
        />
      );
    } else {
      expandButton = (
        <img
          style={cssStyles.image}
          src={require("@/assets/images/collapse.png")}
          alt=""
          onClick={onExpand}
          onKeyDown={handleKeyDown}
        />
      );
    }
  }

  if (IsExpand) {
    contentHtml = (
      <div>
        <div style={cssStyles.content}>{Content}</div>

        <div style={cssStyles.remark}>{Remark}</div>

        <div style={cssStyles.footer}>{Footer}</div>
      </div>
    );
  }

  if (Header) {
    if (IsDisabled) {
      headerHtml = (
        <div style={{ ...cssStyles.header, ...cssStyles.disabledHeader }}>
          {Header}
          <div style={cssStyles.button}>{expandButton}</div>
        </div>
      );
    } else {
      headerHtml = (
        <div style={cssStyles.header}>
          {Header}
          <div style={cssStyles.button}>{expandButton}</div>
        </div>
      );
    }
  }

  if (SubHeader) {
    if (IsDisabled) {
      subHeaderHtml = (
        <div style={{ ...cssStyles.subheader, ...cssStyles.disabledHeader }}>
          {SubHeader}
        </div>
      );
    } else {
      subHeaderHtml = <div style={cssStyles.subheader}>{SubHeader}</div>;
    }
  }

  if (IsDisabled) {
    renderHtml = (
      <div>
        <div style={cssStyles.container}>
          {headerHtml}
          <div className="overlay">
            {subHeaderHtml}
            {contentHtml}
          </div>
        </div>
        <div style={{ height: "0px" }} />
      </div>
    );
  } else {
    renderHtml = (
      <div>
        <div style={cssStyles.container}>
          {headerHtml}
          {subHeaderHtml}
          {contentHtml}
        </div>
        <div style={{ height: "0px" }} />
      </div>
    );
  }

  return renderHtml;
}
