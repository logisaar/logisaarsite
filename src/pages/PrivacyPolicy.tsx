import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const sections = [
  {
    title: "Introduction",
    content: (
      <>
        <p>Logisaar Technology Pvt Ltd ("Logisaar", "we", "us", or "our") is committed to protecting the privacy and security of your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://logisaar.in" className="text-primary underline underline-offset-4 hover:opacity-80">logisaar.in</a> or use our services.</p>
        <p className="mt-4">Logisaar Technology Pvt Ltd is a software development company specializing in web applications, mobile applications, SaaS products, digital services, cloud solutions, UI/UX design, and IT consulting. We respect your privacy and are committed to protecting it through compliance with this policy.</p>
        <p className="mt-4"><strong>Effective Date:</strong> June 6, 2026</p>
      </>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information to provide better services to our users. The types of information we collect include:</p>
      </>
    ),
  },
  {
    title: "Personal Information",
    content: (
      <>
        <p>We may collect personally identifiable information that you voluntarily provide to us when you:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Fill out a contact form on our website</li>
          <li>Subscribe to our newsletter</li>
          <li>Request a quote or consultation</li>
          <li>Apply for a job or partnership</li>
          <li>Communicate with us via email, phone, or chat</li>
          <li>Register for an account on our platform</li>
        </ul>
        <p className="mt-4">This information may include your name, email address, phone number, company name, job title, billing information, and any other details you choose to provide.</p>
      </>
    ),
  },
  {
    title: "Device and Technical Data",
    content: (
      <>
        <p>When you visit our website, we automatically collect certain technical information, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>IP address and browser type</li>
          <li>Device type and operating system</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring URL and exit pages</li>
          <li>Geographic location (approximate)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Cookies and Tracking Technologies",
    content: (
      <>
        <p>We use cookies, pixels, and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors come from. Cookies are small text files stored on your device by your web browser.</p>
        <p className="mt-4">Types of cookies we use:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>
        <p className="mt-4">You can control cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.</p>
      </>
    ),
  },
  {
    title: "How We Use User Data",
    content: (
      <>
        <p>We use the collected data for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>To provide, operate, and maintain our services</li>
          <li>To improve, personalize, and expand our services</li>
          <li>To communicate with you, including responding to inquiries and sending updates</li>
          <li>To process transactions and send related information</li>
          <li>To detect, prevent, and address technical issues and fraud</li>
          <li>To comply with legal obligations</li>
          <li>To send promotional communications (with your consent where required)</li>
          <li>To analyze usage trends and improve user experience</li>
        </ul>
      </>
    ),
  },
  {
    title: "Data Sharing and Disclosure",
    content: (
      <>
        <p>We do not sell your personal information. We may share your data in the following circumstances:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>With your consent:</strong> We will share data when you have given us explicit permission</li>
          <li><strong>Service providers:</strong> We may share data with third-party vendors who perform services on our behalf</li>
          <li><strong>Legal requirements:</strong> We may disclose data if required by law or in response to valid legal requests</li>
          <li><strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
      </>
    ),
  },
  {
    title: "Third-Party Services",
    content: (
      <>
        <p>We use the following third-party services that may collect information as described in their respective privacy policies:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Google Analytics:</strong> For website analytics and usage tracking</li>
          <li><strong>Firebase:</strong> For app development, analytics, and backend services</li>
          <li><strong>Google Play Services:</strong> For Android application functionality and performance monitoring</li>
          <li><strong>Payment Gateways:</strong> For secure payment processing (we do not store payment card details)</li>
        </ul>
        <p className="mt-4">We encourage you to review the privacy policies of these third-party service providers for more information on their data handling practices.</p>
      </>
    ),
  },
  {
    title: "Data Security Measures",
    content: (
      <>
        <p>We implement appropriate technical and organizational security measures to protect your personal data, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>SSL/TLS encryption for data in transit</li>
          <li>Encryption of sensitive data at rest</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Employee training on data protection best practices</li>
          <li>Secure server infrastructure with firewalls and intrusion detection</li>
        </ul>
        <p className="mt-4">While we strive to protect your personal information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
      </>
    ),
  },
  {
    title: "User Rights and Choices",
    content: (
      <>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Restriction:</strong> Request restriction of processing your data</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
          <li><strong>Objection:</strong> Object to the processing of your data for specific purposes</li>
          <li><strong>Withdraw consent:</strong> Withdraw consent at any time where processing is based on consent</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, please contact us at <a href="mailto:logisaar@gmail.com" className="text-primary underline underline-offset-4">logisaar@gmail.com</a>. We will respond to your request within the timeframe required by applicable law.</p>
      </>
    ),
  },
  {
    title: "Data Retention Policy",
    content: (
      <>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes described in this Privacy Policy, or as required by applicable law. The retention period depends on:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>The nature of the data and the purposes for which it was collected</li>
          <li>Legal and regulatory requirements</li>
          <li>Contractual obligations</li>
          <li>Statute of limitations considerations</li>
        </ul>
        <p className="mt-4">When data is no longer needed, we securely delete or anonymize it. We may retain certain information for legitimate business purposes or as required by law.</p>
      </>
    ),
  },
  {
    title: "Children's Privacy",
    content: (
      <>
        <p>Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children. If we become aware that a child under 16 has provided us with personal data, we will take steps to delete that information promptly.</p>
        <p className="mt-4">If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.</p>
      </>
    ),
  },
  {
    title: "International Data Transfers",
    content: (
      <>
        <p>Your data may be transferred to, stored, and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Standard contractual clauses approved by relevant authorities</li>
          <li>Data processing agreements with our service providers</li>
          <li>Compliance with applicable data protection laws</li>
        </ul>
        <p className="mt-4">By using our services, you consent to the transfer of your data to countries that may have different data protection laws than your country of residence.</p>
      </>
    ),
  },
  {
    title: "GDPR and Applicable Privacy Rights",
    content: (
      <>
        <p>If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR). Our legal basis for processing your data includes:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Consent:</strong> Where you have given clear consent for us to process your data</li>
          <li><strong>Contract:</strong> Where processing is necessary for a contract we have with you</li>
          <li><strong>Legal obligation:</strong> Where processing is required for compliance with law</li>
          <li><strong>Legitimate interests:</strong> Where processing is necessary for our legitimate business interests</li>
        </ul>
        <p className="mt-4">Under GDPR, you have the right to lodge a complaint with your local data protection authority if you believe we have not handled your data appropriately.</p>
      </>
    ),
  },
  {
    title: "Account Deletion Requests",
    content: (
      <>
        <p>You may request deletion of your account and associated personal data at any time. To request account deletion:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Send an email to <a href="mailto:logisaar@gmail.com" className="text-primary underline underline-offset-4">logisaar@gmail.com</a> with the subject line "Account Deletion Request"</li>
          <li>Include your name, registered email address, and any relevant account details</li>
          <li>We will process your request within 30 days, subject to legal retention requirements</li>
        </ul>
        <p className="mt-4">Upon deletion, your personal data will be permanently removed from our systems, except where retention is required for legal compliance, fraud prevention, or security purposes.</p>
      </>
    ),
  },
  {
    title: "Changes to Privacy Policy",
    content: (
      <>
        <p>We reserve the right to update or modify this Privacy Policy at any time. Changes will be effective immediately upon posting the updated policy on this page. We will notify users of material changes via:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>A prominent notice on our website</li>
          <li>Email notification (if we have your contact information)</li>
        </ul>
        <p className="mt-4">We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data. The "Effective Date" at the top of this page indicates when the policy was last revised.</p>
      </>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <>
        <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <div className="mt-4 space-y-2">
          <p><strong>Company:</strong> Logisaar Technology Pvt Ltd</p>
          <p><strong>Website:</strong> <a href="https://logisaar.in" className="text-primary underline underline-offset-4">https://logisaar.in</a></p>
          <p><strong>Email:</strong> <a href="mailto:logisaar@gmail.com" className="text-primary underline underline-offset-4">logisaar@gmail.com</a></p>
        </div>
      </>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | Logisaar Technology Pvt Ltd"
        description="Read the Privacy Policy of Logisaar Technology Pvt Ltd. Learn how we collect, use, and protect your personal data. GDPR compliant. Effective June 6, 2026."
        keywords="privacy policy Logisaar, data protection, GDPR, privacy policy software company, Logisaar Technology Pvt Ltd privacy"
        canonical="https://logisaar.in/privacy-policy"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-primary font-medium text-xs uppercase tracking-[0.2em] mb-4">
              Legal
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Last updated: June 6, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="mb-12 last:mb-0"
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-foreground">
                  {section.title}
                </h2>
                <div className="text-muted-foreground leading-relaxed text-base">
                  {section.content}
                </div>
                <div className="mt-6 h-px bg-border" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
