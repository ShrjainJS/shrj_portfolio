import React from 'react';
import './App.css';

const PROFESSIONAL_PHOTO = "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTc3Njk3NjN8MA&ixlib=rb-4.1.0&q=85";

// Navigation Component
const Navigation = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Shreyansh Jain</div>
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-gray-900 transition-colors">Home</button>
            <button onClick={() => scrollToSection('experience')} className="text-gray-600 hover:text-gray-900 transition-colors">Experience</button>
            <button onClick={() => scrollToSection('case-studies')} className="text-gray-600 hover:text-gray-900 transition-colors">Case Studies</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-gray-900 transition-colors">Contact</button>
          </div>
          <div className="flex space-x-4">
            <a href="mailto:shreyansh@example.com" className="text-sm bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-white flex items-center justify-center pt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Available for opportunities</p>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Hi, I'm <span className="block text-blue-600">Shreyansh</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light">
                Senior Product Manager | SaaS, Platform & Data Products
              </p>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
              Building and scaling SaaS, platform, and analytics products with measurable business impact — from 0→1 to enterprise scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#case-studies" className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center font-medium">
                View Case Studies
              </a>
              <a href="/resume.pdf" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium">
                Download Resume
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img 
                src={PROFESSIONAL_PHOTO} 
                alt="Shreyansh Jain" 
                className="w-80 h-80 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-medium">10+ Years</p>
                <p className="text-xs text-blue-100">Product Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const experiences = [
    {
      company: "BT Group",
      role: "Senior Product Manager",
      period: "2022 - Present",
      location: "London, UK",
      achievements: [
        "Built cost chargeback & utilization platform managing £11.6M budget",
        "Automated financial reporting processes across enterprise teams",
        "Recovered £2.6M in cost savings (~20% efficiency improvement)"
      ]
    },
    {
      company: "Omnivio",
      role: "Product Manager",
      period: "2021 - 2022",
      location: "Seed-stage SaaS",
      achievements: [
        "Sole PM at seed-stage SaaS startup",
        "Standardized integrations across 50+ vendor partners",
        "Cut customer onboarding time by 300%",
        "Drove 40% MRR growth and 11% ARR growth"
      ]
    },
    {
      company: "Pickrr (Acquired by Shiprocket for $200M)",
      role: "Product Manager",
      period: "2019 - 2021",
      location: "Gurugram, India",
      achievements: [
        "Built courier allocation engine saving INR 2.5M annually",
        "Improved delivery success rate by 2-3%",
        "Scaled platform adoption by 30% month-over-month",
        "Built BI Dashboard suite with 200+ KPIs for 200+ staff"
      ]
    },
    {
      company: "PolCol (Founder)",
      role: "Founder & Product Lead",
      period: "2018 - 2019",
      location: "New Delhi, India",
      achievements: [
        "Scaled doorstep vehicle PUC startup to 10K+ orders",
        "Achieved 70% customer retention rate",
        "Built operationally sustainable business with near-zero CAC"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            10+ years building and scaling products across SaaS, platforms, and data analytics
          </p>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-lg text-blue-600 font-medium">{exp.company}</p>
                </div>
                <div className="text-sm text-gray-500 mt-2 md:mt-0 text-right">
                  <p>{exp.period}</p>
                  <p>{exp.location}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Case Studies Section
const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: "Enterprise Cost Management Platform",
      company: "BT Group",
      category: "Platform & Analytics",
      metrics: {
        budget: "£11.6M",
        recovery: "£2.6M",
        efficiency: "20%"
      },
      description: "Built comprehensive cost chargeback and utilization platform for enterprise-scale operations",
      tags: ["Platform Architecture", "Financial Analytics", "Enterprise Scale"]
    },
    {
      title: "SaaS Integration Standardization",
      company: "Omnivio",
      category: "Product Growth",
      metrics: {
        vendors: "50+",
        onboarding: "300% faster",
        growth: "40% MRR"
      },
      description: "Standardized vendor integrations and drove significant product growth at seed-stage SaaS",
      tags: ["0→1 Product", "Integration Platform", "Growth Strategy"]
    },
    {
      title: "Intelligent Courier Allocation Engine",
      company: "Pickrr",
      category: "Logistics & AI",
      metrics: {
        savings: "INR 2.5M",
        improvement: "2-3%",
        adoption: "30% MoM"
      },
      description: "Built AI-powered courier allocation system improving delivery success and operational efficiency",
      tags: ["AI/ML Platform", "Logistics Optimization", "Scaling"]
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Case Studies</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategic product initiatives with measurable business impact
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="mb-6">
                <p className="text-sm font-medium text-blue-600 mb-2">{study.category}</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{study.title}</h3>
                <p className="text-sm text-gray-600 font-medium">{study.company}</p>
              </div>
              
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(study.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-lg font-bold text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500 capitalize">{key}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{study.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs bg-white text-gray-600 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Let's Build Something Great</h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Ready to drive product strategy and measurable business impact. 
          Let's discuss how I can help scale your product vision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <a 
            href="mailto:shreyansh@example.com" 
            className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            <span>📧</span>
            <span>shreyansh@example.com</span>
          </a>
          <a 
            href="https://linkedin.com/in/shreyanshjain" 
            className="flex items-center space-x-3 border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg transition-colors"
          >
            <span>💼</span>
            <span>LinkedIn Profile</span>
          </a>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400">
            © 2024 Shreyansh Jain. Building products that matter.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <ExperienceSection />
      <CaseStudiesSection />
      <ContactSection />
    </div>
  );
}

export default App;