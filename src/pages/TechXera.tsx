import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop, Smartphone, Shield, Cpu, BarChart3, Binary, Eye, Brain,
  Megaphone, Video, Briefcase, Award, GraduationCap, ArrowRight,
  BookOpen, MessageCircle, HelpCircle, Check, Layers, Zap, Sparkles, Clock, Target, ChevronRight, X
} from "lucide-react";
import Layout from "@/components/Layout";
import GradientMesh from "@/components/creative/GradientMesh";
import DecorativeShapes from "@/components/creative/DecorativeShapes";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import ChalkToChoiceAsset from "@/components/home/ChalkToChoiceAsset";

// Icon mapping helper
const iconMap: Record<string, any> = {
  Laptop, Smartphone, Shield, Cpu, BarChart3, Binary, Eye, Brain,
  Megaphone, Video, Briefcase, Award
};

// Types & Interfaces
interface SyllabusModule {
  title: string;
  items: string[];
}

interface SyllabusPhase {
  title: string;
  modules: SyllabusModule[];
}

interface AIComparisonRow {
  traditional: string;
  aiAssisted: string;
}

interface Course {
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
const coursesData: Course[] = [
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
const spotlightCourse = coursesData[0];

// Navigation Filter Pills Configuration
const filters = [
  { id: "all", label: "All Programs" },
  { id: "development", label: "Development" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "business", label: "Business & BI" },
  { id: "creative", label: "Creative Media" },
  { id: "placement", label: "Placement Readiness" }
];

// Timeline Roadmap Steps
const roadmapSteps = [
  { title: "Discover", desc: "Evaluate strengths, map interests, and identify clear career paths." },
  { title: "Learn", desc: "Master cutting-edge technologies integrated with modern AI workflows." },
  { title: "Build", desc: "Construct production-ready, industry-vetted digital systems and portfolios." },
  { title: "Deploy", desc: "Launch live applications to cloud servers and optimize code globally." },
  { title: "Intern", desc: "Gain hands-on real-world experience solving business bottlenecks." },
  { title: "Get Placed", desc: "Land high-paying tech jobs using placement support channels." },
  { title: "Launch Startup", desc: "Or bootstrap your own SaaS product from design to launch." }
];

// Career Outcomes Metrics Data
const metricsData = [
  { value: "50+", label: "Industry Projects", desc: "Real-world builds that build authentic resume credibility." },
  { value: "AI-First", label: "Curriculum", desc: "No textbook theory. We teach native workflows using Cursor, APIs, and LLMs." },
  { value: "Guaranteed", label: "Internship Support", desc: "Every program includes a structured pathway to gain commercial experience." },
  { value: "Dedicated", label: "Placement Assistance", desc: "Resume optimization, recruiter networks, and real interview mock drills." },
  { value: "Startup", label: "Mentorship", desc: "Guided by founders on how to build, market, and ship software projects." },
  { value: "Vetted", label: "Industry Certifications", desc: "Earn certifications verifying your ability to ship software with AI tools." }
];

// Enrollment Flow 4-Step Process Data
const enrollmentSteps = [
  { step: "01", title: "Choose Course", desc: "Select from our 12 AI-powered career programs." },
  { step: "02", title: "Talk to Mentor", desc: "Align your goals, evaluate duration, and configure your plan." },
  { step: "03", title: "Start Learning", desc: "Dive into project sessions led by industry developers." },
  { step: "04", title: "Build Career", desc: "Ship products, complete internships, and scale placement checks." }
];

const TechXera = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [isChalkToChoiceOpen, setIsChalkToChoiceOpen] = useState(false);
  const coursesRef = useRef<HTMLDivElement>(null);

  // Filter courses based on active selection
  const filteredCourses = coursesData.filter(course => {
    if (activeFilter === "all") return true;
    return course.categories.includes(activeFilter);
  });

  const handleScrollToCourses = () => {
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCourse(null);
        setIsChalkToChoiceOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedCourse || isChalkToChoiceOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedCourse, isChalkToChoiceOpen]);

