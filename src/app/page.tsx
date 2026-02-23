"use client";

import { Experience } from "@/components/Experience";
import { HUD } from "@/components/HUD";

export default function GamePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <Experience />
      <HUD />
    </main>
  );
}
