import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface props {
  isOpen: boolean;
  onAccept: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<props> = ({ isOpen, onAccept, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent bg="white" p={5}>
        <ModalBody>
          <Text
            m="0 auto"
            maxWidth="240px"
            textAlign="center"
            fontWeight={500}
            lineHeight="22px"
          >
            {t("are_you_sure")}
          </Text>
        </ModalBody>
        <ModalFooter alignItems="stretch" gap="14px">
          <Button
            variant="secondary"
            h="auto"
            flexBasis="50%"
            onClick={onCancel}
          >
            {t("cancel")}
          </Button>
          <Button
            autoFocus
            variant="primary"
            h="auto"
            flexBasis="50%"
            onClick={onAccept}
          >
            {t("delete")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
