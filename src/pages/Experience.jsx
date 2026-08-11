import Button from "../components/Button";
import Reveal from "../components/Reveal";
import SectionTitle from "../components/SectionTitle";
import TimelineItem from "../components/TimelineItem";
import { experience } from "../data/experience";
import { site } from "../data/site";
import "../styles/experience.css";

export default function Experience() {
  return (
    <div className="page">
      <div className="container">
        <Reveal>
          <SectionTitle
            as="h1"
            eyebrow="Experience"
            title="Where I've worked"
            subtitle="Around 2 years across enterprise banking, data governance and cybersecurity platforms — currently with ICICI Bank through LTM (LTIMindtree)."
          />
        </Reveal>

        <ol className="timeline">
          {experience.map((item, index) => (
            <TimelineItem key={item.id} item={item} delay={index * 90} />
          ))}
        </ol>

        <Reveal className="section__footer">
          <Button href={site.resumeUrl} variant="secondary" icon="download" iconPosition="left">
            Download full resume
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
