"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

const WorkSpaceHistory = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetail?._id) {
      GetAllWorkspace();
    }
  }, [userDetail?._id]);

  const GetAllWorkspace = async () => {
    setLoading(true);
    console.log("workspace started");
    // Function to fetch all workspaces for the user
    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      userId: userDetail?._id,
    });
    console.log("result fetched");
    console.log("Workspaces:", result);
    setWorkspaceList(result);
    setLoading(false);
  };

  return (
    <div className=" flex flex-col justify-center items-centerfont-medium text-lg mx-auto scrollbar-hide">
      {loading ? (
        <div className="p-4 text-gray-500">Loading...</div> // <-- placeholder while loading
      ) : Array.isArray(workspaceList) && workspaceList.length > 0 ? (
        workspaceList.map((workspace, idx) => (
          <div
            key={idx}
            className="flex p-2 pb-4 border rounded-lg m-2 mx-auto  w-[95%] h-[6vh] hover:bg-slate-800 justify-center items-center"
          >
            <Link href={`/workspace/${workspace?._id}`}>
              <h2 className="flex justify-center mx-auto items-center text-center text-sm text-gray-500 mt-2 font-light cursor-pointer hover:text-white ">
                {workspace?.messages?.[0]?.content || "No messages"}
              </h2>
            </Link>
          </div>
        ))
      ) : (
        <div className="p-4 text-gray-500">No chats yet.</div>
      )}
    </div>
  );
};

export default WorkSpaceHistory;
