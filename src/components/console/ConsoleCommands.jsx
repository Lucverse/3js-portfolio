import { useEffect } from 'react';
import data from '../../data.json';

const ConsoleCommands = () => {
    useEffect(() => {
        const { projects, experienceData, educationData, socialLinks, ...basic } = data;

        window.ujjw4l = {
            help: () => {
                console.log("%cAvailable Commands:", "color: #00bcd4; font-weight: bold");
                console.table([
                    { command: "ujjw4l.about()", description: "Get basic info" },
                    { command: "ujjw4l.experience()", description: "Show work experience" },
                    { command: "ujjw4l.education()", description: "Show education background" },
                    { command: "ujjw4l.projects()", description: "List all project titles" },
                    { command: "ujjw4l.getProject(title)", description: "Show details of a project by title" },
                    { command: "ujjw4l.socials()", description: "List social links" },
                    { command: "ujjw4l.techStack()", description: "Show unique tech stack used across projects" }
                ]);
            },

            about: () => {
                console.log({
                    name: basic.name,
                    age: basic.age,
                    email: basic.email,
                    phone: basic.phone,
                    title: basic.title,
                    city: basic.address?.city,
                    state: basic.address?.state,
                });
            },

            experience: () => {
                console.table(experienceData.map(item => ({
                    Title: item.title,
                    Company: item.company,
                    Date: item.date
                })));
            },

            education: () => {
                console.table(educationData.map(item => ({
                    Title: item.title,
                    Institution: item.institution,
                    Date: item.date
                })));
            },

            projects: () => {
                console.table(projects.map(p => ({
                    Title: p.title,
                    Role: p.role || "N/A",
                    Duration: p.duration
                })));
            },

            getProject: (index) => {
                if (typeof index !== "number" || index < 0 || index >= projects.length) {
                    console.warn("❌ Invalid index. Use a number between 0 and " + (projects.length - 1));
                    return;
                }

                const project = projects[index];
                console.group(`📌 Project: ${project.title}`);
                console.log("🔹 Role:", project.role || "N/A");
                console.log("🔹 Duration:", project.duration || "N/A");
                console.log("🔹 Description:", project.description || "N/A");
                console.log("🔹 Tech Stack:", project.techStack?.map(t => t.name).join(", ") || "N/A");

                if (project.detailedDescription) {
                    console.groupCollapsed("📖 Detailed Description");
                    console.log(project.detailedDescription.desc);
                    project.detailedDescription.keyPoints?.forEach((point, i) => {
                        console.log(`   ${i + 1}. ${point}`);
                    });
                    console.groupEnd();
                }

                if (project.url) console.log("🔗 URL:", project.url);
                if (project.repo) console.log("💻 Repo:", project.repo);

                console.groupEnd();
            },


            techStack: () => {
                const stack = new Set();
                projects.forEach(project => {
                    project.techStack.forEach(tech => {
                        const name = typeof tech === "string" ? tech : tech.name;
                        stack.add(name);
                    });
                });
                console.log("🛠️ Tech Stack Used:", [...stack].sort());
            },

            socials: () => {
                console.table(socialLinks.map(link => ({
                    Platform: link.title,
                    URL: link.url
                })));
            },
        };

        console.log("%c💡 Type ujjw4l.help() to get started!", "color: #4caf50; font-size: 16px;");
    }, []);

    return null;
};

export default ConsoleCommands;
