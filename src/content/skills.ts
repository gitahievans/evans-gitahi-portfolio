export type SkillsContent = {
  eyebrow: string;
  heading: string;
  groups: { index: string; title: string; summary: string; rows: { label: string; value: string }[] }[];
};
export const skills = {
  "eyebrow": "Capabilities in Practice",
  "heading": "Engineering Skills",
  "groups": [
    {
      "index": "01 / Product interfaces",
      "title": "Frontend Systems",
      "summary": "Production web and mobile experiences built for performance, accessibility, and maintainable delivery.",
      "rows": [
        {
          "label": "Core",
          "value": "TypeScript, JavaScript, Angular, React, Next.js, React Native"
        },
        {
          "label": "Interface",
          "value": "HTML5, CSS3, SCSS, Tailwind CSS, responsive UI"
        },
        {
          "label": "Quality",
          "value": "Jest, React Testing Library, REST integration, Three.js, React Three Fiber"
        }
      ]
    },
    {
      "index": "02 / Services and data",
      "title": "Backend & Architecture",
      "summary": "Business requirements translated into service boundaries, data models, contracts, and asynchronous workflows.",
      "rows": [
        {
          "label": "Services",
          "value": "Python, Django, C#, .NET"
        },
        {
          "label": "Architecture",
          "value": "RESTful API design, Swagger/OpenAPI, microservices"
        },
        {
          "label": "Data and async",
          "value": "PostgreSQL schema design, RabbitMQ, Temporal"
        }
      ]
    },
    {
      "index": "03 / Platform ownership",
      "title": "DevOps & Infrastructure",
      "summary": "Repeatable delivery systems and environments that engineering teams can operate without friction.",
      "rows": [
        {
          "label": "Runtime",
          "value": "Azure, Docker, Docker Swarm, Nginx"
        },
        {
          "label": "Delivery",
          "value": "Git, GitHub Actions, CI/CD, shell scripting"
        },
        {
          "label": "Operations",
          "value": "Proxmox, Gitea, Harbor, Wiki.js, Portainer"
        }
      ]
    }
  ]
} satisfies SkillsContent;
