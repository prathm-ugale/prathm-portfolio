import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import SkillCard from '../components/SkillCard'
import { skillCategories } from '../data/skills'
import '../styles/skills.css'

export default function Skills() {
  return (
    <div className="page">
      <div className="container">
        <Reveal>
          <SectionTitle
            as="h1"
            eyebrow="Skills"
            title="Tools, languages and platforms"
            subtitle="Grouped by where they sit in the stack."
          />
        </Reveal>

        <div className="skills__grid">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 70}>
              <SkillCard category={category} />
            </Reveal>
          ))}
        </div>

        <Reveal className="section__footer">
          <Button to="/work" variant="ghost" icon="arrowRight">
            See these applied in my work
          </Button>
        </Reveal>
      </div>
    </div>
  )
}
