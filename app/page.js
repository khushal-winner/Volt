"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex  justify-center items-center h-screen">
      <Button
        className="cursor-pointer hover:scale-105 transition-all hover:bg-amber-300"
        onClick={() => setCount(count + 1)}
      >
        Click Here: {count}
      </Button>

      <h2>2nd tes-branch bois</h2>
      <h2>2nd try for this</h2>
    </div>
  );
}
