import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import useTelegram from "./hooks/useTelegram";
import { router } from "./routes";
import { theme } from "./theme";

const queryClient = new QueryClient();

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} position="left" /> */}
    </QueryClientProvider>
  );
}

export default App;
