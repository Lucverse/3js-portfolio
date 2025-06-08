import React, { useEffect, useRef } from 'react';
import TimelineGrid from './timelinegrid';

const Timeline = ({ projects }) => {
    const [listedProjects, setListedProjects] = React.useState(projects.slice(0, 3));

    const observerRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        observerRef.current = observer;

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('.timeline-grid');
        elements.forEach(el => {
            observerRef.current.observe(el);
        });
    }, [listedProjects]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div className="timeline-main" id='projects'>
                {listedProjects.map((project, index) => (
                    <TimelineGrid
                        key={index}
                        index={index}
                        project={project}
                        className='timeline-grid'
                    />
                ))}
            </div>
            {listedProjects.length < projects.length ? (
                <div className="load-more-btn" onClick={() => {
                    const nextProjects = projects.slice(listedProjects.length, listedProjects.length + 3);
                    setListedProjects([...listedProjects, ...nextProjects]);
                }}>
                    Load More ↓
                </div>
            ) : (
                <div className="load-more-btn" onClick={() => {
                    setListedProjects(projects.slice(0, 3));
                }}>
                    Show Less ↑
                </div>
            )}
        </div>
    );
};

export default Timeline;