import { useState, useRef, useEffect, useCallback } from "react";
import Tooltip from "../Tooltip/Tooltip";
import useKeyDown from "@hooks/useKeyDown";
import rawData from "../../data";
import type { PortfolioData } from "../../types/portfolio";
import {
  TerminalLineType,
  TerminalCommand,
  INITIAL_TERMINAL_LINES,
} from "../../lib/constants";
import type { TerminalLine } from "../../lib/constants";

const data = rawData as PortfolioData;

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_TERMINAL_LINES);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTip, setShowTip] = useState(() => {
    return localStorage.getItem("terminal-tip-closed") !== "true";
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && showTip) {
      setShowTip(false);
      localStorage.setItem("terminal-tip-closed", "true");
    }
  }, [isOpen, showTip]);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  const handleToggle = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  }, []);
  const handleEscape = useCallback(() => setIsOpen(false), []);

  useKeyDown("`", handleToggle, true, { ctrl: true });
  useKeyDown("Escape", handleEscape, isOpen);

  const { projects, experienceData, educationData, socialLinks, ...basic } =
    data;
  const age = new Date().getFullYear() - (basic as any).birthYear;

  const processCommand = (input: string) => {
    const trimmed = input.trim();
    const [command, ...args] = trimmed.split(" ");
    const cmd = command.toLowerCase();

    const newLines: TerminalLine[] = [
      { type: TerminalLineType.Input, content: `❯ ${trimmed}` },
    ];

    switch (cmd) {
      case TerminalCommand.Help:
        newLines.push(
          { type: TerminalLineType.Title, content: "Available Commands" },
          {
            type: TerminalLineType.Info,
            content: "  about          - Brief information about me",
          },
          {
            type: TerminalLineType.Info,
            content: "  experience     - Show my work experience",
          },
          {
            type: TerminalLineType.Info,
            content: "  education      - Show my academic background",
          },
          {
            type: TerminalLineType.Info,
            content: "  projects       - Show list of project titles",
          },
          {
            type: TerminalLineType.Info,
            content: "  getProject [idx]- Get project details by index",
          },
          {
            type: TerminalLineType.Info,
            content: "  socials        - List of my social media handles",
          },
          {
            type: TerminalLineType.Info,
            content: "  techStack      - Display core technologies used",
          },
          {
            type: TerminalLineType.Info,
            content: "  clear          - Clear terminal interface",
          },
        );
        break;

      case TerminalCommand.About:
        newLines.push(
          { type: TerminalLineType.Title, content: basic.name },
          {
            type: TerminalLineType.Output,
            content: `  Title     : ${basic.title.join(" • ")}`,
          },
          {
            type: TerminalLineType.Output,
            content: `  Age       : ${age}`,
          },
          {
            type: TerminalLineType.Output,
            content: `  Mobile    : ${basic.phone}`,
          },
          {
            type: TerminalLineType.Output,
            content: `  Email     : ${basic.email}`,
          },
          {
            type: TerminalLineType.Output,
            content: `  Location  : ${basic.address?.city}, ${basic.address?.country}`,
          },
          { type: TerminalLineType.Info, content: "" },
        );
        break;

      case TerminalCommand.Experience:
        newLines.push({
          type: TerminalLineType.Title,
          content: "Professional Experience",
        });
        experienceData.forEach((exp, i) => {
          newLines.push(
            { type: TerminalLineType.Output, content: `  [${i}] ${exp.title}` },
            { type: TerminalLineType.Info, content: `      ${exp.company}` },
            { type: TerminalLineType.Info, content: `      ${exp.date}` },
            {
              type: TerminalLineType.Output,
              content: `      ${exp.description}`,
            },
            { type: TerminalLineType.Info, content: "" },
          );
        });
        break;

      case TerminalCommand.Education:
        newLines.push({ type: TerminalLineType.Title, content: "Education" });
        educationData.forEach((edu, i) => {
          newLines.push(
            { type: TerminalLineType.Output, content: `  [${i}] ${edu.title}` },
            {
              type: TerminalLineType.Info,
              content: `      ${edu.institution}`,
            },
            { type: TerminalLineType.Info, content: `      ${edu.date}` },
            {
              type: TerminalLineType.Output,
              content: `      ${edu.description}`,
            },
            { type: TerminalLineType.Info, content: "" },
          );
        });
        break;

      case TerminalCommand.Projects:
        newLines.push({
          type: TerminalLineType.Title,
          content: `Projects (${projects.length} total)`,
        });
        projects.forEach((p, i) => {
          newLines.push(
            { type: TerminalLineType.Output, content: `  [${i}] ${p.title}` },
            {
              type: TerminalLineType.Info,
              content: `      ${p.role ?? "Developer"} · ${p.duration ?? ""}`,
            },
          );
        });
        newLines.push(
          {
            type: TerminalLineType.Info,
            content: '\n  Use "getproject <index>" for details.',
          },
          { type: TerminalLineType.Info, content: "" },
        );
        break;

      case TerminalCommand.GetProject: {
        const index = parseInt(args[0], 10);
        if (isNaN(index) || index < 0 || index >= projects.length) {
          newLines.push({
            type: TerminalLineType.Error,
            content: `  ✗ Invalid index. Use a number between 0 and ${projects.length - 1}.`,
          });
        } else {
          const p = projects[index];
          newLines.push(
            { type: TerminalLineType.Title, content: p.title },
            {
              type: TerminalLineType.Output,
              content: `  Role      : ${p.role ?? "N/A"}`,
            },
            {
              type: TerminalLineType.Output,
              content: `  Duration  : ${p.duration ?? "N/A"}`,
            },
            {
              type: TerminalLineType.Output,
              content: `  Tech      : ${p.techStack.map((t) => t.name).join(", ")}`,
            },
          );
          if (p.detailedDescription?.desc) {
            newLines.push({
              type: TerminalLineType.Info,
              content: `  ${p.detailedDescription.desc}`,
            });
          }
          if (p.url)
            newLines.push({
              type: TerminalLineType.Info,
              content: `  🔗 ${p.url}`,
            });
          if (p.repo)
            newLines.push({
              type: TerminalLineType.Info,
              content: `  💻 ${p.repo}`,
            });
          newLines.push({ type: TerminalLineType.Info, content: "" });
        }
        break;
      }

      case TerminalCommand.Socials:
        newLines.push({
          type: TerminalLineType.Title,
          content: "Social Links",
        });
        socialLinks.forEach((link) => {
          newLines.push({
            type: TerminalLineType.Output,
            content: `  ${link.title.padEnd(16)}: ${link.url}`,
          });
        });
        newLines.push({ type: TerminalLineType.Info, content: "" });
        break;

      case TerminalCommand.TechStack: {
        const stack = new Set<string>();
        projects.forEach((p) => p.techStack.forEach((t) => stack.add(t.name)));
        const sorted = [...stack].sort();
        newLines.push(
          {
            type: TerminalLineType.Title,
            content: `Tech Stack (${sorted.length} technologies)`,
          },
          { type: TerminalLineType.Output, content: `  ${sorted.join(", ")}` },
          { type: TerminalLineType.Info, content: "" },
        );
        break;
      }

      case TerminalCommand.Clear:
        setLines(INITIAL_TERMINAL_LINES);
        return;

      case "":
        return;

      default:
        newLines.push(
          {
            type: TerminalLineType.Error,
            content: `  ✗ Unknown command: "${command}"`,
          },
          {
            type: TerminalLineType.Info,
            content: '  Type "help" to see available commands.',
          },
          { type: TerminalLineType.Info, content: "" },
        );
    }

    setLines((prev) => [...prev, ...newLines]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    processCommand(inputValue);
    setCommandHistory((prev) => [inputValue, ...prev]);
    setHistoryIndex(-1);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInputValue(newIndex === -1 ? "" : (commandHistory[newIndex] ?? ""));
    }
  };

  return (
    <>
      <Tooltip content="Terminal (Ctrl+`)" direction="right">
        <button
          className={`fixed bottom-8 left-8 max-[600px]:hidden z-10001 bg-[rgba(15,15,16,0.92)] border border-[rgba(191,174,147,0.45)] text-primary font-mono text-[1rem] font-bold w-10 h-10 flex items-center justify-center rounded-[10px] cursor-pointer transition-all duration-250 ease-out backdrop-blur-md select-none hover:bg-[rgba(191,174,147,0.12)] hover:border-primary hover:shadow-[0_0_18px_rgba(191,174,147,0.25),0_4px_16px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 ${
            isOpen
              ? "border-[rgba(191,174,147,0.7)] bg-[rgba(191,174,147,0.1)]"
              : ""
          }`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close terminal" : "Open terminal"}
        >
          {isOpen ? "✕" : ">_"}
        </button>
      </Tooltip>

      {showTip && !isOpen && (
        <div className="fixed bottom-8.5 left-19.5 z-10000 bg-[rgba(15,15,16,0.95)] border border-[rgba(191,174,147,0.35)] text-secondary px-3 py-1.5 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] font-base text-[0.8rem] tracking-[0.3px] flex items-center gap-2.5 animate-bounce-horizontal terminal-prompt-bubble max-[600px]:hidden select-none">
          <span>Click here for interactive terminal!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTip(false);
              localStorage.setItem("terminal-tip-closed", "true");
            }}
            className="bg-transparent border-none text-muted-color cursor-pointer text-[0.75rem] hover:text-primary transition-colors duration-200"
            aria-label="Dismiss tip"
          >
            ✕
          </button>
        </div>
      )}

      {/* Terminal panel */}
      {isOpen && (
        <div
          className="fixed bottom-22 left-8 max-[600px]:left-4 max-[600px]:right-4 max-[600px]:bottom-20 max-[600px]:w-auto max-[600px]:h-80 w-[min(520px,calc(100vw-4rem))] h-95 z-10000 bg-[rgba(10,10,11,0.97)] border border-[rgba(191,174,147,0.35)] rounded-[14px] flex flex-col overflow-hidden backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.85),0_0_0_1px_rgba(191,174,147,0.08),0_0_48px_rgba(191,174,147,0.06)] animate-slide-up before:content-[''] before:absolute before:inset-0 before:bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.04)_2px,rgba(0,0,0,0.04)_4px)] before:pointer-events-none before:z-1 before:rounded-[14px]"
          role="dialog"
          aria-label="Portfolio terminal"
        >
          {/* Title bar */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center px-4 py-[0.55rem] bg-[rgba(191,174,147,0.06)] border-b border-[rgba(191,174,147,0.15)] shrink-0 gap-2">
            <div className="flex gap-1.5 items-center">
              <span
                className="w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ease-out hover:brightness-130 hover:scale-110 bg-[#ff5f56]"
                onClick={() => setIsOpen(false)}
                title="Close"
              />
              <span
                className="w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ease-out hover:brightness-130 hover:scale-110 bg-[#ffbd2e]"
                title="Minimise"
              />
              <span
                className="w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ease-out hover:brightness-130 hover:scale-110 bg-[#27c93f]"
                title="Maximise"
              />
            </div>
            <span className="text-[rgba(191,174,147,0.55)] font-mono text-[0.78rem] text-center tracking-[0.5px]">
              portfolio — bash
            </span>
            <span />
          </div>

          {/* Output */}
          <div
            className="flex-1 overflow-y-auto px-[1.1rem] py-3 font-mono text-[0.8rem] leading-[1.65] relative z-2 scrollbar-thin [scrollbar-color:rgba(191,174,147,0.25)_transparent]"
            ref={outputRef}
          >
            {lines.map((line, i) => {
              let lineClass = "text-[#cfc8bc]";
              if (line.type === "input") {
                lineClass = "text-white mt-[6px] opacity-90";
              } else if (line.type === "info") {
                lineClass = "text-primary opacity-80";
              } else if (line.type === "title") {
                lineClass =
                  "text-secondary font-bold mt-[6px] tracking-[0.5px]";
              } else if (line.type === "error") {
                lineClass = "text-[#ff8080]";
              }
              return (
                <div
                  key={i}
                  className={`m-0 whitespace-pre-wrap break-all ${lineClass}`}
                >
                  {line.content}
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form
            className="flex items-center px-[1.1rem] py-[0.55rem] border-t border-[rgba(191,174,147,0.15)] bg-[rgba(191,174,147,0.04)] shrink-0 relative z-2 gap-2"
            onSubmit={handleSubmit}
          >
            <span className="text-primary font-mono text-[0.78rem] opacity-70 shrink-0 whitespace-nowrap max-[600px]:hidden">
              portfolio@lucverse:~$
            </span>
            <input
              ref={inputRef}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-white font-mono text-[0.82rem] caret-primary placeholder-[rgba(191,174,147,0.25)]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              placeholder="type a command…"
              aria-label="Terminal command input"
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Terminal;
