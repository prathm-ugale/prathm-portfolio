import { Link } from "react-router-dom";
import Icon from "./Icon";
import SocialLinks from "./SocialLinks";
import { navLinks, site } from "../data/site";
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__name">
            {site.name}
          </Link>
          <p className="footer__tagline">{site.tagline}</p>
          <SocialLinks />
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          <h2 className="footer__heading">Navigation</h2>
          <ul className="footer__links">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <h2 className="footer__heading">Get in touch</h2>
          <ul className="footer__links">
            <li>
              <a href={`mailto:${site.email}`}>
                <Icon name="mail" size={16} />
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Icon name="phone" size={16} />
                {site.phone}
              </a>
            </li>
            <li className="footer__location">
              <Icon name="location" size={16} />
              {site.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {site.name}. All rights reserved.
        </p>
        <p className="footer__built">
          Built with passion <span className="footer__accent">Prathmesh</span> &amp; Vite
        </p>
      </div>
    </footer>
  );
}
