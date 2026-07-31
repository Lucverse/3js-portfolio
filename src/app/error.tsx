"use client";

import React, { useEffect } from "react";
import FallbackCard from "@components/FallbackCard/FallbackCard";
import Button from "@components/Button/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Global uncaught error:", error);
  }, [error]);

  return (
    <FallbackCard
      code="500"
      title="An unexpected application error occurred"
      message="The runtime environment encountered a processing exception. Click below to reset or attempt a connection reload."
    >
      <Button onClick={() => reset()} label="Reset Terminal" />
      <Button href="/" label="Reload Home" />
    </FallbackCard>
  );
}
