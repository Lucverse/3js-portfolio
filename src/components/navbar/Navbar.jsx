import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
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
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
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
            <IoMdClose />
          </button>
          <ul>
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
