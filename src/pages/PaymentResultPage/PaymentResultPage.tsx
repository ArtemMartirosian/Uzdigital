import { useLocation } from "react-router-dom";
import { FailResult } from "./components/FailResult";
import { SuccessResult } from "./components/SuccessResult";

const PaymentResultPage = () => {
  const {
    state: { status },
  } = useLocation();

  const isSuccess = status === "paid";

  if (isSuccess) {
    return <SuccessResult />;
  } else {
    return <FailResult />;
  }
};

export default PaymentResultPage;
