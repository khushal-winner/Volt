"use client";
import AppSideBar from "@/components/custom/AppSideBar";
import Header from "@/components/Header";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex, useMutation } from "convex/react";
import { Loader, Loader2 } from "lucide-react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React, { useContext, useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));
      // fetch from database
      const result = await convex.query(api.user.GetUser, {
        email: user?.email,
      });
      setUserDetail(result);
      console.log("userDetail", result);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}
      >
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          <MessageContext.Provider value={{ messages, setMessages }}>
            <NextThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <SidebarProvider defaultOpen={false}>
                <AppSideBar />
                {children}
              </SidebarProvider>
            </NextThemeProvider>
          </MessageContext.Provider>
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Provider;
