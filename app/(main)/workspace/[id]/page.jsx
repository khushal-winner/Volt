"use client";
import React, { use } from "react";
import { useParams } from "next/navigation";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

const page = () => {
  const params = useParams();
  return (
    <div className="p-3 m-2 min-h-[calc(100vh-80px)] border rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[calc(100vh-116px)]">
        <div className="h-full col-span-1 flex flex-col">
          <ChatView />
        </div>

        <div className="col-span-3 h-full ">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default page;
