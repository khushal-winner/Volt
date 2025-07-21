import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkSpaceHistory from "./WorkSpaceHistory";
import SideBarFooter from "./SideBarFooter";
import AppSideBarFooter from "./SideBarFooter";
import { useRouter } from "next/navigation";

const AppSideBar = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className="scrollbar-hide ">
      <SidebarHeader>
        <Image
          className="m-2"
          height={40}
          width={40}
          src="/logo.png"
          alt="Logo"
        />
        <Button
          onClick={() => {
            router.push("/");
            toggleSidebar();
          }}
          className="w-[80%] mb-2 mx-auto"
          variant="outline"
        >
          <MessageCircleCode /> Start a new chat
        </Button>
        <h2 className="flex mx-auto w-full justify-center items-center gap-2">
          Your Old Chats :
        </h2>
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
