import React from "react";
import type { SocialLink } from "../../types/portfolio";
import Icon from "@components/Icon/Icon";

interface FooterProps {
  footerInfo: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ footerInfo }) => {
  const footerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("in-view");
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className="reveal-item flex justify-center items-center gap-[clamp(2rem,5vw,5rem)] rounded-t-custom border border-primary/20 border-b-0 h-[clamp(4rem,5vw,5rem)]"
      ref={footerRef}
    >
      {footerInfo.map((url, index) => (
        <Icon
          key={index}
          src={url.imageUrl}
          alt={url.alt ?? url.title}
          tooltip={url.title}
          href={url.url}
        />
      ))}
    </footer>
  );
};

export default Footer;
