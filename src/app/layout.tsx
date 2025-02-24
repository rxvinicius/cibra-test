import ClientLayout from "./ClientLayout";

export const metadata = {
  title: "Cibra Test",
  description: "Desafio Técnico da Cibra",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
