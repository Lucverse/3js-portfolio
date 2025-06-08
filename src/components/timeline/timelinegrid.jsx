const TimelineGrid = ({ project, index }) => {
    return (
        <div key={index} className="timeline-grid">
            <div className='project-title-div'>
                <a href={project.url} className='project-title' target='_blank' rel="noreferrer">
                    <h2>{project.title}</h2>
                </a>

                <p className='project-duration'>({project.duration})</p>
            </div>
            <div className='project-description'>
                <p>{project.description}</p>
                <p>{project.technologies}</p>
            </div>
        </div>
    );
};

export default TimelineGrid;