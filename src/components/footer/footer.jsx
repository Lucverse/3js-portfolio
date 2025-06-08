import { useEffect } from "react";

const Footer = (footerInfo) => {
    useEffect(() => {
        const footer = document.querySelector('.footer-div');
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    footer.classList.add('in-view');
                }
            },
            { threshold: 0.2 }
        );

        if (footer) observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <footer className="footer-div">
            {
                footerInfo.footerInfo.map((url, index) => {
                    return (
                        <a href={url.url} target="_blank" rel="noreferrer" key={index}>
                            <img src={url.imageUrl} alt={url.alt} />
                        </a>
                    );
                })
            }
        </footer>
    );
};

export default Footer;