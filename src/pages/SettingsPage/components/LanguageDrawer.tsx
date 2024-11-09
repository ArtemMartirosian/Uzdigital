import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Close } from "../../../assets/icons/Close";
import { Global } from "../../../assets/icons/Global";
import { TAppLanguage } from "../../../types/appLanguages.type";
import { LanguageRadioGroup } from "../../LanguagePage/components/LanguageRadio/LanguageRadioGroup";
import Option from "./Options";

const LanguageDrawer = () => {
  const [language, setLanguage] = useState<TAppLanguage>();

  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Option
        bordered
        icon={<Global />}
        title={t("language")}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent borderRadius={"22px 22px 0px 0px"} pt={"22px"}>
          <DrawerHeader>
            <HStack alignItems={"center"}>
              <Text
                fontWeight={600}
                fontSize={"18px"}
                flexGrow={1}
                textAlign={"center"}
              >
                {t("select_language")}
              </Text>
              <Close cursor={"pointer"} onClick={onClose} />
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <LanguageRadioGroup
              language={language || "uz"}
              setLanguage={setLanguage}
              withRequest
            />
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LanguageDrawer;
