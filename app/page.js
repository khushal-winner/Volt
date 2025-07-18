"use client";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Hero />
    </div>
  );
}
