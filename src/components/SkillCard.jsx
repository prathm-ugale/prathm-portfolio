import Icon from './Icon'

export default function SkillCard({ category }) {
  const { title, icon, description, skills } = category

  return (
    <article className="skill-card">
      <div className="skill-card__head">
        <span className="skill-card__icon" aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
        <div>
          <h3 className="skill-card__title">{title}</h3>
          {description && <p className="skill-card__description">{description}</p>}
        </div>
      </div>

      <ul className="tag-list" aria-label={`${title} skills`}>
        {skills.map((skill) => (
          <li key={skill} className="tag">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}
