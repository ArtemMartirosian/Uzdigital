import { Center, HStack, Spacer, Text } from "@chakra-ui/react";
import { Import } from "../../../assets/icons/Import";
import useTelegram from "../../../hooks/useTelegram";
interface props {
  title: string;
  downloadLink?: string;
  icon: JSX.Element;
  onClick?: () => void;
}

const InstructionCard: React.FC<props> = ({
  title,
  downloadLink,
  icon,
  onClick,
}) => {
  const { tg } = useTelegram();

  function downloadPDF(url: string) {
    tg.openLink(url);
  }
  const onCardClick = () => {
    if (onClick) return onClick();
    if (downloadLink)
      return downloadPDF(
        import.meta.env.VITE_BASE_URL + "/media/" + downloadLink
      );
  };

  return (
    <HStack
      cursor={"pointer"}
      gap={2.5}
      p={2.5}
      borderRadius={"14px"}
      minH={"60px"}
      bg={"lightGrey"}
      onClick={onCardClick}
    >
      <Center borderRadius="10px" bg="white" p="9px">
        {icon}
      </Center>
      <Text minW={"50px"} maxW={"200px"} flexShrink={1}>
        {title}
      </Text>
      <Spacer />
      {downloadLink && <Import />}
    </HStack>
  );
};
export default InstructionCard;
