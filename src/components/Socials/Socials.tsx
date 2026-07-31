import React from "react";
import type { SocialLink } from "../../types/portfolio";
import Button from "@components/Button/Button";
import Icon from "@components/Icon/Icon";

interface SocialsProps {
  socialLinks: SocialLink[];
}

const Socials: React.FC<SocialsProps> = ({ socialLinks }) => {
  const validSocialLinks = socialLinks.filter(
    (link) => link.url?.trim() && link.imageUrl?.trim(),
  );
  const hasSocialLinks = validSocialLinks.length > 0;
  const buttonClassName = hasSocialLinks
    ? "!mx-0"
    : "!mx-auto md:!ml-auto md:!mr-0";

  return (
    <div
      className={`self-stretch flex flex-row items-center animate-slide-up w-full ${
        hasSocialLinks
          ? "flex-wrap justify-center md:justify-end gap-6 md:gap-8"
          : "justify-center md:justify-end"
      }`}
    >
      <Button
        href="/resume.pdf"
        target="_blank"
        download="Ujjawal's Resume.pdf"
        id="download-resume-button"
        ariaLabel="Download CV"
        label="Download CV"
        className={buttonClassName}
      />
      {hasSocialLinks && (
        <div className="flex justify-end items-center gap-6 md:gap-8">
          {validSocialLinks.map((link, index) => (
            <Icon
              key={index}
              src={link.imageUrl}
              alt={link.alt ?? link.title}
              tooltip={link.title}
              href={link.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Socials;
