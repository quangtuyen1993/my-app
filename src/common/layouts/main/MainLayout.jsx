import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { onRefreshToken } from "../../../redux/feature/user/user.slice";
import { CookieManger } from "../../../utils/CookieManager";
import Drawer from "./Drawer";
import Header from "./Header";
import Main from "./Main";

const drawWidth = 240;

export default function MainLayout(props) {
  const [open, setOpen] = useState(false);

  const { isLoading, isError, isLoginComplete } = useSelector(
    (state) => state.authorReducer
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const onRefresh = () => {
    dispatch(onRefreshToken());
  };

  useEffect(() => {
    var refreshToken = CookieManger.GetRefreshCookie();
    if (refreshToken === undefined) {
      history.push("/login");
      return;
    }
    if (!isLoading && isError) {
      history.push("/login");
      return;
    }
    if (!isLoading && !isLoginComplete) {
      onRefresh();
      return;
    }
  }, [isError, isLoginComplete, isLoading]);

  const onToggle = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Header drawerWidth={drawWidth} open={open} onToggleDrawer={onToggle} />
      <Drawer drawerWidth={drawWidth} open={open} onClose={onClose} />
      {isLoginComplete && <Main>{props.children}</Main>}
    </div>
  );
}
