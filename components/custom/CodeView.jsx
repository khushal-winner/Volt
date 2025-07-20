"use client";
import { MessageContext } from "@/context/MessageContext";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackThemeProvider,
  SandpackProvider,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";

const CodeView = () => {
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessageContext);
  const [activeTab, setActiveTab] = useState("code");

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    const PROMPT =
      messages[messages.length - 1]?.content + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", { prompt: PROMPT });

    console.log("AI Code Response:", result.data.result);
    const aiResp = result.data;

    const mergeFiles = { ...Lookup.DEFAULT_FILE, ...aiResp.files };
    setFiles(mergeFiles);
  };
  return (
    <div className=" flex flex-col gap-2">
      <div className="bg-[#181818] w-full p-1 border ">
        <div className="flex items-center flex-wrap shrink-0 bg-black w-[140px] rounded-full justify-center gap-3 p-1 mb-1">
          <h2
            className={`cursor-pointer text-md ${activeTab === "code" ? "text-blue-500 bg-blue-500/25 rounded-full p-1 px-2" : ""}`}
            onClick={() => setActiveTab("code")}
          >
            Code
          </h2>
          <h2
            className={`cursor-pointer text-md  ${activeTab === "preview" ? "text-blue-500 bg-blue-500/25 rounded-full p-1 px-2" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h2>
        </div>
        <SandpackProvider
          files={files}
          template="react"
          theme={"dark"}
          customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            <SandpackFileExplorer style={{ height: "85vh" }} />
            {activeTab === "code" ? (
              <>
                <SandpackCodeEditor style={{ height: "85vh" }} />
              </>
            ) : (
              <SandpackPreview
                style={{ height: "85vh" }}
                showNavigator={true}
              />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default CodeView;
