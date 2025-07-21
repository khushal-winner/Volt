"use client";
import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React, { useContext, useEffect, useRef } from "react";
import { ActionContext } from "./ActionContext";

const SandPackPreviewClient = () => {
  const previewRef = useRef();
  const { sandpack } = useSandpack();
  const { action, setAction } = useContext(ActionContext);

  useEffect(() => {
    GetSandpackClient();
  }, [sandpack && action]);

  const GetSandpackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      console.log(client);
      const result = await client.getCodeSandboxURL();
      console.log(result);

      if (action.actionType == "deploy") {
        window.open(`https://${result?.sandboxId}.csb.app/`);
      } else if (action.actionType == "export") {
        window.open(`${result?.editorUrl}`);
      }
    }
  };
  return (
    <div className="w-full">
      <SandpackPreview
        ref={previewRef}
        style={{ height: "78vh" }}
        showNavigator={true}
      />
    </div>
  );
};

export default SandPackPreviewClient;
