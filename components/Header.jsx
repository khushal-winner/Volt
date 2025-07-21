"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import Colors from "@/data/Colors";
import Link from "next/link";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Download, Rocket, RocketIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { ActionContext } from "./custom/ActionContext";
import { useParams } from "next/navigation";
// import { useSidebar } from "./ui/sidebar";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const { action, setAction } = useContext(ActionContext);
  const params = useParams();

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="flex justify-between items-center p-4 m-4 h-[30px]">
      <Link href={"/"}>
        <Image src={"/logo.png"} alt="Logo" width={40} height={40} />
      </Link>

      <div className="flex gap-3 items-center">
        {!userDetail?.name && (
          <>
            <Button variant={"ghost"}>Sign In</Button>
            <Button
              className="text-white"
              style={{ backgroundColor: Colors.BLUE }}
            >
              Get Started
            </Button>
          </>
        )}
        {params?.id && (
          <>
            <Button
              onClick={() => onActionBtn("export")}
              variant={"ghost"}
              className="cursor-pointer"
            >
              <Download />
              Export
            </Button>

            <Button
              onClick={() => onActionBtn("deploy")}
              className="text-white hover:bg-blue-200 cursor-pointer"
              style={{ backgroundColor: Colors.BLUE }}
            >
              <RocketIcon />
              Deploy
            </Button>
          </>
        )}
        {userDetail?.name && (
          <Image
            onClick={toggleSidebar}
            src={userDetail?.picture}
            width={40}
            height={40}
            className="rounded-full"
            alt="User"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
