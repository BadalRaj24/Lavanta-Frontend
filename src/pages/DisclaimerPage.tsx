import { Info, ShieldAlert, Sparkles, AlertCircle, ShoppingBag, ExternalLink, XOctagon, RefreshCw, CheckCircle, Edit, Mail } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-sm font-medium text-gray-500 mb-6">Last Updated: 27-03-2026</p>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto space-y-2">
            <p>Welcome to Lavanta Naturals Private Limited. By using our website <a href="https://www.lavanta-naturals.in" className="text-[#9b51e0] hover:underline font-semibold">https://www.lavanta-naturals.in</a>, you agree to the terms outlined in this Disclaimer.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
          
          {/* Section 1 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Info className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. General Information</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>All content provided on this website, including product descriptions, skincare tips, and other information, is for general informational purposes only.</p>
                <p>While we strive to ensure accuracy, we do not guarantee that all information is complete, reliable, or error-free.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <ShieldAlert className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. No Medical Advice</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>The information and products provided by Lavanta Naturals are not intended to diagnose, treat, cure, or prevent any medical condition or disease.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Our skincare products are for cosmetic use only</li>
                  <li>Always perform a patch test before using any product</li>
                  <li>Consult a qualified dermatologist or healthcare professional if you have sensitive skin, allergies, or any medical concerns</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Individual Results May Vary</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Results from using our products may vary from person to person depending on skin type, lifestyle, and other factors.</p>
                <p>We do not guarantee specific results from the use of our products.</p>
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Allergic Reactions & Skin Sensitivity</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Lavanta Naturals shall not be held responsible for any allergic reactions, irritation, or adverse effects resulting from the use of our products, especially if:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Products are not used as directed</li>
                  <li>Ingredient lists are not reviewed before use</li>
                  <li>Patch testing is not performed</li>
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Product Information</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We make every effort to display product colors, ingredients, and descriptions as accurately as possible. However:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Actual product colors may vary due to screen settings</li>
                  <li>Ingredient lists and packaging may change from time to time</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <ExternalLink className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. External Links Disclaimer</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Our website may contain links to third-party websites (such as social media platforms or external services). We are not responsible for the content, accuracy, or practices of these third-party websites.</p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <XOctagon className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>To the fullest extent permitted by law, Lavanta Naturals shall not be liable for any direct, indirect, incidental, or consequential damages arising from:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Use or misuse of our products</li>
                  <li>Reliance on information provided on this website</li>
                  <li>Any interruption or error in website functionality</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. No Guarantees</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We do not guarantee uninterrupted or error-free operation of the website. We reserve the right to modify or discontinue any part of the website without prior notice.</p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Consent</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>By using our website, you hereby consent to this Disclaimer and agree to its terms.</p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Edit className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Disclaimer</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We may update this Disclaimer from time to time. Any changes will be posted on this page with an updated “Last Updated” date.</p>
              </div>
            </div>
          </section>

          {/* Section 11 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p>If you have any questions regarding this Disclaimer, please contact us:</p>
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
