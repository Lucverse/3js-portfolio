import type { PortfolioData } from "@/types/portfolio";

export const rawData: PortfolioData = {
  name: "Ujjawal Singh",
  birthYear: 2000,
  email: "Ujjw4l.singh@gmail.com",
  phone: "+91 9654736193",
  isDbUnresponsive: false,
  title: ["Senior Full-Stack Engineer", "Enterprise SaaS & AI"],
  address: {
    city: "New Delhi",
    state: "Delhi",
    pincode: "110030",
    country: "India",
  },
  experienceData: [],
  educationData: [],
  projects: [],
  socialLinks: [],
  siteMetadata: {
    siteUrl: "https://www.lucverse.com",
    siteName: "Lucverse Portfolio",
    title: "Ujjawal Singh | Senior Full-Stack Engineer",
    description:
      "Portfolio of Ujjawal Singh, Senior Full-Stack Engineer specializing in enterprise SaaS, AI platforms, and 3D WebGL applications.",
    ogDescription:
      "Senior Full-Stack Engineer building enterprise SaaS, AI platforms, & 3D WebGL web apps. View projects & architecture.",
    ogImage: "/meta-data-image.webp",
    favicon: "/pageicon.svg",
    themeColor: "#0f0f10",
  },
};

export default rawData;
