import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import Colors from "@/data/Colors";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="flex justify-between items-center p-4">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
      </Link>

      <div className="flex gap-3">
        {!userDetail?.name && <Button variant={"ghost"}>Sign In</Button>}
        <Button className="text-white" style={{ backgroundColor: Colors.BLUE }}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;
