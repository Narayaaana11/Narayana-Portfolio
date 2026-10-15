export interface ProjectDetail {
  id: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  link?: string;
  liveUrl?: string;
  color: string;
  problem: string;
  approach: string;
  features: { title: string; description: string; image?: string }[];
  techStack: { name: string; role: string }[];
  images: { src: string; alt: string; caption: string }[];
  video?: string;
  discipline?: string;
  year?: string;
}

export const projectDetails: ProjectDetail[] = [
  {
    id: "vesper",
    name: "VESPER",
    type: "ELECTRON / REACT / TYPESCRIPT / WHISPER / MCP / SQLITE",
    tagline: "Voice-to-Action Windows Ambient AI Platform",
    description: "Built and shipped Vesper, a Windows push-to-talk voice-to-action desktop app with pluggable cloud and local LLMs, ambient obsidian HUD, sub-250ms direct text injection, native Win32 helpers, SQLite context engine with privacy shielding, and a stdio Model Context Protocol (MCP) server for Cursor and VS Code.",
    link: "https://github.com/Narayaaana11/VESPER",
    liveUrl: "https://github.com/Narayaaana11/VESPER",
    color: "#ff6b00",
    discipline: "Desktop AI & Systems",
    year: "2026",
    problem: "Power users and software engineers lose flow switching between applications, typing repetitive commands, and copying/pasting between AI chat interfaces and their active code editors or terminals. Traditional dictation tools merely transcribe raw words without syntax awareness or active context, while browser AI chatbots steal window focus and disrupt keyboard flow.",
    approach: "Architected an ambient, local-first Windows desktop platform using Electron, React, and TypeScript. Implemented a global push-to-talk hotkey that captures speech with WebAudio/Silero VAD, transcribes via Groq Whisper-Turbo (<180ms) or local Whisper ONNX, and runs through a pluggable AI provider layer (Groq, Gemini, local Llama via Ollama, and instant rule fallback). Uses native Win32 helpers (detect-window and send-input) to detect the active window and inject formatted text or execute commands directly into any focused application with sub-250ms latency—never stealing cursor focus.",
    features: [
      {
        title: "Ambient Push-to-Talk & Sub-250ms Direct Injection",
        description: "Hold Right Alt anywhere in Windows: an obsidian glass HUD displays real-time audio waveforms without stealing window focus. Release to format and inject directly at your cursor in VS Code, Cursor, Chrome, Slack, or Terminal in under 250ms.",
        image: "/projects/vesper/vesper-hud.png"
      },
      {
        title: "Pluggable AI Provider Layer",
        description: "Unified provider architecture supporting Groq Cloud Whisper, Gemini API, local Llama via Ollama, and rule-based fallback behind one consistent interface for voice-driven code drafting, terminal execution, and app navigation.",
        image: "/projects/vesper/vesper-architecture.png"
      },
      {
        title: "SQLite Context Engine & Stdio MCP Server",
        description: "Local operations journal with regex privacy shield that redacts credentials, API keys, and sensitive tokens, plus an embedded stdio Model Context Protocol (MCP) server for IDE agents like Cursor and Windsurf.",
        image: "/projects/vesper/vesper-settings.png"
      },
      {
        title: "Windows Packaging & Update Manager",
        description: "Packaged into a standalone Windows installer (.exe) with system tray daemon, background worker, update manager, and high-performance landing site on Vercel.",
        image: "/projects/vesper/vesper-hud.png"
      }
    ],
    techStack: [
      { name: "Electron.js", role: "Desktop Application Shell" },
      { name: "React & TypeScript", role: "Frontend UI & State" },
      { name: "OpenAI Whisper", role: "Cloud & On-Device STT" },
      { name: "Model Context Protocol", role: "Stdio MCP Server for IDEs" },
      { name: "SQLite & SQL.js", role: "Local Operations Journal" },
      { name: "Groq & Gemini API", role: "High-Speed LLM Inference" },
      { name: "Local Llama (Ollama)", role: "Offline Private AI Engine" },
      { name: "Native Win32 C++", role: "Active Window & Direct Input Injection" },
      { name: "Tailwind CSS", role: "Design System & Glassmorphism" }
    ],
    images: [
      { src: "/projects/vesper/vesper-hud.png", alt: "VESPER Ambient Push-to-Talk HUD", caption: "Floating ambient glass HUD with real-time waveform and zero focus-stealing" },
      { src: "/projects/vesper/vesper-architecture.png", alt: "VESPER System Architecture & Provider Layer", caption: "Pluggable AI provider layer, SQLite context engine, and MCP stdio server" },
      { src: "/projects/vesper/vesper-settings.png", alt: "VESPER Configuration & Action Router", caption: "Global hotkey setup, local LLM selector, and native Win32 input injection" }
    ]
  },
  {
    id: "ausvms",
    name: "AUSVMS",
    type: "REACT / TYPESCRIPT / NODE / MONGO / REDIS / SOCKET.IO",
    tagline: "Aditya University Visitor Management System",
    description: "Built a production full-stack visitor management platform for Aditya University with a React + TypeScript (Vite, Tailwind, shadcn/ui) front end and an Express/MongoDB API, using JWT authentication and role-based access for admin, staff, security, and visitor accounts.",
    link: "https://github.com/Narayaaana11/AUSVMS",
    liveUrl: "https://github.com/Narayaaana11/AUSVMS",
    color: "#a855f7",
    discipline: "Full-Stack & Real-Time Systems",
    year: "2026",
    problem: "Aditya University needed a secure, efficient way to manage campus visitors. Traditional paper-based entry logs were slow (~3–5 minutes per entry), prone to inaccuracies, and provided zero real-time visibility for administrators and security staff across campus checkpoints.",
    approach: "Architected a full-stack visitor management platform with React, TypeScript, Node.js, Express, and MongoDB. Engineered OTP-based visitor verification, real-time status synchronization via Socket.io, and asynchronous transactional email notifications handled through a Redis-backed Bull job queue. Authored MongoDB aggregation pipelines for deep analytics (peak hours, visit duration, trend forecasting) with scheduled PDF/Excel/CSV exports, hardened with Helmet, rate limiting, audit logging, and Jest test suites.",
    features: [
      { title: "Multi-Role Dashboards & RBAC", description: "Four distinct authenticated portals — Admin, Staff, Guard, and Visitor — built with React, TypeScript, Tailwind, and shadcn/ui with strict role-scoped permissions.", image: "/projects/ausvms/visitor-dashboard.png" },
      { title: "Real-Time Tracking & Bull Queue Alerts", description: "Socket.io powers live visitor location tracking across campus gates; Redis-backed Bull job queue dispatches reliable email/SMS alerts on check-in/out events.", image: "/projects/ausvms/live-tracking.png" },
      { title: "OTP Check-In & Aggregation Analytics", description: "Secure OTP verification reduces entry time to under 60 seconds. Advanced MongoDB aggregation pipelines power peak hour, visit duration, and trend analytics with scheduled PDF/Excel/CSV export.", image: "/projects/ausvms/otp-checkin.png" }
    ],
    techStack: [
      { name: "React.js & TypeScript", role: "Vite + shadcn/ui Frontend" },
      { name: "Node.js & Express", role: "REST API Framework" },
      { name: "MongoDB", role: "Database & Aggregation Pipelines" },
      { name: "Redis & Bull", role: "Job Queue & Email Processing" },
      { name: "Socket.io", role: "Real-Time Synchronization" },
      { name: "JWT & RBAC", role: "Authentication & Authorization" },
      { name: "Jest", role: "Unit & Integration Testing" }
    ],
    images: [
      { src: "/projects/ausvms/visitor-dashboard.png", alt: "AUSVMS Dashboard", caption: "Multi-role system overview with real-time stats" },
      { src: "/projects/ausvms/live-tracking.png", alt: "Live Visitor Tracking", caption: "Real-time campus visitor monitoring" },
      { src: "/projects/ausvms/otp-checkin.png", alt: "OTP Check-In", caption: "Secure OTP-based entry flow" }
    ],
    video: "/projects/ausvms/ausvms.mp4"
  },
  {
    id: "matrix-lms",
    name: "MATRIX LMS",
    type: "REACT / REDUX / NODE / MONGO / GEMINI AI",
    tagline: "Intelligent Library Management System",
    description: "Built a library platform with a React/Redux front end and an Express/MongoDB back end exposing 50+ REST endpoints, with JWT authentication, role-based access for admins and students, rack-assignment workflows, a Google Drive-backed digital library, Socket.io notifications, and an AI chatbot powered by Google Gemini API.",
    link: "https://github.com/Narayaaana11/Matrix-Library-Management-System",
    liveUrl: "https://github.com/Narayaaana11/Matrix-Library-Management-System",
    color: "#3b82f6",
    discipline: "Web Application & AI",
    year: "2026",
    problem: "Aditya University's library relied on legacy systems unable to handle simultaneous student traffic. Librarians spent ~4 hours daily answering repetitive questions about book locations and availability instead of managing core acquisitions and indexing.",
    approach: "Led full-stack engineering of a scalable MERN application exposing 50+ REST endpoints serving 500+ students and 10+ librarians. Designed Redux state management for seamless cataloging and borrowing workflows. Implemented rack-assignment tracking, activity logging, and a Google Drive-backed digital repository. Integrated Google's Gemini API to power an AI library assistant that answers natural language queries about book locations, availability, and overdue rules.",
    features: [
      { title: "Google Gemini AI Library Assistant", description: "AI chatbot powered by Google's Gemini API autonomously resolves 70% of student queries regarding book availability, rack coordinates, and due dates.", image: "/projects/matrix-lms/ai-chatbot.png" },
      { title: "50+ REST Endpoints & RBAC", description: "Modular Express and MongoDB API architecture supporting granular role-based access control, book borrowing/return workflows, and detailed activity logs.", image: "/projects/matrix-lms/lms-dashboard.png" },
      { title: "Digital Library & Real-Time Updates", description: "Google Drive-backed digital e-book library with Socket.io real-time notifications for due date reminders and loan approvals; deployed on Vercel and Render.", image: "/projects/matrix-lms/analytics.png" }
    ],
    techStack: [
      { name: "React.js & Redux", role: "State Management & Frontend" },
      { name: "Node.js & Express", role: "50+ REST API Endpoints" },
      { name: "MongoDB", role: "NoSQL Database & Schemas" },
      { name: "Google Gemini API", role: "Conversational AI Assistant" },
      { name: "Socket.io", role: "Live Notification Events" },
      { name: "Google Drive API", role: "Digital Library Storage" },
      { name: "Vercel & Render", role: "Cloud Production Hosting" }
    ],
    images: [
      { src: "/projects/matrix-lms/lms-dashboard.png", alt: "MATRIX LMS Dashboard", caption: "Librarian administration panel" },
      { src: "/projects/matrix-lms/ai-chatbot.png", alt: "AI Chatbot Interface", caption: "Google Gemini automated student assistant" },
      { src: "/projects/matrix-lms/analytics.png", alt: "Analytics Module", caption: "Real-time library usage analytics" }
    ],
    video: "/projects/matrix-lms/matrix-lms.mp4"
  },
  {
    id: "guard-hub",
    name: "Guard Hub",
    type: "REACT / EXPRESS / NODE / MONGODB",
    tagline: "Campus Security & Roster Management System",
    description: "Developed during internship at Technical Hub Pvt. Ltd. — built security roster, attendance report, and leave/OD management screens in React; developed Express REST API modules (employees, roster, attendance, leave/OD, monthly reports) with end-to-end integration and 15+ resolved Postman test cases.",
    link: "https://github.com/Narayaaana11/Guards-Hub",
    liveUrl: "https://github.com/Narayaaana11/Guards-Hub",
    color: "#f97316",
    discipline: "Security Management",
    year: "2025",
    problem: "Aditya University's security operations managed shifts for over 100 campus security guards using manual spreadsheets. This caused overlapping shifts, missing personnel at sensitive gates, and an administrative overhead of ~10+ hours per week.",
    approach: "Collaborated in a team at Technical Hub to architect and implement Guard Hub. Built React frontend screens for roster management, attendance reporting, and leave/OD workflows. Developed Express REST API modules with MongoDB for personnel records and monthly summaries, validating the full system through Postman test suites and resolving 15+ integration issues before campus rollout.",
    features: [
      { title: "Intelligent Shift Engine & Roster", description: "Auto-rotates General, A, B, and C shifts with constraint validation, conflict detection, and emergency manual override handling.", image: "/projects/guard-hub/dashboard.png" },
      { title: "Attendance & Leave/OD Management", description: "Dedicated screens for daily attendance verification, On-Duty (OD) permissions, and monthly attendance reporting.", image: "/projects/guard-hub/shift-schedule.png" },
      { title: "Role-Based Access Control", description: "Scoped permissions for campus administrators, supervisors, and guards with full audit trails.", image: "/projects/guard-hub/guard-profile.png" }
    ],
    techStack: [
      { name: "React.js", role: "Frontend UI Screens" },
      { name: "Node.js & Express", role: "REST API Modules" },
      { name: "MongoDB", role: "Database Storage" },
      { name: "Postman", role: "API Integration Testing" },
      { name: "Tailwind CSS", role: "UI Styling" }
    ],
    images: [
      { src: "/projects/guard-hub/dashboard.png", alt: "Guard Hub Dashboard", caption: "Admin dashboard — real-time shift overview" },
      { src: "/projects/guard-hub/shift-schedule.png", alt: "Shift Management", caption: "Automated shift rotation interface" },
      { src: "/projects/guard-hub/guard-profile.png", alt: "Guard Profile", caption: "Role-based guard management" }
    ],
    video: "/projects/guard-hub/guard-hub.mp4"
  },
  {
    id: "aqua-feed-erp",
    name: "AQUA FEED ERP",
    type: "ERP / FULL STACK",
    tagline: "Enterprise Resource Planning for Aqua Feed",
    description: "A comprehensive ERP system for aqua feed manufacturing — centralizing inventory, production tracking, and sales into one real-time platform that replaced fragmented spreadsheets and reduced stock discrepancies by ~80%.",
    link: "https://github.com/Narayaaana11/AquaFeed-ERP",
    liveUrl: "#",
    color: "#22c55e",
    problem: "Managing inventory, production tracking, and sales operations for aqua feed manufacturing was done through fragmented systems and manual ledgers. This led to operational bottlenecks, inaccurate stock tracking (causing both overstock and stockouts), and delayed decision-making that cost the business real money every month.",
    approach: "I developed a comprehensive full-stack ERP system customized for the aqua feed industry. The solution centralizes inventory management, streamlines production workflows, and surfaces sales analytics in real-time through an intuitive dashboard. Replaced 4 separate Excel workbooks with a single source of truth.",
    features: [
      { title: "Real-Time Inventory Management", description: "Live tracking of raw materials and finished goods across the production chain — preventing stockouts and reducing overstock by ~40%.", image: "/projects/aqua-feed-erp/erp-dashboard.png" },
      { title: "Production Tracking", description: "End-to-end monitoring of the manufacturing process from raw material allocation to final output — with batch tracking and yield reporting.", image: "/projects/aqua-feed-erp/inventory.png" },
      { title: "Sales & Analytics Dashboard", description: "Interactive analytics with automated daily/weekly reports on revenue, production efficiency, and inventory velocity.", image: "/projects/aqua-feed-erp/analytics.png" }
    ],
    techStack: [
      { name: "React.js", role: "Frontend Dashboard" },
      { name: "Node.js & Express", role: "Backend API" },
      { name: "MongoDB", role: "NoSQL Database" },
      { name: "Tailwind CSS", role: "UI Styling" },
      { name: "JWT", role: "Authentication" }
    ],
    images: [
      { src: "/projects/aqua-feed-erp/erp-dashboard.png", alt: "Aqua Feed ERP Dashboard", caption: "Main ERP dashboard — real-time overview" },
      { src: "/projects/aqua-feed-erp/inventory.png", alt: "Inventory Module", caption: "Real-time stock management" },
      { src: "/projects/aqua-feed-erp/analytics.png", alt: "Analytics", caption: "Sales and production reporting" }
    ],
    video: "/projects/aqua-feed-erp/aqua-feed-erp.mp4"
  },
  {
    id: "ziege",
    name: "ZIEGE AI CLOTHING BRAND",
    type: "FULL STACK / GENERATIVE AI",
    tagline: "AI-Powered Fashion & Apparel",
    description: "An innovative full-stack e-commerce platform for Ziege — an AI clothing brand where customers can explore and request AI-generated apparel designs. Currently in active development with core e-commerce flows complete.",
    link: "https://github.com/Narayaaana11/Ziege-Full-Stack",
    liveUrl: "#",
    color: "#f59e0b",
    problem: "The fashion industry overproduces generic designs. Consumers increasingly want personalized, unique clothing but traditional brands lack the agility to generate custom apparel on demand — leading to waste, poor fit, and unsatisfied customers.",
    approach: "Building a full-stack platform integrating Generative AI into the e-commerce shopping experience. Customers explore unique AI-generated clothing lines or request custom styles. Core MERN infrastructure handles ordering, authentication, and cart management, while the AI design engine (in active development) generates custom apparel prints.",
    features: [
      { title: "Generative AI Design Engine", description: "In active development — AI pipeline to generate unique apparel prints and patterns on demand, personalized to customer preferences and style profiles.", image: "/projects/ziege/storefront.png" },
      { title: "Full E-Commerce Core", description: "Complete shopping cart, secure checkout flow, user authentication (JWT), and order management system — production-ready and deployed.", image: "/projects/ziege/product-view.png" },
      { title: "Scalable Backend Architecture", description: "MERN stack backend engineered to handle concurrent AI generation requests with queue management and async processing.", image: "/projects/ziege/cart.png" }
    ],
    techStack: [
      { name: "React.js", role: "Storefront UI" },
      { name: "Node.js & Express", role: "Backend API" },
      { name: "MongoDB", role: "Product & User Database" },
      { name: "Generative AI", role: "Design Engine (WIP)" },
      { name: "JWT", role: "Authentication" }
    ],
    images: [
      { src: "/projects/ziege/storefront.png", alt: "Ziege Storefront", caption: "AI fashion storefront" },
      { src: "/projects/ziege/product-view.png", alt: "Product View", caption: "AI-generated clothing preview" },
      { src: "/projects/ziege/cart.png", alt: "Shopping Cart", caption: "Seamless checkout flow" }
    ],
    video: "/projects/ziege/ziege.mp4"
  }
];
