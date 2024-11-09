import { LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ILinkItemProps {
  description: string;
  link: string;
  logo: ReactNode;
}

export const LinkItem = ({ logo, description, link }: ILinkItemProps) => {
  return (
    <LinkBox
      flexBasis="50%"
      textAlign="center"
      borderWidth="1px"
      borderColor="gray.100"
      _dark={{ borderColor: "black.400" }}
      borderRadius="14px"
      pt="10px"
      pb="12px"
    >
      <LinkOverlay href={link} target="_blank">
        <Text
          color="gray.400"
          fontSize="13px"
          _dark={{ color: "gray.600" }}
          mb="8px"
        >
          {description}
        </Text>
        {logo}
      </LinkOverlay>
    </LinkBox>
  );
};
