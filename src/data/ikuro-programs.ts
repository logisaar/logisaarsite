// TechXera programmes (moved from the old IKURO page). TODO(owner): confirm these programmes are still offered.
export interface SyllabusModule {
  title: string;
  items: string[];
}

export interface SyllabusPhase {
  title: string;
  modules: SyllabusModule[];
}

export interface AIComparisonRow {
  traditional: string;
  aiAssisted: string;
}

export interface Course {
  title: string;
  iconName: string;
  categories: string[];
  description: string;
  duration: string;
  sessions: string;
  hours: string;
  price: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  projectsCount: string;
  skills: string[];
  benefits: string[];
  outcome: string;

  // Detailed Syllabus
  phases: SyllabusPhase[];
  toolsCovered: {
    development: string[];
    ai: string[];
  };
  portfolioPrep: string[];
  aiComparison: AIComparisonRow[];
  projectsList: string[];
}

// 12 Flagship Courses Data with pricing and all syllabus details
export const coursesData: Course[] = [
  {
    title: "Full Stack Web Development with AI",
    iconName: "Laptop",
    categories: ["development", "ai"],
    description: "Become a job-ready full stack developer — build modern React/Node web applications 5–10× faster with AI as your engineering partner. (College batch note: Priced and paced for direct-to-student / professional-bootcamp delivery).",
    duration: "2.5 Months",
    sessions: "30 Sessions",
    hours: "60 Hours",
    price: "₹6,999",
    difficulty: "Intermediate",
    projectsCount: "10+ Projects",
    skills: ["React.js", "Next.js", "Node.js", "MongoDB", "Cursor AI", "Tailwind CSS"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Full Stack Developer, AI Software Engineer",
    toolsCovered: {
      development: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "Express.js", "REST APIs", "GraphQL", "MongoDB", "MySQL", "PostgreSQL", "Prisma", "Mongoose", "Git", "GitHub", "Docker", "Vercel", "Netlify", "Render"],
      ai: ["ChatGPT", "GitHub Copilot", "Cursor AI", "Claude Code", "Windsurf", "v0.dev", "Bolt.new", "Lovable", "Galileo AI", "CodeRabbit"]
    },
    portfolioPrep: [
      "Build Applications up to 5–10× Faster with AI",
      "Generate Production-Ready Boilerplate in Minutes",
      "Debug Errors Instantly with AI Assistance",
      "Create UI Components from Simple Prompts",
      "Auto-Generate Documentation & API Specifications",
      "Write Better Tests with AI",
      "Improve Code Quality through AI-Powered Reviews",
      "Focus on Architecture, Problem-Solving & Business Logic"
    ],
    aiComparison: [
      { traditional: "Writing responsive CSS layouts manually takes 10-15 hours", aiAssisted: "v0.dev or Lovable generates layouts instantly; customize in Cursor" },
      { traditional: "Setting up database schemas, APIs, and auth takes 3-4 days", aiAssisted: "AI scaffolds API endpoints and database schemas in minutes" },
      { traditional: "Debugging complex database queries and async state bugs takes hours", aiAssisted: "AI isolates trace logs, explains root cause, and provides patch suggestions instantly" }
    ],
    projectsList: [
      "AI-Powered E-Commerce Platform",
      "Task Management System",
      "Learning Management System",
      "Chat Application",
      "AI Blog CMS",
      "Portfolio Website",
      "CRM Dashboard",
      "Admin Panel",
      "Authentication System",
      "Real-Time Collaboration App"
    ],
    phases: [
      {
        title: "PHASE 1 — Full Stack Development Fundamentals",
        modules: [
          { title: "Module 1: Web Development Foundations", items: ["HTML5 — Semantic Structure, Forms & Validation, Accessibility (ARIA, Alt Text), SEO Best Practices", "CSS3 — Flexbox & Grid, Responsive Design, Media Queries, Animations & Transitions, CSS Variables", "SASS / SCSS — Variables, Mixins, Nesting, Modular Styling", "JavaScript (ES6+) — Variables, Functions & Arrow Functions, Objects & Arrays, Destructuring, Spread & Rest Operators, Closures, Higher-Order Functions, Async/Await, Promises, Event Loop, DOM Manipulation, Event Delegation", "Git & GitHub — Version Control, Branching & Merging, Pull Requests, Conflict Resolution, GitHub Workflow"] },
          { title: "Module 2: Modern Frontend Development", items: ["React.js — Components, JSX, Props & State, Hooks, Custom Hooks, Component Composition", "Next.js — File-Based Routing, SSR, SSG, ISR, API Routes, Middleware", "State Management — Context API, Redux Toolkit, Zustand", "Forms & APIs — React Hook Form, Validation, REST API Integration, Axios & Fetch", "TypeScript — Types, Interfaces, Props, API Response Typing", "Tailwind CSS — Installation & Configuration, Utility-First Workflow, Responsive Design, Dark Mode, Custom Themes, Reusable Components", "UI Libraries — shadcn/ui, DaisyUI"] },
          { title: "Module 3: Backend Development", items: ["Node.js — Runtime Environment, Event Loop, Async Programming", "Express.js — Routing, Middleware, Authentication, Error Handling, File Uploads", "Authentication — JWT, Sessions, Cookies, OAuth Basics", "API Development — REST APIs, CRUD Operations, Pagination, API Versioning", "GraphQL — Introduction, Queries, Mutations, Schema Basics", "Real-Time Applications — WebSockets, Live Chat, Notifications"] },
          { title: "Module 4: Database Development", items: ["MongoDB — CRUD Operations, Schema Design, Aggregation Pipeline, Indexing", "SQL Databases (MySQL / PostgreSQL) — Joins, Transactions, Indexing, Subqueries", "Database Design — Normalization, Relationships, Data Modeling", "ORM — Mongoose, Prisma, Sequelize"] },
          { title: "Module 5: Testing & Deployment", items: ["Testing — Jest Fundamentals, Cypress, Playwright, Unit Testing, End-to-End Testing", "Deployment — Vercel, Netlify, Render", "DevOps Basics — Docker, Environment Variables, Build & Deployment Process"] },
          { title: "Module 6: Problem Solving & Debugging", items: ["Manual Code Tracing, Logic Building, Algorithm Writing", "Browser DevTools, Performance Debugging", "Error Analysis, Stack Trace Reading"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Development",
        modules: [
          { title: "Module 7: AI-Assisted Coding", items: ["AI Coding Assistants — GitHub Copilot, Cursor AI, Claude Code, Windsurf, ChatGPT", "AI Prompt Engineering — Generate Components, Create REST APIs, Build Boilerplates, Database Models, Refactor Existing Code", "AI Website Builders — v0.dev, Bolt.new, Lovable, Replit AI"] },
          { title: "Module 8: AI Debugging & Testing", items: ["AI Error Analysis", "AI Code Reviews", "AI Bug Fixing", "AI Test Case Generation", "AI Unit Testing", "Cypress & Playwright Test Generation"] },
          { title: "Module 9: AI Architecture & Documentation", items: ["Generate README Files", "API Documentation (OpenAPI / Swagger)", "System Design", "Database Schema Design", "Component Planning", "UI Wireframes with AI"] },
          { title: "Module 10: AI Productivity Workflow", items: ["AI Pair Programming", "Multi-File Editing", "Code Optimization", "Performance Suggestions", "Security Review", "Documentation Automation", "Deployment Automation"] }
        ]
      },
      {
        title: "PHASE 3 — Capstone Projects",
        modules: [
          {
            title: "Capstone Industry Portfolio Projects",
            items: [
              "AI-Powered E-Commerce Platform",
              "Task Management System & CRM Dashboard",
              "Learning Management System",
              "Chat Application & Real-Time Collaboration App",
              "AI Blog CMS & Portfolio Website",
              "Authentication System & Admin Panel"
            ]
          }
        ]
      }
    ]
  },
  {
    title: "AI Powered App Development",
    iconName: "Smartphone",
    categories: ["development"],
    description: "Build and compile cross-platform mobile apps for iOS & Android utilizing AI prompting and generation workflows.",
    duration: "3.5 Months",
    sessions: "45 Sessions",
    hours: "90 Hours",
    price: "₹7,999",
    difficulty: "Intermediate",
    projectsCount: "6+ Projects",
    skills: ["React Native", "Expo", "Bolt.new", "AI APIs"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Mobile App Developer, Freelance Coder",
    toolsCovered: {
      development: ["Flutter", "Dart", "Android Studio", "VS Code", "Firebase", "Git & GitHub"],
      ai: ["ChatGPT", "Claude", "Cursor AI", "GitHub Copilot", "Windsurf", "Galileo AI", "Uizard", "Figma AI", "Canva AI"]
    },
    portfolioPrep: [
      "Build 6+ Production-Ready Mobile Apps",
      "Publish an App on the Google Play Store",
      "Resume & Portfolio Development",
      "GitHub Portfolio Optimization",
      "LinkedIn Profile Enhancement",
      "Freelancing on Fiverr & Upwork",
      "Interview Preparation",
      "Mobile App Development Career Roadmap"
    ],
    aiComparison: [
      { traditional: "Creating one UI screen can take 6–8 hours", aiAssisted: "Generate a working UI in minutes and refine it" },
      { traditional: "Writing repetitive boilerplate code manually", aiAssisted: "AI generates reusable code instantly" },
      { traditional: "Manual debugging takes hours", aiAssisted: "AI identifies bugs and suggests fixes in seconds" },
      { traditional: "Designing app icons and assets requires a designer", aiAssisted: "AI generates professional assets instantly" },
      { traditional: "Writing App Store listings manually", aiAssisted: "AI creates optimized ASO content within minutes" },
      { traditional: "Testing every workflow manually", aiAssisted: "AI assists in automated testing and performance analysis" },
      { traditional: "Building 1–2 portfolio apps during a course", aiAssisted: "Build 5–6 production-ready projects in the same duration" }
    ],
    projectsList: [
      "Personal Expense Tracker",
      "Food Delivery App",
      "E-Commerce App",
      "AI Chat Application",
      "Real-Time Chat App",
      "Capstone Industry Project"
    ],
    phases: [
      {
        title: "PHASE 1 — Mobile App Development Foundations",
        modules: [
          { title: "Module 1: Programming Essentials", items: ["Introduction to Mobile App Development", "Dart Programming Fundamentals", "Object-Oriented Programming (OOP)", "Variables, Functions, Collections & Null Safety", "Async Programming (Future, Streams & async/await)", "Git & GitHub for Version Control"] },
          { title: "Module 2: Flutter Development", items: ["Flutter Project Structure", "Widgets & Widget Tree", "Layouts & Responsive Design", "Navigation & Routing", "Forms & Input Validation", "Custom Widgets & Reusable Components", "Animations & UI Effects"] },
          { title: "Module 3: Modern UI/UX Design", items: ["UI/UX Design Principles", "Figma Fundamentals", "Design Systems", "Material Design 3", "Responsive Mobile Design", "Dark Mode & Theme Management", "Accessibility Best Practices"] },
          { title: "Module 4: State Management", items: ["State Management Fundamentals", "Provider", "Riverpod", "Bloc Architecture (Introduction)", "Clean Architecture Basics", "MVVM Pattern"] },
          { title: "Module 5: Backend Integration", items: ["REST API Integration", "JSON Parsing", "Authentication (JWT & Firebase Auth)", "Firebase Firestore", "Cloud Storage", "Push Notifications", "Secure Local Storage (Shared Preferences, Hive Database)"] },
          { title: "Module 6: Performance & Deployment", items: ["App Optimization", "Error Handling", "Debugging Techniques", "Testing on Real Devices", "Build APK & AAB", "App Signing", "Play Store Publishing", "App Store Submission Process", "Version Management"] }
        ]
      },
      {
        title: "PHASE 2 — AI Powered Mobile Development",
        modules: [
          { title: "Module 7: AI-Assisted Development", items: ["AI Coding Assistants (ChatGPT, Claude, Cursor AI, GitHub Copilot, Windsurf)", "AI Workflow & Prompt Engineering for Developers", "AI Pair Programming & Debugging", "AI Code Refactoring & Documentation", "AI Unit Test Generation"] },
          { title: "Module 8: AI-Powered UI Design", items: ["Generate complete app UI from prompts", "AI Wireframe Generation", "AI to Flutter Code Conversion", "AI Design Systems & Auto Theme Generation", "AI Icon, Color Palette & Illustration Tools (Galileo AI, Uizard, Figma AI, Canva AI)"] },
          { title: "Module 9: AI for Backend & APIs", items: ["Generate REST APIs using AI", "AI Database Design & SQL Generation", "AI Firebase Security Rules", "AI API Documentation & Postman Collection Generation"] },
          { title: "Module 10: AI Testing & Optimization", items: ["AI Bug Detection & Crash Analysis", "AI Performance Optimization", "AI Accessibility Testing", "AI Security Suggestions & Memory Leak Detection", "AI Code Review"] },
          { title: "Module 11: AI for Publishing & Marketing", items: ["AI App Store Optimization (ASO)", "AI App Name Generation & Description Writing", "AI Keyword Research & Screenshot Generation", "AI Promotional Banner & Demo Video Creation", "AI Social Media Marketing"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Guided Real-World Builds", items: ["Interactive Expense trackers", "Dynamic e-commerce cart layouts", "WebSocket real-time chat nodes", "AI prompt integration pipelines"] }
        ]
      }
    ]
  },
  {
    title: "Cybersecurity with AI",
    iconName: "Shield",
    categories: ["ai"],
    description: "Analyze code vulnerabilities and automate network threat detection using customized local AI security configurations.",
    duration: "3.15 Months",
    sessions: "38 Sessions",
    hours: "76 Hours",
    price: "₹6,999",
    difficulty: "Advanced",
    projectsCount: "6+ Projects",
    skills: ["AI Threat Modeling", "Vulnerability Analysis", "Local LLM Audits"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Cyber Security Analyst, DevSecOps Specialist",
    toolsCovered: {
      development: ["Kali Linux", "Nmap", "Wireshark", "Burp Suite Community Edition", "Metasploit (Introduction)", "OpenVAS (Overview)"],
      ai: ["ChatGPT", "Claude", "Gemini", "Microsoft Security Copilot (Overview)", "Splunk AI Assistant (Overview)"]
    },
    portfolioPrep: [
      "Build 6 Practical Cybersecurity Projects",
      "Learn Industry Security Workflows",
      "Create Professional Security Reports",
      "Resume & LinkedIn Optimization",
      "GitHub Portfolio Development",
      "SOC Analyst Interview Preparation",
      "Fundamentals for Security+, CEH & Cloud Security Learning Paths"
    ],
    aiComparison: [
      { traditional: "Reviewing thousands of log entries manually", aiAssisted: "AI summarizes suspicious events and highlights anomalies within minutes" },
      { traditional: "Reading lengthy CVE advisories", aiAssisted: "AI explains vulnerabilities in plain language and suggests mitigation steps" },
      { traditional: "Writing incident reports from scratch", aiAssisted: "AI generates structured reports that analysts can verify and refine" },
      { traditional: "Investigating related security alerts manually", aiAssisted: "AI correlates events across multiple sources to speed up triage" },
      { traditional: "Researching threats across multiple websites", aiAssisted: "AI consolidates threat intelligence into concise, actionable summaries" },
      { traditional: "Creating compliance documentation manually", aiAssisted: "AI drafts audit-ready documentation, reducing repetitive work" }
    ],
    projectsList: [
      "Network Security Monitoring Dashboard",
      "Log Analysis & Threat Detection System",
      "Website Security Assessment Report",
      "Phishing Email Detection Assistant",
      "Security Incident Response Simulation",
      "AI-Powered SOC Analyst Dashboard"
    ],
    phases: [
      {
        title: "PHASE 1 — Cybersecurity Foundations",
        modules: [
          { title: "Module 1: Networking & Operating Systems", items: ["Introduction to Cybersecurity", "TCP/IP, DNS & Network Fundamentals", "HTTP/HTTPS, SSH, FTP & Secure Communication", "Firewalls, VPNs & Network Segmentation", "Linux Command Line Essentials", "Windows & Linux Security Fundamentals", "Virtual Machines & Safe Lab Environment"] },
          { title: "Module 2: Security Fundamentals", items: ["CIA Triad", "Authentication & Authorization", "Identity & Access Management (IAM)", "Multi-Factor Authentication (MFA)", "Password Security & Best Practices", "Zero Trust Security Model", "Security Policies & Risk Management"] },
          { title: "Module 3: Cryptography & Web Security", items: ["Encryption Fundamentals", "Symmetric vs Asymmetric Encryption", "Hashing & Digital Signatures", "SSL/TLS & HTTPS", "Secure API Basics", "Introduction to Secure Coding Practices"] },
          { title: "Module 4: Web & Cloud Security", items: ["OWASP Top 10 Overview", "SQL Injection (Concepts & Prevention)", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery (CSRF)", "Authentication & Session Security", "Cloud Security Fundamentals", "AWS & Azure Shared Responsibility Model"] },
          { title: "Module 5: Security Tools & Monitoring", items: ["Nmap Fundamentals", "Wireshark Packet Analysis", "Burp Suite (Basic Security Testing)", "Kali Linux Overview", "Vulnerability Assessment Basics", "Log Analysis Fundamentals", "Security Information & Event Management (SIEM) Introduction"] },
          { title: "Module 6: Incident Response", items: ["Security Incident Lifecycle", "Threat Detection Fundamentals", "Malware & Phishing Awareness", "Digital Forensics Basics", "Security Reporting", "Compliance & Documentation"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Cybersecurity",
        modules: [
          { title: "Module 7: AI Security Assistants", items: ["AI Tools: ChatGPT, Claude, Gemini, Security Copilot, Splunk AI", "Prompt Engineering for Security Analysts", "AI-Assisted Threat Analysis & Security Research", "AI Documentation & Report Writing"] },
          { title: "Module 8: AI for Security Operations", items: ["AI Log Analysis & Alert Prioritization", "AI Threat Intelligence Summarization", "AI IOC (Indicators of Compromise) Analysis", "AI Security Event Correlation & Risk Assessment"] },
          { title: "Module 9: AI for Vulnerability Management", items: ["AI Vulnerability Report Analysis", "AI CVE Explanation & Prioritization", "AI Patch Recommendation", "AI Security Configuration & Secure Code Review", "AI Compliance Assistance"] },
          { title: "Module 10: AI for Incident Response", items: ["AI-Assisted Incident Investigation", "AI Timeline Reconstruction & Root Cause Analysis", "AI Incident Report & Executive Summary Generation", "AI Security Documentation"] },
          { title: "Module 11: AI for Security Career Growth", items: ["Resume Optimization with AI", "AI Interview Preparation & Certification study help", "Building a Cybersecurity Portfolio", "AI-Assisted LinkedIn Optimization", "Freelancing & SOC Career Guidance"] }
        ]
      },
      {
        title: "PHASE 3 — Hands-On Security Projects",
        modules: [
          { title: "Module 12: Case Studies & Lab Drills", items: ["Simulating penetration checks", "Analyzing network captures dynamically", "Drafting system patches with secure model prompts"] }
        ]
      }
    ]
  },
  {
    title: "AI & Agent Engineering",
    iconName: "Cpu",
    categories: ["ai"],
    description: "Design, program, and wire autonomous multi-agent systems and custom LLM functions to execute complex business pipelines.",
    duration: "3 Months",
    sessions: "36 Sessions",
    hours: "72 Hours",
    price: "₹5,999",
    difficulty: "Advanced",
    projectsCount: "6+ Projects",
    skills: ["Python", "CrewAI", "LangGraph", "Vector DBs"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Agentic Systems Architect, AI Specialist",
    toolsCovered: {
      development: ["Python", "Git & GitHub", "Postman", "VS Code", "n8n", "Zapier", "Make", "Chroma", "Pinecone", "Weaviate (Overview)", "React", "Tailwind CSS"],
      ai: ["OpenAI", "Anthropic Claude", "Google Gemini", "Grok (Overview)", "LangChain", "LangGraph", "CrewAI", "OpenAI Agents SDK", "Claude Agent SDK"]
    },
    portfolioPrep: [
      "Build 6 Production-Ready AI Agents",
      "Create an AI Engineering Portfolio",
      "GitHub Project Showcase",
      "Resume & LinkedIn Optimization",
      "AI Engineer Interview Preparation",
      "Freelancing & AI Automation Services",
      "AI Startup & SaaS Development Roadmap"
    ],
    aiComparison: [
      { traditional: "Rule-based scripts require predefined logic for every scenario", aiAssisted: "AI agents can interpret intent, reason about tasks, and adapt to changing inputs" },
      { traditional: "Integrating multiple business tools often requires custom code", aiAssisted: "AI agents use APIs, MCP, and automation platforms to connect systems with less manual effort" },
      { traditional: "Building a chatbot from scratch takes significant development effort", aiAssisted: "Modern agent frameworks provide reusable building blocks for conversational assistants" },
      { traditional: "Processing large document collections manually is slow", aiAssisted: "RAG enables agents to retrieve relevant knowledge and answer questions from custom data sources" },
      { traditional: "Creating separate automation scripts for each workflow", aiAssisted: "A single AI agent can orchestrate multiple tools and workflows while remaining configurable" },
      { traditional: "Maintaining business automations is largely manual", aiAssisted: "AI-assisted monitoring, evaluation, and optimization help improve agent reliability over time" }
    ],
    projectsList: [
      "AI Customer Support Agent",
      "AI Research Assistant",
      "Document Analysis & Q&A Agent",
      "AI Sales & CRM Assistant",
      "Multi-Agent Business Automation System",
      "Enterprise AI Assistant with MCP & RAG"
    ],
    phases: [
      {
        title: "PHASE 1 — AI & Agent Development Foundations",
        modules: [
          { title: "Module 1: Python for AI Development", items: ["Python Fundamentals", "Functions & Modules", "Object-Oriented Programming", "Exception Handling", "File Handling", "Virtual Environments", "Package Management (pip & uv)", "Git & GitHub Essentials"] },
          { title: "Module 2: APIs & Integrations", items: ["REST APIs", "JSON & Data Exchange", "Authentication (API Keys & OAuth Basics)", "Webhooks", "HTTP Requests", "Environment Variables", "API Testing with Postman"] },
          { title: "Module 3: Generative AI Fundamentals", items: ["Evolution of Artificial Intelligence", "Large Language Models (LLMs)", "Tokens & Context Windows", "Embeddings", "Vector Search Concepts", "Model Selection & Comparison", "Hallucinations & AI Limitations", "AI Ethics & Responsible AI"] },
          { title: "Module 4: Prompt Engineering", items: ["Prompt Design Principles", "Zero-Shot Prompting", "Few-Shot Prompting", "Role Prompting", "Structured Outputs", "Prompt Chaining", "Output Evaluation", "Prompt Optimization Techniques"] },
          { title: "Module 5: Knowledge Retrieval", items: ["Retrieval-Augmented Generation (RAG)", "Chunking Strategies", "Embeddings", "Vector Databases", "Semantic Search", "Knowledge Base Design", "Document Processing", "RAG Evaluation"] },
          { title: "Module 6: AI Agent Fundamentals", items: ["What is an AI Agent?", "Agent Architecture", "Planning & Reasoning", "Tool Calling", "Memory Systems", "Agent Communication", "Human-in-the-loop Design", "AI Safety & Guardrails"] }
        ]
      },
      {
        title: "PHASE 2 — Building Production AI Agents",
        modules: [
          { title: "Module 7: Agent Frameworks", items: ["LangChain Fundamentals", "LangGraph", "CrewAI", "AutoGen (Overview)", "OpenAI Agents SDK", "Claude Agent SDK", "Framework Comparison & Selection"] },
          { title: "Module 8: Multi-Agent Systems", items: ["Multi-Agent Collaboration", "Workflow Orchestration", "Supervisor & Worker Patterns", "Sequential & Parallel Agents", "Agent Handoffs", "Event-Driven Agent Workflows", "Autonomous Task Execution"] },
          { title: "Module 9: Agent Integrations", items: ["Model Context Protocol (MCP)", "External Tool Integration", "Database Connectivity", "Email & Calendar Automation", "Slack & Discord Bots", "CRM & Business Software Integration", "Web Scraping & Data Collection", "API-Based Business Automation"] },
          { title: "Module 10: AI Automation", items: ["n8n for AI Workflows", "Zapier AI", "Make (Integromat)", "Workflow Automation", "AI Business Process Automation", "AI Scheduling & Notifications", "AI Data Pipelines"] },
          { title: "Module 11: Deployment & Monitoring", items: ["Deploying AI Agents", "Building REST APIs", "Chat Interfaces", "Agent Dashboards with React & Tailwind CSS", "Logging & Monitoring", "Cost Optimization", "Performance Evaluation", "Production Best Practices"] }
        ]
      },
      {
        title: "PHASE 3 — Real-World AI Agent Projects",
        modules: [
          { title: "Module 12: Guided Capstone Workflows", items: ["AI Customer Support Agent development", "AI Research Assistant setup", "Document Analysis & Q&A Agent integration", "AI Sales & CRM Assistant builds", "Multi-Agent Business Automation Systems", "Enterprise AI Assistant deployments with MCP & RAG"] }
        ]
      }
    ]
  },
  {
    title: "Data Analytics & Business Intelligence",
    iconName: "BarChart3",
    categories: ["business"],
    description: "Extract databases, automate predictive trends, and generate custom report graphics using AI analytics plugins.",
    duration: "3 Months",
    sessions: "36 Sessions",
    hours: "72 Hours",
    price: "₹5,999",
    difficulty: "Beginner",
    projectsCount: "6+ Projects",
    skills: ["SQL", "Power BI", "AI Data Analytics", "Python"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Business Intelligence Analyst, Data Strategist",
    toolsCovered: {
      development: ["Microsoft Excel", "SQL", "Python", "Power BI", "Tableau (Overview)", "Pandas", "NumPy", "Matplotlib"],
      ai: ["ChatGPT", "Advanced Data Analysis", "Julius AI", "Microsoft Copilot for Excel", "Power BI Copilot (Overview)", "NotebookLM (Overview)"]
    },
    portfolioPrep: [
      "Build 6 Portfolio-Ready Analytics Projects",
      "Create Interactive Business Dashboards",
      "GitHub Portfolio Development",
      "Resume & LinkedIn Optimization",
      "Data Analyst Interview Preparation",
      "Business Case Study Practice",
      "Freelancing & BI Consulting Roadmap"
    ],
    aiComparison: [
      { traditional: "Cleaning large datasets requires significant manual effort", aiAssisted: "AI detects missing values, duplicates, and anomalies, helping analysts prepare data faster" },
      { traditional: "Writing complex SQL queries manually", aiAssisted: "AI converts natural language questions into SQL that analysts can review and refine" },
      { traditional: "Exploring data requires multiple manual iterations", aiAssisted: "AI surfaces trends, correlations, and anomalies to accelerate exploratory analysis" },
      { traditional: "Building dashboards involves repeated design decisions", aiAssisted: "AI suggests visualizations, layouts, and narrative summaries for business reporting" },
      { traditional: "Preparing executive reports is time-consuming", aiAssisted: "AI drafts business summaries and presentations that analysts can validate and customize" },
      { traditional: "Forecasting often requires manual experimentation", aiAssisted: "AI assists with trend analysis and predictive forecasting to support business decisions" }
    ],
    projectsList: [
      "Sales Performance Dashboard",
      "E-Commerce Business Analytics Dashboard",
      "HR Analytics & Attrition Dashboard",
      "Financial Performance Dashboard",
      "Marketing Campaign Analytics",
      "Executive Business Intelligence Dashboard with AI Insights"
    ],
    phases: [
      {
        title: "PHASE 1 — Data Analytics Foundations",
        modules: [
          { title: "Module 1: Data Fundamentals", items: ["Introduction to Data Analytics", "Data Types & Data Lifecycle", "Data Collection & Preparation", "Data Cleaning Techniques", "Data Quality & Validation", "Business Metrics & KPIs", "Data Ethics & Privacy"] },
          { title: "Module 2: Microsoft Excel for Analytics", items: ["Excel Fundamentals", "Formulas & Functions", "Lookup Functions (XLOOKUP, INDEX/MATCH)", "Pivot Tables & Pivot Charts", "Conditional Formatting", "Data Cleaning in Excel", "What-If Analysis", "Dashboard Creation"] },
          { title: "Module 3: SQL for Data Analysis", items: ["Database Fundamentals", "SQL Queries", "Filtering & Sorting", "Aggregate Functions", "Joins", "Subqueries", "Window Functions", "Common Table Expressions (CTEs)", "Query Optimization Basics"] },
          { title: "Module 4: Python for Data Analytics", items: ["Python Fundamentals", "NumPy Essentials", "Pandas for Data Wrangling", "Data Cleaning & Transformation", "Exploratory Data Analysis (EDA)", "Data Visualization with Matplotlib", "Business Analytics Workflows"] },
          { title: "Module 5: Business Intelligence", items: ["Introduction to BI", "Power BI Fundamentals", "Data Modeling", "Relationships & Star Schema", "DAX Fundamentals", "Interactive Dashboards", "Data Storytelling", "Dashboard Best Practices"] },
          { title: "Module 6: Statistics for Business", items: ["Descriptive Statistics", "Probability Basics", "Correlation & Regression Concepts", "Trend Analysis", "Forecasting Fundamentals", "Business Decision Making with Data"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Analytics & Business Intelligence",
        modules: [
          { title: "Module 7: AI for Data Preparation", items: ["AI-Assisted Data Cleaning", "Missing Value Detection", "Outlier Identification", "Data Validation", "Automated Data Transformation", "AI Data Profiling"] },
          { title: "Module 8: AI for Data Analysis", items: ["Natural Language to SQL", "AI-Assisted Exploratory Data Analysis", "Automated Insight Generation", "AI-Based Trend Analysis", "Predictive Forecasting", "Business Recommendation Generation"] },
          { title: "Module 9: AI for Dashboards & Reporting", items: ["AI Dashboard Design", "AI Chart Recommendations", "Power BI Copilot (Overview)", "Tableau AI & Tableau Pulse (Overview)", "Executive Summary Generation", "Automated Business Reports", "AI Presentation Creation"] },
          { title: "Module 10: AI Analytics Tools", items: ["ChatGPT for Data Analysis", "Advanced Data Analysis (Python Sandbox)", "Julius AI", "Microsoft Copilot for Excel", "Power BI Copilot (Overview)", "NotebookLM (Overview)"] },
          { title: "Module 11: Business Analytics with AI", items: ["Customer Analytics", "Sales & Revenue Analysis", "Marketing Performance Analytics", "Financial Dashboard Design", "HR Analytics", "Inventory & Operations Analytics", "AI-Assisted Decision Support"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Guided BI Dashboards", items: ["Building sales forecasts", "Constructing attrition prediction graphs", "Creating dynamic financial analysis tabs"] }
        ]
      }
    ]
  },
  {
    title: "Python Full Stack Development",
    iconName: "Binary",
    categories: ["development"],
    description: "Develop secure backend scripts and APIs with Python, supported by advanced automated code-completion modules.",
    duration: "3.5 Months",
    sessions: "45 Sessions",
    hours: "90 Hours",
    price: "₹7,999",
    difficulty: "Intermediate",
    projectsCount: "6+ Projects",
    skills: ["Python", "FastAPI", "Django", "PostgreSQL", "Docker"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Python Backend Developer, Systems Engineer",
    toolsCovered: {
      development: ["Python", "FastAPI", "Django (Overview)", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "PostgreSQL", "SQLAlchemy", "Git & GitHub", "Docker", "Docker Compose", "GitHub Actions (Introduction)"],
      ai: ["ChatGPT", "Claude", "Cursor AI", "GitHub Copilot", "Windsurf"]
    },
    portfolioPrep: [
      "Build 6 Production-Ready Full Stack Projects",
      "GitHub Portfolio Development",
      "Resume & LinkedIn Optimization",
      "Backend Developer Interview Preparation",
      "API Development Best Practices",
      "Freelancing & SaaS Development Roadmap"
    ],
    aiComparison: [
      { traditional: "Creating project structures and boilerplate manually", aiAssisted: "AI generates well-organized application scaffolds, allowing developers to focus on business logic" },
      { traditional: "Writing repetitive CRUD APIs by hand", aiAssisted: "AI produces API endpoints, validation models, and documentation that developers can review and refine" },
      { traditional: "Designing databases through trial and error", aiAssisted: "AI suggests schemas, relationships, and migration strategies based on project requirements" },
      { traditional: "Debugging issues requires extensive manual investigation", aiAssisted: "AI helps explain stack traces, identify root causes, and recommend fixes more quickly" },
      { traditional: "Writing tests and deployment scripts takes additional effort", aiAssisted: "AI assists with unit tests, Docker configurations, and CI/CD workflows while developers verify the output" },
      { traditional: "Maintaining project documentation is often overlooked", aiAssisted: "AI generates API documentation and technical notes, improving collaboration and maintainability" }
    ],
    projectsList: [
      "Personal Portfolio Website with FastAPI Backend",
      "Task & Project Management System",
      "Authentication & User Management API",
      "E-Commerce Backend with Admin Dashboard",
      "Blog CMS with AI Content Assistant",
      "Full Stack SaaS Application with AI Features"
    ],
    phases: [
      {
        title: "PHASE 1 — Python Full Stack Foundations",
        modules: [
          { title: "Module 1: Python Programming", items: ["Python Fundamentals", "Variables, Data Types & Control Flow", "Functions & Modules", "Object-Oriented Programming (OOP)", "Exception Handling", "File Handling", "Virtual Environments", "Package Management (pip & uv)", "Git & GitHub Essentials"] },
          { title: "Module 2: Frontend Development", items: ["HTML5 Fundamentals", "CSS3 Fundamentals", "JavaScript Essentials", "Responsive Web Design", "Tailwind CSS", "Component-Based UI Design", "Forms & Client-Side Validation"] },
          { title: "Module 3: Modern Python Backend", items: ["FastAPI Fundamentals", "Routing & API Design", "Request & Response Models", "Dependency Injection", "Authentication & Authorization (JWT)", "Middleware", "File Uploads", "Background Tasks", "API Documentation with OpenAPI", "Framework Overview: Introduction to Django, Flask, and when to choose each framework."] },
          { title: "Module 4: Databases", items: ["Relational Database Fundamentals", "PostgreSQL", "SQL Essentials", "SQLAlchemy ORM", "Database Relationships", "Migrations", "Query Optimization", "Database Security Basics"] },
          { title: "Module 5: Full Stack Integration", items: ["REST API Integration", "Frontend ↔ Backend Communication", "Authentication Flow", "Environment Variables", "Error Handling", "Project Structure", "Secure Coding Practices"] },
          { title: "Module 6: Deployment & DevOps", items: ["Docker Fundamentals", "Docker Compose", "GitHub Actions (Introduction)", "CI/CD Concepts", "Environment Configuration", "Logging & Monitoring", "Production Deployment Basics"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Full Stack Development",
        modules: [
          { title: "Module 7: AI-Assisted Coding", items: ["Prompt Engineering for Developers", "ChatGPT for Python Development", "Claude for Backend Engineering", "GitHub Copilot", "Cursor AI", "Windsurf", "AI Pair Programming"] },
          { title: "Module 8: AI for Backend Development", items: ["AI API Generation", "AI CRUD Generation", "AI Authentication Implementation", "AI Database Schema Design", "AI API Documentation", "AI Refactoring", "AI Performance Optimization"] },
          { title: "Module 9: AI for Testing & Debugging", items: ["AI Unit Test Generation", "AI API Testing", "AI Debugging", "AI Error Analysis", "AI Security Review", "AI Code Review"] },
          { title: "Module 10: AI for DevOps", items: ["AI Dockerfile Generation", "AI Docker Compose Configuration", "AI CI/CD Workflow Generation", "AI Deployment Assistance", "AI Log Analysis", "AI Monitoring & Optimization"] },
          { title: "Module 11: AI Productivity & Best Practices", items: ["Building with AI Responsibly", "Reviewing AI-Generated Code", "Secure AI-Assisted Development", "Documentation Generation", "Project Planning with AI", "Cost & Performance Optimization"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Advanced Projects Lab", items: ["FastAPI Portfolio Backends", "FastAPI Task Management", "FastAPI User Auth configurations", "Django E-Commerce and Blog platforms", "SaaS AI pipeline integration"] }
        ]
      }
    ]
  },
  {
    title: "Computer Vision & AI",
    iconName: "Eye",
    categories: ["ai"],
    description: "Train and deploy deep-learning object recognition models for custom cameras, scanners, and automated sensors.",
    duration: "3.15 Months",
    sessions: "38 Sessions",
    hours: "76 Hours",
    price: "₹6,999",
    difficulty: "Advanced",
    projectsCount: "6+ Projects",
    skills: ["OpenCV", "YOLO", "PyTorch", "TensorFlow"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Computer Vision Engineer, ML Researcher",
    toolsCovered: {
      development: ["Python", "OpenCV", "NumPy", "Matplotlib", "PyTorch", "TensorFlow (Overview)", "Ultralytics YOLO", "ONNX"],
      ai: ["Roboflow", "Segment Anything Model (SAM)", "Hugging Face Models (Overview)", "ChatGPT", "Claude", "Cursor AI", "GitHub Copilot"]
    },
    portfolioPrep: [
      "Build 6 Computer Vision Projects",
      "Create an AI Vision Portfolio",
      "GitHub Project Showcase",
      "Resume & LinkedIn Optimization",
      "Computer Vision Interview Preparation",
      "Freelancing & AI Vision Solutions",
      "Roadmap to Vision AI & Edge AI Careers"
    ],
    aiComparison: [
      { traditional: "Labeling thousands of images manually is slow and repetitive", aiAssisted: "AI-assisted annotation tools generate labels that developers review and refine, greatly reducing preparation time" },
      { traditional: "Training models from scratch often requires large datasets and significant compute", aiAssisted: "Transfer learning enables developers to adapt pre-trained models to new tasks with less data and faster training" },
      { traditional: "Debugging model training involves interpreting complex logs and metrics", aiAssisted: "AI helps explain training issues, performance bottlenecks, and configuration errors in understandable language" },
      { traditional: "Experimenting with architectures and hyperparameters is time-intensive", aiAssisted: "AI suggests model configurations and tuning strategies to accelerate experimentation" },
      { traditional: "Preparing models for deployment requires multiple optimization steps", aiAssisted: "AI assists with model conversion, optimization, and deployment workflows while engineers validate the results" },
      { traditional: "Building complete vision applications requires integrating several components", aiAssisted: "AI helps generate boilerplate code, documentation, and pipelines so developers can focus on solving real-world problems" }
    ],
    projectsList: [
      "Real-Time Face Detection System",
      "Object Detection with YOLO",
      "AI Attendance System using Face Recognition",
      "License Plate Detection & OCR",
      "Quality Inspection System for Manufacturing",
      "Smart Vision Application with Real-Time Camera Analytics"
    ],
    phases: [
      {
        title: "PHASE 1 — Computer Vision Foundations",
        modules: [
          { title: "Module 1: Python for Computer Vision", items: ["Python Fundamentals", "NumPy Essentials", "Matplotlib for Image Visualization", "File Handling", "Virtual Environments", "Package Management", "Git & GitHub Essentials"] },
          { title: "Module 2: Image Processing with OpenCV", items: ["Introduction to Computer Vision", "Digital Images & Color Spaces", "Image Reading & Display", "Image Transformations", "Image Filtering", "Thresholding", "Edge Detection", "Contours & Shape Detection", "Morphological Operations"] },
          { title: "Module 3: Deep Learning Fundamentals", items: ["Introduction to Deep Learning", "Neural Networks", "Activation Functions", "Loss Functions", "Backpropagation Concepts", "Convolutional Neural Networks (CNNs)", "Model Training & Evaluation", "Overfitting & Regularization"] },
          { title: "Module 4: Modern Computer Vision", items: ["Image Classification", "Object Detection", "Image Segmentation", "Face Detection & Recognition (Concepts)", "Pose Estimation (Overview)", "Optical Character Recognition (OCR)", "Vision Transformers (Introduction)"] },
          { title: "Module 5: Model Training & Transfer Learning", items: ["Dataset Preparation", "Data Annotation", "Data Augmentation", "Transfer Learning", "Model Fine-Tuning", "Performance Metrics", "Model Evaluation", "Experiment Tracking"] },
          { title: "Module 6: Deployment Fundamentals", items: ["ONNX Fundamentals", "TensorFlow Lite (Overview)", "Edge AI Concepts", "Model Optimization", "Real-Time Inference", "Camera Integration", "Deployment Best Practices"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Computer Vision",
        modules: [
          { title: "Module 7: AI Vision Models", items: ["YOLO Fundamentals", "MobileNet", "ResNet", "EfficientNet (Overview)", "Segment Anything Model (SAM)", "Vision-Language Models (Introduction)", "Model Selection & Comparison"] },
          { title: "Module 8: AI-Assisted Development", items: ["AI Code Generation", "AI Pipeline Creation", "AI Data Preprocessing", "AI Model Fine-Tuning", "AI Hyperparameter Suggestions", "AI Experiment Analysis"] },
          { title: "Module 9: AI for Dataset Preparation", items: ["Roboflow", "AI Image Annotation", "Automatic Label Generation", "Dataset Management", "Data Quality Validation", "Synthetic Data Generation (Overview)"] },
          { title: "Module 10: AI for Debugging & Deployment", items: ["AI Training Error Analysis", "AI Performance Optimization", "AI Model Conversion", "AI Deployment Assistance", "AI Documentation", "AI Code Review"] },
          { title: "Module 11: AI Applications in Computer Vision", items: ["Smart Surveillance", "Medical Image Analysis (Overview)", "Industrial Quality Inspection", "OCR & Document Processing", "Retail Analytics", "Autonomous Systems (Introduction)", "AI Vision for Business Automation"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Real-time CV Labs", items: ["YOLO inference setup on custom video streams", "Configuring OCR matching engines", "Training face recognition clusters"] }
        ]
      }
    ]
  },
  {
    title: "Data Science & Machine Learning",
    iconName: "Brain",
    categories: ["ai"],
    description: "Clean datasets, construct predictive ML neural pipelines, and extract insights using advanced ML frameworks.",
    duration: "3.5 Months",
    sessions: "45 Sessions",
    hours: "90 Hours",
    price: "₹7,999",
    difficulty: "Advanced",
    projectsCount: "6+ Projects",
    skills: ["Pandas", "Scikit-Learn", "Neural Networks", "NumPy"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Data Scientist, Machine Learning Engineer",
    toolsCovered: {
      development: ["Python", "NumPy", "Pandas", "Matplotlib", "scikit-learn", "TensorFlow (Overview)", "PyTorch (Overview)", "PyCaret", "H2O.ai (Overview)"],
      ai: ["ChatGPT", "Advanced Data Analysis", "NotebookLM (Overview)", "Cursor AI", "GitHub Copilot"]
    },
    portfolioPrep: [
      "Build 6 Machine Learning Portfolio Projects",
      "GitHub Portfolio Development",
      "Resume & LinkedIn Optimization",
      "Data Science & ML Interview Preparation",
      "Kaggle Workflow Introduction",
      "Freelancing & AI Consulting Roadmap"
    ],
    aiComparison: [
      { traditional: "Exploratory data analysis requires extensive manual coding and visualization", aiAssisted: "AI generates initial analyses, charts, and summaries that data scientists can validate and expand" },
      { traditional: "Feature engineering relies on repeated experimentation", aiAssisted: "AI suggests meaningful features and transformations based on dataset characteristics" },
      { traditional: "Selecting algorithms and tuning parameters can be time-consuming", aiAssisted: "AI recommends suitable models and hyperparameter configurations to accelerate experimentation" },
      { traditional: "Explaining model predictions requires specialized techniques", aiAssisted: "Explainable AI tools help visualize feature importance and improve transparency" },
      { traditional: "Building notebooks and ML pipelines involves repetitive coding", aiAssisted: "AI generates pipeline templates, documentation, and reusable code while developers review the implementation" },
      { traditional: "Debugging model performance often requires extensive investigation", aiAssisted: "AI helps identify potential causes such as data leakage, imbalance, overfitting, or preprocessing issues" }
    ],
    projectsList: [
      "Customer Churn Prediction",
      "House Price Prediction",
      "Sales Forecasting System",
      "Customer Segmentation Dashboard",
      "Fraud Detection Model",
      "End-to-End Machine Learning Pipeline with AI"
    ],
    phases: [
      {
        title: "PHASE 1 — Data Science & Machine Learning Foundations",
        modules: [
          { title: "Module 1: Python for Data Science", items: ["Python Fundamentals", "NumPy for Numerical Computing", "Pandas for Data Manipulation", "Data Cleaning & Transformation", "File Handling", "Virtual Environments", "Git & GitHub Essentials"] },
          { title: "Module 2: Statistics & Data Analysis", items: ["Descriptive Statistics", "Probability Fundamentals", "Data Distributions", "Correlation & Covariance", "Hypothesis Testing (Introduction)", "Feature Relationships", "Business Data Interpretation"] },
          { title: "Module 3: Data Visualization & Exploratory Data Analysis", items: ["Exploratory Data Analysis (EDA)", "Matplotlib Fundamentals", "Data Distribution Analysis", "Trend & Pattern Analysis", "Outlier Detection", "Correlation Analysis", "Data Storytelling"] },
          { title: "Module 4: Machine Learning Fundamentals", items: ["Introduction to Machine Learning", "Supervised Learning", "Unsupervised Learning", "Regression Algorithms", "Classification Algorithms", "Clustering", "Dimensionality Reduction", "Model Selection"] },
          { title: "Module 5: Model Development & Evaluation", items: ["Data Preprocessing", "Feature Engineering", "Training & Testing Datasets", "Cross Validation", "Performance Metrics", "Hyperparameter Tuning", "Model Evaluation", "Model Interpretation"] },
          { title: "Module 6: Introduction to Deep Learning", items: ["Neural Networks", "Activation Functions", "TensorFlow Fundamentals (Overview)", "PyTorch Fundamentals (Overview)", "Transfer Learning Concepts", "AI Model Lifecycle"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Data Science",
        modules: [
          { title: "Module 7: AI for Data Analysis", items: ["AI-Assisted Exploratory Data Analysis", "Automated Data Profiling", "AI Insight Generation", "AI Data Visualization", "Natural Language Data Analysis", "Business Recommendation Generation"] },
          { title: "Module 8: AI for Machine Learning", items: ["AI Feature Engineering", "AI Model Selection", "AI Hyperparameter Optimization", "AI Pipeline Generation", "AI Experiment Tracking", "AutoML Fundamentals"] },
          { title: "Module 9: Explainable AI & Model Optimization", items: ["Explainable AI (XAI)", "SHAP Concepts", "Feature Importance", "Bias & Fairness", "Model Performance Analysis", "AI-Assisted Error Analysis"] },
          { title: "Module 10: AI Productivity Tools", items: ["ChatGPT for Data Science", "Advanced Data Analysis", "PyCaret", "H2O.ai (Overview)", "NotebookLM (Overview)", "AI Notebook Generation"] },
          { title: "Module 11: Deployment & MLOps Fundamentals", items: ["Model Serialization", "API Deployment Concepts", "Model Monitoring", "Version Control for Models", "AI Workflow Automation", "MLOps Overview"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Applied Data Labs", items: ["Churn model evaluations", "Housing prediction models", "Tuning hyper-parameter loops with AI code generation"] }
        ]
      }
    ]
  },
  {
    title: "AI Digital Marketing",
    iconName: "Megaphone",
    categories: ["business"],
    description: "Write high-ranking SEO copywriting, automate graphic generations, and analyze target ads using smart marketing models.",
    duration: "2.5 Months",
    sessions: "30 Sessions",
    hours: "60 Hours",
    price: "₹4,999",
    difficulty: "Beginner",
    projectsCount: "6+ Projects",
    skills: ["SEO Automation", "Midjourney", "Ad Analytics", "ChatGPT"],
    benefits: ["Certification", "Internship Support", "Placement Ready"],
    outcome: "Growth Marketer, Content Strategist",
    toolsCovered: {
      development: ["Google Ads", "Google Analytics 4 (GA4)", "Google Search Console", "Meta Ads Manager", "LinkedIn Campaign Manager (Overview)", "Google Keyword Planner", "SEMrush (Overview)", "Ahrefs (Overview)", "Surfer SEO (Overview)"],
      ai: ["ChatGPT", "Canva AI", "Jasper (Overview)", "Copy.ai (Overview)", "Adobe Firefly", "NotebookLM (Overview)"]
    },
    portfolioPrep: [
      "Build 6 Portfolio-Ready Marketing Projects",
      "Create a Professional Marketing Portfolio",
      "Resume & LinkedIn Optimization",
      "Digital Marketing Interview Preparation",
      "Freelancing & Agency Growth Strategies",
      "Client Acquisition & Proposal Writing",
      "Personal Brand Development"
    ],
    aiComparison: [
      { traditional: "Creating content calendars, blogs, and campaign copy requires significant manual effort", aiAssisted: "AI drafts content, captions, and campaign ideas that marketers can review and tailor to their audience" },
      { traditional: "Keyword research and SEO audits involve analyzing multiple tools and reports", aiAssisted: "AI helps identify keyword opportunities, technical issues, and content improvements more efficiently" },
      { traditional: "Designing marketing assets often requires multiple specialist tools", aiAssisted: "AI accelerates the creation of images, banners, presentations, and promotional materials" },
      { traditional: "Optimizing advertising campaigns depends on repeated manual analysis", aiAssisted: "AI assists in identifying trends, suggesting optimizations, and improving targeting decisions" },
      { traditional: "Responding to customer inquiries and qualifying leads can consume valuable time", aiAssisted: "AI-powered chatbots and automation help handle routine interactions while escalating complex cases" },
      { traditional: "Preparing client reports and presentations is repetitive", aiAssisted: "AI generates summaries, dashboards, and presentation drafts that marketers can validate and customize" }
    ],
    projectsList: [
      "SEO Audit & Website Optimization",
      "Google Ads Campaign Strategy",
      "Complete Social Media Marketing Campaign",
      "Email Marketing Funnel",
      "AI-Powered Brand Growth Strategy",
      "End-to-End Digital Marketing Campaign with AI"
    ],
    phases: [
      {
        title: "PHASE 1 — Digital Marketing Foundations",
        modules: [
          { title: "Module 1: Marketing Fundamentals", items: ["Introduction to Digital Marketing", "Customer Journey & Marketing Funnel", "Brand Positioning", "Target Audience & Buyer Personas", "Market & Competitor Research", "Marketing KPIs & Metrics", "Digital Marketing Strategy"] },
          { title: "Module 2: Search Engine Optimization (SEO)", items: ["Search Engine Fundamentals", "Keyword Research", "On-Page SEO", "Technical SEO Basics", "Off-Page SEO", "Local SEO", "SEO Audit & Best Practices"] },
          { title: "Module 3: Performance Marketing", items: ["Google Ads Fundamentals", "Search & Display Campaigns", "Meta Ads (Facebook & Instagram)", "LinkedIn Ads (Overview)", "YouTube Advertising (Overview)", "Campaign Budgeting", "Conversion Tracking"] },
          { title: "Module 4: Social Media Marketing", items: ["Platform Strategy", "Content Planning", "Content Calendar Creation", "Community Management", "Influencer Marketing Fundamentals", "Short-Form Video Strategy", "Personal Branding"] },
          { title: "Module 5: Content & Email Marketing", items: ["Content Marketing Strategy", "Blog Writing", "Copywriting Fundamentals", "Landing Pages", "Email Marketing", "Marketing Funnels", "Lead Generation"] },
          { title: "Module 6: Analytics & Optimization", items: ["Google Analytics 4 (GA4)", "Google Search Console", "Campaign Performance Analysis", "A/B Testing Fundamentals", "Conversion Rate Optimization (CRO)", "Marketing Dashboards", "ROI Measurement"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Digital Marketing",
        modules: [
          { title: "Module 7: AI Content Creation", items: ["AI Blog Writing", "AI Ad Copy Generation", "AI Social Media Captions", "AI Content Repurposing", "AI Script Writing", "AI Email Copywriting", "AI Prompt Engineering for Marketing"] },
          { title: "Module 8: AI Design & Creative Production", items: ["AI Image Generation", "AI Video Creation", "AI Presentation Design", "AI Banner & Poster Design", "AI Product Mockups", "AI Brand Asset Creation (Canva AI, Adobe Firefly, ChatGPT Image Generation)"] },
          { title: "Module 9: AI for SEO & Advertising", items: ["AI Keyword Research", "AI SEO Audits", "AI Competitor Analysis", "AI Content Optimization", "AI Campaign Optimization & Ad Performance Analysis", "AI A/B Test Suggestions"] },
          { title: "Module 10: AI Marketing Automation", items: ["AI Chatbots & Lead Qualification", "Email Automation", "CRM Integration", "Workflow Automation", "Customer Support Automation"] },
          { title: "Module 11: AI for Business Growth", items: ["AI Marketing Strategy", "AI Customer Insights", "AI Sales Funnel Optimization", "AI Report Generation", "AI Client Presentations", "Freelancing & Agency Workflow"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Guided Campaign Labs", items: ["Setting up local SEO tags with AI", "Configuring target audiences", "Creating dynamic A/B test copies"] }
        ]
      }
    ]
  },
  {
    title: "Video Editing & Content Creation using AI",
    iconName: "Video",
    categories: ["creative"],
    description: "Edit video footage, create custom graphics, and generate professional subtitles using automated timelines.",
    duration: "2 Months",
    sessions: "24 Sessions",
    hours: "48 Hours",
    price: "₹3,999",
    difficulty: "Beginner",
    projectsCount: "6+ Videos",
    skills: ["CapCut AI", "Runway Gen-2", "ElevenLabs", "Premiere Pro"],
    benefits: ["Certification", "Internship Support"],
    outcome: "Content Creator, Digital Video Specialist",
    toolsCovered: {
      development: ["DaVinci Resolve", "Adobe Premiere Pro (Overview)", "CapCut", "Canva", "Adobe Express (Overview)"],
      ai: ["ChatGPT", "Descript", "ElevenLabs", "Runway", "Pika (Overview)", "Sora (Overview)", "CapCut AI"]
    },
    portfolioPrep: [
      "Build 6 Portfolio-Ready Video Projects",
      "Create a Professional Creator Portfolio",
      "Resume & LinkedIn Optimization",
      "Freelancing on Fiverr & Upwork",
      "YouTube & Creator Career Roadmap",
      "Client Communication & Pricing",
      "Content Monetization Strategies"
    ],
    aiComparison: [
      { traditional: "Manually reviewing footage to find the best clips is time-consuming", aiAssisted: "AI identifies scenes, highlights, and key moments, helping editors assemble rough cuts faster" },
      { traditional: "Creating subtitles and captions requires manual transcription", aiAssisted: "AI generates synchronized captions that creators can quickly review and edit" },
      { traditional: "Brainstorming scripts, titles, and hooks can take hours", aiAssisted: "AI produces ideas and first drafts that creators refine to match their audience and brand" },
      { traditional: "Designing thumbnails and promotional assets often requires separate design work", aiAssisted: "AI assists with thumbnails, graphics, and visual concepts for faster content production" },
      { traditional: "Repurposing one long video into multiple short clips is repetitive", aiAssisted: "AI helps identify shareable moments and generate platform-specific edits for Reels, Shorts, and other formats" },
      { traditional: "Preparing content for multiple languages traditionally requires separate voice talent", aiAssisted: "AI supports translation, dubbing, and voiceovers, making multilingual content creation more accessible" }
    ],
    projectsList: [
      "Professional YouTube Video Edit",
      "Instagram Reels & Shorts Series",
      "Promotional Brand Advertisement",
      "Podcast Video with AI Editing",
      "Social Media Content Pack for a Business",
      "End-to-End AI Content Creation Campaign"
    ],
    phases: [
      {
        title: "PHASE 1 — Video Editing & Content Creation Foundations",
        modules: [
          { title: "Module 1: Video Editing Fundamentals", items: ["Introduction to Video Editing", "Video Formats & Resolutions", "Editing Workflow", "Timeline Management", "Cuts, Trimming & Transitions", "Speed Control", "B-Roll Integration", "Project Organization"] },
          { title: "Module 2: Visual Enhancement", items: ["Color Correction", "Color Grading", "Motion Graphics (Introduction)", "Titles & Lower Thirds", "Visual Effects (Basics)", "Green Screen (Chroma Key)", "Export Settings for Different Platforms"] },
          { title: "Module 3: Audio Production", items: ["Audio Editing Fundamentals", "Noise Reduction", "Music & Sound Effects", "Voiceovers", "Audio Mixing", "Syncing Audio & Video", "Loudness Standards for Social Media"] },
          { title: "Module 4: Storytelling & Content Strategy", items: ["Script Writing", "Storyboarding", "Hook Creation", "Visual Storytelling", "Audience Retention Techniques", "Short-Form vs Long-Form Content", "Platform-Specific Content Strategy"] },
          { title: "Module 5: Social Media Content Creation", items: ["YouTube Content Strategy", "Instagram Reels", "Facebook Video Content", "LinkedIn Video Content", "YouTube Shorts", "Thumbnail Design Fundamentals", "YouTube SEO Basics"] },
          { title: "Module 6: Publishing & Optimization", items: ["Video Compression", "Export Optimization", "Content Scheduling", "Analytics & Performance Tracking", "Content Repurposing", "Copyright & Fair Use Basics"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Video Editing & Content Creation",
        modules: [
          { title: "Module 7: AI Video Editing", items: ["AI Scene Detection", "AI Auto Editing", "AI Beat Synchronization", "AI Subtitle Generation", "AI Auto Captions", "AI Voice Cleanup", "AI Color Enhancement"] },
          { title: "Module 8: AI Content Creation", items: ["AI Script Generation", "AI Hook & Title Creation", "AI Video Idea Generation", "AI Thumbnail Generation", "AI Description & Hashtag Generation", "AI Content Calendar Planning"] },
          { title: "Module 9: AI Creative Production", items: ["AI Voiceovers", "AI Image Generation", "AI B-Roll Creation", "AI Background Replacement", "AI Video Generation (Overview)", "AI Avatar Videos (Overview)"] },
          { title: "Module 10: AI Productivity Tools", items: ["AI Editing Assistants", "AI Workflow Automation", "AI Content Repurposing", "AI Translation & Dubbing", "AI Quality Enhancement", "AI Batch Content Creation"] },
          { title: "Module 11: Creator Growth with AI", items: ["AI Audience Research", "AI Trend Analysis", "AI Performance Insights", "AI Brand Building", "Freelancing Workflow", "Content Monetization Strategies"] }
        ]
      },
      {
        title: "PHASE 3 — Industry Projects",
        modules: [
          { title: "Module 12: Video Projects Lab", items: ["Multi-cam podcast edits with Descript", "Generating B-rolls using text prompt styles", "Color-grading horizontal/vertical tracks"] }
        ]
      }
    ]
  },
  {
    title: "Business & Entrepreneurship using AI",
    iconName: "Briefcase",
    categories: ["business"],
    description: "Scaffold legal structures, write financial projections, and automate customer pipelines with modern AI platforms.",
    duration: "2 Months",
    sessions: "24 Sessions",
    hours: "48 Hours",
    price: "₹3,999",
    difficulty: "Beginner",
    projectsCount: "6+ Projects",
    skills: ["Notion", "CRM Automation", "Pitch Decks", "Financial Models"],
    benefits: ["Certification", "Mentorship Support"],
    outcome: "Startup Founder, AI Operations Specialist",
    toolsCovered: {
      development: ["Notion", "Google Workspace", "Canva", "Trello (Overview)"],
      ai: ["ChatGPT", "Claude", "Gemini", "Perplexity", "Gamma", "Tome (Overview)", "NotebookLM (Overview)", "n8n (Overview)", "Zapier (Overview)"]
    },
    portfolioPrep: [
      "Develop 6 Startup & Business Projects",
      "Build a Professional Pitch Deck",
      "Create a Business Plan & Financial Model",
      "Personal Branding & LinkedIn Optimization",
      "Freelancing & Consulting Strategies",
      "Startup Funding & Investor Readiness",
      "Roadmap to Launching an AI-Enabled Business"
    ],
    aiComparison: [
      { traditional: "Market research requires collecting information from multiple sources over several days", aiAssisted: "AI consolidates market trends, competitor insights, and customer research into structured reports that founders can validate" },
      { traditional: "Writing business plans and financial projections is time-intensive", aiAssisted: "AI drafts business plans, forecasts, and operating documents, allowing entrepreneurs to focus on refining assumptions" },
      { traditional: "Creating marketing content for multiple channels requires significant effort", aiAssisted: "AI generates campaign ideas, copy, visuals, and content calendars that can be adapted to the target audience" },
      { traditional: "Small teams often struggle with repetitive administrative work", aiAssisted: "AI assists with customer support, documentation, meeting summaries, and workflow automation, improving productivity" },
      { traditional: "Preparing investor presentations involves repeated revisions", aiAssisted: "AI helps structure pitch decks, presentation content, and supporting materials while founders customize the final narrative" },
      { traditional: "Testing multiple business ideas can be expensive and slow", aiAssisted: "AI enables faster idea validation, rapid prototyping, and scenario analysis, helping entrepreneurs evaluate opportunities before making major investments" }
    ],
    projectsList: [
      "Business Model Canvas for a Startup Idea",
      "AI-Powered Market Research Report",
      "Complete Business Plan with Financial Projections",
      "Startup Branding & Marketing Strategy",
      "Investor Pitch Deck & Pitch Presentation",
      "Launch-Ready AI-Enabled Startup Blueprint"
    ],
    phases: [
      {
        title: "PHASE 1 — Business & Startup Foundations",
        modules: [
          { title: "Module 1: Entrepreneurial Mindset", items: ["Introduction to Entrepreneurship", "Identifying Business Opportunities", "Problem-Solution Thinking", "Design Thinking Fundamentals", "Lean Startup Methodology", "Business Ethics", "Entrepreneurial Mindset & Leadership"] },
          { title: "Module 2: Business Planning & Validation", items: ["Business Model Canvas", "Value Proposition Design", "Market Research", "Customer Discovery", "Competitor Analysis", "Product-Market Fit", "MVP (Minimum Viable Product) Planning"] },
          { title: "Module 3: Finance & Business Operations", items: ["Business Budgeting", "Pricing Strategies", "Revenue Models", "Break-Even Analysis", "Cash Flow Fundamentals", "Financial Planning", "Business KPIs"] },
          { title: "Module 4: Branding & Marketing", items: ["Brand Identity", "Personal Branding", "Digital Marketing Fundamentals", "Sales Fundamentals", "Customer Acquisition", "Customer Retention", "Growth Strategies"] },
          { title: "Module 5: Startup Operations", items: ["Business Registration Basics", "Legal & Compliance Fundamentals", "Team Building", "Hiring Basics", "Project Management", "Documentation & SOPs", "Business Productivity Systems"] },
          { title: "Module 6: Pitching & Fundraising", items: ["Pitch Deck Fundamentals", "Investor Pitching", "Business Storytelling", "Financial Projections", "Negotiation Skills", "Networking", "Startup Funding Options"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Entrepreneurship",
        modules: [
          { title: "Module 7: AI for Business Research", items: ["AI Market Research", "AI Competitor Analysis", "AI Customer Persona Generation", "AI SWOT Analysis", "AI Trend Discovery", "AI Opportunity Validation"] },
          { title: "Module 8: AI for Business Planning", items: ["AI Business Plan Generation", "AI Financial Forecasting", "AI Pricing Strategy Support", "AI Business Documentation", "AI SOP Creation", "AI Decision Support"] },
          { title: "Module 9: AI for Marketing & Sales", items: ["AI Content Marketing", "AI Sales Copywriting", "AI Email Campaigns", "AI Social Media Strategy", "AI CRM Assistance", "AI Lead Generation & Sales Funnel Optimization"] },
          { title: "Module 10: AI Business Automation", items: ["AI Customer Support", "AI Workflow Automation", "AI Internal Knowledge Management", "AI Meeting Summaries", "AI Task Management", "AI Productivity Systems"] },
          { title: "Module 11: AI Startup Growth", items: ["AI Business Analytics", "AI Dashboard & KPI Monitoring", "AI Investor Pitch Creation", "AI Business Presentations", "AI Scaling Strategies", "Building an AI-First Business"] }
        ]
      },
      {
        title: "PHASE 3 — Startup Launch Projects",
        modules: [
          { title: "Module 12: Applied Launch Labs", items: ["Scaffolding landing pages with AI builders", "Mapping operations integrations in Make/n8n", "Filing mock incorporation files and legal templates"] }
        ]
      }
    ]
  },
  {
    title: "Interview & Placement Program using AI",
    iconName: "Award",
    categories: ["placement"],
    description: "Optimize resumes, run mock video interview simulations, and solve technical assessment scripts with real-time feedback.",
    duration: "1.5 Months",
    sessions: "18 Sessions",
    hours: "36 Hours",
    price: "₹2,999",
    difficulty: "Beginner",
    projectsCount: "6+ Projects",
    skills: ["Resume Optimization", "AI Mock Interviews", "LeetCode Solutions"],
    benefits: ["Placement Support", "1-on-1 Career Mentoring"],
    outcome: "Job-Ready Tech Professional",
    toolsCovered: {
      development: ["LinkedIn", "GitHub", "Google Docs", "Canva (Resume Design)"],
      ai: ["ChatGPT", "Claude", "Gemini", "Google Interview Warmup", "Yoodli", "NotebookLM (Overview)"]
    },
    portfolioPrep: [
      "Build a Complete Placement Portfolio",
      "ATS-Optimized Resume & Cover Letter",
      "Professional LinkedIn & GitHub Profiles",
      "Mock Interview Experience with Feedback",
      "Job Search & Networking Strategy",
      "Salary Negotiation Fundamentals",
      "Internship & Placement Readiness"
    ],
    aiComparison: [
      { traditional: "Updating resumes for every job application requires repeated manual editing", aiAssisted: "AI helps tailor resumes and cover letters to match job descriptions while candidates verify the final content" },
      { traditional: "Mock interviews depend on mentor availability", aiAssisted: "AI provides on-demand interview practice with feedback on answers, clarity, pacing, and communication" },
      { traditional: "Researching companies and interview questions takes considerable time", aiAssisted: "AI summarizes company information and generates role-specific practice questions to support focused preparation" },
      { traditional: "Writing outreach messages and follow-up emails can be challenging", aiAssisted: "AI drafts professional networking messages and follow-up emails that candidates can personalize" },
      { traditional: "Preparing for technical and HR interviews often requires multiple resources", aiAssisted: "AI organizes study plans, practice questions, and revision material in one workflow" },
      { traditional: "Tracking applications and preparation manually is difficult", aiAssisted: "AI assists with planning, reminders, and progress tracking throughout the job search process" }
    ],
    projectsList: [
      "Professional ATS-Optimized Resume",
      "Optimized LinkedIn Profile",
      "GitHub & Portfolio Showcase",
      "Mock Interview Performance Report",
      "Personal Career Action Plan",
      "Complete Placement Portfolio"
    ],
    phases: [
      {
        title: "PHASE 1 — Career Preparation Foundations",
        modules: [
          { title: "Module 1: Career Planning", items: ["Career Goal Setting", "Understanding Job Roles", "Industry Expectations", "Job Search Strategies", "Internship vs Full-Time Opportunities", "Building a Career Roadmap"] },
          { title: "Module 2: Professional Branding", items: ["Resume Writing Fundamentals", "ATS-Friendly Resume Design", "Cover Letter Writing", "LinkedIn Profile Optimization", "GitHub Portfolio Setup", "Personal Portfolio Website (Overview)"] },
          { title: "Module 3: Communication & Soft Skills", items: ["Professional Communication", "Email & Workplace Etiquette", "Group Discussion Techniques", "Presentation Skills", "HR Interview Etiquette", "Confidence Building"] },
          { title: "Module 4: Aptitude & Interview Preparation", items: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Technical Interview Preparation", "HR Interview Preparation", "Behavioral Interview Questions"] },
          { title: "Module 5: Mock Interviews", items: ["HR Mock Interviews", "Technical Mock Interviews", "Group Discussions", "Case Study Discussions", "Feedback & Improvement Sessions", "Interview Best Practices"] },
          { title: "Module 6: Placement Strategy", items: ["Job Application Strategy", "Networking on LinkedIn", "Cold Outreach to Recruiters", "Referral Strategies", "Salary Negotiation Fundamentals", "Offer Evaluation & Professional Conduct"] }
        ]
      },
      {
        title: "PHASE 2 — AI-Powered Career Acceleration",
        modules: [
          { title: "Module 7: AI Resume & Profile Optimization", items: ["AI Resume Tailoring", "ATS Score Improvement", "AI Cover Letter Generation", "AI LinkedIn Optimization", "AI Portfolio Review", "Personal Branding with AI"] },
          { title: "Module 8: AI Interview Preparation", items: ["AI Mock HR Interviews", "AI Technical Interviews", "AI Behavioral Question Practice", "AI Feedback & Performance Analysis", "AI Company-Specific Question Generation", "AI Communication & Confidence Coaching"] },
          { title: "Module 9: AI Job Search & Networking", items: ["AI Job Matching", "AI Job Description Analysis", "AI Recruiter Outreach Messages", "AI Networking Assistance", "AI Follow-Up Emails", "AI Salary Negotiation Support"] },
          { title: "Module 10: AI Productivity for Job Seekers", items: ["AI Study Plans", "AI Learning Roadmaps", "AI Interview Notes & Summaries", "AI Task Management", "AI Career Research", "AI Goal Tracking"] },
          { title: "Module 11: Career Launch Preparation", items: ["Portfolio Review", "Interview Readiness Assessment", "AI Career Strategy", "Placement Planning", "Freelancing vs Full-Time Careers", "Continuous Learning Roadmap"] }
        ]
      },
      {
        title: "PHASE 3 — Placement Readiness Portfolio",
        modules: [
          { title: "Module 12: Applied Placement Labs", items: ["ATS checking checks on live postings", "Conducting mock AI audio exercises", "Drafting cold email pitches for LinkedIn contacts"] }
        ]
      }
    ]
  }
];

// Spotlight Course is the AI Full Stack Web Development course

export const spotlightCourse = coursesData[0];

// Navigation Filter Pills Configuration
export const filters = [
  { id: "all", label: "All Programs" },
  { id: "development", label: "Development" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "business", label: "Business & BI" },
  { id: "creative", label: "Creative Media" },
  { id: "placement", label: "Placement Readiness" }
];

