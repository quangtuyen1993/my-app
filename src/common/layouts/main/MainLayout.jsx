import React, { useState } from "react";
import Drawer from "./Drawer";
import Header from "./Header";
import Main from "./Main";

const drawWidth = 240;

export default function MainLayout(props) {
  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen(!open);
  };
  const onClose = () => {
    window.scrollTo({
      top:0
    })
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {console.log("render home")}
      <Header drawerWidth={drawWidth} open={open} onToggleDrawer={onToggle} />
      <Drawer drawerWidth={drawWidth} open={open} onClose={onClose} />
      <Main>{props.children}</Main>
    </div>
  );
}
