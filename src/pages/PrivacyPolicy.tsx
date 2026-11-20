import { CONTACT } from "@/lib/contact";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>Welcome to Logisaar Technologies Private Limited ("Logisaar", "Company", "we", "our", or "us").</p>
        <p>This Privacy Policy explains how we collect, use, process, store, disclose, transfer, and protect information relating to users of our websites, software applications, mobile applications, SaaS platforms, educational portals, CRM systems, APIs, products, services, and affiliated brands.</p>
        <p>By accessing, registering for, or using any of our services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy.</p>
      </>
    ),
  },
  {
    id: "company-info",
    title: "2. Company Information",
    content: (
      <>
        <p><strong>Company Name:</strong> Logisaar Technologies Private Limited</p>
        <p><strong>CIN:</strong> U62012OD2026PTC053632</p>
        <p><strong>Registered Office:</strong> As updated in the Company's official statutory records maintained under applicable laws.</p>
        <p><strong>Contact Email:</strong> <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4 hover:opacity-85">{CONTACT.email}</a></p>
      </>
    ),
  },
  {
    id: "scope",
    title: "3. Scope of this Policy",
    content: (
      <>
        <p>This Privacy Policy applies to:</p>
        <h3 className="font-semibold text-foreground mt-4 text-lg">A. Corporate Website</h3>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>logisaar.in</li>
          <li>All Logisaar-owned domains and subdomains</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">B. Products and Services</h3>
        <p>Any current or future:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Software Products</li>
          <li>SaaS Platforms</li>
          <li>CRM Systems</li>
          <li>ERP Systems</li>
          <li>Educational Platforms</li>
          <li>Mobile Applications</li>
          <li>AI Tools</li>
          <li>Client Portals</li>
          <li>APIs</li>
          <li>Dashboards</li>
          <li>Cloud Applications</li>
          <li>Automation Platforms</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">C. Future Brands</h3>
        <p>This Privacy Policy automatically applies to any future brand, product, service, website, application, platform, subsidiary, division, or business unit owned, operated, managed, licensed, or controlled by Logisaar Technologies Private Limited unless a separate Privacy Policy is expressly published for that specific product or service.</p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "4. Eligibility",
    content: (
      <>
        <p>Our services are intended only for persons who are at least eighteen (18) years of age.</p>
        <p>Persons below eighteen (18) years of age are not permitted to create accounts or use our services without appropriate legal authorization.</p>
        <p>If we become aware that personal information has been collected from a person below the applicable age requirement, we may remove such information and terminate the associated account.</p>
      </>
    ),
  },
  {
    id: "info-collect",
    title: "5. Information We Collect",
    content: (
      <>
        <h3 className="font-semibold text-foreground text-lg">A. Personal Information</h3>
        <p>We may collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Address Information</li>
          <li>Business Information</li>
          <li>Organization Name</li>
          <li>GST Information</li>
          <li>Tax Information</li>
          <li>Identification Information where legally required</li>
        </ul>
        
        <h3 className="font-semibold text-foreground mt-6 text-lg">B. Account Information</h3>
        <p>We may collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Username</li>
          <li>Login Credentials</li>
          <li>Password Hashes</li>
          <li>Authentication Information</li>
          <li>Profile Information</li>
          <li>User Preferences</li>
        </ul>

        <h3 className="font-semibold text-foreground mt-6 text-lg">C. Payment Information</h3>
        <p>Where applicable, payments may be processed through third-party payment processors including:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Razorpay</li>
          <li>Zaakpay</li>
          <li>Banks</li>
          <li>Financial Institutions</li>
          <li>Payment Gateways</li>
        </ul>
        <p>We generally do not store complete debit card, credit card, or banking credentials.</p>

        <h3 className="font-semibold text-foreground mt-6 text-lg">D. Uploaded Content</h3>
        <p>Users may upload:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Documents</li>
          <li>Images</li>
          <li>Videos</li>
          <li>Audio Files</li>
          <li>Source Code</li>
          <li>Databases</li>
          <li>Educational Material</li>
          <li>Business Records</li>
          <li>Project Files</li>
          <li>Other Digital Content</li>
        </ul>

        <h3 className="font-semibold text-foreground mt-6 text-lg">E. Technical Information</h3>
        <p>We automatically collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>IP Address</li>
          <li>Browser Information</li>
          <li>Device Information</li>
          <li>Operating System</li>
          <li>Network Information</li>
          <li>Device Identifiers</li>
          <li>Usage Logs</li>
          <li>Error Logs</li>
          <li>Session Data</li>
        </ul>

        <h3 className="font-semibold text-foreground mt-6 text-lg">F. Communications</h3>
        <p>We may collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Support Requests</li>
          <li>Feedback</li>
          <li>Complaints</li>
          <li>Contact Form Submissions</li>
          <li>Emails</li>
          <li>Customer Communications</li>
        </ul>

        <h3 className="font-semibold text-foreground mt-6 text-lg">G. Analytics Information</h3>
        <p>We may collect:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Website Usage Data</li>
          <li>Feature Usage Data</li>
          <li>Traffic Information</li>
          <li>Behavioral Analytics</li>
          <li>Performance Metrics</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-collect",
    title: "6. How We Collect Information",
    content: (
      <>
        <p>We may collect information:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Directly from users</li>
          <li>During account registration</li>
          <li>Through website forms</li>
          <li>During purchases</li>
          <li>During service usage</li>
          <li>Through cookies</li>
          <li>Through analytics technologies</li>
          <li>Through customer support interactions</li>
          <li>Through integrations with third-party services</li>
        </ul>
      </>
    ),
  },
  {
    id: "purposes",
    title: "7. Purposes of Processing",
    content: (
      <>
        <p>We may process information for:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Account creation and management</li>
          <li>Service delivery</li>
          <li>Customer support</li>
          <li>Billing and payment processing</li>
          <li>Security monitoring</li>
          <li>Fraud prevention</li>
          <li>Platform administration</li>
          <li>Product development</li>
          <li>Product improvement</li>
          <li>Business analytics</li>
          <li>Legal compliance</li>
          <li>Regulatory compliance</li>
          <li>Marketing communications</li>
          <li>Service notifications</li>
          <li>Research and development</li>
          <li>Risk management</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "8. Legal Basis for Processing",
    content: (
      <>
        <p>Where applicable, information may be processed based on:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>User consent</li>
          <li>Contractual necessity</li>
          <li>Legal obligations</li>
          <li>Legitimate business interests</li>
          <li>Protection of rights and security</li>
          <li>Compliance requirements</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "9. Cookies and Tracking Technologies",
    content: (
      <>
        <p>We may use:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Cookies</li>
          <li>Session Cookies</li>
          <li>Persistent Cookies</li>
          <li>Analytics Technologies</li>
          <li>Tracking Pixels</li>
          <li>Similar Technologies</li>
        </ul>
        <p className="mt-4 font-semibold text-foreground">for:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Authentication</li>
          <li>Security</li>
          <li>Analytics</li>
          <li>Performance Monitoring</li>
          <li>User Experience Enhancement</li>
        </ul>
        <p className="mt-4">Users may disable cookies through browser settings, although certain features may become unavailable.</p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "10. Data Sharing and Disclosure",
    content: (
      <>
        <p>We may disclose information to:</p>
        <h3 className="font-semibold text-foreground mt-4 text-lg">Service Providers</h3>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Hosting Providers</li>
          <li>Cloud Infrastructure Providers</li>
          <li>Payment Processors</li>
          <li>Analytics Providers</li>
          <li>Authentication Providers</li>
          <li>Communication Providers</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">Professional Advisors</h3>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Auditors</li>
          <li>Accountants</li>
          <li>Lawyers</li>
          <li>Consultants</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">Government Authorities</h3>
        <p>Where required by:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Law</li>
          <li>Court Orders</li>
          <li>Regulatory Requests</li>
          <li>Government Directions</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">Corporate Transactions</h3>
        <p>In connection with:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Mergers</li>
          <li>Acquisitions</li>
          <li>Investments</li>
          <li>Restructuring</li>
          <li>Asset Sales</li>
          <li>Business Transfers</li>
        </ul>
        <p className="mt-4">We do not sell personal information to third parties.</p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "11. International Data Transfers",
    content: (
      <>
        <p>Our services may be used worldwide.</p>
        <p>Information may be processed, stored, or transferred across jurisdictions where our infrastructure providers, service providers, partners, or systems operate.</p>
        <p>Users consent to such transfers by using our services.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "12. Data Retention",
    content: (
      <>
        <p>We retain information for as long as reasonably necessary:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>To provide services</li>
          <li>To maintain records</li>
          <li>To comply with legal obligations</li>
          <li>To resolve disputes</li>
          <li>To prevent fraud</li>
          <li>To enforce agreements</li>
          <li>To protect business interests</li>
        </ul>
        <p className="mt-4">Certain information may continue to be retained after account closure where legally permitted or required.</p>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "13. User Rights",
    content: (
      <>
        <p>Subject to applicable laws, users may request:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Access to personal information</li>
          <li>Correction of inaccurate information</li>
          <li>Deletion of personal information</li>
          <li>Restriction of processing</li>
          <li>Withdrawal of consent</li>
          <li>Information regarding stored data</li>
        </ul>
        <p className="mt-4">Requests may be submitted to: <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4 hover:opacity-85">{CONTACT.email}</a></p>
      </>
    ),
  },
  {
    id: "dpdp-act",
    title: "14. Digital Personal Data Protection Act, 2023",
    content: (
      <>
        <p>Where applicable under Indian law, users may exercise rights available under the Digital Personal Data Protection Act, 2023 and any related regulations.</p>
        <p>Requests concerning personal data may be submitted to: <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4 hover:opacity-85">{CONTACT.email}</a></p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "15. User Content",
    content: (
      <>
        <p>Users retain ownership of content uploaded by them.</p>
        <p>However, users grant Logisaar Technologies Private Limited a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to host, store, process, reproduce, display, transmit, and use such content solely to operate, improve, secure, maintain, and provide the services.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "16. Data Security",
    content: (
      <>
        <p>We implement commercially reasonable technical, organizational, and administrative safeguards designed to protect information.</p>
        <p>Such measures may include:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Encryption</li>
          <li>Access Controls</li>
          <li>Monitoring Systems</li>
          <li>Security Reviews</li>
          <li>Authentication Controls</li>
        </ul>
        <p className="mt-4">However, no system is completely secure and we cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    id: "suspension",
    title: "17. Account Suspension and Termination",
    content: (
      <>
        <p>We reserve the right to suspend, restrict, investigate, or terminate access to services where:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Terms are violated</li>
          <li>Fraud is suspected</li>
          <li>Security risks exist</li>
          <li>Abuse is detected</li>
          <li>Legal requirements necessitate action</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party",
    title: "18. Third-Party Services",
    content: (
      <>
        <p>Our services may integrate with third-party providers.</p>
        <p>Use of third-party services may be governed by the privacy policies and terms of such providers.</p>
        <p>Logisaar is not responsible for third-party privacy practices.</p>
      </>
    ),
  },
  {
    id: "changes",
    title: "19. Changes to this Privacy Policy",
    content: (
      <>
        <p>We may modify this Privacy Policy at any time.</p>
        <p>Changes become effective upon publication unless otherwise stated.</p>
        <p>Continued use of services after publication constitutes acceptance of the revised Privacy Policy.</p>
      </>
    ),
  },
  {
    id: "liability",
    title: "20. Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by applicable law, Logisaar Technologies Private Limited shall not be liable for indirect, incidental, special, consequential, punitive, or exemplary damages arising from the use of services, data processing activities, or privacy-related incidents beyond our reasonable control.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "21. Governing Law",
    content: (
      <>
        <p>This Privacy Policy shall be governed by and construed in accordance with the laws of India.</p>
      </>
    ),
  },
  {
    id: "jurisdiction",
    title: "22. Jurisdiction",
    content: (
      <>
        <p>Any dispute arising out of or relating to this Privacy Policy shall be subject to the exclusive jurisdiction of the competent courts located in Bhubaneswar, Odisha, India.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "23. Contact Us",
    content: (
      <>
        <p>For privacy-related questions, complaints, notices, or requests:</p>
        <p><strong>Email:</strong> <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4 hover:opacity-85">{CONTACT.email}</a></p>
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="18 June 2026"
      seoTitle="Privacy Policy | Logisaar Technologies Private Limited"
      seoDescription="Read the Privacy Policy of Logisaar Technologies Private Limited. Learn how we collect, use, process, and protect your personal information."
      seoKeywords="privacy policy, Logisaar, Logisaar Technologies, data protection, privacy policy software company, India data privacy"
      seoCanonical="https://logisaar.in/privacy-policy"
      sections={sections}
    />
  );
};

export default PrivacyPolicy;
