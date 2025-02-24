"use client";

import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { store } from "@/store/store";
import "./globals.css";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Provider store={store}>
          <Theme>{children}</Theme>
        </Provider>
      </body>
    </html>
  );
}
