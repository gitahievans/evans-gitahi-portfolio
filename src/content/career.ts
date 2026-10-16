export type CareerContent = {
  eyebrow: string;
  heading: string;
  statistics: { value: string; label: string }[];
  roles: {
    period: string; date: string; company: string; role: string; initial: string;
    current: boolean; achievements: string[]; technologies: string[];
  }[];
};
export const career = {
  "eyebrow": "Discover My",
  "heading": "Professional Journey",
  "statistics": [
    {
      "value": "3+",
      "label": "Years Experience"
    },
    {
      "value": "85%",
      "label": "Less Manual Deployment Effort"
    },
    {
      "value": "50%",
      "label": "Faster Shipping Cycles"
    }
  ],
  "roles": [
    {
      "period": "2024 - Present",
      "date": "Jan 2024 - Present",
      "company": "Techridian",
      "role": "Full-Stack Developer · Contract",
      "initial": "T",
      "current": true,
      "achievements": [
        "Build and maintain full-stack Angular and Django applications for clients across East Africa",
        "Translate Figma designs into pixel-accurate, production-ready interfaces while contributing to UX decisions",
        "Turn business requirements into database models, backend services, API contracts, and frontend integrations",
        "Own infrastructure and deployment across staging and production environments",
        "Contribute to code reviews and unit, integration, and end-to-end testing"
      ],
      "technologies": [
        "TypeScript",
        "Angular",
        "Django",
        "PostgreSQL",
        "RabbitMQ",
        "Docker",
        "Testing"
      ]
    },
    {
      "period": "2025 - 2026",
      "date": "2025 - Jul 2026",
      "company": "Cognativ",
      "role": "Full Stack Developer & DevOps Engineer · USA, Remote",
      "initial": "C",
      "current": false,
      "achievements": [
        "Built .NET backend and Angular frontend features within a microservices architecture",
        "Built GitHub Actions pipelines on self-hosted runners, reducing manual deployment effort by about 85% across 10+ servers",
        "Created internal self-service platforms for real-time dev and QA visibility, cutting shipping time by 50%",
        "Implemented secrets and access management with Docker secrets, Azure Key Vault, environment-based configuration, and SSH keys",
        "Managed Docker Swarm clusters, Proxmox virtual machines, and Azure infrastructure while standardising container practices",
        "Documented and tested APIs with Swagger and Postman, and led cross-layer troubleshooting to minimise downtime"
      ],
      "technologies": [
        "Azure",
        ".NET",
        "Angular",
        "Microservices",
        "Docker Swarm",
        "GitHub Actions",
        "Proxmox",
        "Azure Key Vault",
        "Swagger"
      ]
    },
    {
      "period": "2023 - 2025",
      "date": "Aug 2023 - Nov 2025",
      "company": "YAKWETU™ Online Limited",
      "role": "Front-end Developer · Nairobi, Kenya",
      "initial": "Y",
      "current": false,
      "achievements": [
        "Built scalable frontend applications with TypeScript, Next.js, and React Native for YAKWETU's entertainment platform",
        "Led development of the MyMovies Africa mini-app on the M-PESA App",
        "Integrated Sentry and Vercel monitoring to track Core Web Vitals and production errors"
      ],
      "technologies": [
        "Next.js",
        "React Native",
        "Sentry",
        "Vercel"
      ]
    }
  ]
} satisfies CareerContent;