  return (
    <Layout>
      <SEO
        title="IKURO by Logisaar | AI-Augmented Training & Skills in Odisha"
        description="Industry skill development courses in Web Dev, App Dev, ML, Cybersecurity and Agentic AI built around modern AI workflows. Home of Chalk to Choice."
        keywords="IKURO, programming course Bhubaneswar, AI classes Cuttack, Chalk to Choice Odisha, computer training, Logisaar"
        canonical="https://www.logisaar.in/ikuro"
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-background pt-24 pb-16">
        <DecorativeShapes variant="hero" />

        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10 max-w-[1340px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full"
              >
                <GraduationCap size={13} />
                <span>IKURO Division</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                >
                  IKURO Learning <br />
                  <span className="text-gradient">Ecosystem.</span>
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="font-display text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-2 max-w-xl"
                >
                  Master Industry Skills. Build Real Products. Launch Your Career.
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
              >
                Every program is architected around real-world projects, native AI-powered workflows, structured internship opportunities, and placement readiness support. Not boring lectures, only actual building.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  onClick={handleScrollToCourses}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-95 border-0 text-white rounded-full px-8 gap-2 font-semibold shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5"
                >
                  <span>Explore Courses</span>
                  <ArrowRight size={16} />
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 gap-2 font-semibold border-border hover:bg-secondary/40 transition-transform hover:-translate-y-0.5"
                >
                  <a
                    href="https://wa.me/918596072510?text=Hi%20Logisaar%20IKURO%2C%20I%27m%20interested%20in%20career%20mentorship%20and%20learning%20more%20about%20your%20courses."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle size={16} />
                    <span>Talk to Mentor</span>
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Right Content - Animated Floating Illustration */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[400px] aspect-square flex items-center justify-center"
              >
                {/* Visual Glow */}
                <div className="absolute w-72 h-72 rounded-full bg-primary/5 blur-[80px]" />

                {/* SVG Floating System */}
                <svg className="w-full h-full relative z-10" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Orbit */}
                  <motion.circle
                    cx="200" cy="200" r="130"
                    stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 6" opacity="0.2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                  />
                  {/* Inner Orbit */}
                  <motion.circle
                    cx="200" cy="200" r="90"
                    stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3 4" opacity="0.15"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                  />
                  {/* Core Nodes */}
                  <circle cx="200" cy="200" r="28" className="fill-primary/10 stroke-primary/30" strokeWidth="1.5" />

                  {/* Floating Particle Elements */}
                  {[
                    { cx: 90, cy: 140, r: 6, label: "AI" },
                    { cx: 310, cy: 160, r: 8, label: "Build" },
                    { cx: 160, cy: 310, r: 7, label: "Code" },
                    { cx: 240, cy: 80, r: 5, label: "Scale" }
                  ].map((node, i) => (
                    <motion.g
                      key={i}
                      animate={{
                        y: [0, -6, 0],
                        x: [0, i % 2 === 0 ? 5 : -5, 0]
                      }}
                      transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <circle cx={node.cx} cy={node.cy} r={node.r} className="fill-white dark:fill-card stroke-primary/30" strokeWidth="1" />
                      <circle cx={node.cx} cy={node.cy} r={node.r - 3} className="fill-primary/10" />
                      <text
                        x={node.cx} y={node.cy + node.r + 12}
                        textAnchor="middle"
                        className="fill-muted-foreground font-mono text-[9px] font-bold uppercase tracking-wider"
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  ))}

                  {/* Connecting Rays */}
                  <line x1="200" y1="200" x2="90" y2="140" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                  <line x1="200" y1="200" x2="310" y2="160" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                  <line x1="200" y1="200" x2="160" y2="310" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                  <line x1="200" y1="200" x2="240" y2="80" stroke="hsl(var(--primary))" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.25" />
                </svg>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Chalk to Choice Segment */}
      <section className="py-20 relative overflow-hidden border-t border-border/30 bg-secondary/15">
        <div className="absolute inset-0 animated-grid pointer-events-none opacity-20" />
        <div className="container mx-auto px-6 relative z-10 max-w-[1300px]">

