import React, { PropsWithChildren } from "react";
import IntlProvider from "./intl.provider";
import RouterProvider from "./router.provider";
import StoreProvider from "./store.provider";
import { SnackbarProvider } from "notistack";

const Providers: React.FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <StoreProvider>
      <IntlProvider>
        <SnackbarProvider
          maxSnack={4}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          preventDuplicate
        >
          <RouterProvider>{children}</RouterProvider>
        </SnackbarProvider>
      </IntlProvider>
    </StoreProvider>
  );
};

export default Providers;
