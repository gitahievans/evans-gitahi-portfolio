export type Profile = {
  name: string;
  greeting: string;
  role: string;
  summary: string;
  logoSubtitle: string;
  email: string;
  resume: string;
  socials: { label: string; href: string }[];
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    evidence: { label: string; items: { title: string; detail?: string }[] }[];
  };
  copyright: string;
};
export const profile = {
  "name": "Evans Gitahi",
  "greeting": "Hello, I'm",
  "role": "A Full-Stack Developer & DevOps Engineer",
  "summary": "I build production-ready applications across the stack, then design the delivery pipelines and containerised infrastructure that keep them reliable.",
  "logoSubtitle": "Full-Stack & DevOps",
  "email": "evanygk@gmail.com",
  "resume": "/Evans_Gitahi_Resume.pdf",
  "socials": [
    {
      "label": "LinkedIn",
      "href": "https://www.linkedin.com/in/evans-gitahi/"
    },
    {
      "label": "GitHub",
      "href": "https://github.com/gitahievans"
    }
  ],
  "about": {
    "eyebrow": "Engineering Across Boundaries",
    "heading": "About Me",
    "paragraphs": [
      "I am a software engineer who works across product development, backend systems, and the infrastructure that carries them into production.",
      "I build TypeScript, Angular, React, and Next.js interfaces; design Python, Django, C# and .NET services; and translate business requirements into APIs, data models, asynchronous workflows, and deployable systems. That full lifecycle view helps me make decisions with operability, failure, and maintainability in mind."
    ],
    "evidence": [
      {
        "label": "Engineering focus",
        "items": [
          {
            "title": "Backend, API engineering and microservices"
          }
        ]
      },
      {
        "label": "Education",
        "items": [
          {
            "title": "Software Engineering",
            "detail": "Moringa School"
          },
          {
            "title": "B.Sc. Mechanical and Manufacturing Engineering",
            "detail": "Multimedia University of Kenya"
          }
        ]
      },
      {
        "label": "Cloud-native credentials",
        "items": [
          {
            "title": "Kubernetes and Cloud Native Associate (KCNA)",
            "detail": "The Linux Foundation"
          },
          {
            "title": "Introduction to Kubernetes (LFS158)",
            "detail": "The Linux Foundation"
          }
        ]
      }
    ]
  },
  "copyright": "Copyright © 2026 Evans Gitahi. All Rights Reserved."
} satisfies Profile;
