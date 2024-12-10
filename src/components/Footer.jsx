import { Link } from "react-router-dom";

const footerLinks = {
  "Informations règlementaires": [
    { label: "Mentions légales", path: "/legal" },
    { label: "Politique de confidentialité", path: "/privacy" },
  ],
  "Suivez nos actualités": [
    { label: "Sur Facebook", path: "https://www.facebook.com/kitpoupuille/" },
    {
      label: "Sur Instagram",
      path: "https://www.instagram.com/associationlesmistoufles/",
    },
  ],
  "L'Association": [
    {
      label: "Ils parlent de nous",
      path: "https://www.letelegramme.fr/recherche/?query=Les+Mistoufles&orderBy=date",
    },
    { label: "Nous contacter", path: "/contact" },
    { label: "Nous aider", path: "/support" },
  ],
};

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 relative z-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b border-gray-200 pb-2">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      target={
                        link.path.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.path.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-base text-gray-600 hover:text-primary-dark transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-400 text-xs text-center tracking-tight">
            © {new Date().getFullYear()} Les Mistoufles. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
