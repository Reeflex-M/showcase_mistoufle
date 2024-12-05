import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "Accueil" },
  { path: "/support", label: "Soutenez les Mistoufles" },
  { path: "/conditions", label: "Les conditions d'adoption" },
  { path: "/adoptions", label: "Les animaux à l'adoption" },
  { path: "/about", label: "Qui sommes-nous ?" },
  { path: "/contact", label: "Contact" },
];

const NavItems = () => {
  return (
    <ul className="flex flex-col md:flex-row items-center md:space-x-6 text-sm">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `${
                isActive ? "text-primary font-semibold" : "text-secondary"
              } hover:text-primary-dark transition-colors duration-200`
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

  return (
    <motion.header className="bg-primary-lightest shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-screen-2xl container flex justify-between items-center py-4 px-4">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link to="/">
            <img src="/logo.png" alt="Les Mistoufles" className="h-12" />
          </Link>
        </motion.div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
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

        {/* Menu Desktop */}
        <div className="hidden md:flex flex-grow justify-center px-4">
          <NavItems />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block bg-primary text-primary-grey px-6 py-2 rounded-full hover:bg-primary-light transition-all duration-200"
        >
          Faire un don
        </motion.button>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 bg-primary-grey z-50 md:hidden"
            >
              <div className="p-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4"
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
                <div className="mt-16">
                  <NavItems />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-primary-grey px-6 py-3 rounded-full mt-8 hover:bg-primary-light transition-all duration-200"
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
