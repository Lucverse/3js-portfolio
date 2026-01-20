import { useEffect } from 'react';
import data from '../../data.json';

const ConsoleCommands = () => {
	useEffect(() => {
		const { projects, experienceData, educationData, socialLinks, ...basic } = data;

		window.ujjw4l = {
			run: (input) => {
				if (typeof input !== "string") {
					console.warn("❌ Please enter a valid command string, like 'about' or 'getProject_2'");
					return;
				}

				const [command, ...args] = input.trim().split(" ");
				const validCommands = {
					about: "about",
					experience: "experience",
					education: "education",
					projects: "projects",
					getproject: "getProject",
					socials: "socials",
					techstack: "techStack",
					help: "help"
				};

				const funcName = validCommands[command.toLowerCase()];
				if (!funcName || typeof window.ujjw4l[funcName] !== "function") {
					console.warn(`❌ Unknown command: '${command}'. Type help for a list of commands.`);
					return;
				}

				try {
					const parsedArgs = args.map(arg => {
						const num = Number(arg);
						return isNaN(num) ? arg : num;
					});

					window.ujjw4l[funcName](...parsedArgs);
				} catch (err) {
					console.error("⚠️ Error executing command:", err);
				}
			},

			help: () => {
				console.log(
					`%cAvailable Commands:
%c• about         %c- Get basic info
%c• experience    %c- Show work experience
%c• education     %c- Show education background
%c• projects      %c- List all project titles
%c• getProject_n 	%c- Show details of a project by index
%c• socials       %c- List social links
%c• techStack     %c- Show unique tech stack used across projects
`,
					"color: #bfae93; font-weight: bold", // primary
					"color: #d1c5ad", "color: #acacac", // secondary, muted
					"color: #d1c5ad", "color: #acacac",
					"color: #d1c5ad", "color: #acacac",
					"color: #d1c5ad", "color: #acacac",
					"color: #d1c5ad", "color: #acacac",
					"color: #d1c5ad", "color: #acacac",
					"color: #d1c5ad", "color: #acacac"
				);
			},

			about: () => {
				console.log(
					`%c${basic.name}
%cAge: %c${basic.age}
%cEmail: %c${basic.email}
%cPhone: %c${basic.phone}
%cTitle: %c${basic.title}
%cLocation: %c${basic.address?.city}, ${basic.address?.state}
`,
					"color: #bfae93; font-weight: bold; font-size: 1.2em", // primary
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff"
				);
			},

			experience: () => {
				console.log("%cExperience", "color: #bfae93; font-weight: bold; font-size: 1.2em");
				experienceData.forEach((item, i) => {
					console.log(
						`%c${item.title ? item.title : "—"}
%cCompany: %c${item.company || "N/A"}
%cDate: %c${item.date || "N/A"}
%c${item.description || ""}`,
						"color: #d1c5ad; font-weight: bold", // secondary
						"color: #bfae93", "color: #ffffff", // primary, text
						"color: #bfae93", "color: #ffffff",
						"color: #acacac"
					);
				});
			},

			education: () => {
				console.log("%cEducation", "color: #bfae93; font-weight: bold; font-size: 1.2em");
				educationData.forEach((item, i) => {
					console.log(
						`%c${item.title}
%cInstitution: %c${item.institution}
%cDate: %c${item.date}
%c${item.description || ""}`,
						"color: #d1c5ad; font-weight: bold", // secondary
						"color: #bfae93", "color: #ffffff", // primary, text
						"color: #bfae93", "color: #ffffff",
						"color: #acacac"
					);
				});
			},

			projects: () => {
				console.log("%cProjects", "color: #bfae93; font-weight: bold; font-size: 1.2em");
				projects.forEach((p, i) => {
					console.log(
						`%c${i}. %c${p.title}
%cRole: %c${p.role || "N/A"}
%cDuration: %c${p.duration || "N/A"}`,
						"color: #d1c5ad; font-weight: bold", "color: #ffffff", // secondary, text
						"color: #bfae93", "color: #ffffff", // primary, text
						"color: #bfae93", "color: #ffffff"
					);
				});
			},

			getProject: (index) => {
				if (typeof index !== "number" || index < 0 || index >= projects.length) {
					console.warn("❌ Invalid index. Use a number between 0 and " + (projects.length - 1));
					return;
				}
				const project = projects[index];
				console.log(
					`%c${project.title}
%cRole: %c${project.role || "N/A"}
%cDuration: %c${project.duration || "N/A"}
%cTech Stack: %c${project.techStack?.map(t => t.name).join(", ") || "N/A"}`,
					"color: #bfae93; font-weight: bold; font-size: 2em",
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff",
					"color: #d1c5ad", "color: #ffffff"
				);
				if (project.detailedDescription) {
					console.log(
						`%cDetailed Description: %c${project.detailedDescription.desc}`,
						"color: #9e8a75; font-weight: bold", "color: #ffffff"
					);
					project.detailedDescription.keyPoints?.forEach((point, i) => {
						console.log(`%c   ${i + 1}. %c${point}`, "color: #bfae93", "color: #acacac");
					});
				}
				if (project.url) console.log("%c🔗 URL: %c" + project.url, "color: #d1c5ad", "color: #ffffff");
				if (project.repo) console.log("%c💻 Repo: %c" + project.repo, "color: #d1c5ad", "color: #ffffff");
			},

			techStack: () => {
				const stack = new Set();
				projects.forEach(project => {
					project.techStack.forEach(tech => {
						const name = typeof tech === "string" ? tech : tech.name;
						stack.add(name);
					});
				});
				console.log(
					`%cTech Stack Used: %c${[...stack].sort().join(", ")}`,
					"color: #bfae93; font-weight: bold", "color: #ffffff"
				);
			},

			socials: () => {
				console.log("%cSocial Links", "color: #bfae93; font-weight: bold; font-size: 1.2em");
				socialLinks.forEach(link => {
					console.log(
						`%c${link.title}: %c${link.url}`,
						"color: #d1c5ad; font-weight: bold", "color: #ffffff"
					);
				});
			},
		};

		Object.keys(window.ujjw4l).forEach(key => {
			Object.defineProperty(window, key, {
				get: () => {
					const fn = window.ujjw4l[key];
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
							const fn = window.ujjw4l[key];
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
			`%cInteractive console portfolio!`,
			'color: #bfae93; font-size: 2rem; font-weight: bold;'
		);
		console.log(
			`%cTip: Type %chelp%c to see available commands.`,
			'color: #acacac; font-size: 13px;',
			'color: #d1c5ad; font-weight: bold;',
			'color: #acacac;'
		);

	}, []);

	return null;
};

export default ConsoleCommands;
