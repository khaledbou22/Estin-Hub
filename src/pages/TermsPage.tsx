import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="mb-3 text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h2>
    <div className="space-y-3 text-[15px] leading-[1.75] text-[#374151] dark:text-[#CBD5E1]">{children}</div>
  </section>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#050505]">
      <div className="mx-auto max-w-[760px] px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-[#6C63FF] hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-[36px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">Terms of Service</h1>
          <p className="mt-2 text-[14px] text-[#64748B]">Last updated: January 1, 2025</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#4338CA]" />
        </div>

        <Section title="1. About Estin Hub">
          <p>Estin Hub is a campus platform exclusively for students of ESTIN University (École Supérieure en Sciences et Technologies de l'Informatique et du Numérique), located in Bejaia, Algeria. The platform allows students to post services, buy and sell items, coordinate transport, and report lost or found objects.</p>
          <p>By creating an account and using Estin Hub, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.</p>
        </Section>

        <Section title="2. Eligibility">
          <p>Access to Estin Hub is restricted to current students of ESTIN University. To register, you must use a valid <strong>@estin.dz</strong> university email address. By signing up, you confirm that:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>You are a current or recently enrolled student at ESTIN University.</li>
            <li>The information you provide during registration is accurate and truthful.</li>
            <li>You are at least 18 years of age, or have parental consent if under 18.</li>
          </ul>
          <p>We reserve the right to suspend or terminate accounts that do not meet these eligibility requirements.</p>
        </Section>

        <Section title="3. Acceptable Use">
          <p>You agree to use Estin Hub only for lawful purposes and in a manner consistent with the spirit of a student community. You must not:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Post false, misleading, or fraudulent content.</li>
            <li>Harass, threaten, or intimidate other users.</li>
            <li>Post spam, unsolicited advertisements, or repetitive content.</li>
            <li>Attempt to gain unauthorized access to other accounts or the platform's systems.</li>
            <li>Use the platform for any commercial purpose unrelated to student life.</li>
            <li>Share personal information of other users without their consent.</li>
          </ul>
        </Section>

        <Section title="4. Content Rules">
          <p>All content posted on Estin Hub must comply with the following rules:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li><strong>No offensive content:</strong> Posts must not contain hate speech, discriminatory language, or content that demeans individuals or groups.</li>
            <li><strong>No illegal content:</strong> Do not post content that promotes or facilitates illegal activities.</li>
            <li><strong>No adult content:</strong> The platform is a professional academic environment. Adult or explicit content is strictly prohibited.</li>
            <li><strong>Accurate listings:</strong> Items and services listed must be accurately described. Misleading listings will be removed.</li>
          </ul>
          <p>We reserve the right to remove any content that violates these rules without prior notice.</p>
        </Section>

        <Section title="5. Account Termination">
          <p>We may suspend or permanently terminate your account if you:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Violate any of these Terms of Service.</li>
            <li>Engage in behavior that harms other users or the platform.</li>
            <li>Are no longer enrolled at ESTIN University.</li>
            <li>Provide false information during registration.</li>
          </ul>
          <p>You may also delete your own account at any time by contacting us at the email below.</p>
        </Section>

        <Section title="6. Intellectual Property">
          <p>You retain ownership of the content you post on Estin Hub. By posting content, you grant Estin Hub a non-exclusive, royalty-free license to display and distribute that content within the platform for the purpose of operating the service.</p>
          <p>The Estin Hub name, logo, and platform design are the intellectual property of the Estin Hub team and may not be used without permission.</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>Estin Hub is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content posted by users.</p>
          <p>To the maximum extent permitted by law, Estin Hub and its operators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to disputes between users over transactions, lost data, or service interruptions.</p>
          <p>All transactions and agreements made between users are solely between those users. Estin Hub is not a party to any such agreements.</p>
        </Section>

        <Section title="8. Changes to These Terms">
          <p>We may update these Terms of Service from time to time. We will notify users of significant changes by posting a notice on the platform. Continued use of Estin Hub after changes are posted constitutes your acceptance of the updated terms.</p>
        </Section>

        <Section title="9. Contact">
          <p>If you have questions about these Terms of Service, please contact us at:</p>
          <p className="font-medium text-[#6C63FF]">support@estin-hub.dz</p>
          <p>ESTIN University, Bejaia, Algeria</p>
        </Section>

        <div className="mt-12 border-t border-[#E8ECEF] pt-8 dark:border-[#2A2A2A]">
          <p className="text-[13px] text-[#94A3B8]">
            Also see our{" "}
            <Link to="/privacy" className="text-[#6C63FF] hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
