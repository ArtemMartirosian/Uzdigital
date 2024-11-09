import { Spinner } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useGetUser } from "../apis/UsersApis/UserApis.service";
import { mainPaths } from "./paths/mainPaths";
import { useTranslation } from "react-i18next";
import {getCardData, getUserData, UserData} from "../store/slices/userSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";

interface IProtectedRoutesProps {
  children?: ReactNode;
}

const ProtectedRoutes = ({ children }: IProtectedRoutesProps) => {
  const { i18n } = useTranslation();
  const {
    data: user,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUser({ retry: 0 });
  const isAuth = Boolean(user?.data?.language);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isSuccess) {
      i18n.changeLanguage(user?.data?.language || "uz");
    }
    dispatch(getUserData()).then((res) => {
      const payload = res?.payload as UserData;
      const userId = payload?.id;
      if (userId && window.localStorage.getItem("token")) {
        dispatch(getCardData(Number(userId)));
      }
    });
  }, [isSuccess]);

  // const isAuth = true; //? temporarily

  if (isError && error?.status === 406) {
    return <Navigate to={mainPaths.Language} replace />;
  }


  if (isLoading)
    return (
      <Spinner
        thickness="6px"
        speed="0.5s"
        emptyColor="purple.200"
        color="activePurple"
        boxSize="50px"
        position="fixed"
        top="calc(50vh - 25px)"
        left="calc(50vw - 25px)"
        zIndex={10}
      />
    );

  if (isAuth) return children ? children : <Outlet />;

  return <Navigate to={mainPaths.Language} replace />;
};

export default ProtectedRoutes;
