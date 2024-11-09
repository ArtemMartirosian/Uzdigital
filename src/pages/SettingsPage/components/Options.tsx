import { Center, ChakraProps, HStack, Text } from "@chakra-ui/react";
import { ArrowRight } from "../../../assets/icons/ArrowRight";
interface props extends ChakraProps {
  icon: JSX.Element;
  title: string;
  bordered?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Option: React.FC<props> = ({
  icon,
  title,
  bordered,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <HStack
      onClick={onClick}
      cursor={disabled ? "not-allowed" : "pointer"}
      borderBottom={bordered ? "1px solid #E8EEF7" : "none"}
      gap={2.5}
      py={"14px"}
      alignItems={"center"}
      opacity={disabled ? 0.5 : 1}
      {...props}
    >
      <Center borderRadius="12px" bg={"lightGrey"} p={"9px"} flexShrink={0}>
        {icon}
      </Center>
      <Text fontWeight={500} fontSize={"15px"} flexGrow={1}>
        {title}
      </Text>
      <ArrowRight />
    </HStack>
  );
};

export default Option;
