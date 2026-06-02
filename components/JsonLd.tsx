const SITE_URL = "https://editlayer.dev";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EditLayer",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  sameAs: [
    "https://github.com/zlatkomarjanovic/editlayer-landing",
    "https://www.npmjs.com/package/@editlayer/next",
  ],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EditLayer",
  url: SITE_URL,
  description:
    "Open-source npm package for live in-page content editing in Next.js. No CMS, no database, no vendor lock-in.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const software = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EditLayer",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  downloadUrl: "https://www.npmjs.com/package/@editlayer/next",
  description:
    "Add live in-page editing to any Next.js site. Editors log in with a magic link, click editable fields directly on the page, and publish. Changes commit to GitHub and Vercel redeploys automatically.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  license: "https://opensource.org/licenses/MIT",
  softwareVersion: "0.3.1",
  author: {
    "@type": "Organization",
    name: "EditLayer",
    url: SITE_URL,
  },
};

const faqPage = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is EditLayer a CMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. EditLayer is a thin editing layer that sits on top of your existing Next.js app. There's no external service, no dashboard, and no content schema. Your content lives in a JSON file committed directly to your GitHub repo.",
      },
    },
    {
      "@type": "Question",
      name: "Where does my content get stored?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In editlayer/content.json inside your own GitHub repository. When you publish, EditLayer commits the file via the GitHub API. Vercel detects the commit and redeploys automatically. You own everything.",
      },
    },
    {
      "@type": "Question",
      name: "What if an editor breaks the site?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Editors can only save drafts. They cannot publish. Only owners (set via env vars) can push changes live. Every publish is a real git commit, so you can always revert via GitHub if something goes wrong.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a database or server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. There is zero infrastructure to run. All state lives in your GitHub repo. The only services you need are already part of your stack: Next.js, Vercel, and GitHub.",
      },
    },
    {
      "@type": "Question",
      name: "Which Next.js versions are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EditLayer supports Next.js 13+ with the App Router. It uses React Server Components for content loading and client components for the editing UI.",
      },
    },
    {
      "@type": "Question",
      name: "Is EditLayer free? What is the license?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "EditLayer is MIT licensed and completely free, forever. It is self-hosted, so there is no subscription, no usage cap, and no vendor lock-in.",
      },
    },
    {
      "@type": "Question",
      name: "How is EditLayer different from a headless CMS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A headless CMS requires a separate service, schema setup, and often a monthly fee. EditLayer requires none of that. Your site is the editor: marketers edit copy directly on the live page, changes deploy via your existing Vercel pipeline.",
      },
    },
  ],
};

export default function JsonLd() {
  const schemas = [organization, website, software, faqPage];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
