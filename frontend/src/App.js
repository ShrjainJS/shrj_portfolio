import React, { useState, useEffect } from 'react';
import './App.css';

const PROFESSIONAL_PHOTO = "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwwfHx8fDE3NTc3Njk3NjN8MA&ixlib=rb-4.1.0&q=85";

// Theme Context
const ThemeContext = React.createContext();

// Theme Provider
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

const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Navigation Component
const Navigation = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            SJ
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'about', 'portfolio', 'experience', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 capitalize font-medium relative group"
              >
                {section}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {isDark ? '🌞' : '🌙'}
            </button>
            <a
              href="mailto:shreyansh@example.com"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Let's Talk
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
    <section id="home" className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Available for opportunities
                </p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight">
                Hi, I'm
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  Shreyansh
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
                Senior Product Manager
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                SaaS, Platform & Data Products
              </p>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-lg">
              Building and scaling SaaS, platform, and analytics products with 
              <span className="font-bold text-blue-600 dark:text-blue-400"> measurable business impact</span> — 
              from 0→1 to enterprise scale.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>View My Work</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </button>
              
              <a
                href="/resume.pdf"
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-105 transform transition-all duration-300 text-center font-medium"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in-up animation-delay-300">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <img
                src={PROFESSIONAL_PHOTO}
                alt="Shreyansh Jain"
                className="relative w-80 h-80 object-cover rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl animate-float">
                <p className="text-lg font-bold">10+ Years</p>
                <p className="text-sm opacity-90">Product Excellence</p>
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
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Driving Product Innovation
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I specialize in building products that solve real problems and drive business growth. 
            From seed-stage startups to enterprise platforms, I've led cross-functional teams to 
            deliver products that users love and businesses depend on.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🚀",
              title: "0→1 Product Builder",
              description: "Launched multiple products from concept to market success"
            },
            {
              icon: "📈",
              title: "Growth & Scale Expert",
              description: "Scaled products to millions in revenue and thousands of users"
            },
            {
              icon: "🎯",
              title: "Data-Driven Leader",
              description: "Make strategic decisions backed by metrics and user insights"
            }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section
