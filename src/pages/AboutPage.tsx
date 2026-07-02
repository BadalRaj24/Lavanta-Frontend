import { Mail, Linkedin, Instagram, Facebook, Target, Eye, Heart, Users, Quote, ArrowRight, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function AboutPage() {
  const navigate = useNavigate();
  const founders = [
    {
      name: 'Badal Raj',
      role: 'Founder & CEO',
      image: '/badalraj.jpg',
      email: 'badalraj1824@gmail.com',
      linkedin: 'https://www.linkedin.com/in/badal-raj-045921290',
      instagram: 'https://www.instagram.com/badal_raj.45?igsh=Zmt1OWM4cjJqanR2',
      facebook: 'https://www.facebook.com/share/19ww28tBM4/',
      bio: `Lavanta Naturals began with Badal’s personal experience of dealing with skin concerns and the challenge of finding
skincare that was honest, effective, and easy to trust. What started as a simple idea became a clear purpose — to create
science-backed, thoughtfully made products for everyday use. As Founder & CEO, Badal is closely involved in shaping the
brand, from formulations to quality standards, guided by patience, consistency, and responsibility toward customers.`
    },
    {
      name: 'Aditi Bundela',
      role: 'Co-Founder & Managing Director',
      image: '/aditi.jpg',
      email: 'aditibundela094@gmail.com',
      linkedin: 'https://www.linkedin.com/in/aditi-bundela-5519a82aa',
      instagram: 'https://www.instagram.com/aditi_bundela___?igsh=MTd1MG56aGU0cTc5NA==',
      facebook: 'https://www.facebook.com/share/17iEH42494/',
      bio: `Aditi plays a key role in Lavanta Naturals’ growth and daily execution. With a strong focus on operations,
planning, and customer experience, she ensures the brand runs smoothly while staying true to its purpose. As Co-Founder &
Managing Director, she brings clarity and structure to the vision, helping transform ideas into reliable outcomes built
on trust, honesty, and long-term value.`
    }
  ];
  // ... rest of the file (values array etc) is unchanged, but I need to be careful with replace_file_content limit.
  // I will target just the imports and the founders array definition.

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every product is crafted with our customers\' wellbeing in mind'
    },
    {
      icon: Sparkles,
      title: 'Quality Excellence',
      description: 'Rigorous testing and thoughtfully crafted formulations.'
    },
    {
      icon: Users,
      title: 'Transparency',
      description: 'Complete honesty about ingredients, sourcing, and manufacturing'
    },
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To create safe, effective, science-backed skincare that delivers real results for every skin.'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To build a trusted skincare brand known for honesty, innovation, and visible performance.'
    },
    {
      icon: Shield,
      title: 'Our Values',
      description: 'Transparency, quality and customer trust guide every product we create.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#DFC5FE]/30 to-[#6DBE45]/20 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/80 text-[#6DBE45] font-semibold text-sm mb-4 border border-[#6DBE45]/20">
            Est. 2025
          </span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About Lavanta Naturals
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            Lavanta is honest, science-backed skincare made for real Indian skin. <br className="hidden md:block" />
            No overpromises — just results you can trust, every day.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#DFC5FE]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6DBE45]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12 mb-16 border border-gray-100"
        >
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="w-12 h-12 text-[#6DBE45]/30 mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Story</h2>

            <div className="space-y-6 text-gray-600">
              <p className="text-xl font-medium text-[#6DBE45]">
                Lavanta didn’t begin in a luxury lab — it started in a college hostel room.
              </p>

              <p className="text-base leading-relaxed">
                Like most students, we dealt with everyday skin problems caused by stress, pollution, irregular routines, and hard water. We tried popular skincare brands, but they either felt overpriced, made big promises with little results, or never clearly explained what was inside the product and how it actually worked.
              </p>

              <p className="text-base leading-relaxed">
                We weren’t looking for skincare that looks good only in ads. We wanted something <span className="font-semibold text-gray-800">simple, effective, and honest</span> — skincare that actually fits into everyday life.
              </p>

              <div className="text-base leading-relaxed space-y-2">
                <p>We also realized something important:</p>
                <p className="font-semibold text-gray-800">most brands try to sell first and educate later (or not at all).</p>
                <p>At Lavanta, we chose the opposite.</p>
                <p className="font-semibold text-[#6DBE45]">We believe in educating first — then selling.</p>
              </div>

              <p className="text-base leading-relaxed">
                That’s why we focus on complete ingredient transparency, clearly explaining the science behind every formulation. We use proven, science-backed ingredients and openly share what goes into each product, so our customers know exactly what they are applying to their skin.
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="py-8"
              >
                <span className="font-serif text-3xl text-gray-800 border-b-2 border-[#6DBE45] pb-2 inline-block">
                  That’s how Lavanta was born.
                </span>
              </motion.div>

              <p className="text-base leading-relaxed">
                Every Lavanta product is carefully crafted using skin-friendly ingredients, focusing on visible results, minimal routines, and everyday comfort. No exaggerated claims. No unnecessary steps.
              </p>

              <p className="text-base leading-relaxed">
                We are building a premium skincare brand in an affordable segment — making high-quality, science-backed skincare accessible without inflated prices or marketing hype.
              </p>

              <p className="text-base leading-relaxed font-semibold text-gray-800">
                Just skincare made for real Indian skin and real daily life.
              </p>

              <p className="text-lg font-medium text-gray-700 italic mt-8 bg-gray-50 p-6 rounded-xl border-l-4 border-[#6DBE45]">
                “Lavanta isn’t about perfection.
                It’s about progress, consistency, education, and trust.”
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">What Drives Us</h2>
            <div className="w-24 h-1 bg-[#6DBE45] mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our core principles that guide every formulation and decision we make.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#6DBE45]/30 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-[#DFC5FE]/30 to-[#6DBE45]/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-7 h-7 text-[#6DBE45]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Founders Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-gray-900 mb-4">Meet Our Founders</h2>
            <div className="w-24 h-1 bg-[#DFC5FE] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="bg-gradient-to-br from-[#DFC5FE] to-[#6DBE45]/20 p-8 text-center relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-48 h-48 rounded-full object-cover mx-auto border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 text-center mb-1">{founder.name}</h3>
                  <p className="text-[#6DBE45] font-semibold text-center mb-6 uppercase tracking-wide text-sm">{founder.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-8 text-center">{founder.bio}</p>

                  <div className="flex flex-col items-center space-y-4 mt-auto">
                    <a
                      href={`mailto:${founder.email}`}
                      className="flex items-center space-x-2 text-gray-500 hover:text-[#6DBE45] transition-colors bg-gray-50 px-4 py-2 rounded-full"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-medium">{founder.email}</span>
                    </a>

                    <div className="flex justify-center space-x-4 pt-2">
                      {/* Social Links */}
                      {[
                        { icon: Linkedin, link: founder.linkedin },
                        { icon: Instagram, link: founder.instagram },
                        { icon: Facebook, link: founder.facebook }
                      ].map((social, i) => (
                        <a
                          key={i}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#DFC5FE]/20 p-3 rounded-full hover:bg-[#6DBE45] hover:text-white text-gray-600 transition-all duration-300 transform hover:scale-110"
                        >
                          <social.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#6DBE45] to-[#7BCF55] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Join the Lavanta Journey</h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 font-light">
              Experience the difference of honest, natural skincare crafted for you.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center bg-white text-[#6DBE45] font-bold py-3 px-8 rounded-full hover:bg-[#F0FDF4] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </motion.div>
      </div>
    </div>
  );
}
