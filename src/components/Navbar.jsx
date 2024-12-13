import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const navItems = [
  { path: "/support", label: "Soutenez les Mistoufles" },
  { path: "/conditions", label: "Les conditions d'adoption" },
  { path: "/adoptions", label: "Les animaux à l'adoption" },
  { path: "/about", label: "Qui sommes-nous ?" },
  { path: "/contact", label: "Contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest < previous || latest < 50) {
      setHidden(false);
    } else if (latest > previous && latest > 50) {
      setHidden(true);
    }
  });

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.header
      className="backdrop-blur-md bg-white shadow-lg fixed w-full top-0 z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex-shrink-0 w-32 lg:w-40">
          <motion.img
            src="/logo.png"
            alt="Les Mistoufles"
            className="h-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          />
        </Link>

        <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm lg:text-base flex-1 justify-center px-4">
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `px-3 py-2 font-medium rounded-lg transition-all duration-300 relative ${
                  isActive
                    ? "text-primary-dark after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:bg-primary-dark"
                    : "text-gray-700 hover:text-primary-dark hover:after:right-3 after:content-[''] after:absolute after:bottom-1 after:left-3 after:right-full after:h-[2px] after:bg-primary-dark after:transition-all after:duration-300"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center">
          <motion.a
            href="https://www.helloasso.com/associations/les-mistoufles/formulaires/1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block bg-primary-dark text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary-dark transition-all duration-200"
          >
            Faire un don
          </motion.a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t md:hidden"
            >
              <div className="flex flex-col py-4 px-4 space-y-2">
                {navItems.map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `px-3 py-2 font-medium rounded-lg transition-all duration-300 ${
                        isActive
                          ? "text-primary-dark bg-gray-100"
                          : "text-gray-700 hover:text-primary-dark hover:bg-gray-50"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <motion.a
                  href="https://www.helloasso.com/associations/les-mistoufles/formulaires/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-primary-dark text-white px-5 py-2 rounded-full font-medium text-center shadow-md hover:bg-primary-dark transition-all duration-200"
                >
                  Faire un don
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default Navbar;
