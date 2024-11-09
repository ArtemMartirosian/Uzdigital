import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { pagesWithoutBackBtn } from "../constants/pagesWithoutBackBtn";
import useTelegram from "./useTelegram";

export const useBackButton = () => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  tg.BackButton.onClick(() => {
    navigate(-1);
  });

  useEffect(() => {
    pagesWithoutBackBtn.includes(pathname)
      ? tg.BackButton.hide()
      : tg.BackButton.show();
  }, [pathname]);
};
