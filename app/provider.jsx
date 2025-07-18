"use client";
import Header from "@/components/Header";
import { MessageContext } from "@/context/MessageContext";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { useState } from "react";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <div>
      <MessageContext.Provider value={{ messages, setMessages }}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </NextThemeProvider>
      </MessageContext.Provider>
    </div>
  );
};

export default Provider;
