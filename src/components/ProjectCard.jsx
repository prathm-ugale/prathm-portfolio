import Button from './Button'
import Icon from './Icon'
import '../styles/work.css'

export default function ProjectCard({ project }) {
  const { title, description, highlights, tech, image, github, demo, year, category } = project
  const hasLinks = Boolean(github || demo)

  return (
    <article className="project-card">
      <div className="project-card__media">
        <img src={image} alt={`${title} interface preview`} loading="lazy" width="640" height="400" />
      </div>

      <div className="project-card__body">
        <div className="project-card__meta">
          {category && <span className="project-card__category">{category}</span>}
          {year && <span className="project-card__year">{year}</span>}
        </div>

        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        {highlights?.length > 0 && (
          <ul className="project-card__highlights">
            {highlights.map((highlight) => (
              <li key={highlight}>
                <Icon name="check" size={15} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="tag-list" aria-label={`Technologies used in ${title}`}>
          {tech.map((item) => (
            <li key={item} className="tag">
              {item}
            </li>
          ))}
        </ul>

        {hasLinks && (
          <div className="project-card__actions">
            {github && (
              <Button
                href={github}
                variant="ghost"
                size="sm"
                icon="github"
                iconPosition="left"
                aria-label={`View the source code for ${title} on GitHub`}
              >
                Code
              </Button>
            )}
            {demo && (
              <Button
                href={demo}
                variant="secondary"
                size="sm"
                icon="arrowUpRight"
                aria-label={`Open the live demo of ${title}`}
              >
                Live Demo
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
