import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { onRefreshToken } from "../../../redux/feature/user/user.slice";
import { CookieManger } from "../../../utils/CookieManager";
import Drawer from "./Drawer";
import Header from "./Header";
import Main from "./Main";

const drawWidth = 240;

export default function MainLayout({children,location,navigate}) {
  const [open, setOpen] = useState(false);

  const { isLoading, isError, isLoginComplete } = useSelector(
    (state) => state.authorReducer
  );
  const dispatch = useDispatch();
  const history = useNavigate();

  const onRefresh = useCallback(() => {
    dispatch(onRefreshToken());
  },[dispatch]);

  useEffect(() => {
    var refreshToken = CookieManger.GetRefreshCookie();
    if (refreshToken === undefined) {
      history("/login");
      return;
    }
    if (!isLoading && isError) {
      history("/login");
      return;
    }
    if (!isLoading && !isLoginComplete) {
      onRefresh();
      return;
    }
  }, [isError, isLoginComplete, isLoading, history, onRefresh]);

  const onToggle = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header drawerWidth={drawWidth} open={open} onToggleDrawer={onToggle} />
      <Drawer drawerWidth={drawWidth} open={open} onClose={onClose} />
      {isLoginComplete && <Main>{children}</Main>}
    </div>
  );
}
