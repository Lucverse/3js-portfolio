const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>✕</button>
                <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
                    <h2>{project.title}</h2>
                    {project.duration && (
                        <p style={{ opacity: "0.5", marginBottom: "3px" }}>{project.duration}</p>
                    )}
                </div>

                {project.role && (
                    <p><strong>My Role:</strong> {project.role}</p>
                )}

                {project.techStack && project.techStack.length > 0 && (
                    <p>
                        <strong>Tech Stack:</strong>{" "}
                        {project.techStack.map((tech) => tech.name).join(", ")}
                    </p>
                )}

                {project.detailedDescription?.desc && (
                    <p><strong>Summary:</strong> {project.detailedDescription.desc}</p>
                )}

                {project.detailedDescription?.keyPoints?.length > 0 && (
                    <>
                        <strong>Key Highlights:</strong>
                        <ul className="modal-keypoints">
                            {project.detailedDescription.keyPoints.map((point, idx) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </>
                )}
                <div className="project-tags-container">
                    {project.tags && project.tags.map((tag, index) => (
                        <span key={index} className="project-tag">
                            {tag}
                        </span>
                    ))}
                </div>
                {/* {(project.url || project.repo) && (
                    <div className="modal-links">
                        {project.url && (
                            <a href={project.url} target="_blank" rel="noreferrer" className="modal-link">🌐 Live Demo</a>
                        )}
                        {project.repo && (
                            <a href={project.repo} target="_blank" rel="noreferrer" className="modal-link">📂 GitHub</a>
                        )}
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default ProjectModal;
