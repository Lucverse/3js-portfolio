"use client";

import dynamic from "next/dynamic";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

const WalleCanvas = dynamic(() => import("./WalleCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Helix size="45" speed="2.5" color="#bfae93" />
    </div>
  ),
});

export default function WalleCanvasClient() {
  return <WalleCanvas />;
}
