import { Link } from "react-router-dom";

const footerLinks = {
  "Informations règlementaires": [
    { label: "Mentions légales", path: "/legal" },
    { label: "Politique de confidentialité", path: "/privacy" },
  ],
  "Suivez nos actualités": [
    { label: "Sur Facebook", path: "https://facebook.com/mistoufles" },
    { label: "Sur Instagram", path: "https://instagram.com/mistoufles" },
  ],
  "L'Association": [
    { label: "Ils parlent de nous", path: "/press" },
    { label: "Dossier de presse", path: "/press-kit" },
    { label: "Nous contacter", path: "/contact" },
    { label: "Nous aider", path: "/support" },
  ],
};

function Footer() {
  return (
    <footer className="bg-gray-100 relative z-20">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-base mb-2 text-gray-800">
                {title}
              </h3>
              <ul className="space-y-1">
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
                      className="text-sm text-gray-600 hover:text-primary-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-xs text-center">
            © {new Date().getFullYear()} Les Mistoufles. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
