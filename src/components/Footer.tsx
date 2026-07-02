import { Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  // const { user } = useAuth(); // Removed unused auth

  return (
    <footer className="bg-[#CFAFF7] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/lavantalogo.jpg"
                alt="Lavanta Naturals Logo"
                className="w-18 h-18 object-contain bg-white rounded-full p-1"
              />
            </div>
            <p className="text-sm text-white/90">Pure Care Made With Love By Lavanta.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-[#6DBE45] transition-colors">Home</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-[#6DBE45] transition-colors">Contact Us</Link></li>
              <li><Link to="/refund-policy" className="hover:text-[#6DBE45] transition-colors">Refund Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-[#6DBE45] transition-colors">Disclaimer</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-[#6DBE45] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-[#6DBE45] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About Lavanta</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-[#6DBE45] transition-colors">Our Story</Link></li>
              <li><button className="hover:text-[#6DBE45] transition-colors">Sustainability</button></li>
              <li><button className="hover:text-[#6DBE45] transition-colors">Certifications</button></li>
            </ul>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.instagram.com/lavanta.naturals?igsh=b3lhZ2Q4eGxpNWk1" target="_blank" rel="noopener noreferrer" className="hover:text-[#6DBE45] transition-colors transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/17iEH42494/" target="_blank" rel="noopener noreferrer" className="hover:text-[#6DBE45] transition-colors transform hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="mailto:lavantanaturals@gmail.com" className="hover:text-[#6DBE45] transition-colors transform hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/80">
          <p>&copy; 2026 Lavanta Naturals. All rights reserved. Crafted with love by Badal Raj & Aditi Bundela.</p>
        </div>
      </div>
    </footer>
  );
}
