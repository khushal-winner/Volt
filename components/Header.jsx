import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Colors from "@/data/Colors";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Image src={"/logo.png"} alt="Logo" width={40} height={40} />

      <div className="flex gap-3">
        <Button variant={"ghost"}>Sign In</Button>
        <Button className="text-white" style={{ backgroundColor: Colors.BLUE }}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;
