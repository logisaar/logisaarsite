import { CONTACT } from "@/lib/contact";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { siteUrl } from "@/lib/site";

const sections = [
  {
    id: "acceptance-of-terms",
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "Customer", "Client", "You") and Logisaar Technologies Private Limited ("Logisaar", "Company", "We", "Us", "Our").</p>
        <p>By accessing, browsing, registering for, purchasing, subscribing to, or using any website, application, software, platform, product, service, API, educational platform, SaaS offering, client portal, dashboard, or digital service operated by Logisaar Technologies Private Limited, you agree to be bound by these Terms.</p>
        <p>If you do not agree with these Terms, you must discontinue use immediately.</p>
      </>
    ),
  },
  {
    id: "applicability",
    title: "2. Applicability",
    content: (
      <>
        <p>These Terms apply to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>logisaar.com</li>
          <li>logisaar.in</li>
          <li>All Logisaar websites</li>
          <li>Mobile applications</li>
          <li>SaaS platforms</li>
          <li>APIs</li>
          <li>CRM systems</li>
          <li>ERP systems</li>
          <li>Educational platforms</li>
          <li>Client portals</li>
          <li>Future products</li>
          <li>Future brands</li>
          <li>Future subsidiaries and affiliated services owned or operated by Logisaar Technologies Private Limited</li>
        </ul>
        <p className="mt-4">Unless separate terms are expressly published for a specific product.</p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "3. Eligibility",
    content: (
      <>
        <p>You must be at least eighteen (18) years old and legally capable of entering into a binding agreement.</p>
        <p>By using the Services, you represent and warrant that you satisfy these requirements.</p>
      </>
    ),
  },
  {
    id: "account-registration",
    title: "4. Account Registration",
    content: (
      <>
        <p>Certain services require account registration.</p>
        <p>You agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Provide accurate information</li>
          <li>Maintain updated information</li>
          <li>Keep credentials secure</li>
          <li>Be responsible for all activity under your account</li>
        </ul>
        <p className="mt-4">The Company shall not be liable for losses arising from unauthorized account access caused by user negligence.</p>
      </>
    ),
  },
  {
    id: "user-responsibilities",
    title: "5. User Responsibilities",
    content: (
      <>
        <p>Users shall:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Comply with applicable laws</li>
          <li>Respect intellectual property rights</li>
          <li>Maintain account security</li>
          <li>Use services only for lawful purposes</li>
          <li>Provide truthful information</li>
        </ul>
        <p className="mt-4">Users are solely responsible for content uploaded, submitted, transmitted, or shared through the Services.</p>
      </>
    ),
  },
  {
    id: "prohibited-activities",
    title: "6. Prohibited Activities",
    content: (
      <>
        <p>Users shall not:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Violate laws</li>
          <li>Upload malware</li>
          <li>Attempt unauthorized access</li>
          <li>Circumvent security controls</li>
          <li>Reverse engineer proprietary software</li>
          <li>Interfere with system operations</li>
          <li>Engage in fraud</li>
          <li>Distribute harmful content</li>
          <li>Infringe intellectual property rights</li>
          <li>Abuse support systems</li>
        </ul>
        <p className="mt-4">The Company may suspend or terminate accounts involved in prohibited activities without notice.</p>
      </>
    ),
  },
  {
    id: "payments",
    title: "7. Payments",
    content: (
      <>
        <p>Certain Services may require payment.</p>
        <p>Payments may be processed through:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Razorpay</li>
          <li>Zaakpay</li>
          <li>Banking Partners</li>
          <li>Authorized Payment Providers</li>
        </ul>
        <p className="mt-4">Users agree to pay all applicable charges, taxes, fees, subscriptions, and service costs.</p>
        <p>Failure to make payment may result in suspension or termination of services.</p>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "8. Subscriptions",
    content: (
      <>
        <p>For subscription-based services:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Fees may be charged periodically.</li>
          <li>Subscriptions may renew automatically unless cancelled.</li>
          <li>Users remain responsible for payment obligations incurred before cancellation.</li>
        </ul>
        <p className="mt-4">Specific subscription terms may be provided for individual products.</p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "9. Refunds",
    content: (
      <>
        <p>Refund eligibility shall be governed by the applicable Refund and Cancellation Policy published by the Company.</p>
        <p>Unless otherwise expressly stated:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Fees paid are generally non-refundable.</li>
          <li>Setup fees are non-refundable.</li>
          <li>Development charges are non-refundable once work has commenced.</li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "10. Intellectual Property",
    content: (
      <>
        <p>All intellectual property rights relating to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Software</li>
          <li>Source Code</li>
          <li>Applications</li>
          <li>Designs</li>
          <li>Logos</li>
          <li>Trademarks</li>
          <li>Documentation</li>
          <li>Content</li>
          <li>Databases</li>
        </ul>
        <p className="mt-4">are owned by Logisaar Technologies Private Limited or its licensors unless otherwise stated.</p>
        <p>No ownership rights are transferred through use of the Services.</p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "11. User Content",
    content: (
      <>
        <p>Users retain ownership of content uploaded by them.</p>
        <p>Users grant the Company a worldwide, non-exclusive, royalty-free license to:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Host</li>
          <li>Store</li>
          <li>Process</li>
          <li>Reproduce</li>
          <li>Display</li>
          <li>Transmit</li>
        </ul>
        <p className="mt-4">such content solely for the operation and improvement of Services.</p>
        <p>Users represent that they possess all necessary rights to the content they upload.</p>
      </>
    ),
  },
  {
    id: "feedback",
    title: "12. Feedback",
    content: (
      <>
        <p>Any suggestions, ideas, recommendations, comments, or feedback submitted to the Company may be used without restriction and without compensation.</p>
      </>
    ),
  },
  {
    id: "service-availability",
    title: "13. Service Availability",
    content: (
      <>
        <p>The Company does not guarantee:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Continuous availability</li>
          <li>Error-free operation</li>
          <li>Uninterrupted access</li>
          <li>Compatibility with all devices</li>
        </ul>
        <p className="mt-4">Maintenance, upgrades, outages, and technical failures may occur.</p>
      </>
    ),
  },
  {
    id: "beta-services",
    title: "14. Beta Services",
    content: (
      <>
        <p>Products designated as beta, testing, preview, experimental, or early access may:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Contain defects</li>
          <li>Experience downtime</li>
          <li>Be modified without notice</li>
        </ul>
        <p className="mt-4">Use of beta services is entirely at the user's risk.</p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "15. Third-Party Services",
    content: (
      <>
        <p>The Services may integrate with third-party providers.</p>
        <p>The Company shall not be responsible for:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Third-party content</li>
          <li>Third-party services</li>
          <li>Third-party failures</li>
          <li>Third-party privacy practices</li>
        </ul>
      </>
    ),
  },
  {
    id: "disclaimer-warranties",
    title: "16. Disclaimer of Warranties",
    content: (
      <>
        <p>To the maximum extent permitted by law, the Services are provided on an "AS IS" and "AS AVAILABLE" basis.</p>
        <p>The Company disclaims all warranties including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Merchantability</li>
          <li>Fitness for a particular purpose</li>
          <li>Non-infringement</li>
          <li>Availability</li>
          <li>Reliability</li>
        </ul>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "17. Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by law:</p>
        <p>Logisaar Technologies Private Limited, its directors, officers, employees, contractors, affiliates, and representatives shall not be liable for:</p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Indirect damages</li>
          <li>Incidental damages</li>
          <li>Consequential damages</li>
          <li>Special damages</li>
          <li>Punitive damages</li>
          <li>Loss of profits</li>
          <li>Loss of revenue</li>
          <li>Loss of business</li>
          <li>Loss of data</li>
          <li>Business interruption</li>
        </ul>
        <p className="mt-4">arising from use of the Services.</p>
        <p>In no event shall the Company's aggregate liability exceed the amount actually paid by the user to the Company during the twelve (12) months preceding the claim.</p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "18. Indemnification",
    content: (
      <>
        <p>Users agree to indemnify and hold harmless the Company from claims, damages, liabilities, losses, costs, and expenses arising from:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Violation of these Terms</li>
          <li>Violation of laws</li>
          <li>Infringement of third-party rights</li>
          <li>User content</li>
          <li>Misuse of Services</li>
        </ul>
      </>
    ),
  },
  {
    id: "suspension-termination",
    title: "19. Suspension and Termination",
    content: (
      <>
        <p>The Company may suspend or terminate access without prior notice where:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Terms are violated</li>
          <li>Fraud is suspected</li>
          <li>Security risks arise</li>
          <li>Legal obligations require action</li>
        </ul>
        <p className="mt-4">Termination does not affect accrued rights and obligations.</p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "20. Force Majeure",
    content: (
      <>
        <p>The Company shall not be liable for delays or failures caused by circumstances beyond reasonable control including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Natural disasters</li>
          <li>Power failures</li>
          <li>Internet disruptions</li>
          <li>Government actions</li>
          <li>Cyber attacks</li>
          <li>Labor disputes</li>
        </ul>
      </>
    ),
  },
  {
    id: "assignment",
    title: "21. Assignment",
    content: (
      <>
        <p>The Company may assign or transfer its rights and obligations under these Terms without user consent.</p>
        <p>Users may not assign their rights without prior written approval.</p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "22. Modifications",
    content: (
      <>
        <p>The Company reserves the right to modify these Terms at any time.</p>
        <p>Updated versions become effective upon publication.</p>
        <p>Continued use constitutes acceptance of revised Terms.</p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "23. Governing Law",
    content: (
      <>
        <p>These Terms shall be governed by the laws of India.</p>
      </>
    ),
  },
  {
    id: "jurisdiction",
    title: "24. Jurisdiction",
    content: (
      <>
        <p>All disputes shall be subject to the exclusive jurisdiction of the competent courts located in Bhubaneswar, Odisha, India.</p>
      </>
    ),
  },
  {
    id: "entire-agreement",
    title: "25. Entire Agreement",
    content: (
      <>
        <p>These Terms, together with the Privacy Policy and any product-specific policies, constitute the entire agreement between the user and the Company.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "26. Contact",
    content: (
      <>
        <p>For legal notices, compliance matters, support requests, and contractual communications:</p>
        <p><strong>Email:</strong> <a href={CONTACT.mailto} className="text-primary-ink underline underline-offset-4">{CONTACT.email}</a></p>
      </>
    ),
  },
];

const TermsConditions = () => {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="18 June 2026"
      seoTitle="Terms of Service | Logisaar Technologies Private Limited"
      seoDescription="Read the Terms of Service of Logisaar Technologies Private Limited. Learn about the terms governing the use of our websites, platforms, applications, and services."
      seoKeywords="terms of service, Logisaar, Logisaar Technologies, terms software company, Logisaar terms, website conditions"
      seoCanonical={siteUrl("/terms-conditions")}
      sections={sections}
    />
  );
};

export default TermsConditions;
