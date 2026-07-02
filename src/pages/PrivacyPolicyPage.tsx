import { Shield, Lock, Eye, FileText, Info, HardDrive, Share2, CreditCard, Trash2, Globe, Cookie, HelpCircle, Users, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-sm font-medium text-gray-500 mb-6">Last updated: 26-03-2026</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lavanta Naturals is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit or make a purchase from <a href="https://www.lavanta-naturals.in" className="text-[#9b51e0] hover:underline font-semibold">https://www.lavanta-naturals.in</a>.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            By using our website (“Site”), you agree to the practices described in this Privacy Policy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
          
          {/* Section 1 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Eye className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>We may collect the following types of information:</p>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">a. Information You Provide Directly</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Contact details: name, email address, phone number, shipping and billing address</li>
                    <li>Account details: username, password, and profile information if you create an account</li>
                    <li>Order details: products purchased, transaction history, and payment method (processed via third-party providers)</li>
                    <li>Communication: messages sent via email, contact forms, reviews, or queries</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">b. Information Collected Automatically</h3>
                  <p className="mb-2">When you use the Site, we may automatically collect:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Device and usage data: IP address, browser type, operating system, pages viewed, time and date of visits, and referring URLs</li>
                    <li>Cookies and similar technologies: small files stored on your device to remember preferences, analyze traffic, and personalize content</li>
                  </ul>
                  <p className="mt-4 text-sm text-gray-500 italic">
                    Some cookies may be set by third parties such as analytics or advertising partners. You can manage cookies through your browser settings; however, disabling them may affect site functionality.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We use your information to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Process and deliver your orders, including payments, shipping, and returns</li>
                  <li>Create and manage your account</li>
                  <li>Communicate with you regarding orders, support requests, and updates</li>
                  <li>Send marketing emails and skincare tips (only if you consent; you can unsubscribe anytime)</li>
                  <li>Personalize your experience and provide relevant product recommendations</li>
                  <li>Improve our website, products, and customer service through analytics and performance monitoring</li>
                  <li>Detect and prevent fraud, security issues, or technical problems</li>
                  <li>Comply with legal obligations and enforce our policies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Info className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Legal Basis for Processing</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Where applicable, we process your personal data based on:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Performance of a contract (to fulfill your orders)</li>
                  <li>Your consent (for marketing and non-essential cookies)</li>
                  <li>Legitimate interests (to improve services, ensure security, and prevent fraud)</li>
                  <li>Legal obligations (such as tax and accounting requirements)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Share2 className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. How We Share Your Information</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We do not sell your personal information. We may share it with:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Service providers: payment processors (such as Razorpay/Stripe), shipping partners, hosting providers, and analytics tools</li>
                  <li>Legal authorities: when required by law or to protect our rights and safety</li>
                  <li>Business transfers: in case of a merger, acquisition, or sale of business assets</li>
                </ul>
                <p className="mt-4 italic text-sm text-gray-500">
                  All third-party providers are required to protect your data and use it only for specified purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment Information</h2>
              <p className="text-gray-600 leading-relaxed">
                All payments are processed securely through trusted third-party payment gateways (such as Razorpay or Stripe). We do not store your card or banking details.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <HardDrive className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We retain your information only as long as necessary:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Order data: as required by tax and accounting laws</li>
                  <li>Account data: while your account is active</li>
                  <li>Marketing data: until you unsubscribe or withdraw consent</li>
                </ul>
                <p className="mt-4 text-sm text-gray-500 italic">
                  After this, data is securely deleted or anonymized unless legally required otherwise.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Security</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  We implement appropriate technical and organizational measures, including SSL encryption, secure storage, and access controls, to protect your personal data.
                </p>
                <p className="italic text-sm text-gray-500">
                  However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Trash2 className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your data</li>
                  <li>Restrict or object to certain processing</li>
                  <li>Withdraw consent at any time</li>
                  <li>Request a copy of your data (data portability)</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, contact us using the details below. Identity verification may be required.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Cookie className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Cookies and Tracking Technologies</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We use:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Essential cookies (for site functionality like cart and login)</li>
                  <li>Analytics cookies (to understand usage and improve performance)</li>
                  <li>Functional cookies (to remember preferences)</li>
                  <li>Advertising cookies (to show relevant ads, if applicable)</li>
                </ul>
                <p className="text-sm text-gray-500 italic mt-4">
                  Where required, we obtain your consent before using non-essential cookies. You can manage preferences anytime.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Share2 className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Third-Party Websites and Social Media</h2>
              <p className="text-gray-600 leading-relaxed">
                Our Site may contain links to third-party websites or platforms (such as Instagram or Facebook). We are not responsible for their privacy practices and recommend reviewing their policies.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Children’s Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website is not intended for individuals under the age of 18. We do not knowingly collect personal data from children. If such data is identified, we will take steps to delete it.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Globe className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. International Users</h2>
              <p className="text-gray-600 leading-relaxed">
                If you access our website from outside India, your information may be transferred to and processed in India, where data protection laws may differ.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <HelpCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date. Continued use of the Site indicates acceptance of the updated policy.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Us</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-2 mt-4">
                  <p><span className="font-semibold text-gray-800">Company Name:</span> Lavanta Naturals Private Limited</p>
                  <p><span className="font-semibold text-gray-800">Address:</span> Rasulpur Saidpur Bazid, Tola Panch, Ramna (Muzaffarpur), Bihar – 842002, India</p>
                  <p><span className="font-semibold text-gray-800">Email:</span> <a href="mailto:lavantanaturals@gmail.com" className="text-[#9b51e0] hover:underline font-medium">lavantanaturals@gmail.com</a></p>
                  <p><span className="font-semibold text-gray-800">Phone:</span> +91 7643065620, +91 9301907370</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
