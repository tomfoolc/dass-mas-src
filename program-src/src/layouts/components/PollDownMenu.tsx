import React from "react";
import Button from "./Button";

interface PollDownMenuProps {
  text: string;
  menuList?: any;
  handleOpen?: () => void;
}

export default function PollDownMenu(props: PollDownMenuProps) {
  const { text, menuList, handleOpen } = props;

  const cssStyles = {
    button: {
      backgroundColor: "transparent",
      color: "white",
      padding: 0,
      margin: 2,
      minWidth: 5,
      width: 110,
      height: 26,
    },
  };

  const [showMenu, setShowMenu] = React.useState(false);
  const handleonFocus = (event: any) => {
    event.preventDefault();
  }  
  let renderHtml = null;

  if (showMenu)
    renderHtml = (
      <div
        onMouseOver={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        onFocus={handleonFocus}
      >
        <div>
          <Button style={cssStyles.button} onClick={handleOpen} text={text} />
        </div>
        <div style={{ zIndex: 999 }}>{menuList}</div>
      </div>
    );
  else
    renderHtml = (
      <div className="row">
        <div
          onMouseOver={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          onFocus={handleonFocus}
        >
          <Button style={cssStyles.button} onClick={handleOpen} text={text} />
          <div className="hidden" style={{ height: 21 }}></div>
        </div>
      </div>
    );

  return renderHtml;
}
