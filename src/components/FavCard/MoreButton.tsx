import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { VerticalDottesIcon } from "../../assets/icons/VerticalDottesIcon";
import { useTranslation } from "react-i18next";
import { PenChangeIcon } from "../../assets/icons/PenChangeIcon";
import { TrashIcon } from "../../assets/icons/TrashIcon";

interface IProps {
  onDelete: () => void;
}
const MoreButton: React.FC<IProps> = ({ onDelete }) => {
  const { t } = useTranslation();
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={"iconButton"}
        icon={<VerticalDottesIcon />}
        onClick={(e) => e.stopPropagation()}
      />
      <MenuList>
        <MenuItem cursor={"pointer"} as={HStack} gap={1.5}>
          <PenChangeIcon />
          <Text color={"black"}>{t("change")}</Text>
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          cursor={"pointer"}
          as={HStack}
          gap={1.5}
        >
          <TrashIcon />
          <Text color={"error"}>{t("delete")}</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MoreButton;
