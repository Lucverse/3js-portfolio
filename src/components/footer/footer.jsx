
const Footer = (footerInfo) => {
    return (
        <footer className="footer-div">
            {
                footerInfo.footerInfo.map((url, index) => {
                    return (
                        <a href={url.url} target="_blank" key={index}>
                            <img src={url.imageUrl} alt={url.alt} />
                        </a>
                    );
                })
            }
        </footer>
    );
};

export default Footer;