/**
 * Work history, newest first. Edit freely — the timeline renders whatever is here.
 * `facts` renders as label/value chips, `compact: true` renders a smaller card.
 */
export const experience = [
  {
    id: "LTM (LTIMindtree)-icici",
    company: "LTM (LTIMindtree)",
    position: "Java Backend Developer",
    type: "Full-time",
    duration: "Current assignment",
    current: true,
    facts: [
      // { label: 'Client', value: 'ICICI Bank' },
      { label: "Project", value: "Account Aggregator" },
      { label: "At LTM (LTIMindtree) since", value: "Dec 2024" },
    ],
    summary:
      "Backend developer on the Account Aggregator platform, building and maintaining the Java and Spring Boot services behind it.",
    responsibilities: [
      "Develop REST APIs for the Account Aggregator platform.",
      "Handle concurrent requests coming from the UI.",
      "Work with RabbitMQ for messaging and asynchronous request handling.",
      "Write and execute unit tests for backend functionality.",
      "Develop and maintain Java and Spring Boot backend services.",
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "RabbitMQ"],
  },
  {
    id: "LTM (LTIMindtree)-citi",
    company: "LTM (LTIMindtree)",
    position: "Java Full Stack Developer",
    type: "Full-time",
    duration: "Previous assignment",
    current: false,
    facts: [
      { label: "Client", value: "Citi Bank" },
      { label: "Project", value: "Collibra Data Governance Tool" },
    ],
    summary:
      "Full stack developer on a data governance tool in an enterprise banking environment, working across Spring Boot services and the front end.",
    responsibilities: [
      "Built Spring Boot REST APIs supporting Collibra-based data governance.",
      "Developed configurable approval workflows in place of hardcoded workflow logic.",
      "Worked across backend and frontend to deliver request submission, multi-step approvals and audit reporting.",
      "Supported business glossary and metadata management for governed data assets.",
      "Resolved 20+ production and UAT issues and contributed to governance automation.",
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "Angular", "Oracle", "Collibra"],
  },
  {
    id: "velox-solutions",
    company: "Velox Solutions",
    position: "Software Developer",
    type: "Full-time",
    duration: "Jun 2024 — Dec 2024",
    current: false,
    summary:
      "Worked across the backend and UI of a SIEM cybersecurity platform handling security events from multiple sources.",
    responsibilities: [
      "Developed backend REST APIs using Java and Spring Boot for a SIEM cybersecurity platform.",
      "Worked on log ingestion, normalisation and retrieval workflows.",
      "Developed and enhanced Angular UI components, including dashboards and monitoring views for security analysts.",
      "Debugged and resolved 15+ functional and performance issues.",
    ],
    tech: ["Java", "Spring Boot", "REST APIs", "Angular", "Elasticsearch"],
  },
  {
    id: "alhansat",
    company: "Alhansat Technologies (OPC)",
    position: "Intern",
    type: "Internship",
    duration: "Dec 2022 — Feb 2023",
    current: false,
    compact: true,
    responsibilities: [
      "Assisted with web application development using HTML, CSS and JavaScript.",
      "Assisted with testing web application features.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
  },
];
