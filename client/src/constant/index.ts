import { SkillCategoryKey } from "@/constants/skills.constants";

export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const Permissions = {
  // Workspace permissions
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",

  // Member permissions
  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",

  // Project permissions
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CHANGE_PROJECT_STATUS: "CHANGE_PROJECT_STATUS",

  // Task permissions
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",

  // User profile permissions
  UPDATE_OWN_PASSWORD: "UPDATE_OWN_PASSWORD",
  MANAGE_OWN_SKILLS: "MANAGE_OWN_SKILLS",
  MANAGE_USER_SKILL_LEVEL: "MANAGE_USER_SKILL_LEVEL",
  MANAGE_USER_PROFILES: "MANAGE_USER_PROFILES",

  // General permissions
  VIEW_ONLY: "VIEW_ONLY",
  UPDATE_ASSIGNED_TASKS: "UPDATE_ASSIGNED_TASKS",
} as const;

export const SkillCategory = {
  // Technical Skills
  FRONTEND: "FRONTEND",
  BACKEND: "BACKEND",
  MOBILE: "MOBILE",
  DEVOPS: "DEVOPS",
  DATABASE: "DATABASE",
  TESTING: "TESTING",
  SECURITY: "SECURITY",

  // Design Skills
  UI_UX: "UI_UX",
  GRAPHIC_DESIGN: "GRAPHIC_DESIGN",
  PRODUCT_DESIGN: "PRODUCT_DESIGN",

  // Management Skills
  PROJECT_MANAGEMENT: "PROJECT_MANAGEMENT",
  TEAM_LEADERSHIP: "TEAM_LEADERSHIP",
  PRODUCT_MANAGEMENT: "PRODUCT_MANAGEMENT",

  // Business Skills
  BUSINESS_ANALYSIS: "BUSINESS_ANALYSIS",
  MARKETING: "MARKETING",
  SALES: "SALES",

  // Data Skills
  DATA_ANALYSIS: "DATA_ANALYSIS",
  DATA_SCIENCE: "DATA_SCIENCE",
  MACHINE_LEARNING: "MACHINE_LEARNING",

  // Other
  COMMUNICATION: "COMMUNICATION",
  RESEARCH: "RESEARCH",
  DOCUMENTATION: "DOCUMENTATION",
} as const;

export const SkillProficiency = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
  EXPERT: "EXPERT",
} as const;

export const PREDEFINED_SKILLS: Record<SkillCategoryKey, string[]> = {
  PROJECT_MANAGEMENT: [
    "Agile/Scrum",
    "Kanban",
    "Waterfall",
    "JIRA",
    "Trello",
    "Asana",
    "Monday.com",
    "Microsoft Project",
    "Risk Management",
    "Budget Planning",
    "Team Leadership",
    "Stakeholder Management",
  ],

  DESIGN: [
    "UI/UX Design",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "InVision",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Design Systems",
    "Accessibility Design",
  ],

  FRONTEND: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Angular",
    "Next.js",
    "Nuxt.js",
    "Svelte",
    "jQuery",
    "Bootstrap",
    "Tailwind CSS",
    "SASS/SCSS",
    "Webpack",
    "Vite",
    "Redux",
    "MobX",
    "GraphQL",
    "REST APIs",
  ],

  BACKEND: [
    "Node.js",
    "Python",
    "Java",
    "C#",
    "C++",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "Kotlin",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "ASP.NET",
    "Laravel",
    "Ruby on Rails",
    "FastAPI",
    "Microservices",
    "API Development",
    "GraphQL",
    "gRPC",
  ],

  QA_TESTING: [
    "Manual Testing",
    "Automated Testing",
    "Unit Testing",
    "Integration Testing",
    "End-to-End Testing",
    "Performance Testing",
    "Security Testing",
    "Jest",
    "Cypress",
    "Selenium",
    "Playwright",
    "TestNG",
    "JUnit",
    "Postman",
    "Load Testing",
    "Bug Tracking",
    "Test Planning",
    "Quality Assurance",
  ],

  MOBILE_DEVELOPMENT: [
    "React Native",
    "Flutter",
    "Swift",
    "Kotlin",
    "Java (Android)",
    "Objective-C",
    "Xamarin",
    "Ionic",
    "PhoneGap/Cordova",
    "Android Studio",
    "Xcode",
    "App Store Optimization",
    "Mobile UI/UX",
    "Push Notifications",
    "In-App Purchases",
    "Mobile Security",
  ],

  DEVOPS: [
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitLab CI/CD",
    "GitHub Actions",
    "Terraform",
    "Ansible",
    "Chef",
    "Puppet",
    "Vagrant",
    "Linux/Unix",
    "Shell Scripting",
    "Monitoring & Logging",
    "Infrastructure as Code",
    "Container Orchestration",
    "CI/CD Pipelines",
  ],

  DATA_SCIENCE: [
    "Python",
    "R",
    "SQL",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Jupyter Notebooks",
    "Data Visualization",
    "Statistical Analysis",
    "Data Mining",
    "ETL Processes",
    "Apache Spark",
    "Hadoop",
    "Tableau",
    "Power BI",
    "Excel",
    "Data Warehousing",
  ],

  CYBERSECURITY: [
    "Network Security",
    "Penetration Testing",
    "Vulnerability Assessment",
    "Security Auditing",
    "Ethical Hacking",
    "Firewall Management",
    "Incident Response",
    "Risk Assessment",
    "Compliance (GDPR, HIPAA)",
    "Encryption",
    "Identity Management",
    "Security Frameworks",
    "Malware Analysis",
    "Digital Forensics",
  ],

  DATABASE: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "Oracle",
    "SQL Server",
    "SQLite",
    "Cassandra",
    "DynamoDB",
    "Firebase",
    "Database Design",
    "Query Optimization",
    "Data Modeling",
    "Backup & Recovery",
    "Database Administration",
  ],

  CLOUD_COMPUTING: [
    "Amazon Web Services (AWS)",
    "Microsoft Azure",
    "Google Cloud Platform",
    "AWS Lambda",
    "Azure Functions",
    "Google Cloud Functions",
    "EC2",
    "S3",
    "CloudFormation",
    "Azure Resource Manager",
    "Cloud Architecture",
    "Serverless Computing",
    "Cloud Security",
    "Cost Optimization",
  ],

  AI_ML: [
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",
    "Computer Vision",
    "Natural Language Processing",
    "Reinforcement Learning",
    "MLOps",
    "Model Deployment",
    "Feature Engineering",
    "Algorithm Development",
    "OpenAI APIs",
    "Hugging Face",
  ],
};

export type PermissionType = keyof typeof Permissions;
