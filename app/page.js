"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2>Hello world : {count}</h2>
      <Button
        className="cursor-pointer hover:scale-105 transition-all hover:bg-amber-300"
        onClick={() => setCount(count + 1)}
      >
        Click Here
      </Button>
    </div>
  );
}
