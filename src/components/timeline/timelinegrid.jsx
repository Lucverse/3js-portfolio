import React, { useEffect } from "react";
import ProjectModal from "./projectModal.jsx";

const TimelineGrid = ({ project, index }) => {
    const [selectedProject, setSelectedProject] = React.useState(null);
    const [mousePosition, setMousePosition] = React.useState({ x: "50%", y: "50%" });
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x: `${x}%`, y: `${y}%` });
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    useEffect(() => {
        document.body.style.overflow = selectedProject ? "hidden" : "auto";
    }, [selectedProject]);
    return (
        <>
            <div
                key={index}
                className="timeline-grid"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    background: isHovered
                        ? `radial-gradient(circle at ${mousePosition.x} ${mousePosition.y}, rgba(191, 174, 147, 0.2) 10%, transparent 35%)`
                        : "transparent",
                }}>
                <div className='project-title-div'>
                    <h2 className='project-title' >{project.title}</h2>
                    <p className='project-duration'>({project.duration})</p>
                </div>
                <div className='project-description'>
                    <p>{project.description}</p>
                    <div className="project-techstack">
                        {project.techStack.map((tech, techIndex) => (
                            (
                                tech.icon && tech.name &&
                                <img src={tech.icon} alt={tech.name} key={techIndex} title={tech.name}/>
                            )
                        ))}
                    </div>
                </div>
            </div>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </>
    );
};

export default TimelineGrid;