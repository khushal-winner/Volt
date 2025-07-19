import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { useConvex } from "convex/react";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";

const ChatView = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessageContext);
  const [userInput, setUserInput] = useState("");
  const { id } = useParams();
  const convex = useConvex();

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const workspaceData = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(workspaceData?.messages);

    console.log(workspaceData?.messages, "Workspace Messages");
  };

  return (
    <div className="relative h-[85vh] flex flex-col ">
      <div className="flex-1 overflow-y-scroll">
        {messages?.map((msg, index) => (
          <div
            className="p-4 mb-2 bg-gray-600 rounded-lg flex gap-2"
            key={index}
          >
            {msg?.role === "user" && (
              <Image
                height={50}
                width={50}
                src={userDetail?.picture}
                alt="User Avatar"
                className="rounded-full object-cover"
              />
            )}
            <h2>{msg?.content}</h2>
          </div>
        ))}
      </div>

      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3"
        style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
      >
        <div className="flex gap-3">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          ></textarea>

          {userInput && (
            <ArrowRight
              //   onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <Link className="w-4 h-4" />
      </div>
    </div>
  );
};

export default ChatView;
