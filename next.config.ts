import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*?\//, "") || "skill-bridge";
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: assetPrefix || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
