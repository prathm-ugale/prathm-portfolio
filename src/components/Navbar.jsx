import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { navLinks, site } from '../data/site'
import '../styles/navbar.css'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // Seeded from the current offset so a reload part-way down the page looks right.
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 12)
  const { pathname } = useLocation()

  // Solid background once the page has moved off the top.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  // Reset the menu on navigation (including browser back/forward) during render
  // rather than in an effect, which would cause a second render pass.
  const [menuPath, setMenuPath] = useState(pathname)
  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setIsMenuOpen(false)
  }

  // Lock scrolling and allow Escape to dismiss while the menu is open.
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.body.classList.add('has-menu-open')
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('has-menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`.trim()}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label={`${site.name} — home`}>
          <span className="navbar__mark" aria-hidden="true">
            {site.initials}
          </span>
          <span className="navbar__name">{site.name}</span>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__list">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`.trim()
                  }
                  end={path === '/'}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile ${isMenuOpen ? 'is-open' : ''}`.trim()}
        hidden={!isMenuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="navbar__mobile-list">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`.trim()
                  }
                  end={path === '/'}
                  onClick={closeMenu}
                >
                  {label}
                  <Icon name="arrowRight" size={18} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
