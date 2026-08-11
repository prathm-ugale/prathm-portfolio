/**
 * Central place for everything personal.
 * Replace the values here and the whole site updates.
 */
export const site = {
  name: "Prathmesh Ugale",
  firstName: "Prathmesh",
  initials: "PU",
  // Headline title used in the hero and page metadata.
  role: "Java Full Stack Developer",
  // Current role, shown in the status pill and the About facts.
  currentRole: "Java Backend Developer",
  currentCompany: "LTM (LTIMindtree)",
  // currentClient: "ICICI Bank",
  tagline: "Java developer building backend services and APIs for enterprise banking platforms.",
  location: "Navi Mumbai, India",
  email: "prathm.ugale@gmail.com",
  phone: "8454060784",
  status: "Java Full Stack Developer at LTM (LTIMindtree)",
  // Resume button target — opens in a new tab, no automatic download.
  resumeUrl: "https://drive.google.com/file/d/1bv5h7K4FjTy8kq78p7ze0YX3KmBMdgi3/view?usp=sharing",
  intro:
    "Java full stack developer with around 2+ years of experience building enterprise applications with Java 11/17, Spring Boot and Angular. Currently at LTM (LTIMindtree), working with ICICI Bank as a Java Backend Developer on their Account Aggregator platform, after delivering a data governance tool for Citi Bank.",
};

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Work", path: "/work" },
  { label: "Experience", path: "/experience" },
  { label: "Skills", path: "/skills" },
  { label: "Contact", path: "/contact" },
];

export const socialLinks = [
  { label: "GitHub", icon: "github", url: "https://github.com/prathm-ugale" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/prathm-ugale/" },
  { label: "Email", icon: "mail", url: `mailto:${site.email}` },
];

export const stats = [
  { value: "2+", label: "Years of professional experience" },
  { value: "15+", label: "Spring Boot REST APIs delivered" },
  { value: "20+", label: "Production and UAT issues resolved" },
  { value: "~$10M", label: "Contribution to client cost savings" },
];

/** Short list shown on the home page — the tools used day to day. */
export const coreStack = [
  "Java 11/17",
  "Spring Boot",
  "REST APIs",
  "Angular",
  "Hibernate / JPA",
  "Oracle",
  "MySQL",
];
