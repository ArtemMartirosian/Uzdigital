import { Container, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useBackButton } from "../../hooks/useBackButton";
import { mainPaths } from "../../routes/paths/mainPaths";

const Layout = () => {
  useBackButton();
  // const { pathname } = useLocation();

  const { pathname } = useLocation();

  const isLanguagePage = Boolean(pathname === mainPaths.Language);

  return (
    <Container
      px={isLanguagePage ? 0 : 4}
      overflowX={"hidden"}
      position="relative"
      h="100%"
    >
      <Suspense
        fallback={
          <Spinner
            thickness="6px"
            speed="0.5s"
            emptyColor="purple.200"
            color="activePurple"
            boxSize="50px"
            position="fixed"
            top="calc(50vh - 25px)"
            left="calc(50vw - 25px)"
            zIndex={10}
          />
        }
      >
        {/* <ScaleFade key={pathname} in initialScale={0.9}> */}
        <Outlet />
        {/* </ScaleFade> */}
      </Suspense>
    </Container>
  );
};

export default Layout;
