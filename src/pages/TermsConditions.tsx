import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const sections = [
  {
    title: "Acceptance of Terms",
    content: (
      <>
        <p>By accessing or using the website <a href="https://logisaar.in" className="text-primary underline underline-offset-4 hover:opacity-80">logisaar.in</a> and any services provided by Logisaar Technology Pvt Ltd ("Logisaar", "we", "us", or "our"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our website or services.</p>
        <p className="mt-4">These terms apply to all visitors, users, clients, and any person or entity accessing our platform or engaging our services. We reserve the right to update these terms at any time, and continued use constitutes acceptance of such changes.</p>
        <p className="mt-4"><strong>Effective Date:</strong> June 6, 2026</p>
      </>
    ),
  },
  {
    title: "Definitions",
    content: (
      <>
        <p>For the purpose of these Terms & Conditions, the following definitions apply:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>"Company", "We", "Us", "Our"</strong> refers to Logisaar Technology Pvt Ltd</li>
          <li><strong>"Client", "User", "You", "Your"</strong> refers to the individual or entity using our services or website</li>
          <li><strong>"Services"</strong> refers to all products, solutions, and offerings provided by Logisaar, including but not limited to website development, web applications, mobile applications, SaaS products, software development, digital marketing, UI/UX design, IT consulting, and cloud-based services</li>
          <li><strong>"Website"</strong> refers to logisaar.in and all related subdomains and platforms</li>
          <li><strong>"Agreement"</strong> refers to these Terms & Conditions along with any project-specific contracts or statements of work</li>
          <li><strong>"Content"</strong> includes all text, graphics, logos, images, software, and other materials on our website or delivered as part of our services</li>
        </ul>
      </>
    ),
  },
  {
    title: "Eligibility and User Requirements",
    content: (
      <>
        <p>By using our services, you represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>You are at least 18 years of age or the age of majority in your jurisdiction</li>
          <li>You have the legal capacity to enter into binding contracts</li>
          <li>You are not located in a country subject to sanctions or trade restrictions</li>
          <li>You will provide accurate, current, and complete information during registration or service engagement</li>
          <li>Your use of our services complies with all applicable local, state, national, and international laws</li>
        </ul>
        <p className="mt-4">If you are using our services on behalf of a business or entity, you represent that you have the authority to bind that entity to these terms.</p>
      </>
    ),
  },
  {
    title: "User Accounts and Registration",
    content: (
      <>
        <p>Certain services may require you to create an account. When you register, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Provide accurate and complete registration information</li>
          <li>Maintain and update your account information promptly</li>
          <li>Keep your login credentials confidential and secure</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
        <p className="mt-4">We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent or harmful activities.</p>
      </>
    ),
  },
  {
    title: "Services Offered",
    content: (
      <>
        <p>Logisaar Technology Pvt Ltd provides the following services:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Website Development:</strong> Custom website design and development using modern frameworks and technologies</li>
          <li><strong>Web Applications:</strong> Scalable, secure, and feature-rich web application development</li>
          <li><strong>Mobile Applications:</strong> Native and cross-platform mobile app development for iOS and Android</li>
          <li><strong>SaaS Products:</strong> Cloud-based software-as-a-service solutions for various business needs</li>
          <li><strong>Software Development:</strong> Custom software solutions tailored to business requirements</li>
          <li><strong>Digital Marketing Solutions:</strong> SEO, social media marketing, and digital strategy services</li>
          <li><strong>UI/UX Design:</strong> User interface and user experience design for digital products</li>
          <li><strong>IT Consulting:</strong> Technology consulting and strategic advisory services</li>
          <li><strong>Cloud-Based Services:</strong> Cloud infrastructure, deployment, and management solutions</li>
        </ul>
        <p className="mt-4">The scope, timeline, and deliverables for each service will be defined in a separate Statement of Work (SOW) or project agreement.</p>
      </>
    ),
  },
  {
    title: "Payments and Billing",
    content: (
      <>
        <p>Payment terms for our services are as follows:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Payment terms will be outlined in the project proposal, invoice, or contract</li>
          <li>Payments are due as per the agreed schedule unless otherwise stated</li>
          <li>All prices are in Indian Rupees (INR) unless specified otherwise</li>
          <li>Applicable taxes (GST, etc.) will be added to invoices as required by law</li>
          <li>Late payments may incur additional charges as specified in the project agreement</li>
          <li>We accept payments via bank transfer, UPI, and other mutually agreed methods</li>
        </ul>
      </>
    ),
  },
  {
    title: "Subscription Services",
    content: (
      <>
        <p>For subscription-based services and SaaS products:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Subscriptions are billed on a monthly or annual basis as agreed</li>
          <li>Subscription fees are non-refundable except as expressly stated in the refund policy</li>
          <li>We reserve the right to modify subscription pricing with 30 days' notice</li>
          <li>Non-payment may result in service suspension or account termination</li>
          <li>Cancellation of subscription will take effect at the end of the current billing cycle</li>
        </ul>
      </>
    ),
  },
  {
    title: "Refund and Cancellation Policy",
    content: (
      <>
        <p>Our refund and cancellation policy is as follows:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li><strong>Project-Based Services:</strong> Refunds for custom development projects are handled on a case-by-case basis as defined in the project contract. Typically, deposits are non-refundable once work has commenced</li>
          <li><strong>SaaS Subscriptions:</strong> Monthly subscriptions may be cancelled anytime, with access continuing until the end of the paid billing period. No prorated refunds for partial months</li>
          <li><strong>Digital Products:</strong> All sales of digital products and software licenses are final unless explicitly stated otherwise</li>
          <li><strong>Cancellation:</strong> Either party may cancel a project with written notice as per the terms in the applicable service agreement</li>
        </ul>
        <p className="mt-4">Any refund will be processed within 15 business days of approval.</p>
      </>
    ),
  },
  {
    title: "Intellectual Property Rights",
    content: (
      <>
        <p><strong>Our Intellectual Property:</strong> All content, trademarks, logos, designs, software code, and materials on our website and platform are the property of Logisaar Technology Pvt Ltd unless otherwise stated. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
        <p className="mt-4"><strong>Deliverables:</strong> Upon full payment, we transfer the intellectual property rights of the custom-developed deliverables (code, designs, etc.) to the client, subject to the following:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>We retain the right to use third-party libraries, frameworks, and tools licensed under their respective open-source or commercial licenses</li>
          <li>We reserve the right to display the work in our portfolio unless a non-disclosure agreement is in place</li>
          <li>We retain ownership of our pre-existing tools, methodologies, and reusable components</li>
        </ul>
        <p className="mt-4"><strong>User Content:</strong> You retain ownership of any content you provide to us. By submitting content, you grant us a license to use it for the purpose of providing our services.</p>
      </>
    ),
  },
  {
    title: "User Responsibilities",
    content: (
      <>
        <p>As a user of our services, you agree to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Provide timely feedback, approvals, and required materials for project delivery</li>
          <li>Comply with all applicable laws and regulations</li>
          <li>Maintain the confidentiality of any proprietary information shared with you</li>
          <li>Not use our services for any illegal or unauthorized purpose</li>
          <li>Ensure that any content or data you provide does not infringe on third-party rights</li>
          <li>Cooperate with us to ensure timely delivery of services</li>
        </ul>
      </>
    ),
  },
  {
    title: "Prohibited Activities",
    content: (
      <>
        <p>You agree not to engage in any of the following prohibited activities:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Using our services for any unlawful purpose or in violation of any applicable law</li>
          <li>Attempting to gain unauthorized access to our systems, servers, or networks</li>
          <li>Uploading or transmitting viruses, malware, or any malicious code</li>
          <li>Interfering with or disrupting the integrity or performance of our services</li>
          <li>Reverse engineering, decompiling, or disassembling our software or platform</li>
          <li>Using our services to send unsolicited communications (spam)</li>
          <li>Impersonating any person or entity or misrepresenting your affiliation</li>
          <li>Engaging in any activity that could harm our reputation or business operations</li>
        </ul>
        <p className="mt-4">Violation of these prohibitions may result in immediate suspension or termination of services and legal action.</p>
      </>
    ),
  },
  {
    title: "Third-Party Links and Services",
    content: (
      <>
        <p>Our website and services may contain links to third-party websites, tools, or services that are not owned or controlled by Logisaar. We are not responsible for the content, privacy practices, or terms of these third-party platforms.</p>
        <p className="mt-4">We may integrate with third-party services including but not limited to payment gateways, analytics providers, cloud hosting services, and communication tools. Your use of these services is subject to their respective terms and conditions.</p>
        <p className="mt-4">We recommend reviewing the terms and privacy policies of any third-party services before using them in conjunction with our services.</p>
      </>
    ),
  },
  {
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by applicable law, Logisaar Technology Pvt Ltd and its directors, employees, partners, and affiliates shall not be liable for:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Any indirect, incidental, special, consequential, or punitive damages</li>
          <li>Loss of profits, revenue, data, or business opportunities</li>
          <li>Service interruption or downtime beyond our reasonable control</li>
          <li>Damages arising from your use or inability to use our services</li>
          <li>Content or actions of third parties</li>
        </ul>
        <p className="mt-4">Our total liability for any claim arising from these terms or our services shall not exceed the amount paid by you for the specific service giving rise to the claim. This limitation applies regardless of the legal theory on which the claim is based.</p>
      </>
    ),
  },
  {
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p>Our services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Implied warranties of merchantability, fitness for a particular purpose, or non-infringement</li>
          <li>Warranties that the services will be uninterrupted, error-free, or secure</li>
          <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
        </ul>
        <p className="mt-4">We do not guarantee that our services will meet your specific requirements or that defects will be corrected. We make no warranty regarding the results obtained from the use of our services.</p>
      </>
    ),
  },
  {
    title: "Indemnification",
    content: (
      <>
        <p>You agree to indemnify, defend, and hold harmless Logisaar Technology Pvt Ltd, its directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or related to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Your use or misuse of our services</li>
          <li>Your violation of these Terms & Conditions</li>
          <li>Your violation of any applicable law or third-party right</li>
          <li>Any content or data you provide or submit through our services</li>
          <li>Any dispute between you and another user or third party</li>
        </ul>
        <p className="mt-4">We reserve the right to assume the exclusive defense and control of any matter subject to indemnification, and you agree to cooperate with our defense of such claims.</p>
      </>
    ),
  },
  {
    title: "Account Suspension and Termination",
    content: (
      <>
        <p>We reserve the right to suspend or terminate your account or access to our services at any time, without prior notice, for the following reasons:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Violation of these Terms & Conditions</li>
          <li>Engagement in prohibited or illegal activities</li>
          <li>Non-payment of fees</li>
          <li>Request by law enforcement or government authority</li>
          <li>Extended period of inactivity</li>
          <li>Disruption or threat to our services or users</li>
        </ul>
        <p className="mt-4">Upon termination, your right to use our services will immediately cease. Provisions of these terms that by their nature should survive termination shall survive, including but not limited to intellectual property provisions, warranty disclaimers, indemnification, and limitations of liability.</p>
      </>
    ),
  },
  {
    title: "Confidentiality",
    content: (
      <>
        <p>Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of business. Confidential information includes but is not limited to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>Business strategies, processes, and methodologies</li>
          <li>Technical specifications and source code</li>
          <li>Client lists and business data</li>
          <li>Financial information and pricing details</li>
          <li>Project plans and trade secrets</li>
        </ul>
        <p className="mt-4">This confidentiality obligation shall survive the termination of our agreement and continue for a period of three years, or indefinitely for trade secrets.</p>
      </>
    ),
  },
  {
    title: "Governing Law and Jurisdiction",
    content: (
      <>
        <p>These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these terms or our services shall be subject to the exclusive jurisdiction of the courts in Cuttack, Odisha, India.</p>
        <p className="mt-4">Before initiating legal proceedings, both parties agree to attempt to resolve disputes through good faith negotiations for a period of 30 days. If the dispute remains unresolved, it may be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.</p>
      </>
    ),
  },
  {
    title: "Changes to Terms",
    content: (
      <>
        <p>We reserve the right to modify, update, or replace these Terms & Conditions at any time. Changes will be effective immediately upon posting the revised terms on this page. We will notify users of material changes via:</p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>A prominent notice on our website</li>
          <li>Email notification (if we have your contact information)</li>
        </ul>
        <p className="mt-4">Your continued use of our services after any changes constitutes acceptance of the updated terms. We encourage you to review this page periodically for the latest information on our terms.</p>
      </>
    ),
  },
  {
    title: "Contact Information",
    content: (
      <>
        <p>If you have any questions, concerns, or requests regarding these Terms & Conditions, please contact us:</p>
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

const TermsConditions = () => {
  return (
    <Layout>
      <SEO
        title="Terms & Conditions | Logisaar Technology Pvt Ltd"
        description="Read the Terms & Conditions of Logisaar Technology Pvt Ltd. Learn about the terms governing the use of our website, services, software products, and digital solutions."
        keywords="terms and conditions Logisaar, terms of service, software company terms, Logisaar Technology Pvt Ltd terms, website terms"
        canonical="https://logisaar.in/terms-conditions"
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
              Terms & Conditions
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

export default TermsConditions;
