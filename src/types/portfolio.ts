// Shared TypeScript interfaces for the portfolio data model

export interface TechItem {
  name: string;
  icon?: string;
}

export interface KeyPoint {
  label: string;
  image?: string;
}

export interface DetailedDescription {
  desc: string;
  keyPoints?: KeyPoint[];
}

export interface Project {
  title: string;
  role?: string;
  duration?: string;
  tags?: string[];
  description: string;
  techStack: TechItem[];
  detailedDescription?: DetailedDescription;
  url?: string;
  repo?: string;
}

export interface ExperienceItem {
  title: string;
  date: string;
  company: string;
  description: string;
}

export interface EducationItem {
  title: string;
  date: string;
  institution: string;
  description: string;
}

export interface Address {
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface SocialLink {
  title: string;
  url: string;
  imageUrl: string;
  alt?: string;
}

export interface PortfolioData {
  name: string;
  age: number;
  email: string;
  phone: string;
  title: string;
  address: Address;
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
  projects: Project[];
  socialLinks: SocialLink[];
}
