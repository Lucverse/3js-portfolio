"use client";

import dynamic from "next/dynamic";

const EarthCanvas = dynamic(() => import("./EarthCanvas"), {
  ssr: false,
});

export default function EarthCanvasClient() {
  return <EarthCanvas />;
}
