import React from "react";
import Tooltip from "@mui/material/Tooltip";
import FormControl from "@mui/material/FormControl";

interface ToolTipsProps {
  text: any;
  content?: any;
}

export default function ToolTips(props: ToolTipsProps) {
  const { text, content } = props;
  const [show, setShow] = React.useState(false);

  const cssStyles = {
    container: {
      display: "flex",
      paddingRight: "0px",
      paddingLeft: "0px",
    },

    image: {
      height: 20,
      width: 20,
      cursor: "help",
    },

    text: {
      fontSize: "14px",
    },
  };

  let renderHtml = null;
  let tipsHtml = null;

  tipsHtml = (
    <div>
      <div style={cssStyles.text}>{text}</div>
    </div>
  );

  renderHtml = (
    <FormControl>
      <Tooltip
        title={tipsHtml}
        open={show}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(false)}
      >
        <div style={cssStyles.container}>
          {content ? (
            <div style={{cursor: "help"}}>{content}</div>
          ) : (
            <img 
              style={cssStyles.image} 
              src={require("@/assets/images/tooltips.png")}
              alt="" 
            />
          )}
        </div>
      </Tooltip>
    </FormControl>
  );

  return renderHtml;
}
