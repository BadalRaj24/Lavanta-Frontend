import { FileText, UserCheck, Shield, AlertCircle, ShoppingBag, Truck, RefreshCw, User, Edit3, Copyright, AlertTriangle, XOctagon, ShieldAlert, Zap, Edit, Gavel } from 'lucide-react';

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-sm font-medium text-gray-500 mb-6">Last updated: 26-03-2026</p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome to Lavanta Naturals. These Terms and Conditions govern your use of our website <a href="https://www.lavanta-naturals.in" className="text-[#9b51e0] hover:underline font-semibold">https://www.lavanta-naturals.in</a> and any products or services offered through it.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
          
          {/* Section 1 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <FileText className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Lavanta Naturals. These Terms and Conditions govern your use of our website and any products or services offered through it. By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <UserCheck className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="text-gray-600 leading-relaxed">
                You must be at least 18 years old to use this website, or under the supervision of a parent or guardian.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Shield className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Use of the Website</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>You agree to use the website only for lawful purposes. You must not:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the website in a way that may damage or disrupt it</li>
                  <li>Copy, distribute, or modify content without permission</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Product Information and Disclaimer</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>We strive to provide accurate product descriptions and information. However, we do not guarantee that all content is error-free or complete.</li>
                  <li>Our products are not intended to diagnose, treat, cure, or prevent any disease.</li>
                  <li>Always perform a patch test and consult a dermatologist if needed.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Orders, Pricing, and Payment</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>All prices are listed in INR (₹) and may change without notice</li>
                  <li>We reserve the right to cancel or refuse orders</li>
                  <li>You must provide accurate purchase information</li>
                  <li>Payments are processed through secure third-party providers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Shipping, Delivery, and Risk</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Delivery timelines are estimates and may vary</li>
                  <li>Risk of loss transfers upon delivery</li>
                  <li>Lavanta Naturals shall not be responsible for delays or issues caused by third-party logistics providers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns, Refunds, and Cancellations</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Due to hygiene reasons, opened or used products cannot be returned unless defective</li>
                  <li>Requests must be made within 7 days of delivery</li>
                  <li>Refund approval is at our discretion</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for maintaining account security and must notify us of unauthorized use.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Edit3 className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User Content</h2>
              <p className="text-gray-600 leading-relaxed">
                By posting content, you grant us a non-exclusive, royalty-free license to use it.
              </p>
            </div>
          </section>

          {/* Section 10 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Copyright className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All website content is owned by Lavanta Naturals and protected by law. Unauthorized use is prohibited.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                We are not liable for indirect damages or allergic reactions caused by misuse. Liability is limited to the product purchase amount.
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <XOctagon className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Disclaimer of Warranties</h2>
              <p className="text-gray-600 leading-relaxed">
                All services and products are provided “as is” without warranties of any kind.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed">
                You agree to indemnify us against claims arising from misuse of the website or violation of these Terms.
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Zap className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Force Majeure</h2>
              <p className="text-gray-600 leading-relaxed">
                We are not responsible for delays caused by events beyond our control, including natural disasters, strikes, or technical failures.
              </p>
            </div>
          </section>

          {/* Section 15 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Edit className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these Terms at any time. Continued use means acceptance of changes.
              </p>
            </div>
          </section>

          {/* Section 16 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Gavel className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms are governed by the laws of India. Any disputes shall fall under the jurisdiction of courts in Jaipur, Rajasthan.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
