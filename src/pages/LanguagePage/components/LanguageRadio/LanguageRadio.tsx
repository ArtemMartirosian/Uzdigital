import { HStack, Radio, Text, UseRadioProps } from "@chakra-ui/react";

export const LanguageRadio = ({
  name,
  icon,
  ...props
}: UseRadioProps & { icon: JSX.Element }) => {
  return (
    <Radio
      variant="languageRadio"
      flexDirection="row-reverse"
      justifyContent="space-between"
      {...props}
    >
      <HStack spacing="10px">
        {icon}
        <Text as="span">{name}</Text>
      </HStack>
    </Radio>
  );
};
