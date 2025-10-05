import { useState, useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
    const [currentKeyPointIndex, setCurrentKeyPointIndex] = useState(0);

    const keyPointsWithImages = project?.detailedDescription?.keyPoints?.filter(p => p.image) || [];
    const itemsToShow = keyPointsWithImages;

    useEffect(() => {
        if (!project || itemsToShow.length === 0) return;

        const interval = setInterval(() => {
            setCurrentKeyPointIndex((prevIndex) =>
                (prevIndex + 1) % itemsToShow.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [project, itemsToShow]);

    if (!project) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-information-container">
                    <button className="modal-close" onClick={onClose}>✕</button>
                    <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
                        <h2 className='project-modal-title'>{project.title}</h2>
                    </div>
                    {project.duration && (
                        <p>{project.duration}</p>
                    )}

                    <div className="project-modal-description-container">
                        {project.detailedDescription?.desc && (
                            <p className='project-modal-description'>{project.detailedDescription.desc}</p>
                        )}
                        <div className="project-modal-techstack">
                            {project.techStack?.map((tech, techIndex) =>
                                tech.icon && tech.name && (
                                    <img src={tech.icon} alt={tech.name} key={techIndex} title={tech.name} />
                                )
                            )}
                        </div>

                        <div className="project-tags-container">
                            {project.tags?.map((tag, index) => (
                                <span key={index} className="project-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="modal-image-container">
                    {keyPointsWithImages.length > 0 ? (
                        <>
                            <img
                                src={keyPointsWithImages[currentKeyPointIndex].image}
                                alt={`${project.title} - ${keyPointsWithImages[currentKeyPointIndex].label}`}
                                className="modal-image active"
                            />
                            <div className="key-highlights-section">
                                <div className="current-highlight">
                                    {keyPointsWithImages[currentKeyPointIndex].label}
                                </div>
                                {keyPointsWithImages.length > 1 && (
                                    <div className="highlight-indicators">
                                        {keyPointsWithImages.map((_, idx) => (
                                            <span
                                                key={idx}
                                                className={`indicator ${idx === currentKeyPointIndex ? 'active' : ''}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="modal-placeholder-image">No Image Available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
