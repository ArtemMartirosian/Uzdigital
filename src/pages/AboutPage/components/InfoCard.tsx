import { Box, Center, Text } from "@chakra-ui/react";
// import useTelegram from "../../../hooks/useTelegram";
interface props {
  icon: JSX.Element;
  label: string;
  info: string;
  variant?: "tel" | "mail";
}
const InfoCard: React.FC<props> = ({ icon, label, info, variant }) => {
  // const { tg } = useTelegram();

  const value = variant === "tel" ? info?.replace(/[ ()]/g, "") : info;
  const href = variant === "tel" ? `tel:${value}` : `mailto:${value}`;

  const onCardClick = () => {
    window.open(href, "_blank");
    // tg.openLink(href);
  };

  return (
    <Center
      borderRadius={"14px"}
      flexGrow={1}
      gap={2}
      bg={"palePurple"}
      p={"9px 14px"}
      minH={"55px"}
      onClick={onCardClick}
      cursor={"pointer"}
    >
      {icon}
      <Box>
        <Text whiteSpace={"nowrap"} color={"darkGrey"}>
          {label}
        </Text>
        <Text fontWeight={500} color={"black"} whiteSpace={"nowrap"}>
          {info}
        </Text>
      </Box>
    </Center>
  );
};
export default InfoCard;