          <div className="max-w-5xl mx-auto rounded-3xl border border-border/80 bg-card p-8 md:p-12 relative overflow-hidden shadow-xl">
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -z-10" />
            <div className="absolute -left-24 -top-24 w-80 h-80 bg-accent/10 rounded-full blur-[80px] -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Side: Content */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
                  Chalk to Choice — From Classroom to Career
                </h2>
                <p className="text-primary text-sm font-semibold tracking-wide uppercase font-mono leading-relaxed">
                  Career-Clarity Program for Class 11 & 12 Students
                </p>
                <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground text-sm">
                  "The last bell has rung. Now it's your turn to choose."
                </blockquote>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  You've just finished your 12th exams. The school bell has rung for the last time. Now comes the most important question of your life — What Next? <strong>Chalk to Choice</strong> is a 15-day online career counselling + awareness course designed for PCM and PCB students from all boards to get a clear, honest, and complete picture of every career path available after 12th.
                </p>

                <div className="text-sm font-mono text-muted-foreground/80 flex flex-wrap gap-x-6 gap-y-2">
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> PCM & PCB Streams</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> All School Boards</span>
                  <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Bhubaneswar, India</span>
                </div>
              </div>

              {/* Right Side: Editorial Split */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-8 p-6 md:p-8 rounded-3xl bg-secondary/30 border border-border/50 text-left">

                {/* 3-stat row in font-mono */}
                <div className="grid grid-cols-3 gap-4 pb-6 border-b border-border/60">
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">15</div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider leading-tight">Days Program</div>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">7+</div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider leading-tight">Streams</div>
                  </div>
                  <div className="text-left space-y-1">
                    <div className="text-3xl font-extrabold text-foreground font-mono tracking-tight">50+</div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground tracking-wider leading-tight">Exams</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider font-semibold">Registration Fee</div>
                    <div className="text-3xl font-bold text-foreground font-mono mt-1">₹2,500 <span className="text-xs font-normal text-muted-foreground font-sans">Only</span></div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                    <Button onClick={() => setIsChalkToChoiceOpen(true)} className="flex-1 bg-white dark:bg-card hover:bg-secondary/40 border border-border text-foreground rounded-full py-4 h-auto font-semibold">
                      View Details
                    </Button>
                    <Button asChild className="flex-1 bg-gradient-primary hover:opacity-90 text-white rounded-full py-4 h-auto font-semibold border-0">
                      <a
                        href="https://wa.me/917815014638?text=Hi%20Logisaar%20IKURO%2C%20I%27m%20interested%20in%20registering%20for%20the%20Chalk%20to%20Choice%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                        Register Now
                      </a>
                    </Button>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Flagship Programs / Courses Area */}
      <section ref={coursesRef} className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 max-w-[1300px]">

          {/* Header block */}
          <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              12 Flagship <span className="text-gradient">AI Programs</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
              Learn practical development workflows backed by native AI integration. No heavy theory lectures, only live project building.
            </p>
          </div>

