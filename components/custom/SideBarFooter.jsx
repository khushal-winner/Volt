import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const options = [
  {
    name: "Settings",
    icon: Settings,
  },
  {
    name: "Help Center",
    icon: HelpCircle,
  },
  {
    name: "My Subscription",
    icon: Wallet,
  },
  {
    name: "Sign Out",
    icon: LogOut,
  },
];

const AppSideBarFooter = () => {
  return (
    <div className=" pr-4 mb-10 w-full">
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant={"ghost"}
          className="flex gap-3 w-full justify-start m-2"
        >
          <option.icon className="size-5 flex items-center" />

          <h2 className="text-lg flex items-center">{option.name}</h2>
        </Button>
      ))}
    </div>
  );
};

export default AppSideBarFooter;
