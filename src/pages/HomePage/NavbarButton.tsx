import { IconButton } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface props {
  icon: JSX.Element;
  path: string;
  activeIcon: JSX.Element;
}

const NavbarButton: React.FC<props> = ({ icon, activeIcon, path }) => {
  const { pathname } = useLocation();
  const isActive = path === pathname;

  return (
    <IconButton
      variant="iconButton"
      bg="white"
      icon={isActive ? activeIcon : icon}
      as={Link}
      to={path}
      aria-label="Navigation button"
    />
  );
};
export default NavbarButton;
