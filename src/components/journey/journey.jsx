const Journey = ({experienceData, educationData}) => {
	return (
		<section id="resume" className="resume">
			<div className="section-title">
				<h2>My Journey</h2>
				<p>My journey as a Full Stack Web Developer</p>
			</div>

			<div className="row">
				<div className="col-lg-6">
					<h3 className="resume-title">Professional Experience</h3>
					{experienceData.map((experience, index) => (
						<div className="resume-item" key={index}>
							<span className="circle"></span>
							<h4>{experience.title}</h4>
							<h5>{experience.date}</h5>
							<p><em>{experience.company}</em></p>
							<p>{experience.description}</p>
						</div>
					))}
				</div>
				<div className="col-lg-6">
					<h3 className="resume-title">Education</h3>
					{educationData.map((education, index) => (
						<div className="resume-item" key={index}>
							<span className="circle"></span>
							<h4>{education.title}</h4>
							<h5>{education.date}</h5>
							<p><em>{education.institution}</em></p>
							<p>{education.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Journey;