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
    id: "guard-hub",
    name: "Guard Hub",
    type: "REACT / EXPRESS / NODE / MONGODB",
    tagline: "Security Management System",
    description: "Architected and implemented a security roster management system for Aditya University in collaboration with Technical Hub, replacing manual spreadsheet-based scheduling for 100+ campus security guards — eliminating scheduling conflicts and saving ~10 hours of admin work per week.",
    link: "https://github.com/Narayaaana11/Guards-Hub",
    liveUrl: "#",
    color: "#f97316",
    discipline: "Security Management",
    year: "2025",
    problem: "Aditya University's security department was managing shifts for over 100 guards using manual spreadsheets. This led to scheduling conflicts, overlapping shifts, missed handoffs, and an inefficient process that was prone to human error and difficult to manage at scale — costing administrators ~10+ hours per week in manual corrections.",
    approach: "I architected and implemented a full-stack MERN security roster management system. I designed an intelligent shift assignment engine that auto-rotates General, A, B, and C shifts on a weekly basis with constraint validation, collision detection, and manual override capabilities. The result: 100% elimination of scheduling conflicts and a 90% reduction in administrative overhead.",
    features: [
      { title: "Intelligent Shift Engine", description: "Auto-rotates 4 shift types (General, A, B, C) weekly with constraint validation and real-time collision detection — reducing scheduling errors to zero.", image: "/projects/guard-hub/dashboard.png" },
      { title: "Manual Override", description: "Administrators can manually override auto-generated schedules with a full audit trail, handling complex edge cases like concurrent requests and emergency replacements.", image: "/projects/guard-hub/shift-schedule.png" },
      { title: "Role-Based Access Control", description: "Secure approval workflows and attendance tracking with comprehensive RBAC — Admin, Supervisor, and Guard roles with scoped permissions.", image: "/projects/guard-hub/guard-profile.png" }
    ],
    techStack: [
      { name: "React.js", role: "Frontend UI" },
      { name: "Node.js", role: "Backend Server" },
      { name: "Express.js", role: "API Framework" },
      { name: "MongoDB", role: "Database" },
      { name: "Tailwind CSS", role: "Styling" }
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
    id: "ausvms",
    name: "AUSVMS",
    type: "MERN STACK / SOCKET.IO",
    tagline: "Aditya University Visitor Management System",
    description: "Built a real-time visitor management platform for Aditya University serving 4 distinct user roles (Admin, Staff, Guard, Visitor) — replacing paper-based logs, reducing entry time by ~60%, and enabling live visitor tracking across campus.",
    link: "https://github.com/Narayaaana11/AUSVMS",
    liveUrl: "#",
    color: "#a855f7",
    problem: "Aditya University needed a secure, efficient way to manage campus visitors. Traditional paper-based entry logs were slow (~3–5 minutes per entry), prone to inaccuracies, and provided zero real-time visibility for administrators and security staff.",
    approach: "I developed a full-stack visitor management system using the MERN stack with Socket.io for real-time communication. I implemented OTP-based visitor check-in (cutting entry time to under 60 seconds), automated email alerts via Nodemailer, and live visitor location tracking — reducing unauthorized entry incidents and giving security teams instant visibility.",
    features: [
      { title: "Multi-Role Dashboards", description: "Four distinct authenticated portals — Admin, Staff, Guard, and Visitor — each with role-scoped permissions and purpose-built UI.", image: "/projects/ausvms/visitor-dashboard.png" },
      { title: "Real-Time Tracking & Alerts", description: "Socket.io powers live visitor location tracking; Nodemailer sends automated email/SMS alerts on entry/exit events to registered staff.", image: "/projects/ausvms/live-tracking.png" },
      { title: "OTP Check-In & Audit Logs", description: "Secure 6-digit OTP verification for guest entry reduces unauthorized access. Comprehensive audit logs with trend analysis for administration.", image: "/projects/ausvms/otp-checkin.png" }
    ],
    techStack: [
      { name: "React.js", role: "Frontend UI" },
      { name: "Node.js & Express", role: "Backend API" },
      { name: "MongoDB", role: "Database" },
      { name: "Socket.io", role: "Real-Time Tracking" },
      { name: "Nodemailer", role: "Email/SMS Alerts" }
    ],
    images: [
      { src: "/projects/ausvms/visitor-dashboard.png", alt: "AUSVMS Dashboard", caption: "Multi-role system overview" },
      { src: "/projects/ausvms/live-tracking.png", alt: "Live Visitor Tracking", caption: "Real-time campus visitor monitoring" },
      { src: "/projects/ausvms/otp-checkin.png", alt: "OTP Check-In", caption: "Secure OTP-based entry flow" }
    ],
    video: "/projects/ausvms/ausvms.mp4"
  },
  {
    id: "matrix-lms",
    name: "MATRIX LMS",
    type: "MERN STACK / AI CHATBOT",
    tagline: "Intelligent Library Management System",
    description: "A production library management system deployed at Aditya University, serving 500+ students and 10+ librarians — with an AI chatbot that autonomously handles 70% of student inquiries and a CI/CD pipeline on Vercel and Render.",
    link: "https://github.com/Narayaaana11/Matrix-Library-Management-System",
    liveUrl: "#",
    color: "#3b82f6",
    problem: "Aditya University's library relied on a legacy system that couldn't handle simultaneous operations. Librarians spent ~4 hours daily answering repetitive questions about book availability and rack locations instead of managing core library functions.",
    approach: "Led full-stack development of a scalable MERN application serving 500+ concurrent users. Architected robust MongoDB schemas with aggregation pipelines for real-time analytics. Integrated an NLP-powered chatbot that autonomously resolves 70% of student queries — freeing up librarian time for high-value work. Deployed with GitHub Actions CI/CD for zero-downtime updates.",
    features: [
      { title: "AI-Powered Chatbot", description: "NLP-driven chatbot autonomously resolves 70% of student inquiries about book availability, rack positions, and due dates — reducing librarian query load from ~4 hours/day to under 1 hour.", image: "/projects/matrix-lms/lms-dashboard.png" },
      { title: "Admin Analytics Dashboard", description: "MongoDB aggregation pipelines power real-time library analytics — most borrowed books, peak usage hours, overdue trends, and librarian performance metrics.", image: "/projects/matrix-lms/ai-chatbot.png" },
      { title: "Zero-Downtime CI/CD", description: "Frontend deployed on Vercel, backend on Render, with GitHub Actions automating build, test, and deploy on every commit — 99.9% uptime since launch.", image: "/projects/matrix-lms/analytics.png" }
    ],
    techStack: [
      { name: "React.js", role: "Frontend UI" },
      { name: "Node.js & Express", role: "Backend API" },
      { name: "MongoDB", role: "Database & Aggregations" },
      { name: "NLP Chatbot", role: "AI Student Assistant" },
      { name: "GitHub Actions", role: "CI/CD Pipeline" },
      { name: "Vercel & Render", role: "Cloud Hosting" }
    ],
    images: [
      { src: "/projects/matrix-lms/lms-dashboard.png", alt: "MATRIX LMS Dashboard", caption: "Librarian administration panel" },
      { src: "/projects/matrix-lms/ai-chatbot.png", alt: "AI Chatbot Interface", caption: "Automated student inquiry resolution" },
      { src: "/projects/matrix-lms/analytics.png", alt: "Analytics Module", caption: "Real-time library usage analytics" }
    ],
    video: "/projects/matrix-lms/matrix-lms.mp4"
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
