const DEV_TOOLS = [
  "VS Code",
  "IntelliJ IDEA",
  "Postman",
  "Thunder Client",
  "Docker (for dev)",
  "ESLint",
  "Prettier",
  "Webpack",
  "Vite",
];

const REQUIREMENTS = [
  "Requirements Gathering",
  "Requirements Analysis",
  "Stakeholder Communication",
  "Business Analysis",
  "Project Planning",
  "Risk Management",
];

const SYSTEM_DESIGN = [
  "System Architecture",
  "Modular Design",
  "Database Design",
  "UML Diagrams",
  "Design Patterns",
  "Technical Decision-Making",
];

const UI_UX_DESIGN = [
  "Figma",
  "Sketch",
  "Adobe XD",
  "HTML",
  "CSS",
  "JavaScript",
  "TailwindCSS",
  "Bootstrap",
  "React",
  "Next.js",
  "Responsive Design",
];

const PROGRAMMING_LANGUAGES = [
  // 🧠 Web
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "PHP",
  "Laravel",
  "Blade",
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Angular",
  "Svelte",
  "Alpine.js",
  "jQuery",

  // 🌐 Backend
  "Node.js",
  "Express.js",
  "NestJS",
  "Fastify",
  "Python",
  "Django",
  "Flask",
  "Ruby",
  "Ruby on Rails",
  "Go",
  "Java",
  "Spring Boot",
  "Kotlin",
  "C#",
  ".NET Core",
  "ASP.NET",

  // 📱 Mobile
  "React Native",
  "Flutter",
  "Dart",
  "Swift",
  "Kotlin (Android)",
  "Java (Android)",

  // 🧠 System/Desktop
  "C",
  "C++",
  "Rust",
  "Electron.js",
  "JavaFX",
  "WPF",
  "Qt",

  // 💾 Scripting
  "Shell Script (Bash)",
  "PowerShell",
  "Perl",

  // 📊 Data/ML
  "R",
  "Python (Pandas, NumPy, SciPy)",
  "MATLAB",
  "Julia",

  // 📡 Infra
  "SQL",
  "T-SQL",
  "PL/SQL",
  "MongoDB Query Language",
  "GraphQL",
  "YAML",
  "JSON",
  "Dockerfile",
  "HCL (Terraform)",
  "Groovy (Jenkins Pipelines)",

  // 🧪 Testing
  "Gherkin (Cucumber)",
  "PHPUnit",
  "Jest",
  "Vitest",
  "Mocha",
  "Chai",
];

const DEVELOPMENT_PRACTICES = [
  "API Design",
  "RESTful APIs",
  "GraphQL",
  "Microservices",
  "Authentication",
  "Authorization",
  "OAuth",
  "JWT",
  "Socket.IO",
  "WebSockets",
];

const VERSION_CONTROL = [
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Git Workflows (feature branching, rebase, etc.)",
];

const QUALITY_ASSURANCE = [
  "Unit Testing",
  "Integration Testing",
  "System Testing",
  "Acceptance Testing",
  "Regression Testing",
  "Smoke Testing",
  "End-to-End Testing",
  "Test-Driven Development (TDD)",
];

const TESTING_TOOLS = [
  "Jest",
  "Mocha",
  "Chai",
  "Cypress",
  "Playwright",
  "Selenium",
  "Vitest",
  "PHPUnit",
  "Postman (test scripts)",
];

const CI_CD = [
  "CI/CD Pipelines",
  "GitHub Actions",
  "GitLab CI",
  "Jenkins",
  "CircleCI",
  "Travis CI",
  "Build Automation",
];

const CONTAINERIZATION = [
  "Docker",
  "Docker Compose",
  "Kubernetes (basics)",
  "Container Registries",
];

const INFRASTRUCTURE = [
  "Infrastructure as Code (IaC)",
  "Terraform",
  "Ansible",
  "AWS",
  "GCP",
  "Azure",
  "Vercel",
  "Netlify",
];

const DEPLOYMENT = [
  "Blue/Green Deployment",
  "Feature Flags",
  "Rollback Strategies",
  "Environment Configuration",
  "Staging/Production Deployment",
];

const MONITORING = [
  "Sentry",
  "New Relic",
  "Datadog",
  "LogRocket",
  "Prometheus",
  "Grafana",
  "Health Checks",
];

const MAINTENANCE = [
  "Bug Fixing",
  "Patch Management",
  "Performance Tuning",
  "Hotfix Deployment",
  "Legacy Code Refactoring",
  "Dependency Updates",
];

const USER_FEEDBACK = [
  "User Analytics",
  "Mixpanel",
  "Amplitude",
  "Customer Support",
  "In-App Surveys",
];

const AGILE_PRACTICES = [
  "Scrum",
  "Kanban",
  "Daily Stand-ups",
  "Sprint Planning",
  "Retrospectives",
  "Agile Estimation",
];

const COMMUNICATION = [
  "Team Collaboration",
  "Technical Documentation",
  "Notion",
  "Slack",
  "MS Teams",
  "Email Etiquette",
];

const TECH_RESEARCH = [
  "Technology Scouting",
  "Feasibility Analysis",
  "Prototyping",
  "Benchmarking",
  "POC Development",
];

export const SkillSet = {
  // 🧠 Planning & Requirements
  REQUIREMENTS,

  // 🏗️ System Design & Architecture
  SYSTEM_DESIGN,
  UI_UX_DESIGN,

  // 💻 Development
  PROGRAMMING_LANGUAGES,
  DEVELOPMENT_PRACTICES,
  VERSION_CONTROL,
  DEV_TOOLS,

  // 🧪 Testing & QA
  QUALITY_ASSURANCE,
  TESTING_TOOLS,

  // 🚀 CI/CD & Deployment
  CI_CD,
  CONTAINERIZATION,
  INFRASTRUCTURE,

  // 📡 Deployment & Monitoring
  DEPLOYMENT,
  MONITORING,

  // 🛠️ Maintenance & Support
  MAINTENANCE,
  USER_FEEDBACK,

  // 🔁 Cross-cutting & Research
  AGILE_PRACTICES,
  COMMUNICATION,
  TECH_RESEARCH,
} as const;

export type SkillCategory = keyof typeof SkillSet;
export type Skill = (typeof SkillSet)[SkillCategory][number];
