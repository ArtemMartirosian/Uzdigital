import { RouteObject } from "react-router-dom";
import AboutPage from "../../pages/AboutPage/AboutPage";
import HomePage from "../../pages/HomePage/HomePage";
import IDFormPage from "../../pages/IDFormPage/IDFormPage";
import PaymentDetailsPage from "../../pages/PaymentDetailsPage/PaymentDetailsPage";
import PaymentHistoryPage from "../../pages/PaymentHistoryPage/PaymentHistoryPage";
import PaymentResultPage from "../../pages/PaymentResultPage/PaymentResultPage";
import ProtectedRoutes from "../ProtectedRoutes";
import { mainPaths } from "../paths/mainPaths";
import OTPPage from "../../pages/OTPPage/OTPPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import InstructionsPage from "../../pages/InstructionsPage/InstructionsPage";
import InstructionsFrequencyPage from "../../pages/InstructionsFrequencyPage/InstructionsFrequencyPage";
import ApplicationPage from "../../pages/ApplicationPage/ApplicationPage";
import ApplicationFormPage from "../../pages/ApplicationFormPage/ApplicationFormPage";
import ApplicationIDPage from "../../pages/ApplicationIDPage/ApplicationIDPage";
import GetIDPage from "../../pages/GetIDPage/GetIDPage";
import LoginPage from "../../pages/LoginPage/LoginPage.tsx";
import AccountPage from "../../pages/AccountPage/AccountPage.tsx";
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage.tsx";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage.tsx";
import RecoveryPasswordPage from "../../pages/RecoveryPasswordPage/RecoveryPasswordPage.tsx";
import UnregisteredPage from "../../pages/UnregisteredPage/UnregisteredPage.tsx";
import MyCardsPage from "../../pages/MyCardsPage/MyCardsPage.tsx";
import AddCardsPage from "../../pages/AddCardsPage/AddCardsPage.tsx";
import AutopaymentPage from "../../pages/AutopaymentPage/AutopaymentPage.tsx";
import ApproveCard from "../../pages/AddCardsPage/components/ApproveCard.tsx";
import AddAutoPayment from "../../pages/AddAutoPayment/AddAutoPayment.tsx";
import DetailAutoPayment from "../../pages/AutopaymentPage/components/DetailAutoPayment/DetailAutoPayment.tsx";
import AddAutoPaymentOtp from "../../pages/AddAutoPayment/components/AddAutoPaymentOrp.tsx";

export const authMappings: RouteObject[] = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: mainPaths.Home,
        element: <HomePage />,
        index: true,
      },
      {
        path: mainPaths.IDForm,
        element: <IDFormPage />,
      },
      {
        path: mainPaths.About,
        element: <AboutPage />,
      },
      {
        path: mainPaths.PaymentDetails,
        element: <PaymentDetailsPage />,
      },
      {
        path: mainPaths.PaymentDetailsById,
        element: <PaymentDetailsPage />,
      },
      {
        path: mainPaths.OTP,
        element: <OTPPage />,
      },
      {
        path: mainPaths.PaymentResult,
        element: <PaymentResultPage />,
      },
      {
        path: mainPaths.PaymentHistory,
        element: <PaymentHistoryPage />,
      },
      {
        path: mainPaths.Settings,
        element: <SettingsPage />,
      },
      {
        path: mainPaths.Instructions,
        element: <InstructionsPage />,
      },
      {
        path: mainPaths.InstructionsFrequency,
        element: <InstructionsFrequencyPage />,
      },
      {
        path: mainPaths.Application,
        element: <ApplicationPage />,
      },
      {
        path: mainPaths.ApplicationForm,
        element: <ApplicationFormPage />,
      },
      {
        path: mainPaths.ApplicationID,
        element: <ApplicationIDPage />,
      },
      {
        path: mainPaths.GetID,
        element: <GetIDPage />,
      },
      {
        path: mainPaths.Account,
        element: <AccountPage />,
      },
      {
        path: mainPaths.UnRegistered,
        element: <UnregisteredPage />,
      },
      {
        path: mainPaths.Login,
        element: <LoginPage />,
      },
      {
        path: mainPaths.Registration,
        element: <RegistrationPage />,
      },
      {
        path: mainPaths.ResetPassword,
        element: <ResetPasswordPage />,
      },
      {
        path: mainPaths.RecoveryPassword,
        element: <RecoveryPasswordPage />,
      },
      {
        path: mainPaths.Cards,
        element: <MyCardsPage />,
      },
      {
        path: mainPaths.AddCards,
        element: <AddCardsPage />,
      },
      {
        path: mainPaths.ApproveCard,
        element: <ApproveCard />,
      },
      {
        path: mainPaths.Autopayment,
        element: <AutopaymentPage />,
      },
      {
        path: mainPaths.AddAutopayment,
        element: <AddAutoPayment />,
      },
      {
        path: mainPaths.DetailAutopayment,
        element: <DetailAutoPayment />,
      },
      {
        path: mainPaths.AutopaymentOtp,
        element: <AddAutoPaymentOtp />,
      },
    ],
  },
];
