import Button from '../components/Button'
import Icon from '../components/Icon'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SocialLinks from '../components/SocialLinks'
import { featuredProjects } from '../data/projects'
import { coreStack, site, stats } from '../data/site'
import '../styles/home.css'

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="hero__status">
              <span className="hero__status-dot" aria-hidden="true" />
              {site.status}
            </p>

            <h1 className="hero__heading" id="hero-heading">
              <span className="hero__greeting">Hi, I&apos;m {site.firstName}</span>
              <span className="hero__role">{site.role}</span>
            </h1>

            <p className="hero__intro">{site.intro}</p>

            <div className="hero__actions">
              <Button to="/work" icon="arrowRight">
                View My Work
              </Button>
              <Button to="/contact" variant="secondary" icon="mail" iconPosition="left">
                Contact Me
              </Button>
            </div>

            <div className="hero__social">
              <span className="hero__social-label">Find me on</span>
              <SocialLinks size={18} />
            </div>
          </div>

          {/* Decorative code panel — pure presentation, hidden from assistive tech. */}
          <div className="hero__visual" aria-hidden="true">
            <div className="code-panel">
              <div className="code-panel__bar">
                <span className="code-panel__dot" />
                <span className="code-panel__dot" />
                <span className="code-panel__dot" />
                <span className="code-panel__file">Developer.java</span>
              </div>
              <pre className="code-panel__code">
                <code>
                  <span className="tok-keyword">public class</span>{' '}
                  <span className="tok-var">Developer</span> {'{'}
                  {'\n'}  <span className="tok-keyword">String</span>{' '}
                  <span className="tok-prop">name</span> ={' '}
                  <span className="tok-string">&quot;{site.name}&quot;</span>;
                  {'\n'}  <span className="tok-keyword">String</span>{' '}
                  <span className="tok-prop">role</span> ={' '}
                  <span className="tok-string">&quot;{site.role}&quot;</span>;
                  {'\n'}  <span className="tok-keyword">String</span>[]{' '}
                  <span className="tok-prop">stack</span> = {'{'}{' '}
                  <span className="tok-string">&quot;Java&quot;</span>,{' '}
                  <span className="tok-string">&quot;Spring Boot&quot;</span>,{' '}
                  <span className="tok-string">&quot;Angular&quot;</span> {'}'};
                  {'\n'}  <span className="tok-keyword">String</span>{' '}
                  <span className="tok-prop">focus</span> ={' '}
                  <span className="tok-string">&quot;REST APIs, backend services&quot;</span>;
                  {'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
            <span className="hero__glow hero__glow--one" />
            <span className="hero__glow hero__glow--two" />
          </div>
        </div>
      </section>

      <section className="stats" aria-label="Career highlights">
        <div className="container">
          <Reveal>
            <ul className="stats__grid">
              {stats.map(({ value, label }) => (
                <li key={label} className="stats__item">
                  <span className="stats__value">{value}</span>
                  <span className="stats__label">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="featured-heading">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Selected work"
              title="Projects I've built"
              subtitle="A cybersecurity monitoring platform and a full stack agri-tech project, both built on Java, Spring Boot and Angular."
              id="featured-heading"
            />
          </Reveal>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 90}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal className="section__footer">
            <Button to="/work" variant="ghost" icon="arrowRight">
              Browse all projects
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="stack-heading">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="Toolkit"
              title="The stack I work in"
              subtitle="Java and Spring Boot on the backend, Angular on the front end, with Oracle and MySQL behind them."
              id="stack-heading"
            />
          </Reveal>

          <Reveal delay={80}>
            <ul className="stack-list">
              {coreStack.map((item) => (
                <li key={item} className="stack-list__item">
                  <Icon name="sparkle" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="section__footer" delay={120}>
            <Button to="/skills" variant="ghost" icon="arrowRight">
              See the full skill set
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="cta" aria-labelledby="cta-heading">
        <div className="container">
          <Reveal className="cta__panel">
            <h2 className="cta__heading" id="cta-heading">
              Let&apos;s talk about your project
            </h2>
            <p className="cta__text">
              Happy to discuss backend services, REST APIs or anything else Java related. My inbox
              is always open.
            </p>
            <div className="cta__actions">
              <Button to="/contact" icon="arrowRight">
                Start a conversation
              </Button>
              <Button href={site.resumeUrl} variant="ghost" icon="download" iconPosition="left">
                Download Resume
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
