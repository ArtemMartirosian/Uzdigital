import {
  Flex,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import { ICheckAccountIDResponse } from "../../../../apis/CheckAccountIdByCDSN.service";
import { Close } from "../../../../assets/icons/Close";
import FailImg from "../../../../assets/images/FailFeedback.png";
import SuccessImg from "../../../../assets/images/SuccessFeedback.png";
import IdDataBox from "./components/IdDataBox";

export const MessageModal = ({
  isOpen,
  onClose,
  isSuccess,
  title,
  subtitle,
  IdData,
  infoImage,
  icon,
}: Omit<ModalProps, "children"> & {
  title: string;
  subtitle?: string;
  isSuccess?: boolean;
  IdData?: ICheckAccountIDResponse;
  infoImage?: string | null;
  icon?: string | null;
}) => {
  return (
    <Modal
      motionPreset="slideInTop"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW={IdData ? "300px" : "250px"} bg={"white"} p={5}>
        <ModalCloseButton as={Close} />
        <ModalBody textAlign="center" onClick={onClose}>
          {infoImage ? (
            <Img objectFit={"cover"} src={infoImage} />
          ) : IdData ? (
            <IdDataBox onClose={onClose} IdData={IdData} />
          ) : (
            <>
              <Flex justifyContent={"center"}>
                {isSuccess ? (
                  <Img h={"120px"} objectFit={"cover"} src={icon ? icon : SuccessImg} />
                ) : (
                  <Img h={"150px"} objectFit={"cover"} src={icon ? icon : FailImg} />
                )}
              </Flex>
              <Heading mb="3px" fontSize="16px">
                {title}
              </Heading>
              <Text fontSize="14px" fontWeight={500} color="gray.400">
                {subtitle}
              </Text>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
