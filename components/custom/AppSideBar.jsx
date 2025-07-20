import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkSpaceHistory from "./WorkSpaceHistory";
import SideBarFooter from "./SideBarFooter";
import AppSideBarFooter from "./SideBarFooter";

const AppSideBar = () => {
  return (
    <Sidebar className="scrollbar-hide ">
      <SidebarHeader>
        <Image
          className="m-2"
          height={45}
          width={45}
          src="/logo.png"
          alt="Logo"
        />
        <Button className="w-[80%] mb-2 mx-auto" variant="outline">
          <MessageCircleCode /> Start a new chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="scrollbar-hide">
        <SidebarGroup>
          <WorkSpaceHistory />
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <AppSideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSideBar;
