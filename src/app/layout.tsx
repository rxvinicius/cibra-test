"use client";

import { Provider } from "react-redux";
import { Theme } from "@radix-ui/themes";
import { store } from "@/store/store";
import "@radix-ui/themes/styles.css";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Theme>{children}</Theme>
        </Provider>
      </body>
    </html>
  );
}
