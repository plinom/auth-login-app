import { Box } from "@mui/material";
import { ReactNode } from "react";

import { Header } from "../../src/components/header.component";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <Header />
      <Box
        sx={{
          m: "0 auto",
          maxWidth: "1020px",
          mt: "20px",
          p: "0 10px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </>
  );
}
