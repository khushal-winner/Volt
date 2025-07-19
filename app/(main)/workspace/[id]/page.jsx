"use client";
import React, { use } from "react";
import { useParams } from "next/navigation";
import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

const page = () => {
  const params = useParams();
  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ChatView />
        <div className="col-span-3">
          <CodeView />
        </div>
      </div>
    </div>
  );
};

export default page;
