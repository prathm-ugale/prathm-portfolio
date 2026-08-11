/**
 * Projects. Swap the copy and images (place files in /public/images/projects).
 * `featured: true` promotes a project to the home page.
 * `github` / `demo` are optional — the buttons only render when a link exists.
 */
export const projects = [
  {
    id: 'siem-platform',
    title: 'Security Information and Event Management (SIEM) System',
    shortTitle: 'SIEM System',
    category: 'Cybersecurity Platform',
    description:
      'Security monitoring platform that ingests logs from multiple sources, stores them in Elasticsearch and surfaces alerts and event trends through Angular dashboards.',
    highlights: [
      'Spring Boot backend APIs serving processed security events and alerts.',
      'Elasticsearch-based log storage with efficient querying and retrieval of security events.',
      'Angular dashboards covering alert views, log trends, severity levels and event filtering.',
      'Tested and validated log ingestion pipelines, identifying parsing errors and data inconsistencies during high-volume processing.',
    ],
    tech: [
      'Java',
      'Spring Boot',
      'Angular',
      'Elastic Stack',
      'Elasticsearch',
      'Logstash',
      'Kibana',
    ],
    image: '/images/projects/siem-platform.svg',
    featured: true,
  },
  {
    id: 'agrolink',
    title: 'AgroLink',
    shortTitle: 'AgroLink',
    category: 'Personal Full Stack Project',
    description:
      'A role-based full stack agri-tech platform connecting farmers and agrochemical sellers, covering requests, inventory and feedback in one workflow.',
    highlights: [
      'Farmer and seller registration with role-based access to their own workflows.',
      'Crop management, agrochemical requests and request status tracking for farmers.',
      'Inventory updates, stock management and response handling for sellers.',
      'Spring Boot REST APIs over a normalised MySQL database, with an Angular UI and feedback handling.',
    ],
    tech: ['Angular', 'Spring Boot', 'MySQL'],
    image: '/images/projects/agrolink.svg',
    featured: true,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
