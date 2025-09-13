import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';

const PROFESSIONAL_PHOTO = "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTc3Njk3NjN8MA&ixlib=rb-4.1.0&q=85";

// Theme Context
const ThemeContext = createContext();

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo with scroll behavior */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-gray-900">
              {isScrolled ? 'SJ' : 'Shreyansh Jain'}
            </div>
            {/* Blinking green dot when scrolled */}
            {isScrolled && (
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Experience', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop - Get in Touch button */}
            <a
              href="mailto:shreyansh@example.com"
              className="hidden md:block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Get in Touch
            </a>
            
            {/* Mobile - Hamburger menu */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`bg-current w-6 h-0.5 rounded-sm transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`bg-current w-6 h-0.5 rounded-sm transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`bg-current w-6 h-0.5 rounded-sm transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="flex flex-col space-y-3 px-4">
              <a
                href="mailto:shreyansh@example.com"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/shreyanshjain"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                LinkedIn
              </a>
              <a
                href="/resume.pdf"
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Download Resume
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-white flex items-center py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 mt-12"> {/* Added top margin */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center min-h-[70vh] lg:min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="space-y-6"> {/* Reduced from space-y-8 to space-y-6 */}
            {/* Available for work badge - with better spacing */}
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available for opportunities</span>
            </div>

            {/* Main heading - with reduced gap */}
            <div className="space-y-4 -mt-2"> {/* Added negative margin to reduce gap */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hi I'm{" "}
                <span className="text-5xl md:text-6xl lg:text-7xl text-blue-600">Shreyansh Jain</span>, a Senior PM & Data Enthusiast
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Building and scaling SaaS, platform, and analytics products with measurable 
                business impact — from 0→1 to enterprise scale.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4 flex justify-start lg:justify-start md:justify-center justify-center">
              <button
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View My Work →
              </button>
            </div>
          </div>

          {/* Right side - Photo with badge and logos */}
          <div className="flex flex-col items-center lg:items-end">
            {/* Social CTAs above photo - only on desktop */}
            <div className="hidden lg:flex items-center space-x-4 mb-6">
              <a
                href="https://linkedin.com/in/shreyanshjain"
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                💼
              </a>
              <a
                href="mailto:shreyansh@example.com"
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                📧
              </a>
              <a
                href="/resume.pdf"
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              >
                📄
              </a>
            </div>

            {/* Portrait container with external badge */}
            <div className="portrait-wrapper">
              <div className="portrait-container">
                <img
                  src={PROFESSIONAL_PHOTO}
                  alt="Shreyansh Jain portrait"
                  className="portrait-img"
                />
              </div>
              {/* Experience badge - outside container, overlaying image */}
              <button 
                className="experience-badge-external"
                aria-label="10 plus years experience"
              >
                10+ Years Experience
              </button>
            </div>

            {/* Auto-rolling company logos */}
            <div className="company-logos-wrapper" aria-label="Previous companies">
              <div className="company-logos-rolling">
                <a href="#" className="logo-link" title="Mercedes-Benz R&D">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">MB</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="PolCol">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">PC</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="Pickrr">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">PK</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="Omnivio">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">OV</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="BT Group">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">BT</span>
                  </div>
                </a>
                {/* Duplicate for seamless scrolling */}
                <a href="#" className="logo-link" title="Mercedes-Benz R&D">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">MB</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="PolCol">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">PC</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="Pickrr">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">PK</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="Omnivio">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">OV</span>
                  </div>
                </a>
                <a href="#" className="logo-link" title="BT Group">
                  <div className="company-logo">
                    <span className="text-gray-600 font-bold text-xs">BT</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            My mission is creating products that scale, satisfy customers, and drive business growth
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I specialize in transforming complex business challenges into intuitive product solutions 
            that deliver measurable impact across different scales and industries.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🚀",
              title: "0→1 Product Development",
              description: "Launched products from concept to market success at seed-stage startups",
              metric: "4 successful launches"
            },
            {
              icon: "📈",
              title: "Enterprise Scale Solutions",
              description: "Built platforms managing millions in budget with significant cost recovery",
              metric: "£11.6M+ managed"
            },
            {
              icon: "⚡",
              title: "Growth & Optimization",
              description: "Driven measurable improvements in revenue, efficiency, and user adoption",
              metric: "40%+ average growth"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-sm font-semibold text-blue-600">{item.metric}</p>
            </div>
          ))}
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
      description: "Leading cost management platform development for enterprise operations",
      achievements: [
        "Built platform managing £11.6M budget",
        "Recovered £2.6M in cost savings (20% efficiency)",
        "Automated financial reporting across teams"
      ],
      metrics: { budget: "£11.6M", savings: "£2.6M", efficiency: "20%" }
    },
    {
      company: "Omnivio",
      role: "Product Manager",
      period: "2021 - 2022",
      location: "Seed-stage SaaS",
      description: "Sole PM driving product strategy and growth at early-stage startup",
      achievements: [
        "Standardized integrations across 50+ vendors",
        "Reduced onboarding time by 300%",
        "Achieved 40% MRR and 11% ARR growth"
      ],
      metrics: { vendors: "50+", speed: "300%", growth: "40%" }
    },
    {
      company: "Pickrr",
      role: "Product Manager",
      period: "2019 - 2021",
      location: "Gurugram, India",
      description: "Built intelligent logistics solutions for courier allocation and analytics",
      achievements: [
        "Developed AI-powered allocation engine",
        "Saved INR 2.5M annually",
        "Improved delivery success by 2-3%",
        "Scaled adoption 30% month-over-month"
      ],
      metrics: { savings: "INR 2.5M", improvement: "2-3%", adoption: "30%" }
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Professional Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            10+ years building and scaling products across SaaS, platforms, and data analytics
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      <p className="font-medium">{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{exp.description}</p>

                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-600 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Key Metrics</h4>
                  {Object.entries(exp.metrics).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">{value}</p>
                      <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const projects = [
    {
      title: "Enterprise Cost Management Platform",
      company: "BT Group",
      category: "Platform & Analytics",
      description: "Comprehensive cost chargeback and utilization platform for enterprise-scale operations, delivering significant cost savings and operational efficiency.",
      impact: "£2.6M recovered, 20% efficiency gain",
      tags: ["Platform Architecture", "Financial Analytics", "Enterprise Scale"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80"
    },
    {
      title: "SaaS Integration Standardization",
      company: "Omnivio",
      category: "Product Growth",
      description: "Standardized vendor integrations and drove significant product growth through strategic product initiatives and platform improvements.",
      impact: "40% MRR growth, 300% faster onboarding",
      tags: ["0→1 Product", "Integration Platform", "Growth Strategy"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
    },
    {
      title: "Intelligent Courier Allocation Engine",
      company: "Pickrr",
      category: "Logistics & AI",
      description: "AI-powered courier allocation system improving delivery success and operational efficiency at scale for logistics operations.",
      impact: "INR 2.5M savings, 30% adoption growth",
      tags: ["AI/ML Platform", "Logistics Optimization", "Scaling"],
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&q=80"
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Case Studies
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategic product initiatives with measurable business impact
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-blue-600 font-medium mb-4">{project.company}</p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900">Impact:</p>
                  <p className="text-blue-700 font-medium">{project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Let's Build Something Great Together
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Ready to drive product strategy and measurable business impact. 
          Let's discuss how I can help scale your product vision.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <a
            href="mailto:shreyansh@example.com"
            className="flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="text-xl">📧</span>
            <span className="font-medium">shreyansh@example.com</span>
          </a>
          <a
            href="https://linkedin.com/in/shreyanshjain"
            className="flex items-center space-x-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            <span className="text-xl">💼</span>
            <span className="font-medium">LinkedIn Profile</span>
          </a>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-500">
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
    <div className="App bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}

export default App;