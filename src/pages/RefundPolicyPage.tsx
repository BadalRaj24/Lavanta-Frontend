import { RefreshCw, AlertTriangle, Mail, Truck, Clock, AlertCircle, ShoppingBag, Info, XCircle, Edit } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-sm font-medium text-gray-500 mb-6">Effective Date: 27-03-2026</p>
          <div className="text-lg text-gray-600 max-w-2xl mx-auto space-y-2">
            <p><span className="font-semibold text-gray-800">Company Name:</span> Lavanta Naturals Private Limited</p>
            <p><span className="font-semibold text-gray-800">Website:</span> <a href="https://www.lavanta-naturals.in" className="text-[#9b51e0] hover:underline font-semibold">https://www.lavanta-naturals.in</a></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-12">
          
          {/* Section 1 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <RefreshCw className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Eligibility for Refunds</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We accept returns and issue refunds within <span className="font-semibold text-gray-800">7 days of delivery</span>, provided that:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The item is unused and in its original, unopened packaging</li>
                  <li>All seals, labels, and boxes are intact</li>
                  <li>You provide valid proof of purchase (order number, invoice, or receipt)</li>
                </ul>
                
                <p className="font-semibold text-gray-800 mt-6">Non-returnable items:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Opened or used skincare products</li>
                  <li>Products damaged due to misuse or improper storage</li>
                  <li>Items marked as “final sale” or “non-refundable”</li>
                  <li>Free samples or promotional gifts</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Damaged, Defective, or Incorrect Items</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>If you receive a damaged, defective, or incorrect item:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Contact us within <span className="font-semibold text-gray-800">48 hours of delivery</span></li>
                  <li>Provide:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Order number</li>
                      <li>Photos or video of the product and packaging</li>
                    </ul>
                  </li>
                </ol>
                <p className="mt-4">Once approved, we will offer:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Replacement, or</li>
                  <li>Store credit, or</li>
                  <li>Full refund to your original payment method</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Request a Refund</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>To request a refund:</p>
                <ol className="list-decimal pl-5 space-y-4">
                  <li>Email us at <a href="mailto:lavantanaturals@gmail.com" className="text-[#9b51e0] font-semibold hover:underline">lavantanaturals@gmail.com</a> with:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Full name</li>
                      <li>Order number</li>
                      <li>Reason for refund</li>
                      <li>Supporting images (if applicable)</li>
                    </ul>
                  </li>
                  <li>Our team will review your request within <span className="font-semibold text-gray-800">3–5 business days</span></li>
                  <li>If approved, we will share return instructions</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Truck className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Return Shipping</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>If the return is due to our error (damaged/incorrect item), we will cover the return shipping cost</li>
                  <li>If the return is due to personal reasons, the customer will bear return shipping charges</li>
                  <li>We recommend using a trackable courier service; we are not responsible for items lost in transit</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Processing</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Refunds will be processed within <span className="font-semibold text-gray-800">7–10 business days</span> after we receive and inspect the returned product</li>
                  <li>Refunds will be issued to the original payment method or as store credit (if selected)</li>
                  <li>Processing time may vary depending on your bank or payment provider</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <AlertCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Late or Missing Refunds</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>If you have not received your refund:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Check your bank account again</li>
                  <li>Contact your bank or payment provider</li>
                  <li>If the issue persists, contact us at <a href="mailto:lavantanaturals@gmail.com" className="text-[#9b51e0] font-semibold hover:underline">lavantanaturals@gmail.com</a></li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Orders from Third-Party Platforms</h2>
              <p className="text-gray-600 leading-relaxed">
                If you purchased products through third-party platforms (such as Amazon, Nykaa, or other resellers), their return and refund policies will apply. We can only process refunds for orders placed directly on our website.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <Info className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Allergic Reactions & Skin Sensitivity</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Skin types vary, and individual reactions may occur.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>We strongly recommend performing a patch test before use</li>
                  <li>If irritation occurs, discontinue use immediately</li>
                </ul>
                <p className="font-semibold text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  Refunds for allergic reactions are not guaranteed and are handled on a case-by-case basis at our sole discretion.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
              <div className="w-12 h-12 bg-[#F3E8FF] rounded-xl flex items-center justify-center text-[#9b51e0]">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Order Cancellation</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Orders can be cancelled only before they are dispatched</li>
                  <li>Once an order has been shipped, it cannot be cancelled</li>
                </ul>
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Refund Policy from time to time. Changes will be posted on this page with an updated Effective Date.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
