import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAutoScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(section);
    if (el) {
      isAutoScrolling.current = true;
      el.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 700);
    }
  };

  return (
    <>
      <nav className={`navbar ${showNavbar ? "navbar--visible" : "navbar--hidden"}`}>
        <div className="navbar-container">
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={e => handleNavClick(e, "home")}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={e => handleNavClick(e, "about")}>About</a>
            </li>
            <li>
              <a href="#projects" onClick={e => handleNavClick(e, "projects")}>Projects</a>
            </li>
          </ul>
        </div>
      </nav>
      {menuOpen && (
        <div className="mobile-fullscreen-nav open">
          <button
            className="close-button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <ul>
            <li>
              <a href="#home" onClick={e => handleNavClick(e, "home")}>Home</a>
            </li>
            <li>
              <a href="#about" onClick={e => handleNavClick(e, "about")}>About</a>
            </li>
            <li>
              <a href="#projects" onClick={e => handleNavClick(e, "projects")}>Projects</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
