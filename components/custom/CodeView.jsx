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
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";

const CodeView = () => {
  const [files, setFiles] = useState(Lookup.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessageContext);
  const [activeTab, setActiveTab] = useState("code");
  const UpdateWorkspace = useMutation(api.workspace.UpdateWorkspace);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1]?.role;
      if (role == "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  useEffect(() => {
    files && GetFiles();
  }, [files]);

  const GetFiles = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    const mergedFiles = { ...files, ...result?.fileData };
    setFiles(mergedFiles);
  };

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT =
      messages[messages.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", { prompt: PROMPT });

    console.log("checking setFiles before", files);
    console.log("AI Code Response:", result.data.result);
    console.log("checking aiResp");
    const aiResp = result.data.result;
    setLoading(false);

    console.log("aiResp", aiResp);

    // const mergeFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
    // setFiles(mergeFiles);
    setFiles((prevFiles) => ({
      ...prevFiles,
      ...aiResp?.files,
    }));
    await UpdateWorkspace({
      workspaceId: id,
      files: aiResp?.files,
    });
    console.log("Updated Files:", files);
  };
  return (
    <div className="relative h-[85vh] ">
      <div className="bg-[#181818] w-full p-1 border rounded-lg">
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
        <div className="flex-1">
          <SandpackProvider
            key={JSON.stringify(Object.keys(files))}
            files={files}
            template="react"
            theme={"dark"}
            customSetup={{ dependencies: { ...Lookup.DEPENDANCY } }}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
          >
            <SandpackLayout>
              {activeTab === "code" ? (
                <>
                  <SandpackFileExplorer style={{ height: "78vh" }} />
                  <SandpackCodeEditor style={{ height: "78vh" }} />
                </>
              ) : (
                <SandpackPreview
                  style={{ height: "78vh" }}
                  showNavigator={true}
                />
              )}
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </div>
      {loading && (
        <div className="p-10 bg-gray-900/50 absolute top-0 w-full h-full flex justify-center items-center">
          <Loader2Icon className="animate-spin w-10 h-10 text-white" />
          <h2>Generating your files...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
