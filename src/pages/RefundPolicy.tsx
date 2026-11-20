import { CONTACT } from "@/lib/contact";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <>
        <p>This Refund and Cancellation Policy governs refunds, cancellations, subscription terminations, service discontinuation, and payment disputes relating to products and services offered by Logisaar Technologies Private Limited.</p>
        <p className="mt-4">By purchasing any product or service from us, you agree to this Policy.</p>
        <p className="mt-4"><strong>Effective Date:</strong> 18 June 2026</p>
      </>
    ),
  },
  {
    id: "general-rule",
    title: "2. General Rule",
    content: (
      <>
        <p>Unless expressly stated otherwise in a written agreement, all payments made to Logisaar Technologies Private Limited are non-refundable.</p>
      </>
    ),
  },
  {
    id: "software-services",
    title: "3. Software Development Services",
    content: (
      <>
        <p>For services including:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Website Development</li>
          <li>Mobile Application Development</li>
          <li>Custom Software Development</li>
          <li>SaaS Development</li>
          <li>UI/UX Design</li>
          <li>Automation Development</li>
          <li>Consulting Projects</li>
        </ul>
        <h3 className="font-semibold text-foreground mt-4 text-lg">Before Project Commencement</h3>
        <p>Cancellation requests may be considered at the sole discretion of the Company.</p>
        <h3 className="font-semibold text-foreground mt-4 text-lg">After Project Commencement</h3>
        <p>Once work has started:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Development fees are non-refundable.</li>
          <li>Design fees are non-refundable.</li>
          <li>Consulting fees are non-refundable.</li>
        </ul>
      </>
    ),
  },
  {
    id: "domain-registration",
    title: "4. Domain Registration",
    content: (
      <>
        <p>Payments made for:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Domain names</li>
          <li>Domain renewals</li>
          <li>Domain transfers</li>
        </ul>
        <p className="mt-4">are non-refundable.</p>
        <p>This is because domain registrars generally do not provide refunds after registration.</p>
      </>
    ),
  },
  {
    id: "hosting-services",
    title: "5. Hosting Services",
    content: (
      <>
        <p>Payments made for:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>VPS Hosting</li>
          <li>Shared Hosting</li>
          <li>Cloud Hosting</li>
          <li>Server Setup</li>
          <li>Infrastructure Configuration</li>
        </ul>
        <p className="mt-4">are generally non-refundable after activation.</p>
      </>
    ),
  },
  {
    id: "subscription-services",
    title: "6. Subscription Services",
    content: (
      <>
        <p>For SaaS products and recurring subscriptions:</p>
        <p className="mt-4">Users may cancel future renewals at any time.</p>
        <p>However:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Current billing cycles remain non-refundable.</li>
          <li>Previously paid subscription fees are non-refundable.</li>
        </ul>
      </>
    ),
  },
  {
    id: "educational-programs",
    title: "7. Educational Programs",
    content: (
      <>
        <p>For services including:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Courses</li>
          <li>Training Programs</li>
          <li>Workshops</li>
          <li>Bootcamps</li>
          <li>Certifications</li>
        </ul>
        <p className="mt-4">refunds shall only be provided where expressly stated in the specific program terms.</p>
      </>
    ),
  },
  {
    id: "payment-failures",
    title: "8. Payment Failures",
    content: (
      <>
        <p>Where payments are deducted but services are not activated due to technical issues, users should contact: <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4">{CONTACT.email}</a></p>
        <p className="mt-4">Verified payment failures may be corrected through:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Service activation</li>
          <li>Credit adjustment</li>
          <li>Refund where appropriate</li>
        </ul>
      </>
    ),
  },
  {
    id: "chargebacks",
    title: "9. Chargebacks",
    content: (
      <>
        <p>Users agree to first contact the Company before initiating:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Chargebacks</li>
          <li>Payment disputes</li>
          <li>Banking disputes</li>
        </ul>
        <p className="mt-4">Fraudulent or abusive chargebacks may result in:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Account suspension</li>
          <li>Service termination</li>
          <li>Legal action where appropriate</li>
        </ul>
      </>
    ),
  },
  {
    id: "exceptions",
    title: "10. Exceptions",
    content: (
      <>
        <p>The Company may, at its sole discretion, provide refunds in exceptional circumstances.</p>
        <p className="mt-4">Such decisions shall not create any obligation to provide future refunds.</p>
      </>
    ),
  },
  {
    id: "policy-modifications",
    title: "11. Policy Modifications",
    content: (
      <>
        <p>We reserve the right to modify this Policy at any time.</p>
        <p className="mt-4">Changes become effective upon publication.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "12. Governing Law",
    content: (
      <>
        <p>This Policy shall be governed by the laws of India.</p>
      </>
    ),
  },
  {
    id: "jurisdiction",
    title: "13. Jurisdiction",
    content: (
      <>
        <p>All disputes relating to refunds, cancellations, or payments shall be subject to the exclusive jurisdiction of courts located in Bhubaneswar, Odisha, India.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "14. Contact",
    content: (
      <>
        <p>For refund requests or payment inquiries:</p>
        <p className="mt-2"><strong>Email:</strong> <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4">{CONTACT.email}</a></p>
      </>
    ),
  },
];

const RefundPolicy = () => {
  return (
    <LegalPageLayout
      title="Refund and Cancellation Policy"
      lastUpdated="18 June 2026"
      seoTitle="Refund & Cancellation Policy | Logisaar Technologies Private Limited"
      seoDescription="Read the Refund and Cancellation Policy of Logisaar Technologies Private Limited. Learn about service cancellations and refund rules."
      seoKeywords="refund policy, cancellation policy, Logisaar, Logisaar Technologies, software refund, SaaS cancellation"
      seoCanonical="https://logisaar.in/refund-policy"
      sections={sections}
    />
  );
};

export default RefundPolicy;
