"use client";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { use, useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatView = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { messages, setMessages } = useContext(MessageContext);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const convex = useConvex();
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role == "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetWorkspaceData = async () => {
    const workspaceData = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    console.log(workspaceData?.messages, "Workspace Messages");
    setMessages(workspaceData?.messages);
  };

  const GetAiResponse = async () => {
    setIsLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", { prompt: PROMPT });
    console.log("AI Response:", result.data.result);
    const aiResp = { role: "ai", content: result.data.result };
    setMessages((prev) => [...prev, aiResp]);
    await UpdateMessages({
      workspaceId: id,
      messages: [...messages, aiResp],
    });
    setIsLoading(false);
  };
  return (
    <div className="relative h-[85vh] flex flex-col ">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {Array.isArray(messages) &&
          messages.length > 0 &&
          messages?.map((msg, index) => (
            <div
              className="p-4 mb-2 bg-gray-600 rounded-lg flex gap-2 items-center justify-between"
              key={index}
            >
              <h2 className="text-white flex items-center flex-col">
                <Markdown remarkPlugins={[remarkGfm]}>{msg?.content}</Markdown>
              </h2>
              {msg?.role === "user" && (
                <Image
                  height={50}
                  width={50}
                  src={userDetail?.picture}
                  alt="User Avatar"
                  className="rounded-full object-cover"
                />
              )}
            </div>
          ))}
        {isLoading && (
          <div className="flex p-4 mb-2 bg-gray-600 rounded-lg gap-2">
            <Loader2Icon className="animate-spin " />
            <h2>Generating Response...</h2>
          </div>
        )}
      </div>

      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3"
        style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
      >
        <div
          className="flex gap-3"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              setMessages((prev) => [
                ...prev,
                { role: "user", content: userInput },
              ]);

              setUserInput("");
            }
          }}
        >
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          ></textarea>

          {userInput && (
            <ArrowRight
              onClick={() => {
                setMessages((prev) => [
                  ...prev,
                  { role: "user", content: userInput },
                ]);

                setUserInput("");
              }}
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
