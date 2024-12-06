import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
  { path: "/support", label: "Soutenez les Mistoufles" },
  { path: "/conditions", label: "Les conditions d'adoption" },
  { path: "/adoptions", label: "Les animaux à l'adoption" },
  { path: "/about", label: "Qui sommes-nous ?" },
  { path: "/contact", label: "Contact" },
];

const NavItems = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 text-base">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `block px-3 py-2 font-medium rounded-lg transition-all duration-200 ${isActive
                ? "text-primary-dark bg-primary-lightest"
                : "text-gray-700 hover:text-primary-dark hover:bg-primary-lightest/50"
              }`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    if (direction === "down" && latest > 50) {
      setHidden(true);
    } else if (direction === "up") {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.header
      className="bg-white shadow-md fixed w-full top-0 z-50"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      <nav className="container mx-auto flex items-center justify-between py-3 px-6">
        <div className="w-48">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Link to="/">
              <img src="/logo.png" alt="Les Mistoufles" className="h-12" />
            </Link>
          </motion.div>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex justify-center flex-1">
          <NavItems />
        </div>

        <div className="w-48 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:block bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-200 font-medium"
          >
            Faire un don
          </motion.button>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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
            </motion.button>
          </div>
        </div>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-0 bg-white z-50 md:hidden"
            >
              <div className="p-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
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
                </motion.button>
                <div className="mt-20 space-y-6">
                  <NavItems />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-primary text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-primary-dark transition-all duration-200 font-medium"
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
