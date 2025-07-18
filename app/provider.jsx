import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";

const Provider = ({ children }) => {
  return (
    <div>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </div>
  );
};

export default Provider;
