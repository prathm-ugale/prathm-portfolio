import Icon from './Icon'
import Reveal from './Reveal'

export default function TimelineItem({ item, delay = 0 }) {
  const {
    company,
    position,
    type,
    facts,
    location,
    duration,
    current,
    compact,
    summary,
    responsibilities,
    tech,
  } = item

  const classNames = [
    'timeline-item',
    current ? 'timeline-item--current' : '',
    compact ? 'timeline-item--compact' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <li className={classNames}>
      <span className="timeline-item__marker" aria-hidden="true" />

      <Reveal className="timeline-item__card" delay={delay}>
        <div className="timeline-item__head">
          <div>
            <h3 className="timeline-item__position">{position}</h3>
            <p className="timeline-item__company">
              <Icon name="briefcase" size={15} />
              {company}
              {type && <span className="timeline-item__type">{type}</span>}
            </p>
          </div>

          <div className="timeline-item__when">
            <span className="timeline-item__duration">{duration}</span>
            {location && (
              <span className="timeline-item__location">
                <Icon name="location" size={14} />
                {location}
              </span>
            )}
          </div>
        </div>

        {facts?.length > 0 && (
          <dl className="timeline-item__facts">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {summary && <p className="timeline-item__summary">{summary}</p>}

        <ul className="timeline-item__list">
          {responsibilities.map((responsibility) => (
            <li key={responsibility}>
              <Icon name="check" size={16} className="timeline-item__bullet" />
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>

        <ul className="tag-list" aria-label={`Technologies used at ${company}`}>
          {tech.map((techName) => (
            <li key={techName} className="tag">
              {techName}
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  )
}
