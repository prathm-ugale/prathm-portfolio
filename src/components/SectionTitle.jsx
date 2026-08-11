/**
 * Consistent heading block for every section.
 * `as` lets a page use h1 for its primary title and h2 elsewhere.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Heading = 'h2',
  id,
}) {
  return (
    <header className={`section-title section-title--${align}`}>
      {eyebrow && <p className="section-title__eyebrow">{eyebrow}</p>}
      <Heading className="section-title__heading" id={id}>
        {title}
      </Heading>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </header>
  )
}
