import {Heading, HeadingProps, IconButton} from "@chakra-ui/react";

interface ISectionTitleProps extends HeadingProps {
  title: string;
  icon?: any;
  onIconClick?: () => void;
}

export const SectionTitle = ({ title, onIconClick, icon,...props }: ISectionTitleProps) => {

  return (
    <Heading
        display="flex"
        justifyContent="space-between"
        fontSize="20px"
        fontWeight="600"
        color="text"
        _dark={{ color: "white" }}
        {...props}
    >
      {title}
      {icon &&
          <IconButton
          aria-label="Icon Button" // Accessibility label for the icon button
          icon={icon && icon}
          onClick={onIconClick}
          variant="ghost" // Style variant to make the button transparent
      />}
    </Heading>
  );
};
