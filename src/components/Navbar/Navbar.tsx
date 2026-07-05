import { useState, useCallback } from "react";
import { NAV_LINKS, SCROLL_HIDE_THRESHOLD, AUTO_SCROLL_RESET_MS } from "@lib/constants";
import { scrollToSection } from "@lib/utils";
import useBodyScrollLock from "@hooks/useBodyScrollLock";
import useKeyDown from "@hooks/useKeyDown";
import { useEffect } from "react";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const isAutoScrolling = { current: false };

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling.current) return;
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > SCROLL_HIDE_THRESHOLD) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Active section scroll-spy
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.id);
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useKeyDown("Escape", closeMenu, menuOpen);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(
      section,
      () => { isAutoScrolling.current = true; },
      () => { isAutoScrolling.current = false; },
      AUTO_SCROLL_RESET_MS,
    );
  };

  const delayStyles = [
    "animate-delay-[150ms]",
    "animate-delay-[300ms]",
    "animate-delay-[450ms]",
  ];

  return (
    <>
      <nav
        className={`px-[2.2rem] py-[0.9rem] fixed top-8 left-1/2 z-999 bg-[rgba(15,15,16,0.7)] backdrop-blur-lg border border-[rgba(191,174,147,0.18)] rounded-custom shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-350 cubic-bezier(0.16,1,0.3,1) ${
          showNavbar
            ? "opacity-100 translate-x-[-50%] translate-y-0 pointer-events-auto"
            : "opacity-0 translate-x-[-50%] translate-y-[-130%] pointer-events-none"
        } max-md:top-12 max-md:left-16 max-md:p-[0.3rem_0.6rem] max-md:flex max-md:justify-center max-md:items-center max-md:rounded-full max-md:w-12 max-md:h-12`}
      >
        <div className="flex justify-between items-center max-md:flex-row">
          <button
            className="hidden max-md:block text-[1.3rem] bg-none border-none text-primary cursor-pointer leading-none"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <ul className="list-none flex gap-20 max-md:hidden">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`relative pb-0.5 text-muted-color text-[0.95rem] font-medium transition-colors duration-300 hover:text-primary after:content-[''] after:absolute after:left-0 after:-bottom-0.75 after:w-0 after:h-0.5 after:bg-linear-to-r after:from-primary after:to-secondary after:transition-[width] after:duration-300 after:rounded-sm hover:after:w-full ${
                    activeSection === id ? "text-primary after:w-full" : ""
                  }`}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen z-9999 flex flex-col justify-center items-center p-8 gap-8 bg-[rgba(15,15,16,0.92)] backdrop-blur-xl border border-[rgba(191,174,147,0.15)] transition-all duration-350 ease-out opacity-100 translate-y-0 pointer-events-auto">
          <button
            className="absolute top-6 right-8 text-[2rem] bg-[rgba(191,174,147,0.08)] border border-[rgba(191,174,147,0.2)] text-primary cursor-pointer z-10000 flex items-center justify-center rounded-lg w-10 h-10 transition-all duration-300 ease hover:rotate-90 hover:bg-[rgba(191,174,147,0.15)]"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <ul className="list-none p-0 m-0 text-center flex flex-col gap-12">
            {NAV_LINKS.map(({ id, label }, index) => (
              <li
                key={id}
                className={`animate-slide-up opacity-0 translate-y-5 ${delayStyles[index] || ""}`}
                style={{ animationFillMode: "forwards" }}
              >
                <a
                  href={`#${id}`}
                  className="text-[2rem] font-semibold text-secondary transition-colors duration-300 hover:text-primary"
                  onClick={(e) => handleNavClick(e, id)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
