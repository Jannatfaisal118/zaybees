import React, { useState, useEffect } from "react";

// Zaybees - Privacy Policy Page
// Single-file React component styled with Tailwind CSS
// Designed for an international outerwear brand. Links to /contact and /about are included.

export default function PrivacyPolicy() {
  const [openIndex, setOpenIndex] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    // Show cookie banner if user hasn't dismissed it before
    const dismissed = localStorage.getItem("zaybees_cookie_dismissed");
    if (!dismissed) setShowCookieBanner(true);
  }, []);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const accordionItems = [
    {
      title: "Introduction",
      content: (
        <>
          <p className="mb-2">
            Zaybees is committed to protecting the privacy of our customers and
            visitors worldwide. This Privacy Policy explains what information we
            collect, why we collect it, how we use it, and the choices you have
            regarding your personal information.
          </p>
          <p className="text-sm text-gray-500">
            This policy applies to Zaybees websites, mobile apps, and other
            products and services that link to this policy.
          </p>
        </>
      ),
    },
    {
      title: "Information We Collect",
      content: (
        <>
          <h4 className="font-semibold">Personal information</h4>
          <p className="mb-2">
            Name, email address, billing & shipping addresses, phone number,
            account credentials, and payment information (collected by our
            payment processors).
          </p>
          <h4 className="font-semibold">Non-personal information</h4>
          <p>
            IP address, device and browser data, cookies and similar
            technologies, analytics data and aggregated usage information.
          </p>
        </>
      ),
    },
    {
      title: "How We Use Your Information",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-2">
            <li>To process orders, payments and ship products.</li>
            <li>To provide customer service and support.</li>
            <li>To send order updates, confirmations and transactional messages.</li>
            <li>To offer personalized product recommendations and promotions.</li>
            <li>To detect, prevent and respond to fraud or other illegal activity.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </>
      ),
    },
    {
      title: "How We Share Your Information",
      content: (
        <>
          <p className="mb-2">
            We share personal data with service providers necessary to operate
            our business — for example, payment processors, shipping carriers,
            fulfillment partners, customer support providers and hosting
            providers. We do not sell personal information to third parties.
          </p>
          <p className="text-sm text-gray-500">
            Where required, we will share data to comply with legal processes
            or to protect the rights, property or safety of Zaybees, our
            customers or others.
          </p>
        </>
      ),
    },
    {
      title: "International Data Transfers",
      content: (
        <>
          <p className="mb-2">
            Zaybees operates internationally and your personal data may be
            transferred to and processed in countries outside your jurisdiction.
            When we transfer personal data across borders we implement
            appropriate safeguards (for example, standard contractual clauses
            or other legal mechanisms) to ensure an adequate level of protection.
          </p>
        </>
      ),
    },
    {
      title: "Cookies & Tracking Technologies",
      content: (
        <>
          <p className="mb-2">
            We use cookies, pixels and similar technologies to operate our
            website, understand how you use our services, personalize content,
            and run analytics. A cookie banner (or settings) on the site lets
            you manage your preferences.
          </p>
          <p className="text-sm text-gray-500">You can change cookie settings at any time through the banner link.</p>
        </>
      ),
    },
    {
      title: "Your Rights",
      content: (
        <>
          <p className="mb-2">
            Depending on your jurisdiction, you may have rights including the
            right to access, correct, update, export or delete your personal
            data, and to object to or restrict certain processing. Residents of
            certain regions (such as the EU and California) have additional
            rights under applicable law.
          </p>
          <p className="text-sm text-gray-500">
            To exercise your rights, contact us via the details below. We may
            need to verify your identity before acting on requests.
          </p>
        </>
      ),
    },
    {
      title: "Data Retention",
      content: (
        <>
          <p className="mb-2">
            We retain personal data for as long as needed to provide services,
            fulfill legal obligations, resolve disputes, and enforce our
            agreements. Retention periods vary depending on the type of data
            and the purpose for which it was collected.
          </p>
        </>
      ),
    },
    {
      title: "Security of Your Data",
      content: (
        <>
          <p className="mb-2">
            We implement reasonable administrative, technical and physical
            safeguards designed to protect personal information. For example,
            we use HTTPS, encryption for sensitive data in transit, and
            access controls. However, no method of transmission or storage is
            completely secure.
          </p>
        </>
      ),
    },
    {
      title: "Children’s Privacy",
      content: (
        <>
          <p>
            Zaybees does not knowingly collect personal information from
            children under 13. If we become aware that a child under the legal
            age has provided us with personal information, we will delete such
            information from our systems.
          </p>
        </>
      ),
    },
    {
      title: "Changes to This Policy",
      content: (
        <>
          <p className="mb-2">
            We may update this policy from time to time. When we make material
            changes, we will post the updated policy with a new "Last updated"
            date and, where required, provide additional notice.
          </p>
        </>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p className="mb-2">
            For privacy inquiries, please contact our Data Protection team:
          </p>
          <p className="font-medium">privacy@zaybees.com</p>
          <p className="text-sm text-gray-500 mt-1">Zaybees Ltd. — Headquarters</p>
          <p className="text-sm text-gray-500">123 Outdoor Ave, Suite 400, London, UK</p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
          <p className="mt-4 text-gray-700">
            This Privacy Policy explains how Zaybees collects, uses, discloses,
            and protects personal information. If you have questions, visit our
            <a href="/contact" className="text-blue-600 underline ml-1">Contact</a> page.
          </p>
        </header>

        <section aria-label="privacy-accordion" className="space-y-4">
          {accordionItems.map((item, i) => (
            <article key={i} className="border rounded-lg overflow-hidden">
              <button
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
              >
                <span className="font-medium">{item.title}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`px-5 pb-5 transition-max-height duration-300 overflow-hidden ${
                  openIndex === i ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pt-2 text-gray-700">{item.content}</div>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-10 border-t pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
          <div>
            <p>© {new Date().getFullYear()} Zaybees. All rights reserved.</p>
          </div>

          <nav className="mt-3 sm:mt-0 space-x-4">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
            <a href="/returns" className="hover:underline">Returns & Refunds</a>
            <a href="/shipping" className="hover:underline">Shipping Policy</a>
          </nav>
        </footer>
      </main>

      {/* Cookie banner */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg rounded-lg max-w-3xl w-full mx-4">
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-medium">We use cookies to improve your experience.</p>
              <p className="text-sm text-gray-600">Manage your cookie preferences or continue to use the site.</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="/cookie-settings" className="text-sm underline">Cookie Settings</a>
              <button
                onClick={() => {
                  localStorage.setItem("zaybees_cookie_dismissed", "1");
                  setShowCookieBanner(false);
                }}
                className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
