import TimelineGrid from './timelinegrid';

const Timeline = ({ projects }) => {
    return (
        <div className="timeline-main" id='projects'>
            {projects.map((project, index) => (
                <TimelineGrid project={project} index={index} key={index}/>
            ))}
        </div>
    );
};

export default Timeline;