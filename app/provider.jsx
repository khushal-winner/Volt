"use client";
import { ActionContext } from "@/components/custom/ActionContext";
import AppSideBar from "@/components/custom/AppSideBar";
import Header from "@/components/Header";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex, useMutation } from "convex/react";
import { Loader, Loader2 } from "lucide-react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetail, setUserDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [action, setAction] = useState();
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    isAuthenticated();
  }, []);

  const isAuthenticated = async () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        router.push("/");
        return;
      }
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
        <PayPalScriptProvider>
          <ActionContext.Provider value={{ action, setAction }}>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
              <MessageContext.Provider value={{ messages, setMessages }}>
                <NextThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                >
                  <SidebarProvider
                    defaultOpen={false}
                    className="flex flex-col "
                  >
                    <Header />
                    <AppSideBar />
                    {children}
                  </SidebarProvider>
                </NextThemeProvider>
              </MessageContext.Provider>
            </UserDetailContext.Provider>
          </ActionContext.Provider>
        </PayPalScriptProvider>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Provider;
