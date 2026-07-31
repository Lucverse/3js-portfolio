"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Button from "@components/Button/Button";
import Text from "@components/Text/Text";

interface Props {
  children: ReactNode;
  sectionName: string;
}

interface State {
  hasError: boolean;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `Error in section: ${this.props.sectionName}`,
      error,
      errorInfo,
    );
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full p-8 rounded-custom border border-primary bg-transparent text-center flex flex-col items-center justify-center gap-4 backdrop-blur-[0.5px] shadow-[0_0_30px_rgba(191,174,147,0.1),inset_0_0_80px_rgba(191,174,147,0.03)]">
          <Text as="span" size="sm" weight="semibold" color="secondary">
            The {this.props.sectionName} component encountered a rendering
            issue.
          </Text>
          <Button
            onClick={() => this.setState({ hasError: false })}
            label="Reload Module"
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
