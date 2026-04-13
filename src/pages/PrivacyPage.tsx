import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="mb-3 text-[20px] font-bold text-[#0F172A] dark:text-[#F8FAFC]">{title}</h2>
    <div className="space-y-3 text-[15px] leading-[1.75] text-[#374151] dark:text-[#CBD5E1]">{children}</div>
  </section>
);

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#050505]">
      <div className="mx-auto max-w-[760px] px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-[#6C63FF] hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-[36px] font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">Privacy Policy</h1>
          <p className="mt-2 text-[14px] text-[#64748B]">Last updated: January 1, 2025</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#4338CA]" />
        </div>

        <Section title="1. Introduction">
          <p>Estin Hub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the Estin Hub platform.</p>
          <p>By using Estin Hub, you agree to the collection and use of information in accordance with this policy.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following types of information:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Account information:</strong> Your full name, university email address (@estin.dz), and password (stored securely and never in plain text).
            </li>
            <li>
              <strong>Profile information:</strong> Optional details you choose to add, such as a bio, city, study year, skills, and social media links.
            </li>
            <li>
              <strong>Posts and content:</strong> Any posts, listings, or messages you create on the platform, including service listings, marketplace items, transport posts, and lost & found reports.
            </li>
            <li>
              <strong>Usage data:</strong> Basic information about how you interact with the platform, such as pages visited and features used, for the purpose of improving the service.
            </li>
          </ul>
          <p>We do not collect payment information. All transactions between users are handled directly between the parties involved.</p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use the information we collect to:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>Create and manage your account.</li>
            <li>Display your profile and posts to other verified ESTIN students.</li>
            <li>Send you account-related emails (verification, password reset).</li>
            <li>Improve the platform's features and user experience.</li>
            <li>Enforce our Terms of Service and maintain platform safety.</li>
          </ul>
          <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
        </Section>

        <Section title="4. Data Storage">
          <p>Your data is stored securely using <strong>Supabase</strong>, a cloud-based backend platform with industry-standard security practices including encryption at rest and in transit.</p>
          <p>Supabase infrastructure is hosted on AWS (Amazon Web Services) in data centers that comply with international security standards (SOC 2, ISO 27001).</p>
          <p>We retain your data for as long as your account is active. If you delete your account, your personal data will be removed within 30 days, except where retention is required by law.</p>
        </Section>

        <Section title="5. Your Rights">
          <p>As a user of Estin Hub, you have the following rights regarding your personal data:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li><strong>Access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> You can update your profile information at any time through the Settings page.</li>
            <li><strong>Deletion:</strong> You can request the deletion of your account and all associated data by contacting us at the email below.</li>
            <li><strong>Data export:</strong> You can request an export of your data in a machine-readable format.</li>
            <li><strong>Objection:</strong> You can object to certain types of data processing by contacting us.</li>
          </ul>
          <p>To exercise any of these rights, please contact us at <span className="font-medium text-[#6C63FF]">support@estin-hub.dz</span>.</p>
        </Section>

        <Section title="6. Cookies">
          <p>Estin Hub uses minimal cookies and browser storage to operate the platform:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li><strong>Authentication tokens:</strong> Stored in your browser to keep you logged in between sessions.</li>
            <li><strong>Preferences:</strong> Local storage is used to remember your theme preference (light/dark mode).</li>
            <li><strong>Saved posts:</strong> Your bookmarked posts are stored locally in your browser.</li>
          </ul>
          <p>We do not use third-party advertising cookies or tracking pixels.</p>
        </Section>

        <Section title="7. Security">
          <p>We take the security of your data seriously. Measures we have in place include:</p>
          <ul className="ml-5 list-disc space-y-1">
            <li>All passwords are hashed using industry-standard algorithms — we never store plain-text passwords.</li>
            <li>All data transmission is encrypted using HTTPS/TLS.</li>
            <li>Email verification is required before accessing the platform.</li>
            <li>Access to the platform is restricted to verified @estin.dz email addresses.</li>
          </ul>
          <p>Despite these measures, no system is 100% secure. We encourage you to use a strong, unique password and to keep your login credentials confidential.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. We will notify users of significant changes by posting a notice on the platform. The "Last updated" date at the top of this page will reflect the most recent revision.</p>
        </Section>

        <Section title="9. Contact">
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:</p>
          <p className="font-medium text-[#6C63FF]">support@estin-hub.dz</p>
          <p>ESTIN University, Bejaia, Algeria</p>
        </Section>

        <div className="mt-12 border-t border-[#E8ECEF] pt-8 dark:border-[#2A2A2A]">
          <p className="text-[13px] text-[#94A3B8]">
            Also see our{" "}
            <Link to="/terms" className="text-[#6C63FF] hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
