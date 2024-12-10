import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.header
      className="backdrop-blur-md bg-white shadow-lg fixed w-full top-0 z-50"
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <motion.div
        className="h-0.5 bg-primary origin-left"
        style={{ scaleX: scrollY.get() / (document.documentElement.scrollHeight - window.innerHeight) }}
      />
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
                  isActive ? "text-primary-dark bg-primary-lightest" : "text-gray-700 hover:text-primary-dark"
                }`
              }
            >
              {label}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark"
                initial={false}
                animate={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
              />
            </NavLink>
          ))}
        </div>

        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block bg-primary-dark text-white px-5 py-2 rounded-full font-medium shadow-md hover:bg-primary-dark transition-all duration-200"
          >
            Faire un don
          </motion.button>

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
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="self-end p-2 rounded-lg hover:bg-gray-100"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="flex flex-col space-y-4 mt-16">
                  {navItems.map(({ path, label }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `px-4 py-3 font-medium rounded-lg transition-colors ${
                          isActive ? "text-primary-dark bg-primary-lightest" : "text-gray-700"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 w-full bg-primary text-white px-6 py-3 rounded-full font-medium shadow-md"
                  >
                    Faire un don
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default Navbar;
