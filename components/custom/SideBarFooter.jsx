"use client";
import {
  ArrowLeftCircle,
  ArrowLeftCircleIcon,
  ArrowLeftFromLine,
  HelpCircle,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { googleLogout } from "@react-oauth/google";

const options = [
  {
    name: "Settings",
    icon: Settings,
  },
  {
    name: "Help Center",
    icon: HelpCircle,
    path: "/pricing",
  },
  {
    name: "My Subscription",
    icon: Wallet,
    path: "/pricing",
  },
  {
    name: "Sign Out",
    icon: LogOut,
  },
];

const AppSideBarFooter = () => {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const onOptionClick = (option) => {
    if (option.name == "Sign Out") {
      googleLogout();
      localStorage.removeItem("user");
      router.push("/");
    }
    if (option.path) {
      router.push(option.path);
    }
  };
  return (
    <>
      <div className=" flex flex-col pr-4 mb-10 w-full ">
        {options.map((option, idx) => (
          <Button
            key={idx}
            onClick={() => {
              onOptionClick(option);
              toggleSidebar();
            }}
            variant={"ghost"}
            className="flex gap-3 w-full justify-start m-2"
          >
            <option.icon className="size-5 flex items-center" />

            <h2 className="text-lg flex items-center">{option.name}</h2>
          </Button>
        ))}
      </div>
    </>
  );
};

export default AppSideBarFooter;
