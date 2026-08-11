import Button from "../components/Button";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import { about } from "../data/about";
import { site } from "../data/site";
import profileImage from "../assets/images/profile.png";
import "../styles/about.css";

/** Education and leadership share the same record layout. */
function RecordList({ items, icon, label }) {
  return (
    <ul className="record-list" aria-label={label}>
      {items.map((item, index) => (
        <Reveal as="li" key={item.id} delay={index * 80} className="record-item">
          <span className="record-item__icon" aria-hidden="true">
            <Icon name={icon} size={20} />
          </span>
          <div>
            <h3 className="record-item__title">{item.title}</h3>
            <p className="record-item__meta">
              {item.institution}
              <span className="record-item__duration">{item.duration}</span>
            </p>
            {item.detail && <p className="record-item__detail">{item.detail}</p>}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <Reveal>
          <SectionTitle
            as="h1"
            eyebrow="About"
            title={`A bit more about ${site.firstName}`}
            subtitle={site.tagline}
          />
        </Reveal>

        <div className="about__intro">
          <Reveal className="about__portrait-wrap">
            <img
              className="about__portrait"
              src={profileImage}
              alt={`Portrait placeholder for ${site.name}`}
              width="420"
              height="480"
            />
            <ul className="about__facts">
              <li>
                <Icon name="briefcase" size={16} />
                {site.currentRole} at {site.currentCompany}
              </li>
              {/* <li>
                <Icon name="target" size={16} />
                Client: {site.currentClient}
              </li> */}
              <li>
                <Icon name="location" size={16} />
                {site.location}
              </li>
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="about__text" delay={100}>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}

            <div className="about__actions">
              <Button href={site.resumeUrl} icon="download" iconPosition="left">
                Download Resume
              </Button>
              <Button to="/contact" variant="ghost" icon="arrowRight">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="section" aria-labelledby="career-heading">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="Career summary" title="What I work on" id="career-heading" />
          </Reveal>

          <div className="about__grid">
            {about.career.map((entry, index) => (
              <Reveal key={entry.title} delay={index * 90}>
                <article className="about__card">
                  <h3>{entry.title}</h3>
                  <p>{entry.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="education-heading">
        <div className="container">
          <Reveal>
            <SectionTitle eyebrow="Education" title="Where I studied" id="education-heading" />
          </Reveal>

          <RecordList items={about.education} icon="education" label="Education history" />
        </div>
      </section>

      <section className="section" aria-labelledby="credentials-heading">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Training & certifications"
              title="Courses and credentials"
              id="credentials-heading"
            />
          </Reveal>

          <div className="about__certs-grid">
            <Reveal className="about__certs">
              <h3 className="about__certs-heading">Training</h3>
              <ul>
                {about.training.map((entry) => (
                  <li key={entry}>
                    <Icon name="check" size={16} />
                    {entry}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="about__certs" delay={90}>
              <h3 className="about__certs-heading">Certifications & courses</h3>
              <ul>
                {about.certifications.map((entry) => (
                  <li key={entry}>
                    <Icon name="check" size={16} />
                    {entry}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="leadership-heading">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Leadership"
              title="Positions of responsibility"
              id="leadership-heading"
            />
          </Reveal>

          <RecordList
            items={about.leadership}
            icon="briefcase"
            label="Positions of responsibility"
          />
        </div>
      </section>
    </div>
  );
}
