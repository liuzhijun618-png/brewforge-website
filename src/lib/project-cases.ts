import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

export type ProjectCase = {
  title: string;
  slug: string;
  imageUrl: string;
};

export type ProjectCaseDetail = ProjectCase & {
  imageUrls: string[];
  summary: string;
  capacity?: string;
  market?: string;
  keywords: string[];
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function isImageFile(name: string) {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex < 0) {
    return false;
  }

  return IMAGE_EXTENSIONS.has(name.slice(dotIndex).toLowerCase());
}

function toPublicImageUrl(publicDir: string, imagePath: string) {
  const relativePath = relative(publicDir, imagePath).replace(/\\/g, "/");
  return encodeURI(`/${relativePath}`);
}

function extractCapacity(title: string) {
  const match = title.match(/\b(\d+(?:,\d{3})?\s?(?:L|HL|BBL))\b/i);
  return match?.[1]?.replace(/\s+/g, " ");
}

function inferMarket(title: string) {
  const markets = [
    "UK",
    "Vietnam",
    "South Korea",
    "Japan",
    "Australia",
    "United States",
    "Germany",
    "Thailand",
    "Canada",
    "Chile",
    "Wuhan",
    "Shenzhen",
    "Chongqing",
    "Shanghai",
  ];

  return markets.find((market) => title.toLowerCase().includes(market.toLowerCase()));
}

function buildCaseSummary(title: string, imageCount: number, capacity?: string, market?: string) {
  const scope = [capacity, market].filter(Boolean).join(" project for ");

  if (scope) {
    return `${title}. Review a ${scope} with ${imageCount} project photos covering equipment delivery and installation progress.`;
  }

  return `${title}. Review ${imageCount} project photos covering brewery equipment delivery, installation, and commissioning progress.`;
}

function buildKeywords(title: string, capacity?: string, market?: string) {
  return [
    title,
    capacity ? `${capacity} brewery project` : null,
    market ? `${market} brewery installation` : null,
    "brewery project case",
    "turnkey brewery project",
    "brewery equipment installation",
    "commercial brewery case study",
  ].filter((keyword): keyword is string => Boolean(keyword));
}

async function collectImagePaths(dirPath: string): Promise<string[]> {
  const entries = await readdir(dirPath, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => join(dirPath, entry.name))
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

  const subDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "zh-Hans-CN", { numeric: true }));

  const nestedFiles = await Promise.all(subDirs.map((subDir) => collectImagePaths(join(dirPath, subDir))));

  return [...files, ...nestedFiles.flat()];
}

export async function loadProjectCases(): Promise<ProjectCase[]> {
  const publicDir = join(process.cwd(), "public");
  const projectRoot = join(publicDir, "images", "project");

  try {
    const entries = await readdir(projectRoot, { withFileTypes: true });
    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => b.localeCompare(a, "zh-Hans-CN", { numeric: true }));

    const output: ProjectCase[] = [];

    for (const folderName of folders) {
      const folderPath = join(projectRoot, folderName);
      const imagePaths = await collectImagePaths(folderPath);

      if (imagePaths.length === 0) {
        continue;
      }

      output.push({
        title: folderName,
        slug: folderName,
        imageUrl: toPublicImageUrl(publicDir, imagePaths[0]),
      });
    }

    return output;
  } catch {
    return [];
  }
}

export async function loadProjectCaseBySlug(slug: string): Promise<ProjectCaseDetail | null> {
  const publicDir = join(process.cwd(), "public");
  const folderPath = join(publicDir, "images", "project", slug);

  try {
    const imagePaths = await collectImagePaths(folderPath);

    if (imagePaths.length === 0) {
      return null;
    }

    const capacity = extractCapacity(slug);
    const market = inferMarket(slug);

    return {
      title: slug,
      slug,
      imageUrl: toPublicImageUrl(publicDir, imagePaths[0]),
      imageUrls: imagePaths.map((imagePath) => toPublicImageUrl(publicDir, imagePath)),
      summary: buildCaseSummary(slug, imagePaths.length, capacity, market),
      capacity,
      market,
      keywords: buildKeywords(slug, capacity, market),
    };
  } catch {
    return null;
  }
}