import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/getPortfolioData";
import type { PortfolioData } from "@/types/portfolio";
import { logger } from "@/lib/logger";

export async function GET() {
  try {
    const data: PortfolioData = await getPortfolioData();
    logger.info(
      `API /api/portfolio response - dbUnresponsive:${data.isDbUnresponsive} projects:${data.projects.length} experience:${data.experienceData.length} education:${data.educationData.length} socials:${data.socialLinks.length}`,
    );
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    logger.error("/api/portfolio GET failed", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 },
    );
  }
}