          {/* Course Filter Navigation */}
          <div className="mb-12 flex justify-center w-full">
            <div className="overflow-x-auto no-scrollbar max-w-full px-4 py-1">
              <div className="inline-flex bg-secondary/50 backdrop-blur-md p-1 rounded-full border border-border/60 shadow-sm min-w-max">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeFilter === filter.id
                      ? "text-white font-bold"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <span className="relative z-10">{filter.label}</span>
                    {activeFilter === filter.id && (
                      <motion.div
                        layoutId="activeFilterBg"
                        className="absolute inset-0 bg-gradient-primary rounded-full shadow-glow-sm"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deliberate Grid including spotlight/featured card dynamically inside it */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {filteredCourses.map((course, idx) => {
              const isSpotlight = course.title === spotlightCourse.title;
              const IconComponent = iconMap[course.iconName] || BookOpen;

              if (isSpotlight) {
                return (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    whileHover={{ y: -4 }}
                    className="md:col-span-2 md:row-span-2 bg-card border border-border/80 hover:border-primary/40 rounded-3xl p-8 flex flex-col justify-between shadow-lg transition-all duration-300 relative group overflow-hidden"
                  >
                    {/* Highlight Background Glow */}
                    <div className="absolute right-0 top-0 w-80 h-80 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/8 transition-colors duration-500" />

                    <div className="space-y-6">
                      {/* Top Header */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all">
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                              Ecosystem Flagship
                            </span>
                          </div>
                        </div>
                        <span className="text-xs uppercase font-mono font-bold tracking-wider text-muted-foreground">
                          {course.difficulty}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2 text-left">
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                          {course.description}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 border-y border-border/40 text-xs font-mono text-muted-foreground/90">
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-primary/75" />
                          <span>{course.duration} ({course.hours})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Layers size={14} className="text-primary/75" />
                          <span>{course.sessions}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Target size={14} className="text-primary/75" />
                          <span>{course.projectsCount}</span>
                        </div>
                      </div>

                      {/* Skills Stack */}
                      <div className="space-y-2 text-left">
                        <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">Core Skill Stack</div>
                        <div className="flex flex-wrap gap-1.5">
                          {course.skills.map(skill => (
                            <span key={skill} className="bg-secondary text-foreground text-xs px-2.5 py-1 rounded-md border border-border/80 font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Condensed Benefit Icons */}
                      <div className="flex gap-4 items-center text-muted-foreground text-xs pt-2">
                        <span className="flex items-center gap-1.5"><Award size={14} className="text-primary" /> Certification</span>
                        <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-primary" /> Internship</span>
                        <span className="flex items-center gap-1.5"><Zap size={14} className="text-primary" /> Job-Ready</span>
                      </div>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-8 pt-4 border-t border-border/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-xl font-bold text-foreground font-mono">
                        {course.price}
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Button asChild className="flex-1 sm:flex-initial bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full px-6 h-11 font-semibold">
                          <a
                            href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(course.title)}%20program.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <MessageCircle size={16} fill="currentColor" />
                            Enroll
                          </a>
                        </Button>
                        <Button
                          onClick={() => setSelectedCourse(course)}
                          variant="outline"
                          className="flex-1 sm:flex-initial rounded-full px-6 h-11 font-semibold border-border bg-white dark:bg-card"
                        >
                          Syllabus
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: (idx % 3) * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border/80 hover:border-primary/45 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="space-y-4 text-left">
                    {/* Top Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-all">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-muted-foreground">
                        {course.difficulty}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1">
                      <h3 className="font-display font-bold text-foreground text-lg leading-snug group-hover:text-primary transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 py-2.5 border-y border-border/40 text-[10px] sm:text-xs font-mono text-muted-foreground/90">
                      <span className="flex items-center gap-1"><Clock size={12} className="text-primary/75" /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Layers size={12} className="text-primary/75" /> {course.sessions}</span>
                      <span className="flex items-center gap-1"><Target size={12} className="text-primary/75" /> {course.projectsCount}</span>
                    </div>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1">
                      {course.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-secondary text-foreground text-[10px] px-2 py-0.5 rounded border border-border/50">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Benefits condensed row */}
                    <div className="flex gap-3 text-muted-foreground text-[10px] pt-1">
                      {course.benefits.includes("Certification") && <span className="flex items-center gap-1"><Award size={12} className="text-primary" /> Cert</span>}
                      {course.benefits.includes("Internship Support") && <span className="flex items-center gap-1"><Briefcase size={12} className="text-primary" /> Intern</span>}
                      {course.benefits.includes("Placement Ready") && <span className="flex items-center gap-1"><Zap size={12} className="text-primary" /> Job-Ready</span>}
                    </div>
                  </div>

                  {/* Actions & Price Footer */}
                  <div className="mt-6 pt-4 border-t border-border/20 flex items-center justify-between gap-3">
                    <div className="text-sm font-bold text-foreground font-mono">
                      {course.price}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button asChild variant="default" size="sm" className="bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full text-xs font-semibold h-9 px-3.5">
                        <a
                          href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(course.title)}%20program.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
                        >
                          <MessageCircle size={13} fill="currentColor" />
                          Enroll
                        </a>
                      </Button>
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs font-semibold h-9 px-3.5 border-border text-muted-foreground hover:text-foreground bg-white dark:bg-card"
                      >
                        Syllabus
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Learning Journey Timeline */}
      <section className="py-24 bg-secondary/15 border-t border-b border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1300px]">

          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              The Learning Journey
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              A comprehensive structured roadmap designed to move you from baseline code to production deployment and employment.
            </p>
          </div>

          {/* Timeline Graph */}
          <div className="relative mt-12">

            {/* Connecting Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[2.5px] bg-border pointer-events-none">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {/* Connecting Vertical Line for Mobile */}
            <div className="lg:hidden absolute top-0 bottom-0 left-[23px] w-[2.5px] bg-border pointer-events-none">
              <motion.div
                className="w-full bg-gradient-primary"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />
            </div>

            {/* Journey steps */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 relative z-10">
              {roadmapSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="flex lg:flex-col items-start lg:items-center text-left lg:text-center gap-4 lg:gap-0 group"
                >
                  {/* Step node dot/circle */}
                  <div className={`w-12 h-12 rounded-full border-[2.5px] flex items-center justify-center font-bold text-sm shrink-0 shadow-sm relative transition-all duration-300 ${step.title === "Get Placed"
                    ? "border-primary bg-primary text-white shadow-glow-sm scale-110"
                    : "border-border bg-white dark:bg-background text-foreground group-hover:border-primary/80 group-hover:shadow-glow-sm"
                    }`}>
                    <span className={step.title === "Get Placed" ? "text-white" : "text-muted-foreground group-hover:text-primary transition-colors"}>
                      {idx + 1}
                    </span>
                    {step.title === "Get Placed" && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                      </span>
                    )}
                  </div>

                  {/* Step texts */}
                  <div className="lg:mt-6 space-y-1.5">
                    <h4 className="font-display font-bold text-foreground text-base tracking-tight group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-xs md:text-[13px] leading-relaxed lg:px-2 max-w-sm lg:max-w-none">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Career Outcomes Section */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 max-w-[1300px]">

          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full">
              <Award size={13} />
              <span>Measurable Impact</span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Ecosystem Career Outcomes
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              IKURO is optimized to prepare you directly for the industry. Here is why our training structure stands apart.
            </p>
          </div>

          {/* Asymmetric Bento Grid layout for Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {metricsData.map((metric, idx) => {
              const isLarge = idx === 0;
              const isFull = idx === 5;

              let colSpanClass = "col-span-1";
              if (isLarge) colSpanClass = "md:col-span-2";
              if (isFull) colSpanClass = "md:col-span-3";

              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className={`bg-white dark:bg-card border border-border/80 hover:border-primary/25 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 ${colSpanClass}`}
                >
                  <div className="space-y-4 text-left">
                    <div className="text-4xl md:text-5xl font-black text-primary leading-none font-mono">
                      {metric.value}
                    </div>
                    <div>
                      <div className="text-base font-bold text-foreground font-display">
                        {metric.label}
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">
                        {metric.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Enrollment Flow Process */}
      <section className="py-24 bg-secondary/15 border-t border-b border-border/30 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1300px]">

          <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Beautifully Simple Process
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Four structured onboarding phases designed to launch your training path without friction.
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative z-10">
            {enrollmentSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white dark:bg-card border border-border/60 hover:border-primary/30 rounded-3xl p-6 flex flex-col justify-between relative group min-h-[180px]"
              >
                {/* Connecting line for desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-[40px] -right-[20px] w-[24px] h-[2px] bg-border/40 overflow-hidden z-20">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.3, duration: 0.5 }}
                    />
                  </div>
                )}

                <div className="text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                      Step {step.step}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-foreground text-base tracking-tight mt-5 group-hover:text-primary transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs md:text-[13px] text-muted-foreground mt-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 max-w-[1300px]">

          <div className="max-w-4xl mx-auto rounded-[2rem] border border-border bg-white dark:bg-card p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">

              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Ready to Build Your <br />
                <span className="text-gradient">Future with AI?</span>
              </h2>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Join IKURO and gain practical, industry-ready skills through project-based learning, AI-powered workflows, structured internships, and placement-focused training.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  onClick={handleScrollToCourses}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-95 border-0 text-white rounded-full px-8 gap-2 font-semibold shadow-md shadow-primary/20 transition-transform hover:-translate-y-0.5"
                >
                  Explore Courses
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 gap-2 font-semibold border-border hover:bg-secondary/40 transition-transform hover:-translate-y-0.5"
                >
                  <a
                    href="https://wa.me/918596072510?text=Hi%20Logisaar%20IKURO%2C%20I'm%20interested%20in%20a%20career%20guidance%20session."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle size={16} fill="currentColor" />
                    Talk to Mentor
                  </a>
                </Button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Slide-Over Detail Drawer Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-[99999] flex justify-end">
            {/* Dark Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCourse(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[4px]"
            />

            {/* Slide-over Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="relative w-full max-w-2xl h-full bg-white dark:bg-slate-900 shadow-2xl border-l border-border/80 flex flex-col z-20 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border/80 flex justify-between items-start shrink-0">
                <div className="space-y-1 max-w-[85%] text-left">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">
                    Course Syllabus Detail
                  </span>
                  <h3 className="font-display font-bold text-2xl text-foreground">
                    {selectedCourse.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    <span className="bg-secondary text-foreground border border-border px-2 py-0.5 rounded-full font-mono font-semibold">
                      {selectedCourse.duration}
                    </span>
                    <span className="bg-secondary text-foreground border border-border px-2 py-0.5 rounded-full font-mono font-semibold">
                      {selectedCourse.sessions}
                    </span>
                    <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-mono font-bold">
                      Fees: {selectedCourse.price}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 rounded-full hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar text-left">

                {/* Brief description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Description
                  </h4>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {selectedCourse.description}
                  </p>
                </div>

                {/* Tools Covered */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Industry Tools Covered
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Dev/Industry Tools */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-foreground font-mono flex items-center gap-1.5">
                        <Layers size={13} className="text-primary" />
                        Development &amp; Standard Tools
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedCourse.toolsCovered.development.map(tool => (
                          <span key={tool} className="bg-secondary/60 text-foreground text-xs px-2.5 py-1 rounded-md border border-border/40 font-medium">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* AI Tools */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-primary font-mono flex items-center gap-1.5">
                        <Sparkles size={13} className="text-primary" />
                        AI Innovation Tools
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedCourse.toolsCovered.ai.map(tool => (
                          <span key={tool} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-md border border-primary/20 font-semibold">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phases & Modules */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Course Curriculum Phases
                  </h4>

                  <div className="divide-y divide-border/60">
                    {selectedCourse.phases.map((phase, idx) => (
                      <div key={phase.title} className="py-3 first:pt-0">
                        <button
                          onClick={() => setExpandedPhase(expandedPhase === idx ? null : idx)}
                          className="w-full py-2.5 text-left flex justify-between items-center hover:text-primary transition-colors"
                        >
                          <span className="font-display font-bold text-sm text-foreground tracking-tight">
                            {phase.title}
                          </span>
                          <ChevronRight
                            size={16}
                            className={`text-muted-foreground transition-transform duration-300 ${expandedPhase === idx ? "rotate-90 text-primary" : ""}`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {expandedPhase === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="py-3 pl-2 space-y-4 divide-y divide-border/30">
                                {phase.modules.map(mod => (
                                  <div key={mod.title} className="pt-3 first:pt-0">
                                    <div className="text-xs font-mono font-bold text-primary">
                                      {mod.title}
                                    </div>
                                    <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                      {mod.items.map(item => (
                                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                                          <Check size={11} className="text-emerald-500 stroke-[3px] shrink-0 mt-0.5" />
                                          <span>{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hands-on Projects */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Industry Portfolio Projects
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {selectedCourse.projectsList.map((project, idx) => (
                      <li key={project} className="py-2.5 border-b border-border/40 text-xs font-medium text-foreground/80 flex items-center gap-2.5 text-left">
                        <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-mono font-bold shrink-0 text-[10px]">
                          P{idx + 1}
                        </span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Portfolio & Career Preparation */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Portfolio &amp; Career Preparation
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedCourse.portfolioPrep.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Traditional vs AI comparison matrix */}
                <div className="space-y-3 pt-6 border-t border-border/60">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    How AI Accelerates Learning
                  </h4>
                  <div className="border border-border/70 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border text-foreground font-mono">
                          <th className="p-3 font-bold border-r border-border w-1/2">Traditional Learning</th>
                          <th className="p-3 font-bold text-primary w-1/2">AI-Augmented Learning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-muted-foreground">
                        {selectedCourse.aiComparison.map((row, idx) => (
                          <tr key={idx} className="hover:bg-secondary/10">
                            <td className="p-3 border-r border-border leading-relaxed">{row.traditional}</td>
                            <td className="p-3 text-foreground font-medium leading-relaxed">{row.aiAssisted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-border/80 bg-secondary/10 flex gap-4 shrink-0">
                <Button asChild className="flex-1 bg-gradient-primary hover:opacity-90 border-0 text-white rounded-full py-5 h-auto font-semibold">
                  <a
                    href={`https://wa.me/918596072510?text=Hi%20Logisaar%2C%20I'm%20interested%20in%20joining%20the%20${encodeURIComponent(selectedCourse.title)}%20program%20for%20${encodeURIComponent(selectedCourse.price)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} fill="currentColor" />
                    Enroll Program: {selectedCourse.price}
                  </a>
                </Button>
                <Button
                  onClick={() => setSelectedCourse(null)}
                  variant="outline"
                  className="rounded-full px-6 py-5 h-auto font-semibold border-border bg-white dark:bg-card"
                >
                  Close Syllabus
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Chalk to Choice Detailed Modal */}
      <AnimatePresence>
        {isChalkToChoiceOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChalkToChoiceOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] bg-white dark:bg-slate-900 border border-border/80 rounded-3xl shadow-2xl overflow-y-auto flex flex-col z-10"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-20 border-b border-border/60 p-6 flex justify-between items-start">
                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide font-mono">
                    Featured Initiative
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    Chalk to Choice — From Classroom to Career
                  </h3>
                  <p className="text-primary text-sm font-semibold tracking-wide uppercase font-mono leading-relaxed">
                    Career-Clarity Program for Class 11 & 12 Students
                  </p>
                </div>
                <button
                  onClick={() => setIsChalkToChoiceOpen(false)}
                  className="w-10 h-10 rounded-full border border-border/60 hover:bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto text-left leading-relaxed">

                {/* Intro Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8 space-y-4">
                    <h4 className="text-lg font-bold text-foreground font-display">What Is Chalk to Choice?</h4>
                    <p className="text-muted-foreground text-sm">
                      You've just finished your 12th exams. The school bell has rung for the last time. Now comes the most important question of your life — <strong>What Next?</strong>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      <strong>Chalk to Choice</strong> is a 15-day online career counselling + awareness course designed for PCM and PCB students from all school boards who want a clear, honest, and complete picture of every career path available after 12th. No vague theories, only real fact-based roadmaps.
                    </p>
                  </div>
                  <div className="md:col-span-4 space-y-3 pt-6 border-t md:border-t-0 md:border-l border-border/60 md:pl-6">
                    <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider font-semibold font-bold">Course Details</div>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">✓ <strong className="font-mono">15 Days</strong> structured learning</li>
                      <li className="flex items-center gap-2">✓ <strong>Online + Recorded</strong> watch anytime</li>
                      <li className="flex items-center gap-2">✓ <strong>All Boards</strong> welcome (CBSE, CHSE, ICSE)</li>
                      <li className="flex items-center gap-2">✓ <strong>Location:</strong> Bhubaneswar, India</li>
                    </ul>
                  </div>
                </div>

                {/* Core Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-border/60">
                  {[
                    { title: "No More Confusion", desc: "One course. Every path. From Engineering to IAS, Medical to Design." },
                    { title: "Real, Not Reel", desc: "No YouTube surface info. Deep, honest guidance backed by real exam facts & data." },
                    { title: "Affordable", desc: "Just Rs.2,500. Comprehensive PDF notes and Certificate included." },
                    { title: "Online + Recorded", desc: "Watch live or on-demand anytime. Revisit any session as needed." }
                  ].map((benefit, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="text-sm font-bold text-foreground font-display">{benefit.title}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{benefit.desc}</div>
                    </div>
                  ))}
                </div>

                {/* What You Discover */}
                <div className="space-y-4 pt-6 border-t border-border/60">
                  <h4 className="text-lg font-bold text-foreground font-display">What You Will Discover in 15 Days</h4>
                  <p className="text-sm text-muted-foreground">
                    We cover every major career path after 12th — and show you where each one leads, step by step. No vague advice. Real roadmaps.
                  </p>
                  <div className="border border-border/70 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-secondary/40 border-b border-border text-foreground font-mono">
                          <th className="p-3 font-bold border-r border-border w-1/3">Career Stream</th>
                          <th className="p-3 font-bold w-2/3">What We Cover</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-muted-foreground">
                        {[
                          { path: "Engineering", cover: "JEE Main & Advanced, 8+ branches explained, career options, GATE, MS abroad options" },
                          { path: "Medical & Allied Health", cover: "NEET-UG, MBBS, BDS, Nursing, Pharmacy, Physiotherapy & allied medical fields" },
                          { path: "Government & Defence", cover: "UPSC, SSC, Railway, Banking, NDA — who can apply, when to apply, and eligibility" },
                          { path: "Pure Sciences", cover: "BSc Honours, IISER research portals, MSc, PhD — scientific research & academia paths" },
                          { path: "Business & Management", cover: "BBA, CA, CS, CMA, MBA — the corporate, finance, commerce & startup world" },
                          { path: "Law, Design & Architecture", cover: "CLAT, NID, NIFT, NATA — for creative, analytical, and artistic minds" },
                          { path: "Post-Graduation Exams", cover: "GATE, CAT, GRE, GMAT, UGC NET — what options open up after graduation" }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-secondary/10">
                            <td className="p-3 border-r border-border font-bold text-foreground">{row.path}</td>
                            <td className="p-3 leading-relaxed">{row.cover}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Special Workshops */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-primary flex items-center gap-1.5 font-display">
                      <Target size={15} />
                      <span>★ IAS / IPS Dream Workshop</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Want to become an IAS or IPS officer? We map the full UPSC journey — from which graduation degree to choose, to Prelims, Mains, Interview, and final selection, including optional subject selection for PCM/PCB students.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-primary flex items-center gap-1.5 font-display">
                      <Laptop size={15} />
                      <span>★ Engineering Dream Path Workshop</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Already targeting JEE? We decode JEE rank vs college vs branch — and show you exactly what life looks like after BTech: placements, GATE, MS abroad, or tech startups.
                    </p>
                  </div>
                </div>

                {/* Future Tech */}
                <div className="pt-6 border-t border-border/60 space-y-3">
                  <h5 className="text-sm font-bold text-foreground font-display">Future Tech — For Every Student, Every Stream</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    No matter which path you choose — engineering, medical, law, or science — technology is changing every field. We give you a critical awareness of the trends that will shape your career decade:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Artificial Intelligence & ML",
                      "Drones & Robotics",
                      "IoT & Automation",
                      "Startups & Entrepreneurship",
                      "Digital Skills & Freelancing",
                      "Blockchain & Web3"
                    ].map((tech) => (
                      <span key={tech} className="bg-secondary/60 border border-border/40 text-[10px] font-mono px-2.5 py-1 rounded-full text-muted-foreground">
                        ✦ {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-border/60">
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-foreground font-display">Course Highlights</h5>
                    <ul className="text-xs text-muted-foreground space-y-2">
                      {[
                        "15 Days structured learning, one topic per day, no rush",
                        "Online + Recorded: Attend live or watch anytime on demand",
                        "All Boards Welcome: CBSE, State Board (CHSE), ICSE/ISC",
                        "Digital PDF Notes: Complete study material sent after course",
                        "Official Completion Certificate from IKURO",
                        "Live Q&A: Ask your doubts directly to the instructor every day",
                        "Exam Registration Help: Walkthrough of JEE/NEET forms live on screen",
                        "Personal Roadmap: Signed, personalized career action sheet"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/20 border border-border/80 p-6 rounded-3xl flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase text-muted-foreground tracking-wider font-semibold">Program Cost</div>
                      <div className="text-3xl font-extrabold text-foreground font-mono">₹2,500 <span className="text-xs font-normal text-muted-foreground font-sans">Only</span></div>
                      <p className="text-[10px] text-muted-foreground">PDF notes, completion certificate, and live Q&A session access included. Printed booklet available as an optional add-on.</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-border/60">
                      <div className="text-[10px] font-mono text-muted-foreground">Inquiries &amp; Registration:</div>
                      <div className="text-xs text-foreground font-medium">
                        📧 techxeraclub@thenalanda.com <br />
                        📞 +91 78150 14638
                      </div>
                    </div>

                    <Button asChild className="w-full bg-gradient-primary hover:opacity-95 text-white rounded-full py-4 h-auto font-semibold">
                      <a
                        href="https://wa.me/917815014638?text=Hi%20Logisaar%20IKURO%2C%20I%27m%20interested%20in%20registering%20for%20the%20Chalk%20to%20Choice%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={16} fill="currentColor" />
                        Register on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </Layout>
  );
};

export default TechXera;
