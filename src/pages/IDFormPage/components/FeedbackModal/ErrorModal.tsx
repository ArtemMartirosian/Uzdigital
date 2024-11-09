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
import image from "../../../../assets/images/idNotFound.png";

export const ErrorModal = ({
  isOpen,
  onClose,
}: Omit<ModalProps, "children">) => {
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
            <Img h={"150px"} objectFit={"cover"} src={image} />
          </Flex>
          <Heading mb="3px" fontSize="16px">
            {t("mistake")}
          </Heading>
          <Text
            whiteSpace={"nowrap"}
            fontSize="14px"
            fontWeight={500}
            color="gray.400"
          >
            {t("id_not_found")}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
