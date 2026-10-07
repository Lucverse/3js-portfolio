"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { DitherVeilProps } from "./DitherVeil";
import { Helix } from 'ldrs/react';
import 'ldrs/react/Helix.css';

const DitherVeil = dynamic(() => import("./DitherVeil"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <Helix size="45" speed="2.5" color="#bfae93" />
    </div>
  ),
});

export interface DitherVeilClientProps extends DitherVeilProps {
  mobilePixelSize?: number;
  desktopPixelMultiplier?: number;
  desktopPixelSize?: number;
}

export default function DitherVeilClient({
  mobilePixelSize,
  desktopPixelMultiplier = 3,
  desktopPixelSize,
  pixelSize,
  ...rest
}: DitherVeilClientProps) {
  const baseMobile = mobilePixelSize ?? pixelSize ?? 1;
  const targetDesktop = desktopPixelSize ?? baseMobile * desktopPixelMultiplier;

  const [currentPixelSize, setCurrentPixelSize] = useState<number>(baseMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateSize = () => {
      setCurrentPixelSize(mediaQuery.matches ? targetDesktop : baseMobile);
    };

    updateSize();
    mediaQuery.addEventListener("change", updateSize);
    return () => mediaQuery.removeEventListener("change", updateSize);
  }, [baseMobile, targetDesktop]);

  return <DitherVeil {...rest} pixelSize={currentPixelSize} />;
}
