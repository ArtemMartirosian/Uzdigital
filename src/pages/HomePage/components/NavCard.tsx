import { Box, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface props {
  icon: JSX.Element;
  title: string;
  desc: string;
  soon?: boolean;
  onClick?: () => void;
}
const NavCard: React.FC<props> = ({ icon, title, desc, soon, onClick }) => {
  const { t } = useTranslation();
  return (
    <VStack
      onClick={onClick}
      cursor={soon ? "not-allowed" : "pointer"}
      pos="relative"
      p="18px"
      borderRadius="20px"
      bg="lightGrey"
      minH="150px"
      overflow="hidden"
      opacity={soon ? 0.5 : 1}
    >
      <Box
        pos="absolute"
        top="-20%"
        right="-30%"
        sx={{
          "& svg": {
            boxSize: "200px",
            transform: "rotate(30deg)",
            opacity: 0.1,
          },
        }}
      >
        {icon}
      </Box>
      <Box
        alignSelf="flex-start"
        bg="logoGradient"
        h="20px"
        px="7px"
        borderRadius="2000"
        visibility={soon ? "visible" : "hidden"}
      >
        <Text color="white" fontWeight={600} fontSize="15px" lineHeight="17px">
          {t("soon")}
        </Text>
      </Box>
      <Spacer />
      <Box>
        <Heading
          fontSize="17px"
          fontWeight="700"
          color={soon ? "darkGrey" : "purple"}
          mb={1.5}
        >
          {title}
        </Heading>
        <Text color="darkGrey" lineHeight="17px">
          {desc}
        </Text>
      </Box>
    </VStack>
  );
};

export default NavCard;
