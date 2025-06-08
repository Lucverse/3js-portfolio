import { useEffect, useRef } from "react";

const Journey = ({ experienceData, educationData }) => {
	const expItemsRef = useRef([]);
	const eduItemsRef = useRef([]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("in-view");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		[...expItemsRef.current, ...eduItemsRef.current].forEach((el) => {
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<section id="about" className="resume">
			<div className="section-title">
				<h2>My Journey</h2>
				<p>My journey as a Full Stack Web Developer</p>
			</div>

			<div className="row">
				<div>
					<h3 className="resume-title">Professional Experience</h3>
					{experienceData.map((experience, index) => (
						<div
							className="resume-item"
							key={index}
							ref={(el) => (expItemsRef.current[index] = el)}
						>
							<span className="circle"></span>
							<h4>{experience.title}</h4>
							<h5>{experience.date}</h5>
							<p>
								<em>{experience.company}</em>
							</p>
							<p>{experience.description}</p>
						</div>
					))}
				</div>
				<div>
					<h3 className="resume-title">Education</h3>
					{educationData.map((education, index) => (
						<div
							className="resume-item"
							key={index}
							ref={(el) => (eduItemsRef.current[index] = el)}
						>
							<span className="circle"></span>
							<h4>{education.title}</h4>
							<h5>{education.date}</h5>
							<p>
								<em>{education.institution}</em>
							</p>
							<p>{education.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Journey;