const PortfolioSection = () => {
  const caseStudies = [
    {
      title: "Enterprise Cost Management Platform",
      company: "BT Group",
      category: "Platform & Analytics",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      metrics: [
        { label: "Budget Managed", value: "£11.6M" },
        { label: "Cost Recovery", value: "£2.6M" },
        { label: "Efficiency Gain", value: "20%" }
      ],
      description: "Built comprehensive cost chargeback and utilization platform for enterprise-scale operations, delivering significant cost savings and operational efficiency.",
      tags: ["Platform Architecture", "Financial Analytics", "Enterprise Scale"]
    },
    {
      title: "SaaS Integration Standardization",
      company: "Omnivio",
      category: "Product Growth",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      metrics: [
        { label: "Vendor Partners", value: "50+" },
        { label: "Onboarding Speed", value: "300% faster" },
        { label: "MRR Growth", value: "40%" }
      ],
      description: "Standardized vendor integrations and drove significant product growth at seed-stage SaaS startup through strategic product initiatives.",
      tags: ["0→1 Product", "Integration Platform", "Growth Strategy"]
    },
    {
      title: "Intelligent Courier Allocation Engine",
      company: "Pickrr",
      category: "Logistics & AI",
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=800&q=80",
      metrics: [
        { label: "Annual Savings", value: "INR 2.5M" },
        { label: "Success Rate", value: "+2-3%" },
        { label: "Adoption", value: "30% MoM" }
      ],
      description: "Built AI-powered courier allocation system improving delivery success and operational efficiency at scale.",
      tags: ["AI/ML Platform", "Logistics Optimization", "Scaling"]
    }
  ];

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Case Studies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Strategic product initiatives with measurable business impact across different industries and scales
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    {study.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">{study.company}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full"
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

// Experience Section
const ExperienceSection = () => {
  const experiences = [
    {
      company: "BT Group",
      role: "Senior Product Manager",
      period: "2022 - Present",
      location: "London, UK",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&q=80",
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
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&q=80",
      achievements: [
        "Sole PM at seed-stage SaaS startup",
        "Standardized integrations across 50+ vendor partners",
        "Cut customer onboarding time by 300%",
        "Drove 40% MRR growth and 11% ARR growth"
      ]
    },
    {
      company: "Pickrr",
      role: "Product Manager",
      period: "2019 - 2021",
      location: "Gurugram, India",
      logo: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=100&q=80",
      achievements: [
        "Built courier allocation engine saving INR 2.5M annually",
        "Improved delivery success rate by 2-3%",
        "Scaled platform adoption by 30% month-over-month",
        "Built BI Dashboard suite with 200+ KPIs for 200+ staff"
      ]
    },
    {
      company: "PolCol",
      role: "Founder & Product Lead",
      period: "2018 - 2019",
      location: "New Delhi, India",
      logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&q=80",
      achievements: [
        "Scaled doorstep vehicle PUC startup to 10K+ orders",
        "Achieved 70% customer retention rate",
        "Built operationally sustainable business with near-zero CAC"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Professional Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            10+ years building and scaling products across SaaS, platforms, and data analytics
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-0 md:text-right">
                      <p className="font-medium">{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start group/item">
                        <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1 group-hover/item:scale-125 transition-transform duration-200">
                          •
                        </span>
                        <span className="text-gray-700 dark:text-gray-300 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors duration-200">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section with Auto-moving Carousel
const SkillsSection = () => {
  const skills = [
    { name: "Product Strategy", icon: "🎯", level: "Expert" },
    { name: "Data Analytics", icon: "📊", level: "Expert" },
    { name: "A/B Testing", icon: "🧪", level: "Advanced" },
    { name: "User Research", icon: "👥", level: "Advanced" },
    { name: "Agile/Scrum", icon: "🔄", level: "Expert" },
    { name: "SQL", icon: "🗄️", level: "Advanced" },
    { name: "Python", icon: "🐍", level: "Intermediate" },
    { name: "Figma", icon: "🎨", level: "Advanced" },
    { name: "Jira", icon: "📋", level: "Expert" },
    { name: "Tableau", icon: "📈", level: "Advanced" }
  ];

  const tools = [
    "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&q=80",
    "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=80&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&q=80",
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=80&q=80"
  ];

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tools and methodologies I use to build exceptional products
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{skill.name}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">{skill.level}</p>
            </div>
          ))}
        </div>

        {/* Auto-moving Tools Carousel */}
        <div className="relative">
          <div className="flex animate-slide-infinite space-x-8">
            {[...tools, ...tools].map((tool, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <img
                  src={tool}
                  alt={`Tool ${index}`}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let's Build Something
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Ready to drive product strategy and measurable business impact. 
            Let's discuss how I can help scale your product vision.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="mailto:shreyansh@example.com"
              className="group flex items-center space-x-3 bg-white text-gray-900 px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📧</span>
              <span className="font-medium">shreyansh@example.com</span>
            </a>
            <a
              href="https://linkedin.com/in/shreyanshjain"
              className="group flex items-center space-x-3 border-2 border-white/30 hover:border-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 transform"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">💼</span>
              <span className="font-medium">LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const { isDark } = useTheme();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Shreyansh Jain
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Senior Product Manager specializing in SaaS, platform, and data products. 
              Building the future, one product at a time.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:shreyansh@example.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="text-xl">📧</span>
              </a>
              <a href="https://linkedin.com/in/shreyanshjain" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="text-xl">💼</span>
              </a>
              <a href="https://twitter.com/shreyanshjain" className="text-gray-400 hover:text-white transition-colors duration-300">
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors duration-300">About</button></li>
              <li><button onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors duration-300">Portfolio</button></li>
              <li><button onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors duration-300">Experience</button></li>
              <li><button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors duration-300">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/resume.pdf" className="hover:text-white transition-colors duration-300">Download Resume</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-300">Speaking</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Shreyansh Jain. Crafted with passion and precision.
          </p>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>Made with</span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>for the product community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;