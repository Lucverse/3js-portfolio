import React, { useEffect } from "react";
import rawData from "@/data";
import type { PortfolioData } from "@/types/portfolio";
import { VALID_CONSOLE_COMMANDS } from "@/lib/constants";

const data = rawData as PortfolioData;

const ConsoleCommands: React.FC = () => {
  useEffect(() => {
    const { projects, experienceData, educationData, socialLinks, ...basic } =
      data;
    const age = new Date().getFullYear() - (basic as any).birthYear;

    const commands: Record<string, Function> = {
      help: () => {
        console.log(
          `%cAvailable Commands:\n%c• about         %c- Get basic info\n%c• experience    %c- Show work experience\n%c• education     %c- Show education background\n%c• projects      %c- List all project titles\n%c• getProject_n \t%c- Show details of a project by index\n%c• socials       %c- List social links\n%c• techStack     %c- Show unique tech stack used across projects\n`,
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
          "color: #d1c5ad",
          "color: #acacac",
        );
      },

      about: () => {
        console.log(
          `%c${basic.name}\n%cAge: %c${age}\n%cEmail: %c${basic.email}\n%cPhone: %c${basic.phone}\n%cTitle: %c${basic.title.join(" • ")}\n%cLocation: %c${basic.address?.city}, ${basic.address?.country}\n`,
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
        );
      },

      experience: () => {
        console.log(
          "%cExperience",
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
        );
        experienceData.forEach((item) => {
          console.log(
            `%c${item.title || "—"}\n%cCompany: %c${item.company || "N/A"}\n%cDate: %c${item.date || "N/A"}\n%c${item.description || ""}`,
            "color: #d1c5ad; font-weight: bold",
            "color: #bfae93",
            "color: #ffffff",
            "color: #bfae93",
            "color: #ffffff",
            "color: #acacac",
          );
        });
      },

      education: () => {
        console.log(
          "%cEducation",
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
        );
        educationData.forEach((item) => {
          console.log(
            `%c${item.title}\n%cInstitution: %c${item.institution}\n%cDate: %c${item.date}\n%c${item.description || ""}`,
            "color: #d1c5ad; font-weight: bold",
            "color: #bfae93",
            "color: #ffffff",
            "color: #bfae93",
            "color: #ffffff",
            "color: #acacac",
          );
        });
      },

      projects: () => {
        console.log(
          "%cProjects",
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
        );
        projects.forEach((p, i) => {
          console.log(
            `%c${i}. %c${p.title}\n%cRole: %c${p.role || "N/A"}\n%cDuration: %c${p.duration || "N/A"}`,
            "color: #d1c5ad; font-weight: bold",
            "color: #ffffff",
            "color: #bfae93",
            "color: #ffffff",
            "color: #bfae93",
            "color: #ffffff",
          );
        });
      },

      getProject: (index: number) => {
        if (
          typeof index !== "number" ||
          index < 0 ||
          index >= projects.length
        ) {
          console.warn(
            "❌ Invalid index. Use a number between 0 and " +
              (projects.length - 1),
          );
          return;
        }
        const project = projects[index];
        console.log(
          `%c${project.title}\n%cRole: %c${project.role || "N/A"}\n%cDuration: %c${project.duration || "N/A"}\n%cTech Stack: %c${project.techStack?.map((t) => t.name).join(", ") || "N/A"}`,
          "color: #bfae93; font-weight: bold; font-size: 2em",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
          "color: #d1c5ad",
          "color: #ffffff",
        );
        if (project.detailedDescription) {
          console.log(
            `%cDetailed Description: %c${project.detailedDescription.desc}`,
            "color: #9e8a75; font-weight: bold",
            "color: #ffffff",
          );
        }
        if (project.url)
          console.log(
            "%c🔗 URL: %c" + project.url,
            "color: #d1c5ad",
            "color: #ffffff",
          );
        if (project.repo)
          console.log(
            "%c💻 Repo: %c" + project.repo,
            "color: #d1c5ad",
            "color: #ffffff",
          );
      },

      techStack: () => {
        const stack = new Set<string>();
        projects.forEach((project) => {
          project.techStack.forEach((tech) => stack.add(tech.name));
        });
        console.log(
          `%cTech Stack Used: %c${[...stack].sort().join(", ")}`,
          "color: #bfae93; font-weight: bold",
          "color: #ffffff",
        );
      },

      socials: () => {
        console.log(
          "%cSocial Links",
          "color: #bfae93; font-weight: bold; font-size: 1.2em",
        );
        socialLinks.forEach((link) => {
          console.log(
            `%c${link.title}: %c${link.url}`,
            "color: #d1c5ad; font-weight: bold",
            "color: #ffffff",
          );
        });
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).ujjw4l = {
      run: (input: string) => {
        if (typeof input !== "string") {
          console.warn(
            "❌ Please enter a valid command string, like 'about' or 'getProject_2'",
          );
          return;
        }

        const trimmed = input.trim();
        const normalized = trimmed.toLowerCase();
        const cmdKey = Object.keys(commands).find(
          (k) => k.toLowerCase() === normalized,
        );

        if (cmdKey) {
          commands[cmdKey]();
        } else if (normalized.startsWith("getproject_")) {
          const index = parseInt(normalized.split("_")[1]);
          if (!isNaN(index)) {
            commands.getProject(index);
          }
        } else {
          console.warn(
            `❌ Unknown command: "${trimmed}". Available commands: about, experience, education, projects, getProject_[index], socials, techStack`,
          );
        }
      },
      ...commands,
    };

    // Register window shortcuts for each command
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.keys((window as any).ujjw4l).forEach((key) => {
      Object.defineProperty(window, key, {
        get: () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fn = (window as any).ujjw4l[key];
          if (typeof fn === "function") {
            fn();
            return undefined;
          }
          return fn;
        },
        configurable: true,
      });
      if (key === "getProject") {
        for (let i = 0; i < projects.length; i++) {
          const dynamicKey = `${key}_${i}`;
          Object.defineProperty(window, dynamicKey, {
            get: () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const fn = (window as any).ujjw4l[key];
              if (typeof fn === "function") {
                fn(i);
                return undefined;
              }
              return fn;
            },
            configurable: true,
          });
        }
      }
    });

    console.log(
      "%cInteractive console portfolio!",
      "color: #bfae93; font-size: 2rem; font-weight: bold;",
    );
    console.log(
      "%cTip: Type %chelp%c or use the %c>_%c terminal widget on the page.",
      "color: #acacac; font-size: 13px;",
      "color: #d1c5ad; font-weight: bold;",
      "color: #acacac;",
      "color: #d1c5ad; font-weight: bold;",
      "color: #acacac;",
    );
  }, []);

  return null;
};

export default ConsoleCommands;
