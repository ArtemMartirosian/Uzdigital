import { Box, Container, HStack } from "@chakra-ui/react";
import { ActiveHomeIcon, HomeIcon } from "../../../assets/icons/HomeIcon";
import {
  ActiveReceiptIcon,
  ReceiptIcon,
} from "../../../assets/icons/ReceiptIcon";
import { mainPaths } from "../../../routes/paths/mainPaths";
import NavbarButton from "../NavbarButton";
import {UserIconOutline} from "../../../assets/icons/UserIconOutline.tsx";
import {UserIcon} from "../../../assets/icons/UserIcon.tsx";

const Navbar = () => {
  return (
    <Box className="appNavbar" pos="fixed" bottom={5} left={0} w="100%">
      <Container>
        <Box borderRadius="16px" background="lightGradient" p="1px">
          <HStack
            borderRadius="16px"
            bg="white"
            padding="6px"
            justifyContent="space-around"
            minH="53px"
          >
            <NavbarButton
              activeIcon={<ActiveHomeIcon />}
              icon={<HomeIcon />}
              path={mainPaths.Home}
            />

            <NavbarButton
              activeIcon={<UserIcon />}
              icon={<UserIconOutline />}
              path={localStorage.getItem("token") ? mainPaths.Account : mainPaths.UnRegistered}
            />

            <NavbarButton
              activeIcon={<ActiveReceiptIcon />}
              icon={<ReceiptIcon />}
              path={mainPaths.PaymentHistory}
            />
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
