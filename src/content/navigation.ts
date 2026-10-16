export const navigation = [
  { id: "about", label: "About" },
  { id: "experience", label: "Skills" },
  { id: "career", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type NavigationSection = (typeof navigation)[number]["id"];
