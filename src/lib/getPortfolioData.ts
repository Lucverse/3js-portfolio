import type { PortfolioData } from "../types/portfolio";
import connectDB from "./db";
import PortfolioConfig from "../models/PortfolioConfig";
import Project from "../models/Project";
import Experience from "../models/Experience";
import Education from "../models/Education";
import rawData from "@/lib/data";
import { logger } from "@/lib/logger";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    if (!process.env.MONGODB_URI) {
      logger.warn("MONGODB_URI is not set; serving rawData fallback");
      return {
        ...rawData,
        isDbUnresponsive: false,
      };
    }

    await connectDB();
    logger.info("Fetching portfolio documents from MongoDB");

    const configDoc = await PortfolioConfig.findOne({
      configId: "main",
    }).lean();
    const projectsDocs = await Project.find({}).sort({ order: 1 }).lean();
    const experienceDocs = await Experience.find({}).sort({ order: 1 }).lean();
    const educationDocs = await Education.find({}).sort({ order: 1 }).lean();

    logger.info(
      `MongoDB document counts - config:${configDoc ? 1 : 0} projects:${projectsDocs.length} experience:${experienceDocs.length} education:${educationDocs.length}`,
    );

    // 1. Config & Metadata Fallback
    const name = configDoc?.name ?? rawData.name;
    const birthYear = configDoc?.birthYear ?? rawData.birthYear;
    const email = configDoc?.email ?? rawData.email;
    const phone = configDoc?.phone ?? rawData.phone;
    const title =
      configDoc?.title?.length && configDoc.title
        ? [...configDoc.title]
        : [...rawData.title];
    const address = configDoc?.address
      ? {
          city: configDoc.address.city || "",
          state: configDoc.address.state || "",
          pincode: configDoc.address.pincode || "",
          country: configDoc.address.country || "",
        }
      : { ...rawData.address };
    const siteMetadata = configDoc?.siteMetadata
      ? {
          siteUrl: configDoc.siteMetadata.siteUrl || "",
          siteName: configDoc.siteMetadata.siteName || "",
          title: configDoc.siteMetadata.title || "",
          description: configDoc.siteMetadata.description || "",
          ogDescription: configDoc.siteMetadata.ogDescription || "",
          ogImage: configDoc.siteMetadata.ogImage || "",
          favicon: configDoc.siteMetadata.favicon || "",
          themeColor: configDoc.siteMetadata.themeColor || "",
        }
      : rawData.siteMetadata;

    // 2. Projects Fallback
    const projects =
      projectsDocs && projectsDocs.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          projectsDocs.map((p: any) => ({
            title: p.title || "",
            role: p.role || "",
            duration: p.duration || "",
            tags: Array.isArray(p.tags) ? [...p.tags] : [],
            description: p.description || "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            techStack: (p.techStack || []).map((t: any) => ({
              name: t.name || "",
              icon: t.icon || "",
            })),
            detailedDescription: p.detailedDescription
              ? {
                  desc: p.detailedDescription.desc || "",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  keyPoints: (p.detailedDescription.keyPoints || []).map(
                    (kp: any) => ({
                      label: kp.label || "",
                      image: kp.image || "",
                    }),
                  ),
                }
              : undefined,
            url: p.url || "",
            repo: p.repo || "",
          }))
        : rawData.projects;

    // 3. Experience Fallback
    const experienceData =
      experienceDocs && experienceDocs.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          experienceDocs.map((e: any) => ({
            title: e.title || "",
            date: e.date || "",
            company: e.company || "",
            description: e.description || "",
          }))
        : rawData.experienceData;

    // 4. Education Fallback
    const educationData =
      educationDocs && educationDocs.length > 0
        ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
          educationDocs.map((ed: any) => ({
            title: ed.title || "",
            date: ed.date || "",
            institution: ed.institution || "",
            description: ed.description || "",
          }))
        : rawData.educationData;

    const result: PortfolioData = {
      name,
      birthYear,
      email,
      phone,
      isDbUnresponsive: false,
      title,
      address,
      experienceData,
      educationData,
      projects,
      socialLinks:
        configDoc?.socialLinks && configDoc.socialLinks.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            configDoc.socialLinks.map((s: any) => ({
              title: s.title || "",
              url: s.url || "",
              imageUrl: s.imageUrl || "",
              alt: s.alt || "",
            }))
          : rawData.socialLinks,
      siteMetadata,
    };

    // Ensure 100% plain JSON object serialization for React Server Components
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    logger.error("Error fetching dynamic portfolio data from MongoDB", error);
    return {
      ...rawData,
      isDbUnresponsive: true,
    };
  }
}

export default getPortfolioData;
