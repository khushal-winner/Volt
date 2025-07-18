"use client";
import { MessageContext } from "@/context/MessageContext";
import Colors from "@/data/Colors";
import LookUp from "@/data/LookUp";
import { ArrowRight, Link, Link2 } from "lucide-react";
import React, { useContext, useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState("");
  const { messages, setMessages } = useContext(MessageContext);

  const onGenerate = (input) => {
    setMessages({
      role: "user",
      content: input,
    });
    setUserInput("");
    console.log(messages);
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-42 gap-2 text-center">
      <h2 className="font-bold text-4xl">{LookUp.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{LookUp.HERO_DESC}</p>
      <div
        className="p-5 border rounded-xl max-w-2xl w-full mt-3"
        style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
      >
        <div className="flex gap-3">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={LookUp.INPUT_PLACEHOLDER}
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
        {LookUp?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            onClick={() => setUserInput(suggestion)}
            key={index}
            className="rounded-full p-1 px-2 border text-sm text-gray-500 hover:text-white transition-all cursor-pointer"
          >
            {suggestion}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
