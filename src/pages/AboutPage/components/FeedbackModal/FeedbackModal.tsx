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
import { useTranslation } from "react-i18next";
import { Close } from "../../../../assets/icons/Close";
import SuccessImg from "../../../../assets/images/SuccessFeedback.png";
import FailImg from "../../../../assets/images/FailFeedback.png";

export const FeedbackModal = ({
  isOpen,
  onClose,
  isSuccess,
}: Omit<ModalProps, "children"> & {
  isSuccess?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      motionPreset="slideInTop"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent maxW="250px" bg={"white"} p={5}>
        <ModalCloseButton as={Close} />
        <ModalBody textAlign="center" onClick={onClose}>
          <Flex justifyContent={"center"}>
            {isSuccess ? (
              <Img h={"120px"} objectFit={"cover"} src={SuccessImg} />
            ) : (
              <Img h={"150px"} objectFit={"cover"} src={FailImg} />
            )}
          </Flex>
          <Heading mb="3px" fontSize="16px">
            {isSuccess ? t("thanks") : t("mistake")}
          </Heading>
          <Text
            whiteSpace={"nowrap"}
            fontSize="14px"
            fontWeight={500}
            color="gray.400"
          >
            {isSuccess ? t("sub_thanks") : t("sub_mistake")}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
