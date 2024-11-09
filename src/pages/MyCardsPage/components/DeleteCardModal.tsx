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
  isOpen: any;
  onAccept?: () => void;
  onCancel?: () => void;
  onDelete?: any;
  title?: string;
  subTitle?: string;
  subTitleNumber?: string;
  description?: string;
  acceptBtnTitle?: string;
}

const DeleteModal: React.FC<props> = ({ title , subTitle , subTitleNumber , acceptBtnTitle, isOpen, onAccept, onCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent width='295px' bg="white" p="18px">
        <ModalBody p={0}>
          <Text
            m="0 auto"
            maxWidth="240px"
            textAlign="center"
            fontWeight={600}
            lineHeight="22px"
            fontSize="17px"
          >
            {title}
          </Text>

          {
            subTitle || subTitleNumber && (
                  <Text textAlign='center' mt='8px' color="darkGrey" fontWeight={400} fontSize="15px">
                    {subTitle}{" "}
                    <Text
                        as="button"
                        color="activePurple"
                        fontWeight={500}
                    >
                      {subTitleNumber}
                    </Text>
                  </Text>
              )
          }


        </ModalBody>
        <ModalFooter p={0} mt='26px' alignItems="stretch" gap="14px">
          <Button
            variant="secondary"
            h="auto"
            flexBasis="50%"
            border='1px solid lightGrey'
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
            {acceptBtnTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
