import React from "react";
import FallbackCard from "@components/FallbackCard/FallbackCard";
import Button from "@components/Button/Button";

export default function NotFound() {
  return (
    <FallbackCard
      code="404"
      title="Command Not Found"
      message="The requested page route does not exist. It may have been relocated, deleted, or entered incorrectly."
    >
      <Button href="/" label="Return to Terminal" />
    </FallbackCard>
  );
}
