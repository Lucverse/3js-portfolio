import React from 'react';
import TimelineGrid from './timelinegrid';

const Timeline = ({ projects }) => {
    return (
        <div className="timeline-main">
            {projects.map((project, index) => (
                <TimelineGrid project={project} index={index} />
            ))}
        </div>
    );
};

export default Timeline;