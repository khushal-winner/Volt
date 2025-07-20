"use client";
import { MessageContext } from "@/context/MessageContext";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const CodeView = () => {
  const [files, setFiles] = useState([]);
  const { messages, setMessages } = useContext(MessageContext);

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
  return <div>CodeView</div>;
};

export default CodeView;
