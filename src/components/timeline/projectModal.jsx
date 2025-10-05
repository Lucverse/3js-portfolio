import { useState, useEffect } from 'react';

const ProjectHeader = ({ title, duration }) => (
    <div style={{ display: 'flex', alignItems: 'end', gap: '1rem', flexWrap: 'wrap' }}>
        <h2>{title}</h2>
        {duration && (
            <p style={{ opacity: "0.8", marginBottom: "3px" }}>{duration}</p>
        )}
    </div>
);

const ProjectBasicInfo = ({ role, techStack, description }) => (
    <>
        {role && (
            <p><strong>My Role:</strong> {role}</p>
        )}
        {description && (
            <p>{description}</p>
        )}

        {techStack && techStack.length > 0 && (
            <p>
                <strong>Tech Stack:</strong>{" "}
                {techStack.map((tech) => tech.name).join(", ")}
            </p>
        )}

    </>
);

const ProjectKeyPoints = ({ keyPoints, onKeyPointHover, onKeyPointLeave }) => {
    if (!keyPoints || keyPoints.length === 0) return null;

    return (
        <>
            <strong>Key Highlights:</strong>
            <ul className="modal-keypoints">
                {keyPoints.map((point, idx) => (
                    <li
                        key={idx}
                        onMouseEnter={() => onKeyPointHover(point.image)}
                        onMouseLeave={onKeyPointLeave}
                        style={{ cursor: 'pointer' }}
                    >
                        {point.label}
                    </li>
                ))}
            </ul>
        </>
    );
};

const ProjectTags = ({ tags }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div className="project-tags-container">
            {tags.map((tag, index) => (
                <span key={index} className="project-tag">
                    {tag}
                </span>
            ))}
        </div>
    );
};

const ProjectLinks = ({ url, repo }) => {
    if (!url && !repo) return null;

    return (
        <div className="modal-links">
            {url && (
                <a href={url} target="_blank" rel="noreferrer" className="modal-link">🌐 Live Demo</a>
            )}
            {repo && (
                <a href={repo} target="_blank" rel="noreferrer" className="modal-link">📂 GitHub</a>
            )}
        </div>
    );
};

const ProjectImageDisplay = ({
    displayImages,
    hoveredKeyPointImage,
    currentImageIndex,
    projectTitle
}) => (
    <div className="modal-image-container">
        {hoveredKeyPointImage ? (
            <img
                src={hoveredKeyPointImage}
                alt="Key point preview"
                className="modal-image active"
            />
        ) : displayImages.length > 0 ? (
            displayImages.map((imgSrc, idx) => (
                <img
                    key={idx}
                    src={imgSrc}
                    alt={`${projectTitle} screenshot ${idx + 1}`}
                    className={`modal-image ${idx === currentImageIndex ? 'active' : ''}`}
                />
            ))
        ) : (
            <div className="modal-placeholder-image">No Image Available</div>
        )}
    </div>
);

const ProjectModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hoveredKeyPointImage, setHoveredKeyPointImage] = useState(null);

    const images = project?.images || [];
    const keyPointImages = project?.detailedDescription?.keyPoints?.map(point => point.image).filter(Boolean) || [];
    const displayImages = images.length > 0 ? images : keyPointImages;

    useEffect(() => {
        if (!project || displayImages.length === 0 || hoveredKeyPointImage) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                (prevIndex + 1) % displayImages.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [project, displayImages.length, hoveredKeyPointImage]);

    if (!project) return null;

    const handleKeyPointHover = (image) => {
        setHoveredKeyPointImage(image);
    };

    const handleKeyPointLeave = () => {
        setHoveredKeyPointImage(null);
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-information-container">
                    <button className="modal-close" onClick={onClose}>✕</button>

                    <ProjectHeader
                        title={project.title}
                        duration={project.duration}
                    />

                    <ProjectBasicInfo
                        role={project.role}
                        techStack={project.techStack}
                        description={project.detailedDescription?.desc}
                    />

                    <ProjectKeyPoints
                        keyPoints={project.detailedDescription?.keyPoints}
                        onKeyPointHover={handleKeyPointHover}
                        onKeyPointLeave={handleKeyPointLeave}
                    />

                    <ProjectTags tags={project.tags} />
                    {/* <ProjectLinks url={project.url} repo={project.repo} /> */}
                </div>

                <ProjectImageDisplay
                    displayImages={displayImages}
                    hoveredKeyPointImage={hoveredKeyPointImage}
                    currentImageIndex={currentImageIndex}
                    projectTitle={project.title}
                />
            </div>
        </div>
    );
};

export default ProjectModal;
