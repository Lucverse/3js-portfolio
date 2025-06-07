const Socials = ({ socialLinks }) => {
    return (
        <div className="basic-socials-div">
            <a href="/resume.pdf" target="_blank" download="Ujjawal's Resume.pdf" id="download-resume-button">
                Download CV
            </a>
            <div className='socials-div'>
                {socialLinks.map((link, index) => (
                    <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                        <img src={link.imageUrl} alt={link.alt} />
                    </a>
                ))}
            </div>

        </div>
    );
}

export default Socials;