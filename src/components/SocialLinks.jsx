import Icon from './Icon'
import { socialLinks } from '../data/site'

export default function SocialLinks({ size = 20, className = '' }) {
  return (
    <ul className={`social-links ${className}`.trim()}>
      {socialLinks.map(({ label, icon, url }) => (
        <li key={label}>
          <a
            className="social-links__link"
            href={url}
            aria-label={label}
            title={label}
            {...(url.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
          >
            <Icon name={icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  )
}
