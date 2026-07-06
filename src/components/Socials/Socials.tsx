import React from "react";
import type { SocialLink } from "../../types/portfolio";
import Button from "@components/Button/Button";
import Icon from "@components/Icon/Icon";

interface SocialsProps {
  socialLinks: SocialLink[];
}

const Socials: React.FC<SocialsProps> = ({ socialLinks }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center md:justify-end gap-6 md:gap-8 animate-slide-up w-full">
      <Button
        href="/resume.pdf"
        target="_blank"
        download="Ujjawal's Resume.pdf"
        id="download-resume-button"
        ariaLabel="Download CV"
        label="Download CV"
      />
      <div className="flex justify-end items-center gap-6 md:gap-8">
        {socialLinks.map((link, index) => (
          <Icon
            key={index}
            src={link.imageUrl}
            alt={link.alt ?? link.title}
            tooltip={link.title}
            href={link.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Socials;
