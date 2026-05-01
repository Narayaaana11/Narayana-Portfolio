export interface ProjectDetail {
  id: string;
  name: string;
  type: string;
  tagline: string;
  description: string;
  link?: string;
  color: string;
  problem: string;
  approach: string;
  features: { title: string; description: string; image?: string }[];
  techStack: { name: string; role: string }[];
  images: { src: string; alt: string; caption: string }[];
}

export const projectDetails: ProjectDetail[] = [
  {
    id: "pureplate",
    name: "PUREPLATE",
    type: "REACT / NEXT.JS / AI",
    tagline: "AI-powered food transparency platform",
    description: "PurePlate exposes hidden sugars and complex additives in food products through an AI-powered insights engine, turning deceptive labels into undeniable truth. Scan any product and get an instant breakdown of what's really inside.",
    link: "https://pureplate.arinpattnaik.me/",
    color: "#f97316",
    problem: "Food labels are designed to confuse. Ingredients are buried in scientific names, sugar is split across 50+ aliases, and 'natural flavoring' can mean almost anything. Consumers deserve transparency, but the industry profits from complexity.",
    approach: "Built a full-stack Next.js application with an AI engine that parses ingredient lists, identifies hidden sugars and additives by cross-referencing a comprehensive database, and generates a plain-English health assessment. The frontend uses React with Tailwind CSS for a clean, scannable interface.",
    features: [
      { title: "AI Ingredient Analysis", description: "Paste any ingredient list and get an instant breakdown — hidden sugars identified, additives flagged, and a clear health score.", image: "/projects/pureplate/feature-analysis.png" },
      { title: "Sugar Alias Detection", description: "Detects 50+ sugar aliases that manufacturers use to disguise sugar content across multiple line items.", image: "/projects/pureplate/feature-sugar.png" },
      { title: "Additive Risk Scoring", description: "Each additive is scored based on research-backed risk levels, from harmless to concerning.", image: "/projects/pureplate/feature-additives.png" }
    ],
    techStack: [
      { name: "Next.js", role: "Full-stack framework with API routes" },
      { name: "React", role: "Component-based UI" },
      { name: "Tailwind CSS", role: "Utility-first styling" },
      { name: "Google Gemini AI", role: "Ingredient analysis engine" },
      { name: "TypeScript", role: "Type-safe development" },
      { name: "Vercel", role: "Deployment & edge functions" }
    ],
    images: [
      { src: "/projects/pureplate/hero.png", alt: "PurePlate homepage", caption: "The main interface — paste an ingredient list and get instant analysis" },
      { src: "/projects/pureplate/results.png", alt: "PurePlate analysis results", caption: "Detailed breakdown showing hidden sugars and additive risk scores" }
    ]
  },
  {
    id: "vera",
    name: "VÉRA",
    type: "REACT / NLP",
    tagline: "NLP-powered greenwashing scanner for fashion",
    description: "Véra uses natural language processing to scan fashion product pages and detect greenwashing — vague sustainability claims that don't hold up to scrutiny. Paste a product link, get the True Eco-Score.",
    link: "https://vera.arinpattnaik.me/",
    color: "#10b981",
    problem: "Fashion brands spend millions on 'sustainable' marketing while their actual practices tell a different story. Terms like 'eco-friendly', 'conscious', and 'green collection' are unregulated and often meaningless. Consumers have no way to verify these claims.",
    approach: "Built an NLP pipeline that scrapes product pages, extracts sustainability claims, and cross-references them against a database of verified certifications and known greenwashing patterns. The scoring algorithm weighs specificity, verifiability, and third-party backing to produce a True Eco-Score.",
    features: [
      { title: "Greenwashing Detection", description: "NLP engine identifies vague, unsubstantiated sustainability claims and flags them with specific reasons.", image: "/projects/vera/feature-detection.png" },
      { title: "True Eco-Score", description: "A transparent scoring system that rates products based on verifiable environmental claims, not marketing language.", image: "/projects/vera/feature-score.png" },
      { title: "Claim Breakdown", description: "Each sustainability claim is analyzed individually — verified claims boost the score, vague ones lower it.", image: "/projects/vera/feature-claims.png" }
    ],
    techStack: [
      { name: "React", role: "Frontend interface" },
      { name: "NLP Pipeline", role: "Text analysis & claim extraction" },
      { name: "Python", role: "Backend processing" },
      { name: "Tailwind CSS", role: "Responsive styling" },
      { name: "Web Scraping", role: "Product page data extraction" }
    ],
    images: [
      { src: "/projects/vera/hero.png", alt: "Véra homepage", caption: "Paste a product URL and Véra scans it for greenwashing" },
      { src: "/projects/vera/results.png", alt: "Véra scan results", caption: "Detailed claim-by-claim analysis with the True Eco-Score" }
    ]
  },
  {
    id: "churnguard",
    name: "CHURNGUARD",
    type: "REACT / ML / SHAP",
    tagline: "ML-powered customer churn prediction",
    description: "ChurnGuard predicts which customers are about to leave, explains why with SHAP, quantifies the revenue at risk, and generates targeted retention strategies — all from a single CSV upload.",
    link: "https://churnguard.arinpattnaik.me/",
    color: "#e11d48",
    problem: "Businesses lose customers silently. By the time churn is visible in the numbers, it's too late. Traditional dashboards show what happened — they don't predict what's about to happen or explain why.",
    approach: "Built an end-to-end ML pipeline with XGBoost for prediction and SHAP for explainability. The system processes uploaded customer data, trains a model, scores every customer's churn probability, and generates per-segment retention strategies. The React frontend makes the entire workflow accessible to non-technical users.",
    features: [
      { title: "Risk Scoring", description: "ML-powered churn probability for every customer, ranked by risk level with confidence intervals.", image: "/projects/churnguard/feature-risk.png" },
      { title: "SHAP Explanations", description: "Every prediction comes with a visual explanation of what's driving it — no black box.", image: "/projects/churnguard/feature-shap.png" },
      { title: "Revenue Impact", description: "Quantifies the total revenue at risk and projects savings from targeted retention efforts.", image: "/projects/churnguard/feature-revenue.png" },
      { title: "Retention Strategies", description: "Auto-generated, segment-specific recommendations for reducing churn.", image: "/projects/churnguard/feature-retention.png" }
    ],
    techStack: [
      { name: "React", role: "Interactive frontend" },
      { name: "XGBoost", role: "Churn prediction model" },
      { name: "SHAP", role: "Model explainability" },
      { name: "Python", role: "ML pipeline & API" },
      { name: "Pandas", role: "Data processing" },
      { name: "TypeScript", role: "Type-safe frontend" }
    ],
    images: [
      { src: "/projects/churnguard/hero.png", alt: "ChurnGuard dashboard", caption: "Upload customer data and get instant churn predictions" },
      { src: "/projects/churnguard/results.png", alt: "ChurnGuard analysis", caption: "SHAP explanations showing what drives each prediction" }
    ]
  },
  {
    id: "globaljob",
    name: "GLOBAL JOB MARKET",
    type: "PYTHON / STREAMLIT",
    tagline: "Global employment analytics platform",
    description: "A data-driven analytics platform providing deep insights into global employment trends. Analyzes extensive datasets to uncover patterns in high-demand skills, salary distributions, and regional job market dynamics.",
    link: "https://global-job-market-intelligence-platform-arin.streamlit.app/",
    color: "#0ea5e9",
    problem: "Job market data is scattered across dozens of platforms, each with its own biases and blind spots. Job seekers and analysts lack a unified view of global employment trends, making it hard to identify where demand is heading.",
    approach: "Built a Streamlit-powered analytics platform that ingests and normalizes job market data from multiple sources. The platform features interactive filters, statistical visualizations, and trend analysis tools that let users explore employment patterns across regions, industries, and skill sets.",
    features: [
      { title: "Trend Analysis", description: "Interactive time-series visualizations showing how demand for specific skills and roles evolves over time.", image: "/projects/globaljob/feature-trends.png" },
      { title: "Salary Intelligence", description: "Distribution analysis of compensation across roles, experience levels, and geographies.", image: "/projects/globaljob/feature-salary.png" },
      { title: "Skills Demand Mapping", description: "Heatmaps and rankings showing which technical and soft skills are most in-demand globally.", image: "/projects/globaljob/feature-skills.png" }
    ],
    techStack: [
      { name: "Python", role: "Data processing & analysis" },
      { name: "Streamlit", role: "Interactive web application" },
      { name: "Pandas", role: "Data manipulation" },
      { name: "Plotly", role: "Interactive visualizations" },
      { name: "NumPy", role: "Statistical computations" }
    ],
    images: [
      { src: "/projects/globaljob/hero.png", alt: "Global Job Market dashboard", caption: "The main analytics dashboard with interactive filters" },
      { src: "/projects/globaljob/results.png", alt: "Skills analysis", caption: "Skills demand heatmap across regions" }
    ]
  },
  {
    id: "ecom",
    name: "E-COMMERCE ANALYTICS",
    type: "PYTHON / STREAMLIT",
    tagline: "Universal sales analytics platform",
    description: "A universal analytics platform that auto-detects data types to build interactive dashboards, correlation matrices, and AI-powered insights. Includes specialized e-commerce deep-dive features for sales analysis.",
    link: "https://ecommerce-sales-analysis-arin.streamlit.app/",
    color: "#a78bfa",
    problem: "Small and mid-size e-commerce businesses generate tons of sales data but lack the tools or expertise to extract actionable insights from it. Generic BI tools require extensive setup and technical knowledge.",
    approach: "Built a Streamlit application with an intelligent schema detection engine that automatically identifies data types, suggests relevant visualizations, and generates insights. The platform adapts to any CSV upload — not just e-commerce data — making it a universal analytics tool.",
    features: [
      { title: "Auto Schema Detection", description: "Upload any CSV and the platform automatically identifies columns, data types, and suggests relevant analyses.", image: "/projects/ecom/feature-schema.png" },
      { title: "Correlation Matrices", description: "Automatically generated correlation analysis revealing hidden relationships between variables.", image: "/projects/ecom/feature-correlation.png" },
      { title: "AI-Powered Insights", description: "Natural language summaries of key findings, trends, and anomalies in the data.", image: "/projects/ecom/feature-insights.png" }
    ],
    techStack: [
      { name: "Python", role: "Core analytics engine" },
      { name: "Streamlit", role: "Interactive web interface" },
      { name: "Pandas", role: "Data processing" },
      { name: "Matplotlib/Seaborn", role: "Statistical visualizations" },
      { name: "NumPy", role: "Numerical computations" }
    ],
    images: [
      { src: "/projects/ecom/hero.png", alt: "E-Commerce Analytics dashboard", caption: "Auto-generated dashboard from uploaded sales data" },
      { src: "/projects/ecom/results.png", alt: "Correlation analysis", caption: "Correlation matrix revealing hidden patterns in sales data" }
    ]
  },
  {
    id: "etl",
    name: "ETL PIPELINE",
    type: "SQL / PYTHON",
    tagline: "Automated data extraction & transformation",
    description: "An automated data extraction and transformation pipeline handling 50GB+ of daily data, reducing manual reporting by 15 hours per week through intelligent scheduling and error handling.",
    color: "#6b7280",
    problem: "Manual data reporting consumed 15+ hours per week — extracting from multiple sources, cleaning inconsistencies, transforming formats, and loading into analytics databases. Error-prone and unsustainable at scale.",
    approach: "Designed and built an automated ETL pipeline using Python and SQL that handles the entire data lifecycle. The system extracts from multiple sources, applies configurable transformation rules, handles errors gracefully with retry logic, and loads clean data into the target warehouse on a scheduled basis.",
    features: [
      { title: "Multi-Source Extraction", description: "Pulls data from databases, APIs, and flat files with configurable connectors.", image: "/projects/etl/feature-extract.png" },
      { title: "Transformation Engine", description: "Rule-based data cleaning, normalization, and enrichment with full audit logging.", image: "/projects/etl/feature-transform.png" },
      { title: "Error Handling", description: "Automatic retry logic, dead-letter queues, and alerting for failed pipeline runs.", image: "/projects/etl/feature-errors.png" }
    ],
    techStack: [
      { name: "Python", role: "Pipeline orchestration" },
      { name: "SQL", role: "Data transformation queries" },
      { name: "PostgreSQL", role: "Target data warehouse" },
      { name: "Pandas", role: "Data processing" },
      { name: "Cron/Scheduler", role: "Automated execution" }
    ],
    images: [
      { src: "/projects/etl/hero.png", alt: "ETL Pipeline architecture", caption: "Pipeline architecture handling 50GB+ daily" }
    ]
  }
];
