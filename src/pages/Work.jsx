import { useMemo, useState } from 'react'
import Button from '../components/Button'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { projects } from '../data/projects'
import '../styles/work.css'

const ALL = 'All'

export default function Work() {
  const [activeFilter, setActiveFilter] = useState(ALL)

  const categories = useMemo(
    () => [ALL, ...new Set(projects.map((project) => project.category))],
    [],
  )

  const visibleProjects = useMemo(
    () =>
      activeFilter === ALL
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  )

  return (
    <div className="page">
      <div className="container">
        <Reveal>
          <SectionTitle
            as="h1"
            eyebrow="Work"
            title="Things I've built"
            subtitle="Enterprise and personal work built with Java, Spring Boot and Angular."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="work__filters" role="group" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-chip ${activeFilter === category ? 'filter-chip--active' : ''}`.trim()}
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="section__footer">
          <p className="work__note">More code lives on my GitHub profile.</p>
          <Button to="/contact" variant="secondary" icon="arrowRight">
            Discuss a project
          </Button>
        </Reveal>
      </div>
    </div>
  )
}
