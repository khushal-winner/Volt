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
    <div className="p-5 mb-10 w-full">
      {options.map((option, idx) => (
        <Button
          key={idx}
          variant={"ghost"}
          className="flex gap-2 w-full justify-start m-2"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default AppSideBarFooter;
