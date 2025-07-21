"use client";
import { MessageContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import { ArrowRight, Link, Link2 } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { OpenDialogContext } from "@/context/OpenDialogContext";
import Lookup from "@/data/Lookup";
const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessageContext);
  const { openDialog, setOpenDialog } = useContext(OpenDialogContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const convex = useConvex();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if (userDetail?.token < 10) {
      toast("You don't have enough token");
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    // After saving to Convex and fetching DB user
    const dbUser = await convex.query(api.user.GetUser, {
      email: userDetail?.email,
    });

    localStorage.setItem("user", JSON.stringify(dbUser));
    setUserDetail(dbUser); // ✅ This user contains _id

    const workspaceId = await CreateWorkspace({
      messages: [msg],
      user: userDetail?._id,
    });
    setUserInput("");
    console.log("Workspace Created:", workspaceId);
    router.push(`/workspace/${workspaceId}`);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-42 gap-2 text-center">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
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
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <Link className="w-4 h-4" />
      </div>

      <div className="flex flex-wrap gap-2 max-w-2xl w-full items-center justify-center mt-3">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => setUserInput(suggestion)}
            key={index}
            className="rounded-full p-1 px-2 border text-sm text-gray-500 hover:text-white transition-all cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}
      </div>
      {!userDetail?.name && (
        <SignInDialog
          openDialog={openDialog}
          closeDialog={() => setOpenDialog(false)}
        />
      )}
    </div>
  );
};

export default Hero;
