import { defineConfig } from "@editlayer/next/server";

export default defineConfig({
  siteUrl: process.env.EDITLAYER_SITE_URL ?? "http://localhost:3000",
  owners: process.env.EDITLAYER_OWNERS?.split(",").map((s) => s.trim()) ?? [],
  editors: process.env.EDITLAYER_EDITORS?.split(",").map((s) => s.trim()) ?? [],
  github: {
    token: process.env.EDITLAYER_GITHUB_TOKEN,
    repo: process.env.EDITLAYER_GITHUB_REPO,
    branch: process.env.EDITLAYER_GITHUB_BRANCH ?? "main",
  },
  auth: {
    secret: process.env.EDITLAYER_SECRET ?? "",
    resendApiKey: process.env.EDITLAYER_RESEND_API_KEY,
    emailFrom: process.env.EDITLAYER_EMAIL_FROM,
  },
});
