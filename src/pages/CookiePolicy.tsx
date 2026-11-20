import { CONTACT } from "@/lib/contact";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>This Cookie Policy explains how Logisaar Technologies Private Limited ("Logisaar", "Company", "we", "our", or "us") uses cookies and similar technologies across our websites, applications, products, platforms, and services.</p>
        <p className="mt-4">By continuing to use our Services, you consent to the use of cookies in accordance with this Cookie Policy.</p>
        <p className="mt-4"><strong>Effective Date:</strong> 18 June 2026</p>
      </>
    ),
  },
  {
    id: "what-are-cookies",
    title: "2. What are Cookies",
    content: (
      <>
        <p>Cookies are small text files stored on your device when you visit a website or use a digital service.</p>
        <p className="mt-4">Cookies help websites remember user preferences, improve functionality, analyze usage patterns, and enhance security.</p>
      </>
    ),
  },
  {
    id: "types-of-cookies",
    title: "3. Types of Cookies We Use",
    content: (
      <>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground text-lg">Essential Cookies</h3>
            <p className="mt-2 text-sm text-muted-foreground">Required for:</p>
            <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
              <li>User authentication</li>
              <li>Security</li>
              <li>Session management</li>
              <li>Account access</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">These cookies cannot be disabled without affecting service functionality.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Performance Cookies</h3>
            <p className="mt-2 text-sm text-muted-foreground font-semibold">Used to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
              <li>Measure website performance</li>
              <li>Monitor uptime</li>
              <li>Identify technical issues</li>
              <li>Improve service quality</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Analytics Cookies</h3>
            <p className="mt-2 text-sm text-muted-foreground font-semibold">Used to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
              <li>Understand user behavior</li>
              <li>Analyze traffic</li>
              <li>Improve products</li>
              <li>Measure engagement</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">Functional Cookies</h3>
            <p className="mt-2 text-sm text-muted-foreground font-semibold">Used to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-1 text-sm text-muted-foreground">
              <li>Remember preferences</li>
              <li>Save settings</li>
              <li>Improve user experience</li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "third-party-cookies",
    title: "4. Third-Party Cookies",
    content: (
      <>
        <p>We may use cookies provided by:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Analytics providers</li>
          <li>Hosting providers</li>
          <li>Authentication providers</li>
          <li>Payment providers</li>
          <li>Infrastructure providers</li>
        </ul>
        <p className="mt-4">Such cookies may be governed by the policies of those providers.</p>
      </>
    ),
  },
  {
    id: "cookie-management",
    title: "5. Cookie Management",
    content: (
      <>
        <p>Users may manage or disable cookies through browser settings.</p>
        <p className="mt-4">Disabling certain cookies may affect service functionality.</p>
      </>
    ),
  },
  {
    id: "policy-changes",
    title: "6. Policy Changes",
    content: (
      <>
        <p>We may update this Cookie Policy at any time.</p>
        <p className="mt-4">Changes become effective upon publication.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "7. Contact",
    content: (
      <>
        <p>For cookie-related questions or notices:</p>
        <p className="mt-2"><strong>Email:</strong> <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4">{CONTACT.email}</a></p>
      </>
    ),
  },
];

const CookiePolicy = () => {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      lastUpdated="18 June 2026"
      seoTitle="Cookie Policy | Logisaar Technologies Private Limited"
      seoDescription="Read the Cookie Policy of Logisaar Technologies Private Limited. Learn how we use cookies and tracking technologies to improve our services."
      seoKeywords="cookie policy, Logisaar, Logisaar Technologies, tracking technologies, website cookies"
      seoCanonical="https://logisaar.in/cookie-policy"
      sections={sections}
    />
  );
};

export default CookiePolicy;
