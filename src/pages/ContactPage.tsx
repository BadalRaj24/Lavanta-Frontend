import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import api from '../api';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast(); // Initialize useToast

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // The instruction's code edit implies removing phone and subject from formData
      // and changing the endpoint. I will apply these changes as per the instruction.
      // The instruction's code edit implies sending formData directly, not a filtered dataToSend.
      await api.post('/contact', formData);
      setSubmitted(true);
      addToast('success', 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      addToast('error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-white to-[#F0FDF4] overflow-hidden">
      {/* Hero Section */}
      <div className="relative bg-[#6DBE45] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556228578-8d84f5a4a58b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#6DBE45]/20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-sm">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Our team is always here to chat.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Contact Information Column */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6 flex items-center">
                Contact Information
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Have a question about our products, orders, or just want to say hello? Reach out to us through any of these channels.
              </p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="mailto:lavantanaturals@gmail.com"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-[#6DBE45]/30 hover:shadow-[0_10px_30px_-10px_rgba(109,190,69,0.2)] transition-all group"
              >
                <div className="w-12 h-12 bg-[#E8F5E9] text-[#6DBE45] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#6DBE45] group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Email</h3>
                <p className="text-gray-500 text-sm mb-2">For general inquiries</p>
                <span className="text-[#6DBE45] font-medium text-sm group-hover:underline break-words">lavantanaturals@gmail.com</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/lavanta.naturals"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-[#DFC5FE]/50 hover:shadow-[0_10px_30px_-10px_rgba(223,197,254,0.3)] transition-all group"
              >
                <div className="w-12 h-12 bg-[#F3E8FF] text-[#9333EA] rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-500 group-hover:text-white transition-all">
                  <Instagram className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Instagram</h3>
                <p className="text-gray-500 text-sm mb-2">Follow our journey</p>
                <span className="text-[#9333EA] font-medium text-sm group-hover:underline">@lavantanaturals</span>
              </motion.a>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-100 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)] transition-all group"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Phone</h3>
                <p className="text-gray-500 text-sm mb-2">Mon-Fri from 11am to 5pm</p>
                <span className="text-blue-600 font-medium text-sm">+91 7643065620</span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-red-100 hover:shadow-[0_10px_30px_-10px_rgba(239,68,68,0.15)] transition-all group"
              >
                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Location</h3>
                <p className="text-gray-500 text-sm mb-2">ACIC-VGU, VGU Campus, NRI Road, Jagatpura, Jaipur, Rajasthan</p>
                <span className="text-red-600 font-medium text-sm">India</span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 bg-gradient-to-r from-[#6DBE45] to-[#5da838] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex items-start space-x-4">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Need Skincare Advice?</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Our skincare experts can help you build the perfect routine for your unique skin type.
                  </p>
                  <Button 
                    variant="outline" 
                    className="!bg-transparent !border-white !text-white !hover:bg-white !hover:text-[#6DBE45] shadow-none hover:shadow-md"
                    onClick={() => navigate('/chat-with-expert')}
                  >
                    Chat with Expert
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form Column */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] p-8 md:p-10 border border-gray-100 h-full">
              <h2 className="font-serif text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#F0FDF4] border border-[#6DBE45]/20 rounded-2xl p-10 text-center flex flex-col items-center justify-center h-[400px]"
                >
                  <div className="w-20 h-20 bg-[#6DBE45] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                    <Send className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800 mb-3">Message Sent!</h3>
                  <p className="text-gray-600 max-w-xs mx-auto">
                    Thank you for reaching out. We have received your message and will respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[#6DBE45] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45]/50 focus:border-[#6DBE45] outline-none transition-all placeholder:text-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45]/50 focus:border-[#6DBE45] outline-none transition-all placeholder:text-gray-400"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45]/50 focus:border-[#6DBE45] outline-none transition-all placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45]/50 focus:border-[#6DBE45] outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic...</option>
                        <option value="product">Product Inquiry</option>
                        <option value="order">Order Status</option>
                        <option value="support">Customer Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6DBE45]/50 focus:border-[#6DBE45] outline-none transition-all resize-none placeholder:text-gray-400"
                      placeholder="How can we help you today?"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-4 text-lg shadow-lg shadow-[#6DBE45]/30 hover:shadow-[#6DBE45]/50 transition-all transform hover:-translate-y-1"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
