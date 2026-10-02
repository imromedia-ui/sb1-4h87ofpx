import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ChevronDown,
  ChevronRight,
  Heart,
  Shield,
  Sparkles,
  Activity,
  User,
  Users,
  Stethoscope,
  Droplets,
  Droplet,
  Gift,
  Eye,
  Star,
  Sun,
  Syringe,
  Microscope,
  Check,
  Brain,
  ClipboardList,
  Zap,
  Moon,
  Dumbbell,
  Flame,
  DollarSign,
  Instagram,
  Facebook,
  Menu,
  X
} from 'lucide-react';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-line');
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

const BASE = import.meta.env.BASE_URL;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [selectedInsuranceCompany, setSelectedInsuranceCompany] = useState<string | null>(null);
  const [pageKey, setPageKey] = useState(0);
  const [selectedGiftAmount, setSelectedGiftAmount] = useState<number | null>(null);
  const [customGiftAmount, setCustomGiftAmount] = useState<string>('');
  const [giftRecipientName, setGiftRecipientName] = useState<string>('');
  const [giftRecipientEmail, setGiftRecipientEmail] = useState<string>('');
  const [giftSenderName, setGiftSenderName] = useState<string>('');
  const [giftMessage, setGiftMessage] = useState<string>('');

  useScrollReveal();

  const navigateTo = useCallback((page: string) => {
    setCurrentPage(page);
    setPageKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.hamburger-button')) {
        setOpenDropdown(null);
        setOpenMobileDropdown(null);
      }
      if (!target.closest('.mobile-menu-container') && !target.closest('.hamburger-button') && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      dropdown: [
        { id: 'team', label: 'Team' },
        { id: 'policies', label: 'Policies' },
        { id: 'insurances', label: 'Insurances' },
        { id: 'careers', label: 'Careers' }
      ]
    },
    {
      id: 'primary-care',
      label: 'Primary Care',
      dropdown: [
        { id: 'screenings', label: 'Screenings' },
        { id: 'womens-health', label: "Women's Health" },
        { id: 'mens-health', label: "Men's Health" }
      ]
    },
    {
      id: 'wellness',
      label: 'Wellness',
      dropdown: [
        { id: 'iv-treatments', label: 'IV Therapy' },
        { id: 'weight-loss', label: 'Weight Loss' },
        { id: 'peptides', label: 'Peptides & Injections' }
      ]
    },
    {
      id: 'aesthetics',
      label: 'Aesthetics',
      dropdown: [
        { id: 'neurotoxins', label: 'Neurotoxins' },
        { id: 'regenerative-aesthetics', label: 'PRP & Microneedling' },
        { id: 'hair-restoration', label: 'Hair Restoration' }
      ]
    },
    { id: 'shop', label: 'Shop' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMobileDropdown = (type: string) => {
    setOpenMobileDropdown(openMobileDropdown === type ? null : type);
  };

  const handleMobileNavClick = (pageId: string) => {
    if (pageId === 'policies') {
      window.open(`${BASE}policies.html`, '_blank');
    } else {
      navigateTo(pageId);
    }
    setMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="text-3xl font-serif font-light text-black cursor-pointer tracking-wide"
            onClick={() => navigateTo('home')}
          >
            KALON
          </div>
          
          <div className="hidden md:flex space-x-12">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <div className="relative dropdown-container">
                    <div 
                      className="flex items-center space-x-1 text-gray-800 hover:text-black cursor-pointer py-2 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenDropdown(openDropdown === item.id ? null : item.id);
                        navigateTo(item.id);
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                    
                    {openDropdown === item.id && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl border border-gray-100 rounded-lg py-3 z-50 opacity-0 scale-95 animate-dropdown"
                        style={{
                          animation: 'dropdownOpen 0.2s ease-out forwards'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.id}
                            className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-black font-medium transition-colors duration-150"
                            onClick={() => {
                              if (subItem.id === 'policies') {
                                window.open(`${BASE}policies.html`, '_blank');
                              } else {
                                navigateTo(subItem.id);
                              }
                              setOpenDropdown(null);
                            }}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="text-gray-800 hover:text-black font-medium py-2 transition-colors duration-150"
                    onClick={() => navigateTo(item.id)}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
              <a href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858" target="_blank" rel="noopener noreferrer" className="block">
                Book Now
              </a>
            </button>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden hamburger-button p-2 text-gray-800 hover:text-black transition-colors z-50 relative"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(false);
          }}
        />
      )}
      
      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu-container ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-serif font-light text-black tracking-wide">
              KALON
            </div>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(false);
              }}
              className="p-2 text-gray-800 hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <div className="dropdown-container">
                    <button
                      className="flex items-center justify-between w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-black font-medium rounded-lg transition-colors duration-150"
                      onClick={() => toggleMobileDropdown(item.id)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileDropdown === item.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openMobileDropdown === item.id && (
                      <div 
                        className="ml-4 mt-2 space-y-1 opacity-0 animate-dropdown"
                        style={{
                          animation: 'dropdownOpen 0.2s ease-out forwards'
                        }}
                      >
                        {item.dropdown.map((subItem) => (
                          <button
                            key={subItem.id}
                            className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-black rounded-lg transition-colors duration-150"
                            onClick={() => handleMobileNavClick(subItem.id)}
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    className="block w-full text-left px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-black font-medium rounded-lg transition-colors duration-150"
                    onClick={() => handleMobileNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </nav>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858" target="_blank" rel="noopener noreferrer" className="block">
              <button className="w-full bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Book Now
              </button>
            </a>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-3" style={{ color: '#D4AF37' }} />
              <span className="text-sm">(386) 347-5514</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MessageSquare className="w-4 h-4 mr-3" style={{ color: '#D4AF37' }} />
              <span className="text-sm">Text (386) 347-5514</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-3" style={{ color: '#D4AF37' }} />
              <span className="text-sm">Ormond Beach, FL</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes dropdownOpen {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-dropdown {
          animation: dropdownOpen 0.2s ease-out forwards;
        }
      `}</style>
    </nav>
  );

  const renderHomePage = () => (
    <div>
      {/* Intro Video */}
      <section className="bg-white pt-8 pb-0">
        <div className="max-w-4xl mx-auto px-8 reveal">
          {/* Mobile: 1:1 square */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl md:hidden" style={{ paddingBottom: '100%' }}>
            <iframe
              className="absolute w-full h-full"
              style={{ top: '-60px', left: 0, height: 'calc(100% + 120px)', pointerEvents: 'none' }}
              src="https://www.youtube.com/embed/KSVrMMAB4co?autoplay=1&mute=1&loop=1&playlist=KSVrMMAB4co&playsinline=1&rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1"
              title="Kalon Healthcare Introduction"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
          {/* Desktop: 16:9 landscape */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl hidden md:block" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute w-full h-full"
              style={{ top: '-60px', left: 0, height: 'calc(100% + 120px)', pointerEvents: 'none' }}
              src="https://www.youtube.com/embed/KSVrMMAB4co?autoplay=1&mute=1&loop=1&playlist=KSVrMMAB4co&playsinline=1&rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&disablekb=1"
              title="Kalon Healthcare Introduction"
              frameBorder="0"
              allow="autoplay; encrypted-media"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="reveal">
              <h2 className="text-6xl font-serif font-light mb-8" style={{ color: '#D4AF37' }}>
                About Kalon Primary Care and Wellness
              </h2>
            </div>
            <div className="flex justify-center mb-6 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-2xl text-gray-700 font-light leading-relaxed max-w-4xl mx-auto reveal delay-200">
              Redefining wellness with exceptional primary care, aesthetics, and personalized treatments.
            </p>
            <div className="mt-6 text-lg text-gray-600 font-medium reveal delay-300">
              Serving: Ormond Beach • Daytona Beach • Palm Coast • Port Orange
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <p className="text-lg text-gray-700 leading-relaxed reveal">
              At Kalon Primary Care and Wellness, we believe health is the foundation of beauty, energy, and confidence.
              We are committed to delivering the highest quality medical care in a serene, luxury environment. From preventive
              health screenings to advanced anti-aging treatments, everything we offer is designed to optimize your well-being.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed reveal delay-100">
              We provide comprehensive primary care, women's health, men's health, medical aesthetics, IV therapy,
              wellness programs, and advanced screenings — all tailored to meet your unique needs. We combine medical expertise
              with a personalized touch, ensuring that every visit is both effective and restorative.
            </p>

            <div className="grid md:grid-cols-2 gap-6 reveal delay-200">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">What We Provide:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Chronic Care Management</li>
                  <li>• Acute Care</li>
                  <li>• Preventive Care</li>
                  <li>• Wellness Consultations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Payment Options:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Insurance Accepted</li>
                  <li>• Self-Pay Options</li>
                  <li>• Flexible Payment Plans</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-gray-50 p-8 rounded-lg card-hover reveal reveal-scale delay-100">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Shield className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                  Medical Excellence
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Medical-grade treatments delivered with precision and compassion.
                </p>
              </div>

              <div className="text-center bg-gray-50 p-8 rounded-lg card-hover reveal reveal-scale delay-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center icon-float-2" style={{ backgroundColor: '#D4AF37' }}>
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                  Luxury Experience
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  A calm, elegant setting where your health and comfort come first.
                </p>
              </div>

              <div className="text-center bg-gray-50 p-8 rounded-lg card-hover reveal reveal-scale delay-500">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center icon-float-3" style={{ backgroundColor: '#D4AF37' }}>
                  <Heart className="w-8 h-8 text-black pulse-heart" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                  Personalized Wellness
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Plans designed for your lifestyle, goals, and long-term vitality.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 reveal">
            <h3 className="text-3xl font-serif font-light mb-8 text-black">
              Experience the Kalon difference.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90 hover:scale-105"
                style={{ backgroundColor: '#D4AF37', transition: 'transform 0.2s, opacity 0.2s' }}
              >
                Book a Visit
              </a>
              <button className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                      style={{ borderColor: '#D4AF37' }}
                      onClick={() => navigateTo('contact')}>
                Text Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero-breathe py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-light text-black mb-8 tracking-tight reveal">
            Elevated Primary Care &<br />Holistic Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed reveal delay-200">
            Personalized medical care and rejuvenating wellness treatments, all in one serene space in Ormond Beach, FL.
          </p>

        </div>
      </section>

      {/* Wellness Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-serif font-light" style={{ color: '#D4AF37' }}>Our Wellness</h2>
            <div className="flex justify-center mt-4">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'primary-care', title: 'Primary Care', description: 'Comprehensive care including screenings, women\u2019s health, men\u2019s health, and bioidentical hormone therapy.', icon: Stethoscope },
              { id: 'wellness', title: 'Wellness', description: 'IV therapy, medical weight loss, peptides, NAD+, B12, and Lipo-C injections to optimize your health from within.', icon: Activity },
              { id: 'aesthetics', title: 'Aesthetics', description: 'Botox neurotoxins and microneedling with PRP/PRF for face, neck, and body to help you look and feel your best.', icon: Sparkles }
            ].map((service, i) => (
              <div key={service.id}
                   className={`bg-white border border-gray-200 p-8 rounded-lg cursor-pointer group card-hover reveal reveal-scale delay-${(i % 3) * 100 + 100}`}
                   onClick={() => navigateTo(service.id)}>
                <service.icon className="w-12 h-12 mb-6 icon-spin-in" style={{ color: '#D4AF37' }} />
                <h3 className="text-2xl font-serif font-medium text-black mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center font-medium transition-colors group-hover:translate-x-1" style={{ color: '#D4AF37', transition: 'transform 0.2s' }}>
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wellness Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 reveal">
            <h2 className="text-5xl font-serif font-light" style={{ color: '#D4AF37' }}>Featured Wellness Programs</h2>
            <div className="flex justify-center mt-4">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Kalon Vital Reset', description: 'Primary care consult + IV hydration + nutrition plan', icon: Heart },
              { title: 'Glow from Within', description: 'Inner Beauty infusion + skin health consult', icon: Sparkles },
              { title: 'Total Health Blueprint', description: 'Labs and comprehensive health assessment', icon: Activity }
            ].map((program, index) => (
              <div key={index} className={`bg-gray-50 border border-gray-200 p-8 rounded-lg text-center card-hover reveal reveal-scale delay-${index * 200}`}>
                <program.icon className="w-12 h-12 mx-auto mb-6 icon-float" style={{ color: '#D4AF37', animationDelay: `${index * 0.6}s` }} />
                <h3 className="text-2xl font-serif font-medium text-black mb-4">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      <div key={pageKey} className="page-enter">
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'wellness' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Wellness</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Medical provider-guided therapies designed to optimize your health from the inside out. From IV nutrition to peptide therapy and medical weight loss, we tailor every protocol to your unique goals.
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { id: 'iv-treatments', icon: Droplets, title: 'IV Therapy', desc: 'NAD, All-in-One Boost, Slim, Glow, Timeless, Pick-Me-Up, Immune, and Recovery IVs — delivered directly into your bloodstream for maximum absorption.' },
                { id: 'weight-loss', icon: Activity, title: 'Weight Loss', desc: 'GLP-1 therapy, compounded semaglutide with B12 and glycine, and our comprehensive Weight Loss Kit with sermorelin and naltrexone.' },
                { id: 'peptides', icon: Syringe, title: 'Peptides & Injections', desc: 'Sermorelin, NAD+ injections, CoQ-10 injections, oxytocin tablets, B12 injections, and Lipo-C injections to support energy, recovery, and longevity.' }
              ].map((item, i) => (
                <div key={i} className={`bg-gray-50 border border-gray-200 rounded-lg p-8 card-hover cursor-pointer reveal reveal-scale delay-${(i % 3) * 100 + 100}`} onClick={() => navigateTo(item.id)}>
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <item.icon className="w-7 h-7 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-center mb-3 text-black">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">{item.desc}</p>
                  <div className="flex justify-center mt-5">
                    <span className="text-sm font-medium" style={{ color: '#D4AF37' }}>Learn More →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {currentPage === 'aesthetics' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Aesthetics</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Cosmetic and regenerative treatments to help you look and feel your best. From neurotoxins to platelet-rich plasma therapy, each treatment is tailored to your aesthetic goals.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { id: 'neurotoxins', icon: Sparkles, title: 'Neurotoxins', desc: 'Botox injections to smooth fine lines and wrinkles, prevent new lines from forming, and restore a youthful, refreshed appearance.' },
                { id: 'regenerative-aesthetics', icon: Microscope, title: 'PRP & Microneedling', desc: 'Microneedling with platelet-rich plasma and platelet-rich fibrin for face, neck, and body — stimulating collagen and cellular regeneration.' },
                { id: 'hair-restoration', icon: Sparkles, title: 'Hair Restoration', desc: 'RF microneedling and PRP/PRF injections to stimulate hair follicles and promote natural regrowth, plus medical provider-formulated supplements.' }
              ].map((item, i) => (
                <div key={i} className={`bg-gray-50 border border-gray-200 rounded-lg p-8 card-hover cursor-pointer reveal reveal-scale delay-${(i % 2) * 100 + 100}`} onClick={() => navigateTo(item.id)}>
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <item.icon className="w-7 h-7 text-black" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-center mb-3 text-black">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm text-center">{item.desc}</p>
                  <div className="flex justify-center mt-5">
                    <span className="text-sm font-medium" style={{ color: '#D4AF37' }}>Learn More →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {currentPage === 'primary-care' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Primary Care</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Comprehensive, patient-centered medical care for adults 18 and older. From routine screenings and Pap smears to chronic disease management and urgent diagnostic testing, we provide personalized healthcare that addresses your unique needs at every stage of life — in-office or via telehealth throughout Florida.
            </p>

            {/* Service Highlights Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
              {[
                { icon: User, label: 'Ages 18+', desc: 'Adult care' },
                { icon: Stethoscope, label: 'Same/Next Day', desc: 'Appointments' },
                { icon: Phone, label: 'Telehealth', desc: 'Statewide in Florida' },
                { icon: Shield, label: 'Insurance + Cash', desc: 'Hybrid model' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center reveal reveal-scale" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <item.icon className="w-5 h-5 text-black" />
                  </div>
                  <p className="text-sm font-serif font-medium text-black">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Sub-tab Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
              {[
                { id: 'pc-overview', label: 'Overview' },
                { id: 'pc-urgent', label: 'Urgent Testing' },
                { id: 'pc-chronic', label: 'Chronic Care' },
                { id: 'pc-screenings', label: 'Screenings & Prevention' },
                { id: 'pc-telehealth', label: 'Telehealth & Access' },
                { id: 'pc-insurance', label: 'Insurance & Pricing' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all border-2 ${
                    false ? 'text-black' : 'text-gray-600 hover:text-black border-transparent hover:border-gray-200'
                  }`}
                  style={false ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37' } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Overview Section */}
            <div id="pc-overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Our Approach to Primary Care</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 reveal">
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-8">
                  At Kalon, primary care is the foundation of everything we do. We take the time to build a genuine relationship with you, understand your health history, and create a personalized plan that evolves with your needs. Whether you're coming in for an annual physical, managing a chronic condition, or need same-day care for an unexpected illness, our provider is here for you.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    { icon: Heart, title: 'Relationship-Based', desc: 'No rushed visits. We take time to listen, understand, and build a plan around you.' },
                    { icon: Activity, title: 'Proactive & Preventive', desc: 'We focus on preventing illness before it starts, with screenings, lifestyle guidance, and early detection.' },
                    { icon: User, title: 'Personalized Care', desc: 'Every plan is tailored to your unique health goals, history, and lifestyle — not a one-size-fits-all approach.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-6 h-6 text-black" />
                      </div>
                      <h3 className="text-lg font-serif font-medium text-black mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Urgent Care Section */}
            <div id="pc-urgent" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Urgent Diagnostic Testing</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Same-day or next-day appointments for urgent diagnostic testing. We perform the tests you need to find out what is wrong — quickly and accurately — so you can get the right treatment fast.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-left">
                  <h3 className="text-xl font-serif font-medium text-black mb-4">What We Test For</h3>
                  <ul className="space-y-2.5">
                    {[
                      'Strep throat',
                      'Influenza (flu)',
                      'COVID-19',
                      'Urinary tract infections (UTIs)',
                      'Pregnancy',
                      'Mononucleosis (mono)',
                      'Anemia / low hemoglobin',
                      'High or low blood sugar',
                      'STD / STI screening',
                      'Thyroid dysfunction',
                      'Complete blood count (CBC)',
                      'Metabolic & kidney function'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700 text-sm">
                        <span className="mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-right delay-100">
                  <h3 className="text-xl font-serif font-medium text-black mb-4">What to Expect</h3>
                  <p className="text-gray-700 leading-relaxed text-sm mb-6">
                    We don't offer walk-in services, but we reserve same-day and next-day appointment slots every day for urgent testing needs. Call us first thing in the morning and we'll do our best to fit you in. For life-threatening emergencies, always call 911 or visit the nearest emergency room.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <Phone className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">Call to Book</p>
                        <p className="text-xs text-gray-500">Same-day slots released each morning</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <Clock className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">Quick Turnaround</p>
                        <p className="text-xs text-gray-500">Rapid tests done in minutes; lab results in 24-72 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <Shield className="w-4 h-4 text-black" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black">Insurance or Self-Pay</p>
                        <p className="text-xs text-gray-500">Testing visits billed like standard office visits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Tests */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-5xl mx-auto mb-8 reveal">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Microscope className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black">Diagnostic Tests Available for Urgent Visits</h3>
                </div>
                <p className="text-sm text-gray-600 text-center mb-6 max-w-3xl mx-auto leading-relaxed">
                  We offer on-site point-of-care testing for rapid diagnosis during your urgent visit, plus the ability to order comprehensive lab work through our partner laboratories when needed.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Rapid Point-of-Care Tests (In-Office)</p>
                    <ul className="space-y-2">
                      {[
                        'Rapid strep test',
                        'Rapid influenza (flu) A & B test',
                        'Rapid COVID-19 test',
                        'Urinalysis (dipstick)',
                        'Blood glucose (fingerstick)',
                        'Pregnancy test (urine)',
                        'Hemoglobin (fingerstick)',
                        'Rapid mononucleosis (mono) test'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700 text-sm">
                          <span className="mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Lab Tests (Ordered & Sent to Partner Lab)</p>
                    <ul className="space-y-2">
                      {[
                        'Complete blood count (CBC)',
                        'Comprehensive metabolic panel',
                        'Blood glucose & A1C',
                        'Thyroid function tests',
                        'STD / STI testing',
                        'Wound & throat cultures',
                        'Lipid panel',
                        'Vitamin D & B12 levels'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start text-gray-700 text-sm">
                          <span className="mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <strong className="text-gray-700">Note:</strong> We do not have on-site X-ray or imaging services. If imaging is needed, your provider will refer you to an appropriate imaging center or emergency department. Blood work and specialized lab tests are sent to an external laboratory (such as Quest Diagnostics or LabCorp), with results typically available within 24-72 hours.
                  </p>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-300 p-5 rounded-r-lg max-w-3xl mx-auto reveal">
                <p className="text-sm text-red-800 leading-relaxed">
                  <strong>Emergency Warning:</strong> For chest pain, difficulty breathing, severe bleeding, loss of consciousness, or other life-threatening symptoms, call 911 or go to the nearest emergency room immediately. Do not wait for an urgent care appointment.
                </p>
              </div>
            </div>

            {/* Chronic Care Management Section */}
            <div id="pc-chronic" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Chronic Care Management</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Living with a chronic condition doesn't have to mean living with limitations. We provide ongoing, comprehensive management to help you stay healthy, active, and in control.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                {[
                  { icon: Heart, title: 'Hypertension', desc: 'Regular blood pressure monitoring, medication management, and lifestyle guidance to keep your numbers in a healthy range.' },
                  { icon: Activity, title: 'Diabetes (Type 2)', desc: 'Comprehensive blood sugar management, medication adjustments, nutrition counseling, and complication prevention.' },
                  { icon: Shield, title: 'Thyroid Disorders', desc: 'Diagnosis and ongoing management of hypothyroidism, hyperthyroidism, and other thyroid conditions.' },
                  { icon: Brain, title: 'Anxiety & Depression', desc: 'Screening, medication management, and coordinated care for mental health support as part of your overall wellness.' },
                  { icon: ClipboardList, title: 'High Cholesterol', desc: 'Lipid monitoring, statin therapy when appropriate, and lifestyle modifications to protect your heart health.' },
                  { icon: Dumbbell, title: 'Weight Management', desc: 'Medical provider-supervised weight loss programs with nutrition, lifestyle, and medication support.' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Comprehensive Lab Ordering */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-5xl mx-auto mb-8 reveal">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Microscope className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black">Comprehensive Lab Panels We Order</h3>
                </div>
                <p className="text-sm text-gray-600 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
                  We go well beyond basic blood work. Our providers order a broad spectrum of specialized laboratory panels to investigate the root causes of chronic conditions — looking deeper into inflammation, nutrient deficiencies, autoimmune activity, gut health, environmental exposures, and more. All labs are ordered through your preferred outpatient laboratory (such as Quest Diagnostics, LabCorp, or any lab of your choice) for maximum convenience.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    { title: 'Inflammation Markers', items: ['hs-CRP (high-sensitivity CRP)', 'ESR (sedimentation rate)', 'Cytokine panels', 'Homocysteine', 'Ferritin'] },
                    { title: 'Vitamin & Nutrient Panels', items: ['Vitamin D (25-OH)', 'Vitamin B12 & folate', 'Comprehensive vitamin panel', 'Magnesium', 'Zinc & copper', 'Iron studies'] },
                    { title: 'Autoimmune Disease Panels', items: ['ANA (antinuclear antibodies)', 'Rheumatoid factor', 'Thyroid antibodies (TPO, TgAb)', 'Celiac disease panel', 'Anti-dsDNA', 'Comprehensive autoimmune panel'] },
                    { title: 'Gut Health Labs', items: ['Comprehensive stool analysis', 'SIBO breath testing', 'Food sensitivity panels', 'Calprotectin', 'Zonulin', 'Parasitology screening'] },
                    { title: 'Skin Condition Labs', items: ['Allergy & histamine panels', 'Nutrient deficiencies linked to skin', 'Hormone panels (acne, hair loss)', 'Inflammatory markers', 'Autoimmune skin markers'] },
                    { title: 'Heavy Metal & Environmental Toxins', items: ['Blood lead, mercury, arsenic', 'Urine heavy metals challenge test', 'Total toxic burden panel', 'Mold/mycotoxin testing', 'Environmental chemical exposure panel'] },
                    { title: 'Allergy & Sensitivity Labs', items: ['IgE food & environmental allergy panel', 'IgG food sensitivity testing', 'Histamine intolerance markers', 'Seasonal & perennial allergens', 'Drug allergy testing'] },
                    { title: 'Hormone & Endocrine Panels', items: ['Full thyroid panel (TSH, free T3, free T4, reverse T3)', 'Sex hormones (estrogen, progesterone, testosterone)', 'Adrenal/cortisol testing', 'DHEA-S', 'Insulin & fasting glucose'] },
                    { title: 'Metabolic & Cardiovascular', items: ['Advanced lipid panel (ApoB, Lp(a))', 'Fasting insulin & HOMA-IR', 'Hemoglobin A1C', 'Comprehensive metabolic panel', 'Aldosterone & renin'] }
                  ].map((panel, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-5" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                      <h4 className="text-sm font-serif font-medium text-black mb-3 pb-2 border-b border-gray-200">{panel.title}</h4>
                      <ul className="space-y-1.5">
                        {panel.items.map((item, j) => (
                          <li key={j} className="flex items-start text-gray-600 text-xs leading-relaxed">
                            <span className="mr-2 w-1 h-1 rounded-full flex-shrink-0 mt-1.5" style={{ backgroundColor: '#D4AF37' }}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <strong className="text-gray-700">How it works:</strong> Your provider determines which panels are appropriate based on your symptoms, history, and treatment goals. Labs are ordered electronically and can be drawn at any outpatient laboratory you choose — Quest Diagnostics, LabCorp, a hospital lab, or your preferred local draw station. Results are sent directly to your provider for review and are discussed at your follow-up visit, either in-office or via telehealth. Most results are available within 3-10 business days depending on the complexity of the panel.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto reveal">
                <h3 className="text-xl font-serif font-medium text-center mb-6 text-black">How Our Chronic Care Works</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { step: '1', title: 'Comprehensive Assessment', desc: 'We review your full health history, current medications, lab results, and lifestyle factors to understand the complete picture.' },
                    { step: '2', title: 'Personalized Treatment Plan', desc: 'Together, we create a realistic plan that fits your life — including medications, lifestyle changes, and a monitoring schedule.' },
                    { step: '3', title: 'Ongoing Monitoring', desc: 'Regular follow-ups — in-office or via telehealth — to track progress, adjust treatment, and keep you on track long-term.' }
                  ].map((item, i) => (
                    <div key={i} className="text-center">
                      <div className="w-10 h-10 mx-auto mb-4 rounded-full flex items-center justify-center text-black font-serif font-bold" style={{ backgroundColor: '#D4AF37' }}>
                        {item.step}
                      </div>
                      <h4 className="text-sm font-serif font-medium text-black mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Screenings & Prevention Section */}
            <div id="pc-screenings" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Screenings & Preventive Care</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Prevention is the best medicine. We offer comprehensive screenings, annual physicals, and women's health services including Pap smears to catch concerns early and keep you healthy.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                      <Stethoscope className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black">Annual Physicals</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    A comprehensive yearly exam that includes vital signs, health history review, medication reconciliation, and a thorough physical assessment. We take the time to discuss any concerns and update your care plan.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-right delay-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                      <Heart className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black">Pap Smears & Women's Health</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Routine Pap smears, pelvic exams, and clinical breast exams as part of our comprehensive women's health services. We follow current screening guidelines and personalize frequency based on your health history.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-5xl mx-auto reveal">
                <h3 className="text-xl font-serif font-medium text-center mb-6 text-black">Screenings We Offer</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'Blood pressure screening',
                    'Cholesterol panel',
                    'Blood glucose / A1C',
                    'Thyroid function tests',
                    'Pap smears',
                    'Clinical breast exams',
                    'Depression & anxiety screening',
                    'Skin cancer checks',
                    'BMI & weight assessment',
                    'STD / STI testing',
                    'Bone density screening',
                    'Vitamin D & B12 levels'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-700">
                      <span className="mr-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8 reveal">
                <button
                  onClick={() => navigateTo('screenings')}
                  className="inline-block px-8 py-3 rounded-full text-sm font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Learn More About Screenings
                </button>
              </div>
            </div>

            {/* Telehealth & Access Section */}
            <div id="pc-telehealth" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Telehealth & Access</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Quality healthcare shouldn't require a long drive. We offer telehealth appointments for patients throughout Florida, so you can connect with your provider from the comfort of home.
              </p>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-left">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#D4AF37' }}>
                    <Phone className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">Telehealth Visits</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Secure video appointments for follow-ups, medication management, chronic care check-ins, and many urgent care needs. Perfect for busy schedules, patients who live far from the office, or anyone who prefers the convenience of virtual care.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Available to all patients ages 18+',
                      'Secure, HIPAA-compliant video platform',
                      'Most insurances cover telehealth visits',
                      'Prescriptions sent directly to your pharmacy'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700 text-sm">
                        <span className="mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-right delay-100">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#D4AF37' }}>
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">In-Office Visits</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Our welcoming office provides a comfortable environment for comprehensive exams, screenings, and treatments that require a hands-on approach. By appointment only — no walk-ins, but same-day and next-day slots are available.
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Annual physicals and wellness exams',
                      "Pap smears and women's health",
                      'Procedures and in-person assessments',
                      'Comfortable, private exam rooms'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start text-gray-700 text-sm">
                        <span className="mr-3 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto reveal">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  {[
                    { icon: User, label: 'Ages 18+', desc: 'Adults only' },
                    { icon: MapPin, label: 'Florida Statewide', desc: 'Telehealth coverage' },
                    { icon: Clock, label: 'Same-Day / Next-Day', desc: 'By appointment' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <p className="text-sm font-serif font-medium text-black">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurance & Pricing Section */}
            <div id="pc-insurance" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Insurance & Pricing</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                We offer a hybrid payment model — we accept most major insurance plans and also provide competitive self-pay rates for patients without insurance or those seeking non-covered services.
              </p>

              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10 max-w-5xl mx-auto mb-8 reveal shadow-sm">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-2">Accepted Insurance Providers</h3>
                  <p className="text-sm text-gray-500">Click a provider to view specific plans</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  {['Cigna', 'Medicare', 'Oscar', 'United Healthcare', 'First Health', 'MultiPlan'].map((ins, i) => (
                    <button
                      key={i}
                      onClick={() => navigateTo('insurances')}
                      className="group bg-white border-2 rounded-full px-6 py-3 transition-all hover:shadow-md hover:scale-105"
                      style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
                    >
                      <span className="text-sm font-serif font-medium text-black group-hover:text-black transition-colors" style={{ transitionDelay: '0ms' }}>
                        {ins}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigateTo('insurances')}
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
                    style={{ color: '#D4AF37' }}
                  >
                    View detailed plan list
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto reveal">
                <div className="bg-white border border-gray-200 p-8 rounded-xl card-hover shadow-sm group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: '#D4AF37' }}>
                      <Shield className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black">Insurance Patients</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    We accept most major insurance plans. Please verify your coverage before your visit. Co-pays are due at the time of service. We'll help coordinate prior authorizations when needed.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Co-pays at visit', 'Prior auth support', 'Coverage verification'].map((tag, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 p-8 rounded-xl card-hover shadow-sm group">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: '#D4AF37' }}>
                      <DollarSign className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black">Self-Pay / Cash Patients</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    For patients without insurance or seeking services not covered by insurance, we offer competitive self-pay rates and flexible payment plans. Payment is due at the time of visit via cash or credit card.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Competitive rates', 'Flexible payment plans', 'Cash or credit card'].map((tag, i) => (
                      <span key={i} className="text-xs px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>FAQ's</h2>
              <div className="space-y-4">
                {[
                  { q: 'Do you offer walk-in appointments?', a: 'We do not offer walk-in services. However, we reserve same-day and next-day appointment slots each day for urgent needs. Call us first thing in the morning and we will do our best to fit you in.' },
                  { q: 'Do you see patients under 18?', a: 'No, we provide care for adults ages 18 and older. For pediatric care, we recommend finding a pediatrician or family medicine provider who treats children.' },
                  { q: 'Can I have a telehealth appointment if I live anywhere in Florida?', a: 'Yes! We offer telehealth appointments to patients throughout the state of Florida. As long as you are physically located in Florida at the time of your appointment, you can connect with us from anywhere.' },
                  { q: 'Do you have on-site lab services?', a: 'We do not have on-site labs. Lab orders are sent to an external laboratory (such as Quest or LabCorp) for processing. Your provider will review results with you at a follow-up visit or via telehealth.' },
                  { q: "Do you offer Pap smears and women's health services?", a: "Yes, we provide Pap smears, pelvic exams, clinical breast exams, and other women's health services as part of our comprehensive primary care. We follow current screening guidelines and personalize frequency based on your health history." },
                  { q: "What if I need to see a specialist?", a: "If your care requires a specialist, we will provide a referral and coordinate your care with the specialist's office. We stay informed of your specialist visits and integrate their recommendations into your overall care plan." },
                  { q: 'How do I pay for my visit?', a: 'We accept most major insurance plans, as well as cash and credit cards for self-pay patients. Co-pays are due at the time of service. For services not covered by insurance, we offer competitive self-pay rates and flexible payment plans.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">Ready to Get Started?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book your first appointment today and experience primary care that truly puts you first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'neurotoxins' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Neurotoxins</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Botox injections are a quick, minimally invasive treatment that smooths fine lines and wrinkles by temporarily relaxing the muscles beneath the skin. The result is a smoother, more youthful appearance that still looks natural. Botox is also an FDA-approved treatment for axillary hyperhidrosis — excessive underarm sweating — providing months of relief when topical remedies fall short.
            </p>

            <div className="mb-16 reveal reveal-scale">
              <img
                src={`${BASE}botox-treatment-hero.webp`}
                alt="Botox neurotoxin injection treatment at Kalon Primary Care & Wellness"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover"
                style={{ maxHeight: '420px' }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-medium text-black mb-3">How It Works</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Botulinum toxin is injected in small, precise amounts into targeted facial muscles. It blocks nerve signals that cause muscle contractions, allowing the overlying skin to smooth out. Treatment takes just minutes with no downtime.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-100">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Clock className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-medium text-black mb-3">What to Expect</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Results begin to appear within 3–7 days, with full effects visible at two weeks. Treatments typically last 3–4 months. A brief consultation is included to map out your treatment areas and discuss your aesthetic goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Common Treatment Areas</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { area: 'Forehead Lines', desc: 'Smooth horizontal lines across the forehead for a relaxed, refreshed look.' },
                  { area: 'Glabella (Frown Lines)', desc: 'Soften the vertical lines between your eyebrows that can make you look tense or angry.' },
                  { area: 'Crow\u2019s Feet', desc: 'Reduce the fine lines around the outer corners of your eyes when you smile or squint.' },
                  { area: 'Neck Bands', desc: 'Soften vertical neck bands and horizontal lines for a smoother, more contoured neckline.' },
                  { area: 'Axillary Hyperhidrosis', desc: 'FDA-approved Botox treatment for excessive underarm sweating. Blocks the nerve signals that trigger sweat glands, reducing sweat production for up to 6 months.' }
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                      <Check className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{item.area}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>FAQ's</h2>
              <div className="space-y-4">
                {[
                  { q: 'Does Botox hurt?', a: 'Most patients describe the sensation as a brief pinch. The needles used are very fine, and the entire treatment takes only a few minutes. Numbing cream can be applied beforehand if you prefer.' },
                  { q: 'How long do results last?', a: 'Botox results typically last 3–4 months. With regular treatments, some patients find results last longer over time as the treated muscles become trained to relax.' },
                  { q: 'Is there any downtime?', a: 'No. You can return to your normal activities immediately after treatment. We recommend avoiding strenuous exercise, lying flat, or touching the treated areas for 24 hours.' },
                  { q: 'Will I look frozen or unnatural?', a: 'Not at all. Our approach is conservative and natural-looking. We target only the muscles causing wrinkles, so you maintain your full range of facial expressions — just with smoother skin.' },
                  { q: 'Can Botox help with excessive underarm sweating?', a: 'Yes. Botox is FDA-approved for axillary hyperhidrosis — excessive underarm sweating that has not responded adequately to topical treatments. A series of small injections into the underarm area blocks the nerve signals that activate sweat glands, significantly reducing sweat production. Results typically last 6 months, and many patients find relief after just one treatment session.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">Ready to Refresh Your Look?</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a consultation to discuss your aesthetic goals and find out if Botox is right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'hair-restoration' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Hair Restoration</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Non-surgical hair restoration treatments that harness your body's natural healing and growth factors to stimulate hair follicles, improve scalp health, and promote thicker, healthier hair growth.
            </p>

            <div className="mb-16 reveal reveal-scale">
              <img
                src={`${BASE}hair-restoration-hero.webp`}
                alt="Hair restoration scalp treatment at Kalon Primary Care & Wellness"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover"
                style={{ maxHeight: '420px' }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-medium text-black mb-3">RF Microneedling</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Radio-frequency microneedling creates controlled micro-injuries in the scalp that stimulate the body's natural healing response and trigger new collagen and cellular production. This awakens dormant hair follicles and encourages new hair growth. Each session is paired with complementary hair restoration stem cells containing pro-healing, anti-inflammatory growth factors and cytokines. A series of 4–8 treatments is recommended for optimal results.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-100">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Droplet className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-medium text-black mb-3">PRP / PRF Injections</h3>
                    <p className="text-gray-700 leading-relaxed">
                      A non-surgical procedure that harnesses the power of platelet-rich fibrin or platelet-rich plasma to stimulate hair follicles and promote regrowth. A small amount of your blood is drawn, processed in a centrifuge to concentrate platelets, growth factors, and cytokines, and then injected directly into the scalp. The growth factors stimulate follicles, improve blood circulation, and encourage the production of new hair cells. A series of 4–8 treatments spaced 4 weeks apart is recommended for optimal results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Check className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">Medical Provider-Guided Supplement Support</h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                In addition to in-office treatments, we offer medical provider-formulated hair growth supplements to target the root causes of hair thinning from within. These daily supplements are clinically backed and tailored to your specific needs. Available through our supplement dispensary with convenient home delivery.
              </p>
            </div>

            {/* What to Expect section */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
                What to Expect
              </h2>
              <div className="flex justify-center mb-12 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: ClipboardList, title: 'Before Treatment', desc: 'Your journey begins with a personalized consultation to assess your scalp, review your health history, and discuss your goals. To prepare: avoid smoking and alcohol for a few days before treatment, skip blood-thinning medications and supplements if approved by your provider, wash your hair thoroughly the night before, and stay hydrated while eating a healthy meal beforehand.' },
                  { icon: Activity, title: 'During Treatment', desc: 'A topical numbing cream is applied to ensure your comfort. For RF microneedling, fine needles create controlled micro-injuries in the scalp to stimulate follicles. For PRP/PRF injections, a small amount of your blood is drawn, processed in a centrifuge, and the concentrated growth factors are injected directly into the scalp. Most sessions take 45–60 minutes.' },
                  { icon: Check, title: 'After Treatment', desc: 'Mild redness or swelling at the scalp is normal and subsides within a few days. You may notice some shedding in the first few weeks — this is a natural part of the growth cycle as old hairs make room for new growth. Most patients return to normal activities the same day. Avoid strenuous exercise and sun exposure to the scalp for 24–48 hours.' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <item.icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Results timeline */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Your Results Timeline</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { period: '3 Months', desc: 'Early signs of new growth begin as dormant follicles are stimulated and the scalp environment improves.' },
                  { period: '6 Months', desc: 'Hair looks noticeably thicker and denser as regrowth cycles progress and new hair cells mature.' },
                  { period: '9–12 Months', desc: 'Full results are visible with maximum hair density and coverage. Maintenance treatments help sustain your results long-term.' }
                ].map((item, i) => (
                  <div key={i} className="text-center" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="text-3xl font-serif font-light mb-3" style={{ color: '#D4AF37' }}>{item.period}</div>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended treatment plan */}
            <div className="mb-16 max-w-4xl mx-auto reveal">
              <h2 className="text-4xl font-serif font-light text-center mb-4" style={{ color: '#D4AF37' }}>
                Recommended Treatment Plan
              </h2>
              <div className="flex justify-center mb-10">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-6">
                  For optimal results, a series of <strong className="text-black">4–8 treatments</strong> is recommended, spaced approximately <strong className="text-black">4 weeks apart</strong>. Your exact protocol will be customized based on the extent of hair loss, your individual response to treatment, and your overall goals. Many patients benefit from combining RF microneedling with PRP/PRF injections and ongoing supplement support for a comprehensive approach.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Maintenance treatments every 6–12 months, along with continued supplement support, help sustain your results long-term.
                </p>
              </div>
            </div>

            {/* Pre-treatment reminders */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                Reminders For Your Treatment
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Droplets, title: 'Stay Hydrated', desc: 'Drink plenty of water for at least 24–48 hours before your appointment. Avoid alcohol for 24–48 hours prior to treatment.' },
                  { icon: Clock, title: 'Arrive Early', desc: 'Please arrive 45 minutes prior to your scheduled appointment time for numbing to ensure your comfort during treatment.' },
                  { icon: Sun, title: 'Avoid Sun Exposure', desc: 'Avoid direct sun exposure to the scalp for 2 weeks before and after treatment. Always wear SPF 30+ when outdoors.' },
                  { icon: Shield, title: 'No Blood Thinners', desc: 'Avoid blood-thinning medications and supplements (if approved by your provider) for a few days before treatment to minimize bruising.' }
                ].map((reminder, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <reminder.icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{reminder.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reminder.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>FAQ's</h2>
              <div className="space-y-4">
                {[
                  { q: 'Am I a good candidate for hair restoration?', a: 'Hair restoration treatments are ideal for individuals experiencing thinning hair, receding hairlines, or early-stage hair loss. During your consultation, we will assess your scalp health, hair loss pattern, and goals to recommend the best treatment plan for you.' },
                  { q: 'How many treatments will I need?', a: 'For optimal results, a series of 4–8 treatments is typically recommended, spaced about 4 weeks apart. Your exact protocol will depend on the extent of hair loss and your individual response to treatment.' },
                  { q: 'When will I see results?', a: 'Most patients begin to notice improvements in hair thickness and density within 2–3 months after starting treatment. Full results develop gradually as hair follicles are stimulated and new growth cycles are activated, with maximum results visible at 6–12 months.' },
                  { q: 'Is there any downtime?', a: 'There is minimal to no downtime. You may experience mild redness or sensitivity in the treatment area for 24–48 hours. Most patients return to normal activities the same day. We recommend avoiding strenuous exercise and sun exposure to the scalp for 24–48 hours post-treatment.' },
                  { q: 'Are the treatments painful?', a: 'A topical numbing cream is applied to the scalp prior to treatment to ensure your comfort. Most patients report only mild sensation during the procedure. PRP/PRF injections involve very fine needles and are generally well-tolerated.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to Restore Your Hair?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a consultation to discuss your hair restoration goals and find out which treatment combination is right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'regenerative-aesthetics' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Microneedling with PRP</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Microneedling, also known as Collagen Induction Therapy, is a minimally invasive treatment to rejuvenate the skin and is safe for all skin types. Fine needles create micro-injuries in the top layer of the skin, which triggers the body's response to create new collagen and elastin. Results can include improved texture and firmness, as well as a reduction in scars, pore size, pigment, and stretch marks.
            </p>

            <div className="mb-16 reveal reveal-scale">
              <img
                src={`${BASE}microneedling-prp-hero.webp`}
                alt="Microneedling with PRP facial treatment at Kalon Primary Care & Wellness"
                className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg object-cover"
                style={{ maxHeight: '420px' }}
              />
            </div>

            {/* What is PRP/PRF section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Microscope className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">What Are PRP & PRF?</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-serif font-medium mb-3" style={{ color: '#D4AF37' }}>PRP (Platelet-Rich Plasma)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A small sample of your blood is spun in a centrifuge to concentrate the platelets and growth factors. This golden plasma is then applied or injected to stimulate tissue repair, collagen production, and cellular regeneration.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-3" style={{ color: '#D4AF37' }}>PRF (Platelet-Rich Fibrin)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A next-generation preparation that uses a slower spin to preserve white blood cells and fibrin, creating a natural scaffold that releases growth factors gradually over several days for longer-lasting results.
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto mt-6">
                Micro punctures are created using our microneedling device, which produces a controlled skin injury without damaging the epidermis. These micro-injuries lead to minimal superficial bleeding and set up a wound-healing cascade with a release of various growth factors. When combining Microneedling with PRF or PRP, the patient's blood is drawn, processed in a centrifuge, and then used to optimize the treatment. The addition of PRF/PRP is clinically proven to make microneedling much more effective. Platelet-rich fibrin, which uses growth factors and other elements from our own blood to repair damaged skin, contains proteins, including growth factors and cytokines, that help skin tissue repair itself.
              </p>
            </div>

            {/* Technology section */}
            <div className="mb-16 reveal">
              <h2 className="text-4xl font-serif font-light text-center mb-4" style={{ color: '#D4AF37' }}>
                Our PRP & PRF Technology
              </h2>
              <div className="flex justify-center mb-8">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-10">
                We use FDA-cleared, Class II medical devices to prepare your platelet-rich plasma and platelet-rich fibrin. This cutting-edge technology ensures the highest quality concentration of growth factors for your treatment.
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Shield, title: 'FDA-Cleared', desc: 'Our kits are FDA-cleared, Class II medical devices, 510(k)-cleared for the rapid preparation of autologous platelet-rich plasma at the point of care.' },
                  { icon: Activity, title: '85%+ Platelet Recovery', desc: 'Industry-leading platelet recovery with reproducible concentrations and a balanced pH, ensuring consistent, high-quality plasma every time.' },
                  { icon: Check, title: '99% RBC Removal', desc: 'Near-complete removal of red blood cells means a cleaner, purer plasma \u2014 reducing inflammation and maximizing the healing growth factors delivered to your skin.' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <item.icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats section */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
              {[
                { stat: '94%', desc: 'of patients noticed an improvement in how their fine lines/wrinkles look at one month post-treatment' },
                { stat: '80%', desc: 'of patients said they noticed an improvement in acne scars in the treated area at one month post-treatment' },
                { stat: '90%', desc: 'of patients said they would recommend microneedling at one month post-treatment' }
              ].map((s, i) => (
                <div key={i} className="text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="text-5xl font-serif font-light mb-3" style={{ color: '#D4AF37' }}>{s.stat}</div>
                  <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">{s.desc}</p>
                </div>
              ))}
            </div>

            {/* Treatments grid */}
            <div className="space-y-8 max-w-5xl mx-auto mb-16">
              {/* Microneedling with PRF/PRP - Face & Neck */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif font-medium text-black">Microneedling with PRF/PRP — Face & Neck</h3>
                      <span className="text-2xl font-bold whitespace-nowrap ml-4" style={{ color: '#D4AF37' }}>$550</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Our signature facial microneedling treatment, also known as Collagen Induction Therapy. Platelet Rich Fibrin is used while microneedling the face and neck (décolletage can be added on for $200) to stimulate collagen, tighten the skin, minimize pore size, improve skin texture, diminish scarring, and improve the appearance of fine lines/wrinkles. This is the ultimate anti-aging facial.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Please note: This treatment requires your blood to be drawn — stay hydrated at least 24 hours prior to your appointment and arrive 45 minutes prior to your scheduled appointment time to numb.
                    </p>
                  </div>
                </div>
              </div>

              {/* Body Microneedling with PRF/PRP */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-100">
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float-2 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Syringe className="w-7 h-7 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-serif font-medium text-black">Body Microneedling with PRF/PRP</h3>
                      <span className="text-2xl font-bold whitespace-nowrap ml-4" style={{ color: '#D4AF37' }}>$650</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Body Microneedling paired with PRF/PRP is a great choice when looking to treat areas on the body that are in need of collagen and elastin production. Popular areas on the body to treat with Microneedling are the knees, legs, arms or abdomen. Platelet Rich Fibrin, which uses growth factors and other elements from our own blood to repair damaged skin, is used while microneedling to enhance the results due to its healing properties. Body Microneedling helps to tighten the skin, improve hyperpigmentation, improve skin texture, diminish scarring/stretch marks and improve the appearance of fine lines/wrinkles.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Please note: This treatment requires your blood to be drawn — stay hydrated at least 24 hours prior to your appointment and arrive 45 minutes prior to your scheduled appointment time to numb.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reminders section */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                Reminders For Your Treatment
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {[
                  { icon: Clock, title: 'Numbing', desc: 'We want your microneedling treatment to be as comfortable as possible! Please remember to arrive 45 minutes prior to your scheduled appointment time for numbing.' },
                  { icon: Sun, title: 'Sun Exposure', desc: 'Avoid sun exposure for 2 weeks before and 2 weeks after your microneedling treatment and always remember to wear a sunscreen with SPF 30+.' },
                  { icon: Droplets, title: 'Stay Hydrated', desc: 'It is important to stay hydrated prior to your microneedling treatment. We also recommend avoiding alcohol for 24–48 hrs prior to your appointment.' },
                  { icon: Sparkles, title: 'No Actives', desc: 'Stop all topical acids, such as glycolic, alpha or beta hydroxyl acids, retinols, retin-A, or other like products 3–5 days prior to your microneedling treatment.' }
                ].map((reminder, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center reveal reveal-scale" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <reminder.icon className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{reminder.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{reminder.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ section */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'How long do results of Microneedling typically last?', a: 'Results can last several months to a year depending on your skin type, age, and skincare routine. A series of 3–4 sessions is recommended for optimal results, with maintenance treatments every 6–12 months.' },
                  { q: 'When will I see the results of Microneedling?', a: 'Initial improvements in skin texture and tone typically appear within 1–2 weeks after your first session. Collagen production continues over the following months, with full results visible at 3–6 months as the skin continues to regenerate.' },
                  { q: 'Will I have any downtime after a Microneedling treatment?', a: 'Downtime is minimal. Skin may appear pink or flushed for 24–48 hours, similar to a mild sunburn. Most patients return to normal activities the next day. Avoid sun exposure, active skincare ingredients, and strenuous exercise for 24–48 hours post-treatment.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to restore from within?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Microneedling with PRP and PRF uses your body's own growth factors — no synthetic fillers, no chemicals. Book a consultation to see if this treatment is right for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'iv-treatments' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>IV Therapy</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Experience targeted wellness through IV therapy delivered directly into your bloodstream for maximum absorption and immediate benefits. By bypassing the digestive system, IV infusions allow for rapid and complete absorption of essential vitamins, minerals, and amino acids.
            </p>

            {/* How IV Therapy Works */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Droplets className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">How IV Therapy Works</h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                IV (intravenous) therapy delivers vitamins, minerals, amino acids, and hydration directly into your bloodstream, bypassing the digestive tract for rapid and complete absorption. This means your body can utilize up to 100% of the nutrients delivered, compared to oral supplements which may lose much of their potency during digestion. Each infusion is personalized by our medical providers based on your health goals, and sessions typically take 30-60 minutes in a comfortable, relaxing setting.
              </p>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                Kalon's IV Therapy Menu
              </h2>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  {
                    name: "Kalon's All-in-One Boost IV",
                    price: "$175",
                    tagline: "The classic wellness powerhouse",
                    description: "A potent blend of magnesium chloride, B-complex vitamins, hydroxocobalamin B12, calcium gluconate, and ascorbic acid (vitamin C). Designed to support immune health, replenish nutrient deficiencies, reduce fatigue and inflammation, and help your body rehydrate and reset from the inside out.",
                    ingredients: ['Magnesium Chloride', 'B-Complex Vitamins', 'Hydroxocobalamin B12', 'Calcium Gluconate', 'Ascorbic Acid (Vitamin C)'],
                    benefits: ['Reduces fatigue and inflammation', 'Supports immune health', 'Restores natural balance', 'Helps with seasonal allergies'],
                    icon: Zap
                  },
                  {
                    name: "Kalon's B-Slim IV",
                    price: "$200",
                    tagline: "Turn fat into energy",
                    description: "Supports weight loss and boosts fat-burning potential by delivering essential fat-burning nutrients directly into your bloodstream. Key ingredients like methylcobalamin (B12), taurine, and B-complex vitamins work together to help your body convert fat into energy more efficiently, fuel metabolism, and enhance mood and physical performance.",
                    ingredients: ['L-Taurine', 'Methylcobalamin (B12)', 'Thiamine (B1)', 'Niacinamide (B3)', 'Riboflavin 5 Phosphate (B2)', 'Dexpanthenol (B5)', 'Pyridoxine (B6)'],
                    benefits: ['Supports fat metabolism', 'Boosts energy during workouts', 'Enhances mood and focus', 'Fuels metabolism and endurance'],
                    icon: Flame
                  },
                  {
                    name: "Kalon's White Glow IV",
                    price: "$150",
                    tagline: "Radiance from within",
                    description: "Designed to help bring out radiance and natural glow, this beauty-focused infusion fortifies hair, skin, and nails while reducing wrinkles and quenching skin from the inside out. Premium-quality compounds work together to promote brighter, healthier-looking skin and natural radiance.",
                    ingredients: ['Biotin', 'B-Complex Vitamins', 'Vitamin C', 'Glutathione', 'Essential Minerals'],
                    benefits: ['Promotes brighter, healthier skin', 'Fortifies hair, skin, and nails', 'Reduces wrinkles', 'Deeply hydrates skin'],
                    icon: Sparkles
                  },
                  {
                    name: "Kalon's Timeless IV",
                    price: "$175",
                    tagline: "Healthy aging and longevity",
                    description: "An anti-aging infusion that brings together antioxidants, vitamins, and amino-acid-based compounds used in longevity routines. Ingredients like N-Acetylcysteine, hydroxocobalamin B12, B-complex vitamins, and magnesium chloride work to reduce the appearance of aging by promoting collagen production, cellular regeneration, and oxidative stress reduction.",
                    ingredients: ['N-Acetylcysteine', 'Hydroxocobalamin B12', 'B-Complex Vitamins', 'Magnesium Chloride'],
                    benefits: ['Reduces appearance of aging', 'Promotes collagen production', 'Supports cellular regeneration', 'Reduces oxidative stress'],
                    icon: Heart
                  },
                  {
                    name: "Kalon's Pick-Me-Up IV",
                    price: "$150",
                    tagline: "Energy and metabolism boost",
                    description: "Formulated to boost energy and support metabolic health, helping you feel more alert, focused, and physically ready for the day ahead. B vitamins help the body convert food into usable energy, while amino acids contribute to muscle repair, fat metabolism, and mental clarity.",
                    ingredients: ['Arginine', 'Carnitine', 'Lysine', 'Proline', 'Thiamine (B1)', 'Niacinamide (B3)', 'Riboflavin 5 Phosphate (B2)', 'Dexpanthenol (B5)', 'Pyridoxine (B6)'],
                    benefits: ['Boosts energy and alertness', 'Supports metabolic health', 'Improves mental clarity', 'Reduces muscle fatigue'],
                    icon: Sun
                  },
                  {
                    name: "Kalon's Immune IV",
                    price: "$125",
                    tagline: "Strengthen your defenses",
                    description: "An immune-boosting infusion featuring ascorbic acid (vitamin C) and zinc, known for their immune-strengthening effects. This kit helps protect against infection, improve healing time, build up your immune system, and reduce the duration of illnesses — keeping you healthy and resilient year-round.",
                    ingredients: ['Ascorbic Acid (Vitamin C)', 'Zinc', 'B-Complex Vitamins', 'Olympia Mineral Blend'],
                    benefits: ['Protects against infection', 'Improves healing time', 'Builds up immune system', 'Reduces duration of illnesses'],
                    icon: Shield
                  },
                  {
                    name: "Kalon's Recovery IV",
                    price: "$200",
                    tagline: "Post-workout and injury recovery",
                    description: "Designed to decrease recovery time, enhance athletic performance, replenish essential nutrients, and reduce inflammation. Vitamin C provides antioxidant protection while amino acids fuel cellular repair and tissue regeneration. Ideal for athletes, active individuals, or anyone recovering from intense physical exertion.",
                    ingredients: ['Ascorbic Acid (Vitamin C)', 'B-Complex Vitamins', 'Amino Blend', 'Olympia Mineral Blend'],
                    benefits: ['Supports post-workout recovery', 'Enhances athletic performance', 'Replenishes vitamins and minerals', 'Reduces inflammation'],
                    icon: Dumbbell
                  },
                  {
                    name: "Kalon's Brainstorm IV",
                    price: "$175",
                    tagline: "Mental clarity and cognitive wellness",
                    description: "A cognitive-support infusion combining alpha-lipoic acid, L-taurine, and pyridoxine (B6) to nourish the brain and protect against oxidative stress and inflammation. This kit is designed to improve overall brain function, increase memory recall, and support certain aspects of learning.",
                    ingredients: ['Alpha-Lipoic Acid', 'L-Taurine', 'Pyridoxine (B6)'],
                    benefits: ['Improves cognitive function', 'Enhances memory recall', 'Supports mental clarity', 'Protects against oxidative stress'],
                    icon: Brain
                  }
                ].map((treatment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-8 card-hover reveal hover:shadow-lg transition-all"
                    style={{ transitionDelay: `${(index % 2) * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                          <treatment.icon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif font-medium text-black leading-tight">{treatment.name}</h3>
                          <p className="text-xs text-gray-500 italic mt-1">{treatment.tagline}</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold whitespace-nowrap ml-4" style={{ color: '#D4AF37' }}>{treatment.price}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">{treatment.description}</p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">Includes</p>
                      <div className="flex flex-wrap gap-2">
                        {treatment.ingredients.map((ing, i) => (
                          <span key={i} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 text-gray-600">{ing}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide mb-2">Possible Benefits</p>
                      <ul className="grid grid-cols-2 gap-1">
                        {treatment.benefits.map((b, i) => (
                          <li key={i} className="flex items-start text-xs text-gray-600">
                            <span className="mr-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '5px' }}></span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                      style={{ color: '#D4AF37' }}
                    >
                      Book this infusion &rarr;
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* NAD+ Wellness Programs - expanded section */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
                NAD+ Wellness Programs
              </h2>
              <div className="flex justify-center mb-8 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Optimize Cellular Health, Energy, and Mental Clarity with Advanced NAD+ Support
              </p>

              {/* What is NAD+ section */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-12 reveal">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Activity className="w-8 h-8 text-black" />
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-light text-center mb-6 text-black">What Is NAD+?</h3>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-6">
                  Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme found within every cell throughout the body. It plays a vital role in optimizing the immune system, facilitating natural cellular repair, supporting energy metabolism, and maintaining healthy cognitive function. However, our systemic levels naturally decline with age and can be further depleted by chronic stress, modern lifestyles, and physical or mental burnout. This drop often leads to common symptoms like mental fatigue, persistent exhaustion, and slower physical recovery times.
                </p>
                <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                  Our provider-supervised cellular optimization protocols utilize specialized, medical-grade NAD+ formulations designed to replenish your body's essential coenzyme levels and restore foundational vitality. Whether you are aiming to naturally elevate your daily energy, sharpen focus, support a healthy aging strategy, or recover more efficiently from life's demands, our customized wellness plans offer a sophisticated, evidence-based way to help you feel revitalized from the inside out.
                </p>
              </div>

              {/* How it works */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-left">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Zap className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-black">Powering Cellular Energy</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    NAD+ acts as an essential fuel source that helps your mitochondria convert nutrients into ATP — the primary energy currency your body uses for mental clarity and physical stamina.
                  </p>
                </div>
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-right delay-100">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center icon-float-2" style={{ backgroundColor: '#D4AF37' }}>
                    <Shield className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-black">Fueling Natural Repair</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    NAD+ activates specialized longevity enzymes and repair proteins that patch damaged DNA, calm cellular stress, and maintain systemic vitality as you age.
                  </p>
                </div>
              </div>

              {/* NAD+ treatment info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12 max-w-4xl mx-auto reveal">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-medium text-black">Kalon's NAD+ IV Infusion</h3>
                  <span className="text-2xl font-bold whitespace-nowrap ml-4" style={{ color: '#D4AF37' }}>$300</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A high-dose NAD+ intravenous infusion that delivers 1000mg of nicotinamide adenine dinucleotide directly into your bloodstream for maximum cellular absorption. By bypassing the digestive tract, this delivery method allows for rapid absorption, effectively replenishing depleted levels at the foundational cellular level.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  Sessions typically take 45–90 minutes depending on your personalized protocol. Your provider will customize the infusion rate based on your comfort and health profile.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Recommended Protocol</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    While individual timelines vary, many patients report feeling a noticeable improvement in daily energy levels and cognitive clarity within their first few sessions. Cumulative and more significant benefits — such as deeper sleep quality, enhanced emotional wellness, and faster physical recovery — are typically observed after completing a structured series of sessions. Your provider will design a personalized treatment plan based on your specific wellness goals.
                  </p>
                </div>
              </div>

              {/* Benefits grid */}
              <h3 className="text-3xl font-serif font-light text-center mb-8 text-black reveal">Benefits of NAD+ Therapy</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                {[
                  { icon: Zap, title: 'Elevated Energy & Vitality', desc: 'Optimizes natural energy production to significantly reduce feelings of physical exhaustion and chronic burnout.' },
                  { icon: Brain, title: 'Enhanced Cognitive Function', desc: 'Promotes mental clarity and sharp focus, helping to clear brain performance bottlenecks and diminish brain fog.' },
                  { icon: Heart, title: 'Balanced Emotional Wellness', desc: 'Assists in supporting neurological pathways to encourage an elevated mood and better stress resilience.' },
                  { icon: Sparkles, title: 'Healthy Aging & Longevity', desc: 'Fuels the natural cellular repair systems responsible for protecting DNA and managing age-related decline.' },
                  { icon: Shield, title: 'Immune System Assistance', desc: "Helps maintain the body's natural defenses to support a healthy immune response and speed up recovery." },
                  { icon: Dumbbell, title: 'Efficient Physical Recovery', desc: 'Accelerates recovery times following intense exercise, physical exertion, or daily stressors to reduce downtime.' },
                  { icon: Activity, title: 'Natural Detoxification Support', desc: "Aids the body's natural metabolic processes to rejuvenate overall systemic wellness and cleanse at a cellular level." },
                  { icon: Sun, title: 'Metabolic Optimization', desc: 'Enhances overall metabolic efficiency to optimize energy conversion and assist in weight management.' },
                  { icon: Moon, title: 'Restorative Sleep Quality', desc: 'Promotes more balanced circadian rhythms to support deeper, more restful sleep cycles and ease jet lag.' }
                ].map((benefit, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <benefit.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-medium text-black mb-2">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* NAD+ FAQ */}
              <div className="mb-4 max-w-3xl mx-auto">
                <h3 className="text-3xl font-serif font-light text-center mb-10 reveal" style={{ color: '#D4AF37' }}>NAD+ FAQ's</h3>
                <div className="space-y-4">
                  {[
                    { q: 'What is NAD+, and why is it important?', a: 'NAD+ is a vital coenzyme found in every cell of the body that acts as a primary catalyst for cellular health. It powers cellular energy by helping mitochondria convert nutrients into ATP, and fuels natural repair by activating longevity enzymes that patch damaged DNA and calm cellular stress. Our natural levels drop by up to 50% every two decades — and decline even faster due to stress, poor sleep, and everyday fatigue.' },
                    { q: 'How does the NAD+ wellness program work?', a: 'Our specialized protocols ensure maximum absorption by delivering medical-grade NAD+ formulations directly to your system, completely bypassing the digestive tract. This efficient delivery method allows for rapid absorption, effectively replenishing depleted levels at the foundational cellular level to enhance energy, cognitive clarity, metabolic efficiency, and healthy aging.' },
                    { q: 'Is NAD+ wellness support safe?', a: 'Yes, our NAD+ protocols are widely regarded as safe when administered under the care of trained healthcare professionals. Because this formulation utilizes a coenzyme that your body already produces naturally, it is typically very well tolerated. Some patients may experience mild, temporary sensations during administration — such as brief flushing, slight nausea, or mild dizziness. These effects are normal, short-lived, and easily managed by our staff in real-time by adjusting the pace of your treatment.' },
                    { q: 'Who is a good candidate for NAD+ protocols?', a: 'NAD+ is highly beneficial for individuals experiencing persistent fatigue, cognitive fog, slowed physical recovery, or those looking to implement a proactive healthy aging strategy. It is an excellent option for athletes, high-performing professionals, and individuals looking to revitalize their system after periods of chronic stress or physical burnout.' },
                    { q: 'How long does it take to notice results?', a: 'Many patients report feeling a noticeable improvement in daily energy levels and cognitive clarity within their first few sessions. Cumulative and more significant benefits — such as deeper sleep quality, enhanced emotional wellness, and faster physical recovery — are typically observed after completing a full, structured series of sessions. Your provider will design a personalized treatment plan for optimal, long-lasting results.' }
                  ].map((faq, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                      <h4 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h4>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* IV Therapy FAQ */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                IV Therapy FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'How long does an IV therapy session take?', a: 'Most IV infusions take 30-60 minutes depending on the specific treatment. NAD+ infusions may take 45-90 minutes. You can relax in a comfortable chair during your session.' },
                  { q: 'How often should I get IV therapy?', a: 'Some patients include IV therapy as part of their weekly or biweekly wellness routine, while others use it for an occasional boost before travel, events, or high-demand periods. Your provider will recommend a personalized frequency based on your wellness goals.' },
                  { q: 'Are there any side effects?', a: 'IV therapy is generally well-tolerated. Mild side effects may include slight bruising at the injection site, headache, or a flushed feeling, depending on individual sensitivity. These effects are typically short-lived.' },
                  { q: 'Is IV therapy safe?', a: 'Yes, when administered under the care of trained healthcare professionals, IV therapy is widely regarded as safe. Our medical team evaluates your health history before any treatment to ensure the formulation is right for you.' },
                  { q: 'Who is a good candidate for IV therapy?', a: 'IV therapy is beneficial for almost anyone looking to optimize their wellness — from athletes seeking faster recovery, to professionals combating fatigue, to individuals looking to support their immune system or enhance their natural beauty. A consultation with our provider will determine the best infusion for your needs.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
                Packages Available
              </h2>

              <div className="max-w-3xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                  <h3 className="text-3xl font-serif font-medium text-center mb-8" style={{ color: '#D4AF37' }}>
                    Wellness IV Package
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 p-6 rounded-lg text-center" style={{ borderColor: '#D4AF37' }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>$450</div>
                      <div className="text-2xl font-serif font-medium text-gray-800 mb-3">3 IV Sessions</div>
                      <p className="text-gray-600">Save on your wellness journey with our 3-session package</p>
                    </div>

                    <div className="bg-white border-2 p-6 rounded-lg text-center" style={{ borderColor: '#D4AF37' }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>$800</div>
                      <div className="text-2xl font-serif font-medium text-gray-800 mb-3">6 IV Sessions</div>
                      <p className="text-gray-600">Best value for long-term wellness optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-16 max-w-3xl mx-auto">
              <div className="bg-gray-50 border-l-4 p-6 rounded-r-lg" style={{ borderColor: '#D4AF37' }}>
                <p className="text-sm text-gray-500 leading-relaxed italic">
                  <strong>Clinical & Regulatory Disclaimer:</strong> These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Compounded products are not approved by the FDA. IV therapy programs are subject to medical provider approval following a comprehensive health assessment. Individual results may vary based on personal health history, adherence to clinical protocols, and lifestyle factors. Please consult a licensed healthcare professional about diagnosis and treatment.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-serif font-light mb-8 text-black">
                Ready to boost your wellness with IV therapy?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Experience the benefits of IV therapy with our professional, provider-supervised infusions. Deliver nutrients directly for optimal wellness and vitality.
              </p>
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Book IV Therapy
              </a>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'peptides' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Peptide Therapy</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Targeted peptide therapies and in-office injections designed to support cellular regeneration, hormonal balance, energy, and longevity. Each protocol is medical provider-guided and customized to your health goals.
            </p>

            {/* Overview section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                Our tailored wellness programs utilize advanced, naturally occurring peptide chains, amino acids, and signaling molecules designed to optimize metabolic function and support sustainable weight management. These microscopic building blocks act as precise messengers within the body, instructing cells to balance energy production, regulate blood sugar, and naturally improve body composition. Each protocol is personalized based on a comprehensive health assessment during your in-office consultation.
              </p>
            </div>

            {/* Benefits grid */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
                Benefits of Peptide & Cellular Optimization
              </h2>
              <div className="flex justify-center mb-12 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Zap, title: 'Natural Energy Boost', desc: 'Revitalize cellular energy production to combat fatigue and sustain daily stamina without crashes.' },
                  { icon: Dumbbell, title: 'Enhanced Physical Performance', desc: 'Improve cellular endurance, oxygenation, and overall athletic output.' },
                  { icon: Activity, title: 'Accelerated Fat Burning', desc: 'Support metabolic pathways that efficiently mobilize stored fat to be used as clean energy.' },
                  { icon: Heart, title: 'Lean Muscle Building & Repair', desc: 'Provide essential cellular building blocks for muscle protein synthesis, tissue repair, and faster recovery.' },
                  { icon: Sparkles, title: 'Sustainable Weight Loss', desc: 'Help regulate blood sugar levels, manage cravings, and balance metabolic health for long-term success.' },
                  { icon: Moon, title: 'Enhanced Sleep Quality', desc: 'Supports the regulation of deep circadian rhythms, promoting restful, restorative sleep cycles.' },
                  { icon: Brain, title: 'Sharper Cognitive Focus', desc: 'Protect cells from oxidative stress to optimize neurological function, mental clarity, and memory recall.' },
                  { icon: Shield, title: 'Healthy Aging & Longevity', desc: 'Fuel natural cellular repair systems responsible for protecting DNA and managing age-related decline.' },
                  { icon: ClipboardList, title: 'Provider-Supervised', desc: 'Every protocol is personalized and overseen by our licensed medical team for safe, optimal results.' }
                ].map((benefit, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <benefit.icon className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <h4 className="text-lg font-serif font-medium text-black mb-2">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment menu */}
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                Peptide Therapy Menu
              </h2>
              {/* Sermoreline */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">Sermoreline Therapy</h3>
                  <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$300/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Nightly Injections</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sermorelin is a well-regarded secretagogue designed to support the natural optimization of growth hormone pathways in the body. As we age, the natural production of critical signaling peptides responsible for muscle composition, healing, and cellular repair steadily decreases. Sermorelin gently signals the body to optimize its inherent vitality, supporting healthy metabolism, lean muscle mass, tissue recovery, deeper restorative sleep, and natural cellular regeneration.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Improves sleep quality',
                      'Enhances fat metabolism',
                      'Supports lean muscle growth',
                      'Increases energy and recovery',
                      'May improve skin tone and aging markers'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NAD+ */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left delay-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">NAD+ Therapy</h3>
                  <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$300/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">Daily Injections (1000 mg)</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  NAD+ (Nicotinamide Adenine Dinucleotide) is a vital coenzyme naturally found within every cell of the body. It supports the natural production of ATP — the primary energy carrier within cells — helps neutralize free radicals for robust antioxidant support, and supplements natural NAD+ levels that frequently decline due to aging and everyday environmental stressors. This daily injection protocol is designed for cellular energy, cognitive clarity, and healthy aging support.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Boosts cellular energy (ATP production)',
                      'Enhances mental clarity and focus',
                      'Supports anti-aging at the cellular level',
                      'Improves metabolism',
                      'Aids in recovery and detoxification'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* B12 Injections */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left delay-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">B12 Injections</h3>
                  <span className="text-sm font-medium text-gray-500">Rx Required</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">In-Office or Dispensed for Home Use</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Vitamin B12 injections to boost energy, mood, and mental clarity. B12 supports normal metabolic pathways, cognitive clarity, and overall energy levels. Available as single injections in the office or as a take-home prescription for self-administration.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Boosts energy and reduces fatigue',
                      'Supports mood and mental clarity',
                      'Aids in red blood cell production',
                      'Supports metabolism and weight management'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lipo-C Injections */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">Lipo-C Injections</h3>
                  <span className="text-sm font-medium text-gray-500">Rx Required</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">In-Office Injection</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Lipotropic injections containing a precise blend of methionine, inositol, and choline to support fat metabolism, liver health, and weight management. These essential amino acids help transport fatty acids into cellular mitochondria to be utilized for natural energy, making them an excellent complement to our weight loss programs.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Supports fat burning and metabolism',
                      'Promotes liver health and detoxification',
                      'Helps maintain energy during weight loss',
                      'Can be combined with weight loss programs'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CoQ10 Injection */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left delay-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">CoQ-10 Injection</h3>
                  <span className="text-sm font-medium text-gray-500">Rx Required</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">IM or SQ Injection — 20 mg/mL (30 mL vial)</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Coenzyme Q-10 is a vital antioxidant involved in cellular energy production and healthy aging. By supporting mitochondrial function and antioxidant defenses, CoQ-10 helps promote vitality, cardiovascular wellness, and everyday energy levels. Formulated in an MCT (Medium Chain Triglycerides) oil base for easier injections, higher absorption, and less discomfort.
                </p>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Supports cellular energy (ATP) production',
                      'Powerful antioxidant defense',
                      'Promotes cardiovascular wellness',
                      'Supports mitochondrial function',
                      'May enhance vitality and reduce fatigue',
                      'Supports healthy aging at the cellular level'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    <strong className="text-gray-700">Precautions:</strong> Avoid if you have known hypersensitivity to CoQ-10 or any of its components. Use caution if taking anticoagulants, antihypertensive agents, or antidiabetic medications. Requires a consultation and prescription from our medical team.
                  </p>
                </div>
              </div>

              {/* Oxytocin */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-serif font-medium text-black">Oxytocin ("Love Hormone")</h3>
                  <div className="text-right">
                    <div className="text-lg font-semibold" style={{ color: '#D4AF37' }}>$120 – $180/month</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">Available as oral tablets or nasal spray</p>
                <div className="flex gap-6 mb-6">
                  <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 text-center">
                    <p className="text-sm text-gray-600 mb-1">Tablets (troches/lozenges)</p>
                    <p className="text-xl font-bold" style={{ color: '#D4AF37' }}>$120/month</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 text-center">
                    <p className="text-sm text-gray-600 mb-1">Nasal Spray</p>
                    <p className="text-xl font-bold" style={{ color: '#D4AF37' }}>$180/month</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 uppercase tracking-wide mb-3">Benefits</p>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {[
                      'Enhances mood and emotional connection',
                      'Reduces stress and anxiety',
                      'Supports intimacy and bonding',
                      'May improve overall sense of well-being'
                    ].map((b, i) => (
                      <li key={i} className="flex items-start text-gray-700">
                        <span className="mr-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4AF37', marginTop: '7px' }}></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Am I a Candidate section */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <User className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">Am I a Candidate?</h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                Because our wellness treatments utilize naturally occurring amino acid structures and essential metabolic signaling molecules already found within the human body, these programs are widely tolerated. However, because every clinical plan is highly personalized, eligibility is determined on an individual basis. The ideal candidate is looking to support their body's natural composition, enhance metabolic efficiency, and improve long-term vitality. During your in-office consultation, we will conduct a comprehensive health assessment and outline a tailored wellness strategy right for you.
              </p>
            </div>

            {/* FAQ section */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What are peptides and how do they work?', a: 'Peptides are short chains of amino acids that act as precise messengers within the body, instructing cells to balance energy production, regulate blood sugar, support tissue repair, and improve body composition. Because they utilize naturally occurring structures already found in the body, they are typically well tolerated when administered under medical supervision.' },
                  { q: 'How are peptide therapies administered?', a: 'Depending on the protocol, peptides may be administered as nightly subcutaneous injections, daily injections, in-office injections, oral tablets, or nasal sprays. Your provider will determine the most appropriate delivery method based on your specific treatment and wellness goals.' },
                  { q: 'How long until I see results?', a: 'Many patients report noticeable improvements in energy, sleep quality, and mental clarity within the first few weeks. More significant benefits — such as improved body composition, enhanced recovery, and metabolic optimization — typically develop over 2–3 months of consistent therapy. Your provider will monitor your progress and adjust your protocol as needed.' },
                  { q: 'Are peptide therapies safe?', a: 'Yes, when administered under the care of trained healthcare professionals, peptide therapies are widely regarded as safe. Because these formulations utilize naturally occurring amino acid structures and essential metabolic signaling molecules already found within the body, they are typically well tolerated. Every protocol is personalized and supervised by our licensed medical team.' },
                  { q: 'Can I combine different peptide therapies?', a: 'Yes, many patients benefit from combining therapies for a comprehensive approach. For example, NAD+ can be paired with Sermorelin and B12 for synergistic cellular health, metabolic efficiency, and daily vitality. Your provider will recommend the best combination based on your health assessment and goals.' },
                  { q: 'Do I need a consultation before starting?', a: 'Yes, every protocol begins with a comprehensive in-office consultation. Our medical team will evaluate your metabolic health, review your history, and discuss your goals to design a personalized treatment plan. This ensures the safest and most effective protocol for your individual needs.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-16">
              <h3 className="text-3xl font-serif font-light mb-8 text-black">
                Ready to start your peptide therapy?
              </h3>
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </div>
      )}
     {currentPage === 'weight-loss' && (
       <div className="py-24 bg-white">
         <div className="max-w-6xl mx-auto px-8">
           <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Medical Weight Loss</h1>
           <div className="flex justify-center mb-8 reveal delay-100">
             <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
           </div>
           <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
             Embark on a transformative journey toward a healthier you with the help of our skilled medical providers.
           </p>

          {/* Overview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              We understand that achieving and maintaining a healthy weight isn't just about shedding pounds — it's about embracing a holistic approach to wellness that supports your lifestyle. We believe true transformation begins from within. That's why our personalized and comprehensive medical weight loss programs are designed to elevate not only your physical health, but also your confidence and overall well-being. By combining advanced medical expertise with compassionate, one-on-one care, we tailor each plan to fit your unique needs, goals, and everyday life — empowering you to take control of your health journey with lasting results.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
              Why Choose Kalon for Weight Loss?
            </h2>
            <div className="flex justify-center mb-12 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: User, title: 'Personalized Plans for Real Results', desc: 'Every body is different. We tailor your weight loss program to your individual goals, metabolism, lifestyle, and medical history for sustainable, long-term success.' },
                { icon: Stethoscope, title: 'Medically Supervised for Safety', desc: 'Led by experienced medical professionals, our program ensures safe and evidence-based strategies using the latest advancements in medical weight loss.' },
                { icon: Heart, title: 'Comprehensive & Holistic Approach', desc: 'We go beyond the scale — focusing on total wellness. Our plans address nutrition, metabolism, mental well-being, and lifestyle habits.' },
                { icon: Users, title: 'One-on-One Support & Accountability', desc: "You're never alone on your journey. Our team provides ongoing guidance, encouragement, and adjustments to your plan to keep you on track." },
                { icon: Sparkles, title: 'Confidence-Boosting Results', desc: 'As the pounds come off, your confidence soars. Our program helps you look and feel your best — inside and out.' },
                { icon: Check, title: 'Results That Last', desc: "Our goal isn't just weight loss — it's long-term lifestyle change. We equip you with the knowledge and habits to maintain your results for life." }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                      <item.icon className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-medium text-black mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GLP-1 Therapy & Weight Management Options */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
              Weight Management Options
            </h2>
            <div className="flex justify-center mb-12 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              {/* Tirzepatide */}
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal reveal-left hover:shadow-lg hover:border-opacity-60 transition-all cursor-pointer group block"
                style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Syringe className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-black leading-tight">Tirzepatide + Glycine + B12</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  A once-weekly injection combining a dual GLP-1/GIP receptor agonist with Glycine to help maintain muscle mass and B12 to reduce nausea. Compounded vials allow flexible dosing for the lowest effective dose.
                </p>
                <span className="text-sm font-medium group-hover:underline" style={{ color: '#D4AF37' }}>Learn more &rarr;</span>
              </a>
              {/* Semaglutide */}
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal reveal-right delay-100 hover:shadow-lg hover:border-opacity-60 transition-all cursor-pointer group block"
                style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Syringe className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-black leading-tight">Semaglutide + Glycine + B12</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  A once-weekly GLP-1 receptor agonist paired with Glycine for muscle preservation and B12 to help prevent nausea. Compounded for flexible, personalized dosing that minimizes side effects.
                </p>
                <span className="text-sm font-medium group-hover:underline" style={{ color: '#D4AF37' }}>Learn more &rarr;</span>
              </a>
              {/* Weight Management Kit */}
              <a
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal reveal-scale delay-200 hover:shadow-lg hover:border-opacity-60 transition-all cursor-pointer group block"
                style={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Droplets className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium text-black leading-tight">Weight Management Kit</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm mb-3">
                  A physician-supervised kit designed to boost metabolism and enhance muscle growth by optimizing your body's natural processes for weight loss and fitness. Contains premium components including Sermorelin and Naltrexone, which target fat reduction and appetite control for comprehensive weight management support.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  Includes: Sermorelin, Oral Naltrexone, and Lipo-Trim SL (oral spray).
                </p>
                <span className="text-sm font-medium group-hover:underline" style={{ color: '#D4AF37' }}>Learn more &rarr;</span>
              </a>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto reveal">
              <p className="text-gray-700 leading-relaxed text-center">
                Added <strong>B12</strong> to help prevent nausea/vomiting, <strong>Glycine</strong> to help maintain muscle mass, and we use compounded vials that allow flexible dosing so patients can achieve the lowest effective dose while minimizing side effects and improving outcomes.
              </p>
            </div>
          </div>

          {/* About Medical Weight Loss / GLP-1 Science */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
              About Medical Weight Loss
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#D4AF37' }}>
                    <Brain className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-black mb-2">Understanding the Science</h3>
                    <p className="text-gray-700 leading-relaxed">
                      GLP-1 receptor agonists replicate the effects of GLP-1, a naturally occurring hormone that helps regulate blood sugar by promoting insulin release and reducing glucagon production. This balance helps control appetite and supports effective, healthy weight loss.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#D4AF37' }}>
                    <Syringe className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-black mb-2">Dosing & Administration</h3>
                    <p className="text-gray-700 leading-relaxed">
                      These medications are administered via subcutaneous (beneath the skin) injection. Your specific dosage protocol is personalized by your licensed medical provider based on your clinical assessment and ongoing progress. Following thorough training and detailed instruction from your care team, your weekly injections can be safely and conveniently self-administered in the comfort of your own home.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 reveal">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#D4AF37' }}>
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium text-black mb-2">Precautions</h3>
                    <p className="text-gray-700 leading-relaxed">
                      GLP-1 medications are not suitable for individuals with a personal or family history of medullary thyroid carcinoma or multiple endocrine neoplasia syndrome type 2. They should also be used cautiously if you have a history of pancreatitis or diabetic retinopathy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Weight Loss Injections */}
          <div className="mb-16">
            <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
              Weight Loss Injections
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-left">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-medium text-black">B12 Injection</h3>
                  <span className="text-sm font-medium text-gray-500">Rx Required</span>
                </div>
                <p className="text-gray-700 leading-relaxed">Boosts energy, mood, and mental clarity. Supports normal metabolic pathways and overall energy levels during your weight loss journey.</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-right delay-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif font-medium text-black">Lipo-C Injections</h3>
                  <span className="text-sm font-medium text-gray-500">Rx Required</span>
                </div>
                <p className="text-gray-700 leading-relaxed">A precise blend of methionine, inositol, and choline to support fat metabolism, liver health, and weight management.</p>
              </div>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                <ClipboardList className="w-8 h-8 text-black" />
              </div>
            </div>
            <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">What to Expect from Your Weight Loss Journey</h2>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              We start your journey with a thorough consultation to learn about your goals, particular needs, and medical history. From there, we design a personalized weight loss plan that may include nutrition counseling, lifestyle modifications, supplement support, and clinical monitoring. Regular check-ins ensure that your progress stays on track and that any necessary adjustments are made to support your continued success. Our staff is dedicated to supporting you at every turn, providing compassionate care, knowledgeable guidance, and customized solutions.
            </p>
          </div>

          {/* FAQ */}
          <div className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
              FAQ's
            </h2>
            <div className="space-y-4">
              {[
                { q: 'How is medical weight loss different from traditional dieting?', a: 'Medical weight loss goes beyond quick weight loss to address your general health and body composition. It uses evidence-based strategies, clinical oversight, and customized plans to create sustainable and safe results.' },
                { q: 'Who is a good candidate for a medical weight loss program?', a: 'Anyone struggling with weight management, slow metabolism, or related health concerns may benefit from a medically supervised program. During your appointment, our providers will evaluate your needs and choose the best course of action for you.' },
                { q: 'Will I receive a customized weight loss plan?', a: "Each client's strategy is created based on their objectives, medical history, and lifestyle choices. We focus on creating a realistic, effective, and sustainable strategy for long-term success." },
                { q: 'How quickly will I see results with medical weight loss?', a: 'A number of variables, including metabolism, program adherence, and general health, affect the results. Within the first few weeks of beginning, many individuals report feeling more energized and losing some weight.' },
                { q: 'Is the program focused only on weight loss, or does it address other health concerns?', a: 'Our programs are designed to support comprehensive health, including improving energy, metabolism, hormonal balance, and overall wellness. We want to optimize the larger picture, and weight loss is only one aspect.' },
                { q: 'How do I get started with a medical weight loss program?', a: 'Getting started is easy: simply schedule a consultation with our team. We will discuss your objectives, develop a customized strategy, and start you on your path to long-term fitness.' }
              ].map((faq, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                  <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="bg-gray-50 border-l-4 p-6 rounded-r-lg" style={{ borderColor: '#D4AF37' }}>
              <p className="text-sm text-gray-500 leading-relaxed italic">
                <strong>Clinical & Regulatory Disclaimer:</strong> Kalon provides professional medical evaluations, clinical consultations, and health monitoring. Wellness and weight-management programs are subject to medical provider approval following a comprehensive health assessment. Any prescriptions issued by our providers are filled and dispensed independently by a licensed, third-party compounding pharmacy. Individual results may vary based on personal health history, adherence to clinical protocols, and lifestyle factors.
              </p>
            </div>
          </div>

           <div className="text-center">
             <h3 className="text-3xl font-serif font-light mb-8 text-black">
               Ready to start your weight loss journey?
             </h3>
             <a
               href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
               style={{ backgroundColor: '#D4AF37' }}
             >
               Book Weight Loss Consultation
             </a>
           </div>
         </div>
       </div>
      )}
      {currentPage === 'insurances' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Insurance Plans We Accept</h1>

            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-xl text-gray-700 leading-relaxed">
                  We accept most major insurance plans. Click on a provider below to see specific plans.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    name: 'Cigna',
                    plans: ['Cigna HMO', 'Cigna PPO', 'Cigna Open Access', 'Cigna Supplemental', 'All Cigna plans accepted'],
                    color: '#D4AF37'
                  },
                  {
                    name: 'Medicare',
                    plans: ['Medicare Part B', 'Medicare Supplemental Plans (all supplements)', 'Medicare Advantage Plans'],
                    color: '#D4AF37'
                  },
                  {
                    name: 'Oscar',
                    plans: ['Oscar PPO', 'Oscar HMO', 'Oscar EPO', 'Oscar POS Medicare Advantage', 'All Oscar plans accepted'],
                    color: '#D4AF37'
                  },
                  {
                    name: 'United Healthcare',
                    plans: ['United Healthcare Dual Complete', 'United Healthcare Community Plans', 'Majority of United Healthcare PPO plans'],
                    color: '#D4AF37'
                  },
                  {
                    name: 'First Health',
                    plans: ['First Health PPO', 'All First Health plans accepted'],
                    color: '#D4AF37'
                  },
                  {
                    name: 'MultiPlan',
                    plans: ['MultiPlan/Claritey'],
                    color: '#D4AF37'
                  }
                ].map((company, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedInsuranceCompany(company.name)}
                    className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg hover:border-opacity-70 hover:shadow-lg transition-all cursor-pointer group text-center"
                    style={{ borderColor: company.color }}
                  >
                    <div className="text-2xl font-serif font-medium mb-3" style={{ color: company.color }}>
                      {company.name}
                    </div>
                    <div className="text-gray-600 text-sm mb-3">
                      {company.plans.length} {company.plans.length === 1 ? 'Plan' : 'Plans'} Available
                    </div>
                    <div className="flex items-center justify-center text-gray-500 group-hover:text-black transition-colors">
                      <span className="text-sm mr-2">View Plans</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg mb-8">
                <h2 className="text-2xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                  Important Insurance Information
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong>Verification Required:</strong> Please contact your insurance provider to verify coverage
                    for primary care and any specific treatments you may need.
                  </p>
                  <p>
                    <strong>Prior Authorization:</strong> Some treatments may require prior authorization from your
                    insurance company. We will help coordinate this process when needed.
                  </p>
                  <p>
                    <strong>Self-Pay Options:</strong> For patients without insurance or those seeking treatments
                    not covered by insurance, we offer competitive self-pay rates and flexible payment plans.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-serif font-light mb-8 text-black">
                  Questions about your coverage?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                    style={{ backgroundColor: '#D4AF37' }}
                  >
                    Schedule Consultation
                  </a>
                  <button
                    className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                    style={{ borderColor: '#D4AF37' }}
                    onClick={() => navigateTo('contact')}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>

          {selectedInsuranceCompany && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedInsuranceCompany(null)}
            >
              <div
                className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
                  <h2 className="text-3xl font-serif font-medium" style={{ color: '#D4AF37' }}>
                    {selectedInsuranceCompany} Plans
                  </h2>
                  <button
                    onClick={() => setSelectedInsuranceCompany(null)}
                    className="text-gray-500 hover:text-black transition-colors p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="space-y-4">
                    {[
                      {
                        name: 'Cigna',
                        plans: ['Cigna HMO', 'Cigna PPO', 'Cigna Open Access', 'Cigna Supplemental', 'All Cigna plans accepted']
                      },
                      {
                        name: 'Medicare',
                        plans: ['Medicare Part B', 'Medicare Supplemental Plans (all supplements)', 'Medicare Advantage Plans']
                      },
                      {
                        name: 'Oscar',
                        plans: ['Oscar PPO', 'Oscar HMO', 'Oscar EPO', 'Oscar POS Medicare Advantage', 'All Oscar plans accepted']
                      },
                      {
                        name: 'United Healthcare',
                        plans: ['United Healthcare Dual Complete', 'United Healthcare Community Plans', 'Majority of United Healthcare PPO plans']
                      },
                      {
                        name: 'First Health',
                        plans: ['First Health PPO', 'All First Health plans accepted']
                      },
                      {
                        name: 'MultiPlan',
                        plans: ['MultiPlan/Claritey']
                      }
                    ].find(c => c.name === selectedInsuranceCompany)?.plans.map((plan, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 p-5 rounded-lg flex items-center">
                        <div className="w-3 h-3 rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span className="text-lg text-gray-800 font-medium">{plan}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <p className="text-gray-600 text-center mb-6">
                      Please verify your specific plan coverage by contacting our office or your insurance provider.
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedInsuranceCompany(null)}
                        className="px-8 py-3 rounded-full font-medium text-black transition-all hover:opacity-90"
                        style={{ backgroundColor: '#D4AF37' }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {currentPage === 'contact' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Contact Us</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              We're here to help you on your wellness journey. Reach out to schedule an appointment, ask a question, or learn more about our services.
            </p>

            {/* Contact Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-left">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#D4AF37' }}>
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-serif font-medium text-black mb-3">Phone & Fax</h3>
                <p className="text-gray-700 mb-1">(386) 347-5514</p>
                <p className="text-gray-500 text-sm">Text messages welcome</p>
                <p className="text-gray-500 text-sm">Fax: (949) 864-3080</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-scale delay-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#D4AF37' }}>
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-serif font-medium text-black mb-3">Visit Us</h3>
                <p className="text-gray-700 mb-1">598 Sterthaus Dr</p>
                <p className="text-gray-500 text-sm">Ormond Beach, FL</p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center reveal reveal-right delay-200">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#D4AF37' }}>
                  <MessageSquare className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-serif font-medium text-black mb-3">Text Us</h3>
                <p className="text-gray-700 mb-1">(386) 347-5514</p>
                <p className="text-gray-500 text-sm">Text messages welcome</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 max-w-3xl mx-auto reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Clock className="w-6 h-6 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Office Hours</h2>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-3 max-w-2xl mx-auto">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Monday</span>
                  <span className="text-gray-600">9 AM – 5 PM in office</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Tuesday</span>
                  <span className="text-gray-600">Telehealth 9 AM – 5 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Wednesday</span>
                  <span className="text-gray-600">Telehealth 9 AM – 5 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Thursday</span>
                  <span className="text-gray-600">Telehealth 9 AM – 5 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Friday</span>
                  <span className="text-gray-600">9 AM – 12:30 PM in office</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="font-medium text-gray-800">Saturday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Sunday</span>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-8 text-black">Ready to book your visit?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book an Appointment
                </a>
                <a
                  href="tel:+13863475514"
                  className="inline-block border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                >
                  Call (386) 347-5514
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'screenings' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Health Screenings</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Prevention is the most powerful tool in medicine. We offer comprehensive, age-appropriate health screenings for adults 21 and older — from young adults entering their prime to seniors managing longevity. Early detection saves lives, and our personalized screening protocols are designed to catch concerns before they become problems.
            </p>

            {/* Why Screenings Matter */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                  <Stethoscope className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">Why Screenings Matter</h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                Many serious health conditions — including high blood pressure, diabetes, high cholesterol, and several cancers — develop silently, without any symptoms, over months or even years. Regular screenings allow us to detect these conditions in their earliest, most treatable stages. For our patients ranging from young adults to seniors in their 90s and beyond, a personalized screening schedule is the cornerstone of preventive care and long-term wellness.
              </p>
            </div>

            {/* Age-based screening tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
              {[
                { id: 'screen-all', label: 'All Adults' },
                { id: 'screen-18-20', label: 'Ages 18-20' },
                { id: 'screen-20s-30s', label: 'Ages 21-39' },
                { id: 'screen-40s-50s', label: 'Ages 40-64' },
                { id: 'screen-65-plus', label: 'Ages 65+' },
                { id: 'screen-women', label: "Women's Health" },
                { id: 'screen-men', label: "Men's Health" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    const el = document.getElementById(tab.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-600 hover:text-black border-2 border-transparent hover:border-gray-200 transition-all"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* All Adults Section */}
            <div id="screen-all" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Screenings for All Adults (18+)</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                These foundational screenings are recommended for every adult ages 18 and older, regardless of gender. Your provider will personalize frequency based on your risk factors and family history.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Heart, title: 'Blood Pressure Screening', desc: 'Checked at every visit. High blood pressure often has no symptoms but significantly increases risk of heart attack, stroke, and kidney disease. Recommended at least annually for all adults.', freq: 'Every visit / Annually' },
                  { icon: Activity, title: 'Blood Glucose & A1C', desc: 'Screens for prediabetes and Type 2 diabetes. Recommended for adults 35-70 with overweight/obesity, or earlier with risk factors such as family history or gestational diabetes.', freq: 'Starting age 35, or earlier if at risk' },
                  { icon: Microscope, title: 'Cholesterol Panel (Lipid Panel)', desc: 'Measures total cholesterol, LDL, HDL, and triglycerides. High cholesterol is a major risk factor for heart disease and stroke. Recommended every 4-6 years for normal risk, more frequently with risk factors.', freq: 'Every 4-6 years, or more often if at risk' },
                  { icon: Shield, title: 'BMI & Weight Assessment', desc: 'Body Mass Index screening to identify overweight and obesity, which are linked to diabetes, heart disease, joint problems, and certain cancers. Includes waist circumference measurement when appropriate.', freq: 'Annually' },
                  { icon: Brain, title: 'Depression & Anxiety Screening', desc: 'Mental health is just as important as physical health. We screen all adults for depression and anxiety using validated questionnaires during annual visits. Early intervention leads to better outcomes.', freq: 'Annually' },
                  { icon: ClipboardList, title: 'Comprehensive Metabolic Panel', desc: 'Blood test evaluating kidney function, liver function, electrolyte balance, and blood sugar. Provides a broad picture of your overall metabolic health and organ function.', freq: 'Annually or as recommended' },
                  { icon: User, title: 'Tobacco, Alcohol & Substance Use Screening', desc: 'We assess tobacco, alcohol, and substance use at every annual visit and provide counseling, cessation resources, and treatment referrals when needed.', freq: 'Annually' },
                  { icon: Sun, title: 'Skin Cancer Screening', desc: 'Full-body skin examination to identify suspicious moles, lesions, or changes. Particularly important for patients with significant sun exposure, fair skin, or family history of skin cancer.', freq: 'Annually, or more often if at high risk' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ages 18-20 Section */}
            <div id="screen-18-20" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Early Adulthood (Ages 18-20)</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Turning 18 is the transition into adult primary care. This is the perfect time to establish a relationship with a provider, build a health baseline, and address the unique needs of early adulthood — from college physicals to mental health support.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: User, title: 'Establish Care & Baseline Physical', desc: 'Your first adult primary care visit establishes a health baseline, reviews your pediatric and family history, and creates a personalized wellness plan. Includes vital signs, BMI, and a comprehensive physical exam.', freq: 'Initial visit, then annually' },
                  { icon: Brain, title: 'Depression & Anxiety Screening', desc: 'Early adulthood is a critical time for mental health. We screen for depression, anxiety, and stress using validated tools. Early intervention during this transitional life stage can prevent long-term struggles.', freq: 'Annually' },
                  { icon: Shield, title: 'STI / STD Screening', desc: 'Screening for chlamydia, gonorrhea, HIV, syphilis, and other sexually transmitted infections. Recommended annually for sexually active young adults, or more frequently with new partners.', freq: 'Annually, or based on risk' },
                  { icon: Shield, title: 'HIV Screening', desc: 'One-time screening recommended for everyone ages 15-65. If at ongoing risk, repeat screening is recommended. Early detection allows for effective treatment and prevention.', freq: 'One-time, then as needed' },
                  { icon: Heart, title: 'Blood Pressure & Cardiovascular Baseline', desc: 'Establishing a blood pressure baseline in early adulthood helps identify risk early. Even young adults can have hypertension, especially with family history or certain lifestyle factors.', freq: 'Annually' },
                  { icon: ClipboardList, title: 'Immunization Review & Updates', desc: 'Review and update key immunizations including HPV (if not completed), meningococcal (especially important for college students), Tdap, hepatitis B, and annual influenza vaccine. We ensure you are protected as you enter adulthood.', freq: 'At initial visit, then as needed' },
                  { icon: User, title: 'Tobacco, Alcohol & Substance Use Screening', desc: 'We provide a safe, judgment-free space to discuss tobacco, alcohol, vaping, and substance use. Counseling and cessation resources are available for those who want them.', freq: 'Annually' },
                  { icon: Activity, title: 'Sports, College & Employment Physicals', desc: 'Comprehensive physical examinations required for college enrollment, athletic participation, ROTC/military, and employment. We complete all required forms and address any health concerns identified during the exam.', freq: 'As needed' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ages 21-39 Section */}
            <div id="screen-20s-30s" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Young Adults (Ages 21-39)</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Your 20s and 30s are the foundation decades. Establishing a screening baseline now sets the stage for a lifetime of wellness.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Heart, title: 'Cervical Cancer Screening (Pap Smear)', desc: 'Pap smear every 3 years for women ages 21-29. Starting at 30, may switch to Pap + HPV co-testing every 5 years. One of the most effective cancer screenings available.', freq: 'Every 3 years (ages 21-29)' },
                  { icon: Shield, title: 'STI / STD Screening', desc: 'Screening for chlamydia, gonorrhea, HIV, and syphilis for sexually active adults. Recommended annually for sexually active women under 25, and for anyone at increased risk regardless of age.', freq: 'Annually or based on risk' },
                  { icon: Brain, title: 'HIV Screening', desc: 'One-time screening for all adults ages 15-65, with repeat screenings for those at ongoing risk. Early detection allows for effective treatment and prevention of transmission.', freq: 'One-time, then as needed' },
                  { icon: Activity, title: 'Cardiovascular Risk Assessment', desc: 'Baseline cholesterol and blood pressure checks in your 20s establish your risk profile. If family history of early heart disease is present, more frequent monitoring may be recommended.', freq: 'Baseline in 20s, then every 4-6 years' },
                  { icon: User, title: 'Comprehensive Annual Physical', desc: 'Even healthy young adults benefit from an annual exam to establish care, review family history, update immunizations, and discuss lifestyle, nutrition, and preventive health goals.', freq: 'Annually' },
                  { icon: Shield, title: 'Hepatitis C Screening', desc: 'One-time screening recommended for all adults ages 18-79. Hepatitis C often has no symptoms for decades but can cause serious liver damage if untreated.', freq: 'One-time (ages 18-79)' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ages 40-64 Section */}
            <div id="screen-40s-50s" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Midlife Adults (Ages 40-64)</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Midlife is when preventive screening becomes most critical. This is the decade range where many conditions — from colorectal cancer to cardiovascular disease — become more common and most benefit from early detection.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Microscope, title: 'Colorectal Cancer Screening', desc: 'Beginning at age 45 for all adults. Options include colonoscopy every 10 years, or annual fecal immunochemical test (FIT). Earlier screening recommended for those with family history of colorectal cancer or polyps.', freq: 'Starting age 45' },
                  { icon: Heart, title: 'Cardiovascular Risk Assessment', desc: 'Comprehensive assessment including lipid panel, blood pressure, and 10-year ASCVD risk calculation. For adults 40-75, this guides decisions about statin therapy and lifestyle interventions.', freq: 'Annually' },
                  { icon: Shield, title: 'Type 2 Diabetes Screening', desc: 'Screening for adults 35-70 who are overweight or obese. Includes fasting blood glucose and A1C. Early detection of prediabetes allows for lifestyle intervention before progression to diabetes.', freq: 'Every 3 years, or more often if at risk' },
                  { icon: Eye, title: 'Comprehensive Eye Exam', desc: 'Vision screening with dilation to detect glaucoma, macular degeneration, and diabetic retinopathy. Recommended starting at age 40, or earlier with diabetes or family history of eye disease.', freq: 'Every 2-4 years (ages 40-54)' },
                  { icon: Activity, title: 'Bone Density Screening (Women)', desc: 'DEXA scan for women starting at age 65, or earlier if risk factors for osteoporosis are present. Post-menopausal women should discuss bone health with their provider.', freq: 'Starting age 65, or earlier if at risk' },
                  { icon: User, title: 'Abdominal Aortic Aneurysm Screening', desc: 'One-time ultrasound screening for men ages 65-75 who have ever smoked. This painless scan detects dangerous enlargement of the aorta before it becomes life-threatening.', freq: 'One-time (men 65-75 who smoked)' },
                  { icon: Brain, title: 'Cognitive Health Baseline', desc: 'For adults in their 60s, establishing a cognitive baseline allows us to detect changes early. We use validated screening tools during annual visits for adults 65 and older.', freq: 'Annually starting age 65' },
                  { icon: Shield, title: 'Lung Cancer Screening', desc: 'Annual low-dose CT scan for adults 50-80 who currently smoke or quit within the past 15 years and have a 20+ pack-year smoking history. Early detection dramatically improves survival rates.', freq: 'Annually (if eligible)' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ages 65+ Section */}
            <div id="screen-65-plus" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Seniors (Ages 65+)</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                For our senior patients — whether 65 or 100 — screenings are tailored to maintain independence, quality of life, and longevity. We adjust our approach based on your overall health, goals, and care preferences.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Activity, title: 'Bone Density Screening (DEXA)', desc: 'Recommended for all women 65+ and men 70+ (or earlier with risk factors). Osteoporosis is silent but treatable — early detection prevents devastating fractures.', freq: 'Every 2 years, or as recommended' },
                  { icon: Brain, title: 'Cognitive Function Screening', desc: 'Annual screening for memory, orientation, and executive function using validated tools. Early detection of cognitive changes allows for planning, treatment, and support services.', freq: 'Annually' },
                  { icon: Eye, title: 'Comprehensive Vision Exam', desc: 'Annual dilated eye exam to screen for glaucoma, macular degeneration, cataracts, and diabetic retinopathy. Vision changes can also increase fall risk in older adults.', freq: 'Annually' },
                  { icon: Heart, title: 'Cardiovascular Monitoring', desc: 'More frequent blood pressure monitoring, lipid panels, and cardiac risk assessment. We also screen for atrial fibrillation, which becomes more common with age and increases stroke risk.', freq: 'Annually, or more frequently' },
                  { icon: User, title: 'Fall Risk Assessment', desc: 'Evaluation of balance, strength, medications, and home environment to identify and reduce fall risk. Falls are a leading cause of injury in older adults but are largely preventable.', freq: 'Annually' },
                  { icon: Shield, title: 'Medication Review', desc: 'Comprehensive review of all medications, supplements, and potential interactions. As we age, our bodies process medications differently, and accumulation of prescriptions (polypharmacy) can cause problems.', freq: 'Every visit' },
                  { icon: Brain, title: 'Depression & Social Isolation Screening', desc: 'Depression is not a normal part of aging. We screen for depression, anxiety, and social isolation, which can significantly impact health outcomes in older adults.', freq: 'Annually' },
                  { icon: ClipboardList, title: 'Functional Assessment', desc: 'Evaluation of your ability to perform daily activities (dressing, bathing, cooking, managing medications) to identify areas where support may be helpful and maintain independence.', freq: 'Annually' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Women's Health Screenings Section */}
            <div id="screen-women" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Women's Health Screenings</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Comprehensive women's health screenings designed for every stage of life — from young adulthood through post-menopause.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Heart, title: 'Pap Smear & Cervical Cancer Screening', desc: 'Pap smear every 3 years (ages 21-29), or Pap + HPV co-testing every 5 years (ages 30-65). May discontinue after 65 if prior results were adequate.', freq: 'Every 3-5 years (ages 21-65)' },
                  { icon: Heart, title: 'HPV Testing', desc: 'High-risk HPV testing alongside Pap smears for women 30+. Identifies presence of high-risk HPV strains that may lead to cervical cancer, allowing for earlier intervention.', freq: 'With Pap co-testing (ages 30+)' },
                  { icon: Shield, title: 'Clinical Breast Exam', desc: 'Physical breast examination performed by your provider to detect lumps, changes, or abnormalities. Recommended every 1-3 years for women in their 20s and 30s, annually thereafter.', freq: 'Every 1-3 years, then annually' },
                  { icon: Microscope, title: 'Mammography', desc: 'Screening mammogram every 2 years for women 40-74, or annually for those at higher risk. Women with family history of breast cancer may begin earlier and undergo additional imaging such as breast MRI.', freq: 'Every 2 years (ages 40-74)' },
                  { icon: Activity, title: 'Bone Density (DEXA) Scan', desc: 'Screening for osteoporosis starting at age 65 for all women, or earlier if post-menopausal with risk factors. Essential for preventing fractures that can significantly impact quality of life.', freq: 'Starting age 65, or earlier if at risk' },
                  { icon: Shield, title: 'Osteoporosis Risk Assessment', desc: 'Evaluation of fracture risk using tools like FRAX, which considers age, weight, family history, smoking, and other factors to guide bone health management decisions.', freq: 'As recommended' },
                  { icon: User, title: 'Pelvic Exam', desc: "Comprehensive pelvic examination as part of women's health care. Frequency depends on your health history, symptoms, and provider recommendations.", freq: 'As recommended by provider' },
                  { icon: Brain, title: 'Perimenopause & Menopause Assessment', desc: 'Evaluation of hormonal changes, symptoms, and bone health during the menopausal transition. We discuss treatment options, lifestyle modifications, and long-term health strategies.', freq: 'As needed during transition' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Men's Health Screenings Section */}
            <div id="screen-men" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Men's Health Screenings</h2>
              <div className="flex justify-center mb-10 reveal delay-100">
                <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto reveal delay-200">
                Men's health screenings focus on prevention and early detection of conditions that disproportionately affect men, including cardiovascular disease, prostate issues, and certain cancers.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {[
                  { icon: Heart, title: 'Prostate Cancer Discussion (PSA)', desc: 'Shared decision-making conversation about PSA screening starting at age 55 for average-risk men, or age 40-45 for African American men and those with family history. We discuss the benefits and limitations of testing.', freq: 'Starting age 55 (shared decision)' },
                  { icon: User, title: 'Abdominal Aortic Aneurysm Screening', desc: 'One-time ultrasound for men ages 65-75 who have ever smoked. This quick, painless scan detects dangerous enlargement of the aorta — a condition that is often silent until rupture.', freq: 'One-time (men 65-75 who smoked)' },
                  { icon: Activity, title: 'Cardiovascular Risk Assessment', desc: 'Men are at higher risk for cardiovascular disease. We assess blood pressure, cholesterol, and calculate your 10-year heart attack/stroke risk to guide prevention and treatment decisions.', freq: 'Annually' },
                  { icon: Shield, title: 'Testosterone Level Testing', desc: 'Screening for low testosterone when symptoms are present (fatigue, low libido, muscle loss, mood changes). We test total and free testosterone levels and discuss treatment options if indicated.', freq: 'As indicated by symptoms' },
                  { icon: Microscope, title: 'Colorectal Cancer Screening', desc: 'Starting at age 45 for all adults. Men have a slightly higher risk of colorectal cancer than women. Options include colonoscopy every 10 years or annual FIT testing.', freq: 'Starting age 45' },
                  { icon: Brain, title: 'Depression Screening', desc: "Men are often underdiagnosed for depression, as symptoms may present differently (irritability, anger, risk-taking). We screen all male patients annually using validated tools.", freq: 'Annually' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-6 rounded-lg reveal reveal-scale" style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                        <item.icon className="w-5 h-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-serif font-medium text-black mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{item.desc}</p>
                        <p className="text-xs font-medium" style={{ color: '#D4AF37' }}>{item.freq}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lab Partnership Note */}
            <div className="bg-gray-50 border-l-4 p-6 rounded-r-lg max-w-3xl mx-auto mb-16 reveal" style={{ borderColor: '#D4AF37' }}>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Note on Lab Work:</strong> We do not have on-site laboratory services. All blood work and specialized tests are ordered by your provider and performed at an external laboratory (such as Quest Diagnostics or LabCorp). Your provider reviews all results with you at a follow-up visit or via telehealth and incorporates them into your personalized care plan.
              </p>
            </div>

            {/* FAQ */}
            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>Screening FAQ's</h2>
              <div className="space-y-4">
                {[
                  { q: 'How do I know which screenings I need?', a: 'Your provider will review your age, gender, family history, lifestyle, and personal health history during your annual visit to determine which screenings are right for you. Screening recommendations are personalized — what is right for one person may not be necessary for another.' },
                  { q: 'Are screenings covered by insurance?', a: 'Most preventive screenings recommended by the USPSTF (U.S. Preventive Services Task Force) are covered by insurance at no cost to you, as required by the Affordable Care Act. However, some screenings may require prior authorization or have specific criteria. We recommend verifying coverage with your insurance provider. Self-pay options are also available.' },
                  { q: 'I feel perfectly healthy. Do I still need screenings?', a: 'Absolutely. Many serious conditions — high blood pressure, high cholesterol, prediabetes, and early-stage cancers — develop silently without any symptoms. Screenings are designed to catch these conditions before you feel anything, when they are most treatable. Prevention is always better than treatment.' },
                  { q: 'Do you offer Pap smears in the office?', a: 'Yes, we perform Pap smears, pelvic exams, and clinical breast exams in our office as part of our comprehensive women\'s health services. We follow current USPSTF guidelines and personalize screening frequency based on your age and health history.' },
                  { q: 'I am 75 years old. Are screenings still recommended?', a: 'Screening recommendations are individualized for older adults. Some screenings, like colonoscopy, may continue until age 75-80 depending on your overall health and life expectancy. Others, like bone density and cognitive screening, become even more important. Your provider will discuss which screenings are appropriate for your situation and goals.' },
                  { q: 'How often should I get an annual physical?', a: 'We recommend an annual physical for all adults, regardless of age. This yearly visit is the foundation of your preventive care — it allows us to update your health history, review medications, perform screenings, discuss lifestyle, and address any concerns before they become problems.' },
                  { q: 'What if my screening results are abnormal?', a: 'If a screening result is abnormal, your provider will discuss the findings with you, order any necessary follow-up testing, and develop a treatment or monitoring plan. We coordinate referrals to specialists when needed and remain your central point of contact for all your care.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">Your Health Deserves Proactive Care</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Schedule your comprehensive screening visit today. Early detection is the most powerful tool we have for keeping you healthy at every age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Screening Visit
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('primary-care')}
                >
                  Back to Primary Care
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'womens-health' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
              Bio-Identical Hormones & Women's Health
            </h1>
            <div className="flex justify-center mb-12 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center mb-16 reveal">
                <p className="text-xl text-gray-700 leading-relaxed">
                  As women age, hormone levels naturally change, affecting women's health significantly. Hormones regulate growth, stress response,
                  sexual function, and overall women's health and well-being. When production declines, hormonal imbalances can cause
                  both physical and psychological effects that impact women's health. Our women's health services address hormonal changes comprehensively.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg reveal reveal-scale">
                <h2 className="text-3xl font-serif font-medium mb-8 text-center" style={{ color: '#D4AF37' }}>
                  Key Hormones in Women's Health & Hormone Therapy
                </h2>
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                  Our women's health services focus on bio-identical hormone therapy to support women's health at every stage. We provide comprehensive women's health care including hormone replacement for optimal women's health.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Estrogen',
                    'Progesterone', 
                    'Testosterone',
                    'Pregnenolone',
                    'DHEA',
                    'DHEA 7-Keto'
                  ].map((hormone, index) => (
                    <div key={index} className={`flex items-center bg-white p-4 rounded-lg border border-gray-100 reveal delay-${index * 100}`}>
                      <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: '#D4AF37' }}></div>
                      <span className="font-medium text-gray-800">{hormone}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-medium mb-8 text-center" style={{ color: '#D4AF37' }}>
                  Stages of Hormonal Change
                </h2>
                <div className="space-y-8">
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      1. Pre-menopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The years before a woman's first menstrual cycle, representing normal reproductive function.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-100">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      2. Perimenopause & Women's Health Support
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The transitional stage in women's health, usually between ages 35–50, lasting 2–10 years before menstruation stops.
                      Women's health symptoms may include hot flashes, mood swings, sleep changes, and irregular cycles. Our women's health services provide hormone therapy support during this critical women's health transition.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left delay-200">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      3. Menopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Marks the natural end of reproduction. Estrogen and progesterone decline, the ovaries stop
                      releasing eggs, and pregnancy is no longer possible.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-300">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      4. Post-menopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Begins after 12 consecutive months without a menstrual period. The body adjusts to lower hormone levels.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-16">
                <h3 className="text-3xl font-serif font-light mb-8 text-black">
                  Ready to discuss your hormonal health and women's health needs?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Our comprehensive women's health services include hormone therapy, women's health consultations, and personalized women's health treatment plans. Experience expert women's health care focused on your unique hormonal health needs.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Schedule Women's Health Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'reviews' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Reviews</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-12 reveal delay-200">What our patients are saying.</p>

            {/* Google Rating Summary */}
            <div className="max-w-2xl mx-auto mb-16 reveal">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-2xl font-serif font-medium text-black">Google Reviews</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl font-serif font-light text-black">4.9</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current" style={{ color: '#D4AF37' }} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">Based on 119 Google reviews</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Zoya",
                  rating: 5,
                  review: "Dr. Nargiza Ayupova is incredible. Not only has she taken great care of my health, but also she is lovely to speak with at every appointment. It's rare to find a doctor that combines such personal touches and care for a patient as a person with outstanding quality of medical care. I highly recommend becoming her patient!",
                  service: "Google Review"
                },
                {
                  name: "Elena R.",
                  rating: 5,
                  review: "This has been the most positive experience I've ever had with a doctor. I am truly grateful for the kindness, compassion, and professionalism I received. The doctor always takes the time to listen carefully, explains everything clearly, and orders the necessary tests to make sure nothing is overlooked. Every visit is filled with warmth, care, and genuine concern for patients.",
                  service: "Google Review \u2022 July 2026"
                },
                {
                  name: "Valeriia K.",
                  rating: 5,
                  review: "Dr. Nargiza is compassionate, thorough, and truly listens to her patients. I always feel well cared for and never rushed. Highly recommend!",
                  service: "Google Review \u2022 August 2026"
                },
                {
                  name: "Shakhodat T.",
                  rating: 5,
                  review: "She's a very good doctor, I recommend to everyone.",
                  service: "Google Review \u2022 August 2026"
                },
                {
                  name: "Verified Patient",
                  rating: 5,
                  review: "I cannot say enough good things about Dr. Nargiza Ayupova. She is truly amazing, incredibly considerate, and deeply understanding. Every time I have an appointment, she is attentive and patient, never making me feel rushed. She always takes her time to ensure I am completely taken care of and heard. It is rare to find a physician who combines this level of genuine care with exceptional medical attentiveness.",
                  service: "Google Review"
                },
                {
                  name: "Verified Patient",
                  rating: 5,
                  review: "Both my wife and I were deeply impressed by her attentive interviews and careful listening. Dr. Ayupova's expertise allowed her to identify concerns we hadn't even thought to mention. We feel confident we are in the best hands.",
                  service: "Google Review"
                }
              ].map((review, index) => (
                <div key={index} className={`bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-scale delay-${(index % 3) * 100 + 100}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#D4AF37' }} />
                      ))}
                    </div>
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{review.review}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-semibold text-black">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <h3 className="text-3xl font-serif font-light mb-8 text-black">
                Ready to experience exceptional care?
              </h3>
              <a 
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Book Your Visit
              </a>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'mens-health' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>
              Men's Hormonal Health & Performance Solutions
            </h1>
            <div className="flex justify-center mb-12 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center mb-16">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  As men age, their bodies naturally undergo changes affecting men's health. One of the most significant men's health concerns is the decline in
                  hormones such as testosterone, which can affect energy, strength, mood, and sexual performance in men's health.
                  Hormones play a key role in overall men's health — when levels fall out of balance, men can experience
                  both physical and psychological men's health effects.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The natural aging process often reduces testosterone production, leading to men's health issues like fatigue, loss of muscle mass,
                  reduced libido, and other men's health symptoms. Kalon Primary Care and Wellness provides customized men's health solutions to
                  restore balance and improve men's quality of life through comprehensive men's health services and hormone therapy for men's health optimization.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
                  Men's Health: Hormonal Health & Treatment Options
                </h2>
                <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed max-w-3xl mx-auto">
                  Our men's health services provide advanced hormone therapy for men's health optimization. From testosterone replacement to men's health performance solutions, we offer comprehensive men's health care.
                </p>
                
                <div className="space-y-12">
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-left">
                    <h3 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                      Testosterone Replacement Therapy (TRT) for Men's Health
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Our men's health testosterone replacement therapy is a cornerstone of comprehensive men's health care, designed to address low testosterone and optimize men's health.
                    </p>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Restores healthy testosterone levels for optimal men's health</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Improves energy, muscle strength, and focus for men's health vitality</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Supports healthy libido and sexual function as part of men's health care</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Enhances mood and overall well-being through men's health hormone optimization</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-right delay-200">
                    <h3 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                      Trimix Injections for Men's Health Performance
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      For men experiencing erectile dysfunction or wanting enhanced men's health performance, Trimix injections
                      are a reliable men's health solution made with FDA-approved medications. This men's health treatment offers superior results for men's health concerns.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Reliable | Effective | Safe</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Outperforms oral medications</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Cost-effective treatment</span>
                        </li>
                      </ul>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Minimal to no side effects</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Not affected by alcohol</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                          <span>Customized formulations available</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-16">
                <h3 className="text-3xl font-serif font-light mb-8 text-black">
                  Ready to optimize your health and performance with men's health services?
                </h3>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Experience comprehensive men's health care with our specialized men's health services. From testosterone therapy to men's health performance solutions, we provide expert men's health treatment focused on your unique men's health needs and hormone optimization for men's health vitality.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Schedule Men's Health Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'shop' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Shop</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Premium wellness products, aesthetic treatments, and gift cards — curated by Dr. Ayupova to support your health and beauty at home.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  id: 'gift-cards',
                  title: 'Gift Cards',
                  description: 'Give the gift of wellness. Kalon gift cards can be used toward any service or product — the perfect present for someone you care about.',
                  icon: Gift
                },
                {
                  id: 'skincare',
                  title: 'Skincare',
                  description: 'Medical-grade skincare lines selected by Dr. Ayupova to cleanse, protect, and rejuvenate your skin with clinically proven ingredients.',
                  icon: Sparkles
                },
                {
                  id: 'medical-foods',
                  title: 'Medical Foods',
                  description: 'FDA-regulated medical foods for targeted nutritional support of mood, cognitive function, and nerve health — formulated for specific clinical needs under medical supervision.',
                  icon: Brain
                },
                {
                  id: 'upneeq',
                  title: 'Upneeq',
                  description: 'The only FDA-approved prescription eye drop for acquired ptosis (low-lying eyelids). A daily drop that lifts the upper eyelid for a more open, refreshed look.',
                  icon: Eye
                },
                {
                  id: 'votesse',
                  title: 'Votesse',
                  description: 'A biotin-free, drug-free hair health supplement that blocks DHT and stimulates natural hair growth from the inside out. A single daily dose for fuller, thicker hair.',
                  icon: Droplet
                },
                {
                  id: 'latisse',
                  title: 'Latisse',
                  description: 'The original FDA-approved eyelash growth treatment. Grow your own natural lashes longer, thicker, and darker with nightly application.',
                  icon: Droplet
                },
                {
                  id: 'supplement-dispensary',
                  title: 'Supplement Dispensary',
                  description: 'Professional-grade supplements, vitamins, and natural health products from trusted brands — browse our curated catalog and have products shipped directly to your door.',
                  icon: Heart
                }
              ].map((product, i) => (
                <div
                  key={product.id}
                  className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-scale cursor-pointer group"
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                  onClick={() => {
                    if (product.id === 'gift-cards') {
                      navigateTo('gift-cards');
                    } else if (product.id === 'supplement-dispensary') {
                      navigateTo('supplement-dispensary');
                    } else if (product.id === 'upneeq') {
                      navigateTo('upneeq');
                    } else if (product.id === 'latisse') {
                      navigateTo('latisse');
                    } else if (product.id === 'skincare') {
                      navigateTo('skincare');
                    } else if (product.id === 'votesse') {
                      navigateTo('votesse');
                    } else if (product.id === 'medical-foods') {
                      navigateTo('medical-foods');
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                      <product.icon className="w-7 h-7 text-black" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif font-medium text-black mb-3">{product.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                  <div className="flex items-center font-medium transition-transform group-hover:translate-x-1" style={{ color: '#D4AF37' }}>
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Questions about a product?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Upneeq, Votesse, and Latisse are prescription products. A brief consultation is required before purchase. Reach out and our team will guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'upneeq' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={`${BASE}upneeq-product.webp`}
                    alt="Upneeq prescription eye drops"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Eye className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Upneeq</h1>
                <p className="text-lg text-gray-500 mb-6">Eye Drops for Droopy Eyelids</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Upneeq is the only FDA-approved, once-daily prescription eye drop specifically developed to lift the upper eyelids. It works by selectively stimulating the Muller muscle, a muscle responsible for lifting the upper eyelid, leading to a visible elevation.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Upneeq can effectively treat mild to severe ptosis, providing individuals with an unobstructed field of vision and an aesthetically pleasing appearance. This treatment is an ideal choice for adults who struggle with droopy eyelids due to aging, lifestyle factors, or genetic conditions. Visible improvements can typically be seen within a few hours after the first use, and the effect of each dose lasts up to 8-10 hours. With regular use, the benefits of Upneeq can be maintained over time.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Benefits of Upneeq</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  'Non-invasive, non-surgical treatment',
                  'FDA-approved for safety and efficacy',
                  'Fast-acting results within hours',
                  'Long-lasting effects for all-day comfort',
                  'Enhances visual field and overall sight',
                  'Boosts facial symmetry and appearance',
                  'Convenient and easy-to-use',
                  'Minimal side effects',
                  'Suitable for long-term use',
                  'Personalized treatment plan under medical supervision'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'How quickly does Upneeq work?', a: 'Upneeq begins to work within a few hours after the first dose.' },
                  { q: 'How long do the effects of Upneeq last?', a: 'The effects of each dose of Upneeq can last up to 8-10 hours. This allows for all-day comfort and improved sight, which can be particularly beneficial for people with droopy eyelids.' },
                  { q: 'Is Upneeq suitable for everyone?', a: 'Upneeq is intended for adult patients. As with any medication, it may not be suitable for individuals with certain health conditions. Consultation with a healthcare provider is recommended.' },
                  { q: 'Are there any side effects of Upneeq?', a: 'There can be side effects with Upneeq. However, they are generally mild and may include headaches, dry eyes, and irritation. It is always important to discuss any potential side effects with your healthcare provider before starting a new medication.' },
                  { q: 'How long should I use Upneeq?', a: 'The duration of Upneeq use depends on individual needs and response to treatment. Some people might see desired improvements after short-term use, while others may need a longer treatment plan. It is important to discuss this with your healthcare provider, who can provide a personalized treatment plan based on your specific needs.' },
                  { q: 'Do I need a prescription for Upneeq?', a: 'Yes, Upneeq is a prescription medication. Your healthcare provider can prescribe Upneeq to those in need.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to elevate your eyes?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your aesthetic goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'latisse' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={`${BASE}latisse-product.webp`}
                    alt="Latisse prescription eyelash growth serum"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Droplet className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Latisse</h1>
                <p className="text-lg text-gray-500 mb-6">Eyelash Enhancement Serum</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Get longer, thicker lashes with Latisse! Latisse is the first and only FDA-cleared medication to treat inadequate eyelashes. Latisse has been proven to increase eyelash fullness and length, as well as make them thicker and darker. Includes one 5 mL bottle of sterile solution and 140 disposable applicators.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Prescription Required: If you are interested in purchasing Latisse, please contact us for a consultation. For current clients only.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Benefits of Latisse</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  'First and only FDA-cleared eyelash treatment',
                  'Clinically proven to increase lash length',
                  'Increases eyelash fullness and thickness',
                  'Darkens lashes for a more defined look',
                  'Non-surgical, topical application',
                  'Convenient once-daily at-home use',
                  'Visible results in as little as 4 weeks',
                  'Full results at 16 weeks',
                  'Includes sterile solution and disposable applicators',
                  'Personalized treatment plan under medical supervision'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'How often do you use Latisse?', a: 'Latisse is applied once daily, typically in the evening. Consistency is key to achieving the best results. Apply the solution along the upper lash line of each eye using the sterile disposable applicator provided.' },
                  { q: 'How is Latisse applied?', a: 'Latisse is applied to the skin of the upper eyelid margin at the base of the eyelashes using the included sterile applicator brush. One drop is placed on the applicator and brushed along the lash line of the upper eyelid only. Blot any excess solution. Do not apply to the lower lash line.' },
                  { q: 'When will I see results from Latisse?', a: 'Lash growth occurs gradually. Most patients begin to see noticeable improvement in lash length and fullness at around 4 weeks, with full results visible at 16 weeks of daily use.' },
                  { q: 'Are there any side effects of Latisse?', a: 'The most common side effects include mild itching, redness, or irritation at the application site. Less commonly, Latisse may cause temporary darkening of the eyelid skin or increased brown pigmentation in the iris. Discuss any concerns with your healthcare provider before starting treatment.' },
                  { q: 'Do I need a prescription for Latisse?', a: 'Yes, Latisse is a prescription medication. Your healthcare provider can prescribe Latisse after a brief consultation to ensure it is appropriate for you.' },
                  { q: 'What happens if I stop using Latisse?', a: 'If you discontinue use, your eyelashes will gradually return to their previous appearance over several weeks to months. To maintain results, continued use is recommended as directed by your healthcare provider.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready for longer, fuller lashes?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your aesthetic goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'votesse' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={`${BASE}votesse-product.webp`}
                    alt="Votesse hair health dietary supplement"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Droplet className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Votesse</h1>
                <p className="text-lg text-gray-500 mb-6">Hair Health Dietary Supplement - 90 Capsules</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Healthy hair begins before the roots. Votesse offers a formula for everyone that builds the foundation for fuller, thicker hair from the inside out. It is a non-invasive, biotin-free solution backed by science and intense clinical research, formulated to block and inhibit DHT while naturally stimulating the hair growth process.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Votesse provides systematic hair health for everyone by addressing hair thinning and improving the appearance of hair quality. A single daily dose makes it an easy addition to any daily routine.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="mb-16 reveal">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-light mb-6 text-black">Clinically Proven Results</h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  In our clinical study, participants experienced significant new hair growth with fuller and thicker hair in as little as five months.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={`${BASE}votesse-before-1.webp`} alt="Before treatment - thinning hair at crown" className="w-full h-64 object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 text-sm font-medium bg-black text-white rounded-full">Before</span>
                    </div>
                    <div className="relative">
                      <img src={`${BASE}votesse-after-1.webp`} alt="After 5 months of Votesse - fuller hair at crown" className="w-full h-64 object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: '#D4AF37', color: '#000' }}>After 5 Months</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 py-3">Male subject - crown area</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img src={`${BASE}votesse-before-2.webp`} alt="Before treatment - thinning hair along part line" className="w-full h-64 object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 text-sm font-medium bg-black text-white rounded-full">Before</span>
                    </div>
                    <div className="relative">
                      <img src={`${BASE}votesse-after-2.webp`} alt="After 5 months of Votesse - fuller hair along part line" className="w-full h-64 object-cover" />
                      <span className="absolute top-3 left-3 px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: '#D4AF37', color: '#000' }}>After 5 Months</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 py-3">Female subject - part line</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center mt-6 max-w-3xl mx-auto">Results may vary. Clinical results based on expert clinical evaluation and grading of 14 male subjects after 5 months of use as directed.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Benefits of Votesse</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  'Non-invasive, biotin-free, and drug-free formula',
                  'Blocks and inhibits DHT to combat hair thinning',
                  'Naturally stimulates the hair growth process',
                  'Builds hair health from the inside out',
                  'Clinically proven results in as little as 5 months',
                  'Fuller, thicker hair for men and women',
                  'Improves the appearance of hair quality',
                  'Single daily dose - easy addition to any routine',
                  'Formulated to give the scalp exactly what it needs',
                  'Backed by science and intense clinical research'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">How Votesse Works</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-2xl font-serif text-black">1</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">Blocks DHT</h3>
                  <p className="text-gray-700 leading-relaxed">Votesse is formulated to block and inhibit DHT, the hormone responsible for hair thinning and loss.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-2xl font-serif text-black">2</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">Stimulates Growth</h3>
                  <p className="text-gray-700 leading-relaxed">Naturally stimulates the hair growth process, giving the scalp exactly what it needs for healthier hair.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-2xl font-serif text-black">3</span>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-black mb-3">Daily Routine</h3>
                  <p className="text-gray-700 leading-relaxed">A single daily dose designed to be an easy addition to any routine for consistent, lasting results.</p>
                </div>
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is Votesse?', a: 'Votesse is a non-invasive, biotin-free, and drug-free hair health dietary supplement formulated to block and inhibit DHT while naturally stimulating the hair growth process. It builds hair health from the inside out.' },
                  { q: 'How do I take Votesse?', a: 'Votesse is taken as a single daily dose, making it an easy addition to your daily routine. Each bottle contains 90 capsules.' },
                  { q: 'When will I see results from Votesse?', a: 'In clinical studies, participants experienced significant new hair growth with fuller and thicker hair in as little as five months. Individual results may vary.' },
                  { q: 'Is Votesse suitable for everyone?', a: 'Votesse is formulated to give the scalp exactly what it needs and is designed for both men and women. As with any supplement, consult with your healthcare provider before starting.' },
                  { q: 'Does Votesse contain biotin?', a: 'No, Votesse is biotin-free and drug-free. It takes a systematic approach to hair health by addressing the root causes of hair thinning rather than relying on biotin alone.' },
                  { q: 'Do I need a consultation to purchase Votesse?', a: 'Yes, Votesse is available through our office. Please contact us for a consultation so we can assess your needs and recommend the right approach for your hair health goals.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready for fuller, thicker hair?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your hair health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'medical-foods' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Medical Foods</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              FDA-regulated medical foods formulated to meet the distinctive nutritional requirements of specific clinical conditions. Unlike standard vitamins, medical foods contain therapeutic, high-dose bioactive ingredients designed for disease-state management. Use under medical supervision.
            </p>

            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-serif font-light mb-8 text-black reveal">Mood, Cognitive &amp; Nerve Health</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      id: 'deplinpro',
                      title: 'DeplinPRO Mood Health',
                      description: 'A medical food with a multi-nutrient formula supporting emotional balance, brain cell wellness, and mental resilience for the clinical dietary management of mood disorders. Available in 90-count packages.',
                      icon: Brain
                    },
                    {
                      id: 'cerefolin',
                      title: 'Cerefolin Brain Wellness',
                      description: 'A neurologist-recommended medical food that slows cognitive decline and brain shrinkage while improving memory, focus, and concentration. For mild cognitive impairment with hyperhomocysteinemia.',
                      icon: Brain
                    },
                    {
                      id: 'metanxpro',
                      title: 'MetanxPRO Nerve Health',
                      description: 'A medical food providing key nutrients that target deficiencies at the source of nerve damage. Supports nerve repair and restores function for peripheral neuropathy. Available in 90 and 180-count.',
                      icon: Brain
                    }
                  ].map((product, i) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-scale cursor-pointer group"
                      style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                      onClick={() => navigateTo(product.id)}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                          <product.icon className="w-7 h-7 text-black" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-medium text-black mb-3">{product.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                      <div className="flex items-center font-medium transition-transform group-hover:translate-x-1" style={{ color: '#D4AF37' }}>
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 reveal">
                <h2 className="text-3xl font-serif font-light mb-6 text-black">Medical Food vs. Vitamin</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-3" style={{ color: '#D4AF37' }}>Regulation</h3>
                    <p className="text-gray-700 leading-relaxed">Regulated under FDA guidelines for medical foods, requiring a distinct nutritional deficiency or need.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-3" style={{ color: '#D4AF37' }}>Intention</h3>
                    <p className="text-gray-700 leading-relaxed">Formulated for specific disease states (like depression or cognitive decline) rather than general wellness.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-3" style={{ color: '#D4AF37' }}>Dosage</h3>
                    <p className="text-gray-700 leading-relaxed">Contains therapeutic, high-dose bioactive ingredients that exceed standard daily vitamin allowances.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center mt-16 reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Not sure which product is right for you?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Medical foods require a consultation to determine the right product for your specific clinical needs. Book an appointment and our team will guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'deplinpro' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('medical-foods')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Medical Foods</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-8 flex items-center justify-center">
                  <img
                    src={`${BASE}deplinpro-product.png`}
                    alt="DeplinPRO Mood Health medical food"
                    className="max-h-96 object-contain"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Brain className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>DeplinPRO Mood Health</h1>
                <p className="text-lg text-gray-500 mb-6">Medical Food for Mood Disorders - 90 Count</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Depression is not caused by one single thing — it is shaped by many factors that affect how your brain works. DeplinPRO Mood Health brings together four key nutrients in a multi-action formula that helps restore the biological balance needed for mood, stress, and cognitive function — supporting your ongoing depression care.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Medical Food. Use under medical supervision. Available in 90-count packages.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">90-Day Money-Back Guarantee</span> through Brand Direct Pharmacy</p>
                  </div>
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">$50 Voucher</span> available — call our office to claim yours</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">Free Trial Samples</span> available at our office</p>
                  </div>
                </div>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Key Nutrients</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>L-Methylfolate Calcium</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">The active form of folate — a nutrient that helps your brain make important mood-related chemicals like serotonin, norepinephrine, and dopamine.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Mood balance and emotional well-being</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>Vitamin D3 (Cholecalciferol)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Known as the sunshine vitamin, vitamin D3 helps keep brain cells functioning properly and works with zinc to support mood regulation.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Emotional balance and overall brain health</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>Zinc (zinc bisglycinate)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">An essential mineral your body uses for brain signaling and stress response. Zinc helps support communication between brain cells and the hormones that influence mood.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Stress response and mood stability</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>L-Theanine</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">A naturally occurring amino acid found in green tea that helps promote calm focus and relaxation.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Relaxation, focus, and resilience during stress</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">5 Key Factors of Depression Management</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { title: 'Emotional Balance', desc: 'Helps maintain neurotransmitter activity — the brain chemicals that influence how you feel.' },
                  { title: 'Brain Cell Wellness', desc: 'Provides nutrients that help protect brain cells from everyday oxidative stress and support normal cell function.' },
                  { title: 'Mental Resilience', desc: 'Supports the hormones and signals that help your brain adapt to stress.' },
                  { title: 'Cognitive Function', desc: 'Supports the biological processes involved in thinking, focus, and mental clarity.' },
                  { title: 'Treatment Support', desc: 'Helps address nutritional needs that may not be met through diet alone, complementing your overall depression care.' }
                ].map((factor, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <div>
                      <h3 className="font-medium text-black mb-1">{factor.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{factor.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is DeplinPRO Mood Health?', a: 'DeplinPRO Mood Health is a medical food specially formulated to meet the distinctive nutritional requirements for neurotransmitter imbalances in the clinical dietary management of mood disorders. It contains four key nutrients in a multi-action formula. Use under medical supervision.' },
                  { q: 'How is a medical food different from a regular vitamin?', a: 'Medical foods are regulated under FDA guidelines for medical foods, requiring a distinct nutritional deficiency or need. They are formulated for specific disease states rather than general wellness, and contain therapeutic, high-dose bioactive ingredients that exceed standard daily vitamin allowances.' },
                  { q: 'How do I take DeplinPRO Mood Health?', a: 'Adults and children 12 years of age and older, take one capsule daily or as directed by your healthcare provider. Available in 90-count packages.' },
                  { q: 'Can I take DeplinPRO with my antidepressant?', a: 'DeplinPRO Mood Health is designed to support your ongoing depression care and works alongside your existing treatment. It helps address nutritional needs that may not be met through diet alone. Always discuss your full treatment plan with your healthcare provider.' },
                  { q: 'Are there any side effects?', a: 'DeplinPRO Mood Health contains safe and well-tolerated ingredients that are not associated with the typical side effects of depression medications. It contains no unnecessary dyes, fillers, or additives. If you are pregnant or nursing, consult with your healthcare provider before taking.' },
                  { q: 'Do I need a prescription for DeplinPRO Mood Health?', a: 'DeplinPRO Mood Health is a medical food for use under medical supervision. Please contact us for a consultation to determine if it is appropriate for your needs.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to support your mood and mental wellness?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your mental health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'metanxpro' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('medical-foods')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Medical Foods</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-8 flex items-center justify-center">
                  <img
                    src={`${BASE}metanxpro-product.png`}
                    alt="MetanxPRO Nerve Health medical food"
                    className="max-h-96 object-contain"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Brain className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>MetanxPRO Nerve Health</h1>
                <p className="text-lg text-gray-500 mb-6">Medical Food for Peripheral Neuropathy - 90 &amp; 180 Count</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  MetanxPRO Nerve Health provides key nutrients to the nerves that help address the root causes of peripheral neuropathy. Ongoing use can support nerve repair and restore nerve function to bring back sensation and reduce discomfort.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Medical Food. For use only under medical supervision. Available in 90-count (45-day supply) and 180-count (90-day supply).
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">90-Day Money-Back Guarantee</span> through Brand Direct Pharmacy</p>
                  </div>
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">$50 Voucher</span> available — call our office to claim yours</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">Free Trial Samples</span> available at our office</p>
                  </div>
                </div>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="mb-16 reveal">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={`${BASE}metanx-nerve-illustration.png`}
                  alt="Illustration of the nerve system with a focus on a neuron"
                  className="w-full object-contain bg-white"
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">4 Key Nutrients That Support Nerve Repair &amp; Function</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>L-Methylfolate Calcium</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Supports nerve health and growth and reduces oxidative stress to lower inflammation. Helps increase blood flow to deliver nutrients to nerves, helping to nourish and repair them.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Nutritional deficiencies, blood flow problems, oxidative stress &amp; inflammation</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>Pyridoxal 5'-Phosphate (Vitamin B6)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Helps prevent the buildup of substances harmful to nerves, protecting against further nerve damage. Helps reduce oxidative stress and restore nerve signaling.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Oxidative stress &amp; inflammation, nutritional deficiencies</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>Methylcobalamin (Vitamin B12)</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Helps replenish the protective covering that surrounds nerves, which can help improve nerve function, restore sensation, and rebuild nerves.</p>
                  <p className="text-sm text-gray-500 italic">Supports: Nutritional deficiencies, nerve damage</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-medium mb-2" style={{ color: '#D4AF37' }}>Acetyl-L-Carnitine HCl</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">Helps restore and maintain energy production for healthy cell function. Protects against oxidative stress and inflammation. Acts on brain chemicals that can help regulate the pain response (pins &amp; needles, burning sensations).</p>
                  <p className="text-sm text-gray-500 italic">Supports: Energy production, pain response regulation, nerve protection</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">How It Works Over Time</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-sm font-serif font-medium text-black text-center leading-tight">14<br />Days</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Early Relief</h3>
                    <p className="text-gray-700 leading-relaxed">Nerve discomfort associated with pain reduced as early as 14 days. Patients with chemotherapy-induced neuropathy felt a 73% reduction in severity of symptoms within 14 days.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-sm font-serif font-medium text-black text-center leading-tight">3<br />Weeks</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Symptom Reduction</h3>
                    <p className="text-gray-700 leading-relaxed">63% of patients with antiretroviral toxic neuropathy felt pain symptom reduction by 3 weeks of use.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-sm font-serif font-medium text-black text-center leading-tight">45<br />Days</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Ongoing Repair</h3>
                    <p className="text-gray-700 leading-relaxed">With ongoing use, nutrients continue to support nerve repair and restore nerve function, bringing back sensation and reducing discomfort.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-sm font-serif font-medium text-black text-center leading-tight">90<br />Days</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Sustained Benefits</h3>
                    <p className="text-gray-700 leading-relaxed">Continued use supports long-term nerve health and function. The 180-count supply provides a full 90-day course for sustained results.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">Safe and Well Tolerated</h2>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                Patients in clinical studies reported minimal side effects, similar to placebo, meaning patients typically do not have to worry about adding side effects. Multiple studies have shown the nutrients to be safe, easily absorbed, and well-tolerated for peripheral neuropathy care.
              </p>
            </div>

            <div className="mb-16 reveal">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={`${BASE}metanx-couple-lifestyle.jpg`}
                  alt="Senior couple dancing in a garden, representing restored nerve function and mobility"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-4 text-black">Clinical Studies &amp; Research</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-8">
                Clinical studies on a formulation containing the same levels of L-methylfolate, pyridoxal 5'-phosphate, and methylcobalamin as in MetanxPRO Nerve Health demonstrated sustained improvements in pain, sensory symptoms, and quality of life in patients with diabetic peripheral neuropathy (DPN, the most common form of peripheral neuropathy).
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  { finding: '73% reduction in PN symptom severity', detail: 'Patients with chemotherapy-induced neuropathy, within 14 days', ref: 'Maestri A, et al. Tumori Journal. 2005' },
                  { finding: '63% felt pain symptom reduction', detail: 'Patients with antiretroviral toxic neuropathy, by 3 weeks', ref: 'Scarpini E, et al. J Peripheral Nervous System. 1997' },
                  { finding: 'Sustained improvements in pain & sensory symptoms', detail: 'Diabetic peripheral neuropathy patients', ref: 'Walker MJ Jr. Rev Neurological Diseases. 2010' },
                  { finding: 'Improved quality of life & nerve function', detail: 'DPN patients, long-term use', ref: 'Jacobs AM, et al. Rev Neurological Diseases. 2011' },
                  { finding: 'Safe and well-tolerated, similar to placebo', detail: 'Multiple clinical studies confirmed minimal side effects', ref: 'Fonseca VA, et al. Am J Medicine. 2013' },
                  { finding: 'Significant pain reduction in neuropathy', detail: 'Systematic review of Acetyl-L-Carnitine studies', ref: 'Yang M, et al. Pain Medicine. 2015' }
                ].map((study, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-serif font-medium text-black mb-2" style={{ color: '#D4AF37' }}>{study.finding}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{study.detail}</p>
                    <p className="text-xs text-gray-400 italic">{study.ref}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-6 max-w-3xl mx-auto">
                These statements are based on clinical studies on formulations containing the same active nutrient levels as MetanxPRO Nerve Health. Individual results may vary. Use under medical supervision.
              </p>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is MetanxPRO Nerve Health?', a: 'MetanxPRO Nerve Health is a medical food that provides key nutrients to the nerves that help address the root causes of peripheral neuropathy. Ongoing use can support nerve repair and restore nerve function to bring back sensation and reduce discomfort. For use only under medical supervision.' },
                  { q: 'How is a medical food different from a regular vitamin?', a: 'Medical foods are regulated under FDA guidelines, requiring a distinct nutritional deficiency or need. They are formulated for specific disease states rather than general wellness, and contain therapeutic, high-dose bioactive ingredients that exceed standard daily vitamin allowances.' },
                  { q: 'How do I take MetanxPRO Nerve Health?', a: 'Adults take one capsule twice daily or two capsules once daily, or as directed by your healthcare provider. Available in 90-count (45-day supply) and 180-count (90-day supply).' },
                  { q: 'When will I see results from MetanxPRO?', a: 'Nerve discomfort associated with pain may be reduced as early as 14 days. In clinical studies, 63% of patients felt pain symptom reduction by 3 weeks, and patients with chemotherapy-induced neuropathy felt a 73% reduction in severity within 14 days. Ongoing use supports continued nerve repair and function restoration.' },
                  { q: 'Are there any side effects?', a: 'Patients in clinical studies reported minimal side effects, similar to placebo. Multiple studies have shown the nutrients to be safe, easily absorbed, and well-tolerated. If you are pregnant or nursing, consult with your healthcare provider before taking.' },
                  { q: 'Do I need a consultation to purchase MetanxPRO?', a: 'Yes, MetanxPRO is a medical food for use under medical supervision. Please contact us for a consultation to determine if it is appropriate for your needs. Free trial samples are available at our office.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to support your nerve health?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation. Free trial samples are available at our office, and a $50 voucher is available when you call.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'cerefolin' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('medical-foods')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Medical Foods</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl bg-white p-8 flex items-center justify-center">
                  <img
                    src={`${BASE}cerefolin-product.png`}
                    alt="Cerefolin Brain Wellness medical food"
                    className="max-h-96 object-contain"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Brain className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Cerefolin Brain Wellness</h1>
                <p className="text-lg text-gray-500 mb-6">Medical Food for Cognitive Health</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Cerefolin Brain Wellness is a medical food for the clinical dietary management of mild cognitive impairment with hyperhomocysteinemia. It provides targeted nutrition to slow cognitive decline and brain shrinkage while improving brain health, memory, focus, and concentration. Neurologist recommended.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Medical Food. Use under medical supervision.
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">90-Day Money-Back Guarantee</span> through Brand Direct Pharmacy</p>
                  </div>
                  <div className="flex items-start mb-3">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">$50 Voucher</span> available — call our office to claim yours</p>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <p className="text-sm text-gray-700 leading-relaxed"><span className="font-medium">Free Trial Samples</span> available at our office</p>
                  </div>
                </div>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Dual Action Formula</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>Improves</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      <div>
                        <h4 className="font-medium text-black mb-1">Brain Health</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Supports overall brain function by providing essential nutrients that aid in reducing harmful homocysteine levels.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      <div>
                        <h4 className="font-medium text-black mb-1">Memory &amp; Focus</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Individuals showed improvement in memory and ability to focus on daily activities.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      <div>
                        <h4 className="font-medium text-black mb-1">Concentration</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Helped people maintain attention and stay on task, essential for completing daily tasks and decision-making.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>Slows</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      <div>
                        <h4 className="font-medium text-black mb-1">Cognitive Decline</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Long-term use was associated with a significantly slower rate of cognitive decline, especially in individuals with mild cognitive impairment.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                      <div>
                        <h4 className="font-medium text-black mb-1">Brain Atrophy</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">Research shows people with MCI and elevated homocysteine who took Cerefolin experienced slower brain shrinkage, helping support memory, thinking skills, and overall brain health.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Clinically Tested Results</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                <div>
                  <p className="text-4xl font-serif font-light mb-2" style={{ color: '#D4AF37' }}>11.2x</p>
                  <p className="text-gray-700 leading-relaxed">Slower rate of brain shrinkage compared to baseline</p>
                </div>
                <div>
                  <p className="text-4xl font-serif font-light mb-2" style={{ color: '#D4AF37' }}>94%</p>
                  <p className="text-gray-700 leading-relaxed">Of users who continued past 90 days planned to keep using it</p>
                </div>
                <div>
                  <p className="text-4xl font-serif font-light mb-2" style={{ color: '#D4AF37' }}>Free From</p>
                  <p className="text-gray-700 leading-relaxed">Gluten, dyes, sugar, sodium, caffeine, preservatives, GMOs, titanium dioxide, and major food allergens</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-6 text-black">When Little Slips Start Adding Up</h2>
              <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                Everyone forgets things now and then — a name, a date, where you left your keys. But when those slips start to happen more often, or daily life feels a little harder, it might be worth bringing up with your healthcare provider.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {[
                  'Missing appointments often',
                  'Struggling to find words',
                  'Frequently losing things',
                  'Losing train of thought',
                  'Having trouble deciding',
                  'Getting lost in familiar places'
                ].map((sign, i) => (
                  <div key={i} className="flex items-start">
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-gray-700 leading-relaxed">{sign}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is Cerefolin Brain Wellness?', a: 'Cerefolin Brain Wellness is a medical food for the clinical dietary management of mild cognitive impairment with hyperhomocysteinemia. It is specially formulated to meet the distinctive nutritional requirements for this condition. Use under medical supervision.' },
                  { q: 'How is a medical food different from a regular vitamin?', a: 'Medical foods are regulated under FDA guidelines, requiring a distinct nutritional deficiency or need. They are formulated for specific disease states rather than general wellness, and contain therapeutic, high-dose bioactive ingredients that exceed standard daily vitamin allowances.' },
                  { q: 'What does Cerefolin help with?', a: 'Cerefolin helps improve brain health, memory, focus, and concentration while slowing cognitive decline and brain atrophy. It is neurologist recommended and clinically tested.' },
                  { q: 'How long does it take to see results?', a: 'Long-term use of Cerefolin Brain Wellness was associated with a significantly slower rate of cognitive decline. Research shows it can slow the rate of brain shrinkage up to 11.2x compared to baseline. Individual results may vary.' },
                  { q: 'Is Cerefolin free from common allergens?', a: 'Yes, Cerefolin Brain Wellness is free from gluten, dyes, sugar, sodium, caffeine, preservatives, GMOs, titanium dioxide, and major food allergens.' },
                  { q: 'Do I need a consultation to purchase Cerefolin?', a: 'Yes, Cerefolin is a medical food for use under medical supervision. Please contact us for a consultation to determine if it is appropriate for your needs.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to support your brain health?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your cognitive health goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'skincare' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Skincare</h1>
            <div className="flex justify-center mb-8 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto reveal delay-200">
              Medical-grade skincare lines selected by Dr. Ayupova to cleanse, protect, and rejuvenate your skin with clinically proven ingredients.
            </p>

            <div className="space-y-16">
              <div>
                <h2 className="text-3xl font-serif font-light mb-8 text-black reveal">Prescription Creams</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      id: 'tretinoin',
                      title: 'Tretinoin Cream',
                      description: 'A prescription retinoid derived from vitamin A that stimulates cell turnover to clear acne, reduce fine lines, and reveal brighter, healthier-looking skin. Available in 0.05% and 0.1% strengths.',
                      icon: Sparkles
                    }
                  ].map((product, i) => (
                    <div
                      key={product.id}
                      className="bg-gray-50 border border-gray-200 p-8 rounded-lg card-hover reveal reveal-scale cursor-pointer group"
                      style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                      onClick={() => navigateTo(product.id)}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                          <product.icon className="w-7 h-7 text-black" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-medium text-black mb-3">{product.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
                      <div className="flex items-center font-medium transition-transform group-hover:translate-x-1" style={{ color: '#D4AF37' }}>
                        <span>Learn More</span>
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center mt-16 reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Not sure which product is right for you?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a consultation and our team will recommend a personalized skincare routine tailored to your skin type and goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'tretinoin' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('skincare')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Skincare</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={`${BASE}tretinoin-product.webp`}
                    alt="Tretinoin prescription cream"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Tretinoin Cream</h1>
                <p className="text-lg text-gray-500 mb-6">Prescription Retinoid - 0.05% and 0.1%</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Tretinoin is a prescription treatment that helps to fight acne by deeply penetrating your skin. It stimulates cell turnover, ridding the skin of old cells and rapidly exfoliating to create brighter, healthier looking skin. It is naturally derived from vitamin A and has been found to have additional benefits beyond fighting acne, with many patients noticing softer skin, reduction in pore size, and decrease visibility of fine lines and wrinkles.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">
                  Prescription Required: Tretinoin is prescribed and dispensed in 0.05% and 0.1% strengths. Please contact us for a consultation.
                </p>
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Benefits of Tretinoin</h2>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {[
                  'Clears pores and fights acne',
                  'Stimulates cell turnover for brighter skin',
                  'Reduces visibility of fine lines and wrinkles',
                  'Minimizes pore size',
                  'Softer, smoother skin texture',
                  'Rapidly exfoliates dead skin cells',
                  'Naturally derived from vitamin A',
                  'Available in 0.05% and 0.1% strengths',
                  'Clinically proven and dermatologist-recommended',
                  'Personalized treatment plan under medical supervision'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                    <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#D4AF37' }} />
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is Tretinoin cream used for?', a: 'Tretinoin is primarily used to treat acne by clearing pores and stimulating cell turnover. It is also widely used for its anti-aging benefits, including reducing fine lines, wrinkles, and pore size while improving overall skin texture.' },
                  { q: 'How do I apply Tretinoin cream?', a: 'Apply a pea-sized amount to clean, dry skin once daily in the evening. Start with every other night to allow your skin to adjust, then increase to nightly as tolerated. Avoid the corners of your nose, mouth, and eyes, and always follow with a moisturizer.' },
                  { q: 'When will I see results from Tretinoin?', a: 'Acne improvement is typically seen within 6-8 weeks of consistent use. Anti-aging benefits such as smoother texture and reduced fine lines generally become noticeable after 3-6 months, with continued improvement over time.' },
                  { q: 'Are there any side effects of Tretinoin?', a: 'Common side effects include mild dryness, peeling, redness, and mild stinging, especially during the first few weeks as your skin adjusts. These typically subside as your skin builds tolerance. Always use sunscreen during the day, as Tretinoin increases sun sensitivity.' },
                  { q: 'Do I need a prescription for Tretinoin?', a: 'Yes, Tretinoin is a prescription medication. Your healthcare provider can prescribe the appropriate strength (0.05% or 0.1%) after a brief consultation to assess your skin type and goals.' },
                  { q: 'Can I use Tretinoin with other skincare products?', a: 'Tretinoin should not be used with benzoyl peroxide, alpha hydroxy acids, or other retinoids at the same time, as this can cause irritation. Apply Tretinoin at night and use other active ingredients in the morning. Always discuss your full skincare routine with your healthcare provider.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready for clearer, smoother skin?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Contact us today for a consultation and let our team guide you towards your skincare goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Book Now
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'team' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-4 reveal" style={{ color: '#D4AF37' }}>Our Team</h1>
            <div className="flex justify-center mb-12 reveal delay-100">
              <div className="h-px reveal-line" style={{ backgroundColor: '#D4AF37' }} />
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden reveal reveal-scale">
                <div className="md:flex">
                  <div className="md:w-1/3 reveal-left delay-200">
                    <img
                      src={`${BASE}bd7b526b-a161-4c77-aa85-e799caa30337.jpeg`}
                      alt="Nargiza Ayupova, DNP"
                      className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full mx-auto"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-3xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      Nargiza Ayupova, DNP
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">Founder & Primary Care Provider</p>
                    
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Dr. Nargiza Ayupova is a Doctor of Nursing Practice (DNP) with extensive experience in primary care 
                        and wellness medicine. She founded Kalon Primary Care and Wellness with a vision to provide 
                        comprehensive, personalized healthcare in a luxury setting.
                      </p>
                      
                      <p>
                        With a passion for preventive medicine and holistic wellness, Dr. Ayupova combines traditional 
                        primary care with innovative treatments like IV therapy and medical aesthetics. Her approach 
                        focuses on treating the whole person, not just symptoms.
                      </p>
                      
                      <p>
                        Dr. Ayupova is committed to building lasting relationships with her patients, taking the time 
                        to understand their unique health goals and creating personalized treatment plans that promote 
                        optimal wellness and vitality.
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                        Specialties
                      </h3>
                      <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          Primary Care
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          Women's Health
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          Men's Health
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          IV Therapy
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          Preventive Care
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 mr-2" style={{ color: '#D4AF37' }} />
                          Wellness Medicine
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-12">
                <h3 className="text-3xl font-serif font-light mb-8 text-black">
                  Ready to meet Dr. Ayupova?
                </h3>
                <a 
                  href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Schedule Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'policies' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Policies</h1>
            
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Cancellation Policy */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                  Cancellation Policy
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    We understand that schedules can change. To ensure we can accommodate all patients effectively, 
                    we require at least 24 hours notice for appointment cancellations or rescheduling.
                  </p>
                  <p>
                    Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee. 
                    No-show appointments will be charged the full appointment fee.
                  </p>
                  <p>
                    To cancel or reschedule your appointment, please call our office at 386-886-4433 or use our 
                    online patient portal. We appreciate your understanding and cooperation.
                  </p>
                </div>
              </div>
              
              {/* Refund Policy */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                  Refund Policy
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Payment is due at the time of visit. We accept cash, credit cards, and most insurance plans.
                    For treatments not covered by insurance, payment arrangements can be discussed prior to treatment.
                  </p>
                  <p>
                    Refunds are considered on a case-by-case basis and must be requested within 30 days
                    of your visit. Refund requests should be submitted in writing to our office for review.
                  </p>
                  <p>
                    For IV therapy and injection treatments, refunds are not available once the treatment has been
                    administered. If you have concerns about your treatment, please contact our office immediately
                    to discuss your options.
                  </p>
                </div>
              </div>
              
              {/* Privacy Policy & SMS Terms */}
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                  Privacy Policy & SMS Terms
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    At Kalon Healthcare Primary Care, your privacy is very important to us. We collect personal
                    information when you schedule appointments, complete forms, communicate with us, or use our website.
                    This may include your name, phone number, email, address, health information, and payment details.
                  </p>

                  <p>
                    We use this information to provide healthcare, manage appointments, process payments,
                    send reminders, and improve your experience. We do not sell or rent your personal data.
                    Information may only be shared with authorized healthcare providers, billing partners, or when
                    required by law.
                  </p>
                  
                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      SMS Terms & Conditions
                    </h3>
                    <p className="mb-4">
                      By providing your phone number, you consent to receive SMS messages from us related to
                      appointments, updates, and healthcare. Your phone number will never be sold or
                      shared with third parties for marketing.
                    </p>

                    <p className="mb-4">
                      You may receive messages such as appointment reminders, prescription updates, and care
                      notifications. Message frequency may vary, and standard messaging rates may apply. To stop
                      receiving texts, reply STOP at any time. For help, reply HELP or contact us at (386) 347-5514.
                    </p>
                    
                    <p>
                      You can opt in to SMS messages by providing consent during appointments, online, or in writing. 
                      You can opt out at any time by replying STOP or contacting our office directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'gift-cards' && (
        <div className="min-h-screen bg-white">
          {/* Hero */}
          <div className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #faf8f3 0%, #f5f0e6 40%, #ebe4d3 100%)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ backgroundColor: '#D4AF37' }} />
            <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full opacity-[0.04]" style={{ backgroundColor: '#D4AF37' }} />
            <div className="max-w-5xl mx-auto px-8 pt-32 pb-20 text-center relative">
              <button
                className="flex items-center text-gray-500 hover:text-black mb-12 transition-colors group"
                onClick={() => navigateTo('shop')}
              >
                <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm tracking-wide">Back to Shop</span>
              </button>
              <div className="flex justify-center mb-8 reveal">
                <div className="w-20 h-20 rounded-full flex items-center justify-center icon-float shadow-lg" style={{ backgroundColor: '#D4AF37', boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)' }}>
                  <Gift className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-6xl font-serif font-light mb-6 reveal delay-100 tracking-tight" style={{ color: '#1a1a1a' }}>
                The Gift of <span style={{ color: '#D4AF37' }}>Wellness</span>
              </h1>
              <div className="flex justify-center mb-6 reveal delay-150">
                <div className="h-px w-16 reveal-line" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <p className="text-xl text-gray-600 max-w-xl mx-auto leading-relaxed reveal delay-200">
                Share the experience of personalized care. Kalon gift cards can be used toward any service or product — the perfect gift for someone you love.
              </p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-8 -mt-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-10 mb-20">
              {/* Left: Amount selection */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 reveal reveal-left">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-serif font-light text-black">Choose an Amount</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { value: 50, label: '$50' },
                    { value: 100, label: '$100' },
                    { value: 150, label: '$150' },
                    { value: 200, label: '$200' },
                    { value: 300, label: '$300' },
                    { value: 500, label: '$500' }
                  ].map((amt) => (
                    <button
                      key={amt.value}
                      className={`py-5 rounded-xl font-serif text-lg font-light border-2 transition-all duration-300 ${selectedGiftAmount === amt.value ? 'text-white border-transparent shadow-lg scale-[1.03]' : 'text-gray-700 border-gray-150 hover:border-gray-300 bg-white hover:scale-[1.02]'}`}
                      style={selectedGiftAmount === amt.value ? { backgroundColor: '#D4AF37', borderColor: '#D4AF37', boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)' } : {}}
                      onClick={() => { setSelectedGiftAmount(amt.value); setCustomGiftAmount(''); }}
                    >
                      {amt.label}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-500 mb-2 tracking-wide uppercase">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-serif text-lg">$</span>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={customGiftAmount}
                      onChange={(e) => {
                        setCustomGiftAmount(e.target.value);
                        setSelectedGiftAmount(null);
                      }}
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none text-black text-lg font-serif font-light transition-all bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-50/50 border border-gray-100 rounded-xl p-5 flex items-center justify-between">
                  <span className="text-gray-500 text-sm tracking-wide uppercase font-medium">Gift Card Value</span>
                  <span className="text-3xl font-serif font-light text-black">
                    ${selectedGiftAmount || (customGiftAmount ? Number(customGiftAmount).toFixed(0) : '0')}
                  </span>
                </div>
              </div>

              {/* Right: Recipient details + preview */}
              <div className="space-y-6">
                {/* Gift card preview */}
                <div
                  className="rounded-2xl p-10 reveal reveal-right delay-100 relative overflow-hidden shadow-2xl"
                  style={{ background: 'linear-gradient(145deg, #1c1c1c 0%, #2a2a2a 50%, #1c1c1c 100%)' }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-[0.08] blur-xl" style={{ backgroundColor: '#D4AF37' }} />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-[0.05] blur-lg" style={{ backgroundColor: '#D4AF37' }} />
                  <div className="absolute top-4 right-4 w-1 h-16 rounded-full opacity-30" style={{ backgroundColor: '#D4AF37' }} />
                  <div className="absolute top-4 right-7 w-1 h-10 rounded-full opacity-20" style={{ backgroundColor: '#D4AF37' }} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-10">
                      <div>
                        <p className="text-2xl font-serif font-light tracking-[0.3em]" style={{ color: '#D4AF37' }}>KALON</p>
                        <p className="text-gray-500 text-xs tracking-widest uppercase mt-1">Primary Care & Wellness</p>
                      </div>
                      <Gift className="w-8 h-8 opacity-30" style={{ color: '#D4AF37' }} />
                    </div>
                    <p className="text-5xl font-serif font-light text-white mb-1 tracking-tight">
                      ${selectedGiftAmount || (customGiftAmount ? Number(customGiftAmount).toFixed(0) : '0')}
                    </p>
                    <p className="text-gray-500 text-xs tracking-[0.2em] uppercase">Gift Card</p>
                    <div className="border-t border-gray-700/50 mt-8 pt-6">
                      {giftRecipientName ? (
                        <p className="text-gray-300 text-sm font-light">To: <span className="text-white">{giftRecipientName}</span></p>
                      ) : (
                        <p className="text-gray-600 text-sm font-light italic">Recipient name appears here</p>
                      )}
                      {giftSenderName && (
                        <p className="text-gray-500 text-xs mt-1 font-light">From: <span className="text-gray-300">{giftSenderName}</span></p>
                      )}
                      {giftMessage && (
                        <p className="text-gray-600 text-xs mt-3 font-light italic line-clamp-2">"{giftMessage}"</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recipient form */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 reveal reveal-right delay-200">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-serif font-light text-black">Recipient Details</h2>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">Recipient Name</label>
                      <input
                        type="text"
                        placeholder="Enter recipient's name"
                        value={giftRecipientName}
                        onChange={(e) => setGiftRecipientName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none text-black transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">Recipient Email</label>
                      <input
                        type="email"
                        placeholder="Enter recipient's email"
                        value={giftRecipientEmail}
                        onChange={(e) => setGiftRecipientEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none text-black transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">From (Your Name)</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={giftSenderName}
                        onChange={(e) => setGiftSenderName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none text-black transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-2 tracking-wide uppercase">Personal Message <span className="text-gray-400 normal-case">(Optional)</span></label>
                      <textarea
                        placeholder="Write a personal note..."
                        rows={3}
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none text-black transition-all bg-gray-50/50 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase section */}
            <div className="relative overflow-hidden rounded-3xl p-12 text-center mb-20 reveal" style={{ background: 'linear-gradient(135deg, #faf8f3 0%, #f5f0e6 100%)' }}>
              <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-[0.06] blur-xl" style={{ backgroundColor: '#D4AF37' }} />
              <div className="absolute bottom-0 right-0 w-52 h-52 rounded-full opacity-[0.05] blur-xl" style={{ backgroundColor: '#D4AF37' }} />
              <div className="relative z-10">
                <h3 className="text-4xl font-serif font-light mb-4 text-black">Ready to Purchase?</h3>
                <p className="text-lg text-gray-600 mb-2 max-w-xl mx-auto leading-relaxed">
                  You'll be directed to our secure booking platform to complete your gift card purchase.
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  {selectedGiftAmount || customGiftAmount ? (
                    <span>Gift card value: <span className="font-serif text-lg" style={{ color: '#D4AF37' }}>${selectedGiftAmount || (customGiftAmount ? Number(customGiftAmount).toFixed(0) : '0')}</span></span>
                  ) : 'Please select an amount above to continue.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    disabled={!selectedGiftAmount && !customGiftAmount}
                    className="px-12 py-4 rounded-full font-medium text-white transition-all hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                    style={{ backgroundColor: '#D4AF37', boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)' }}
                    onClick={() => {
                      const amount = selectedGiftAmount || customGiftAmount || '0';
                      window.open(`https://enchantedmedicalaesthetics.myaestheticrecord.com/online-booking/giftcards?amount=${amount}`, '_blank', 'noopener noreferrer');
                    }}
                  >
                    Purchase Gift Card
                  </button>
                  <button
                    className="border-2 px-12 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ borderColor: '#D4AF37' }}
                    disabled={!selectedGiftAmount && !customGiftAmount}
                    onClick={() => navigateTo('contact')}
                  >
                    Questions? Contact Us
                  </button>
                </div>
              </div>
            </div>

            {/* Info section */}
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {[
                { icon: Gift, title: 'Use Anywhere', desc: 'Gift cards can be applied toward any service, treatment, or product at Kalon Primary Care and Wellness.' },
                { icon: Check, title: 'No Expiration', desc: 'Kalon gift cards do not expire. Your recipient can use it whenever the time is right for them.' },
                { icon: Mail, title: 'Digital Delivery', desc: 'Gift cards are delivered electronically to the recipient\'s email immediately after purchase.' }
              ].map((item, i) => (
                <div key={i} className={`bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 reveal reveal-scale delay-${(i % 3) * 100 + 100}`}>
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ backgroundColor: '#D4AF37', boxShadow: '0 4px 16px rgba(212, 175, 55, 0.25)' }}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-3 text-black">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="mb-20 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-3 reveal" style={{ color: '#1a1a1a' }}>
                Gift Card <span style={{ color: '#D4AF37' }}>FAQ's</span>
              </h2>
              <div className="flex justify-center mb-12 reveal delay-100">
                <div className="h-px w-16" style={{ backgroundColor: '#D4AF37' }} />
              </div>
              <div className="space-y-3">
                {[
                  { q: 'What can gift cards be used for?', a: 'Kalon gift cards can be used toward any service, treatment, or product we offer — including primary care visits, IV therapy, wellness programs, skincare products, and more.' },
                  { q: 'Do gift cards expire?', a: 'No. Kalon gift cards do not have an expiration date. Your recipient can use it whenever they are ready.' },
                  { q: 'How are gift cards delivered?', a: 'Gift cards are delivered electronically via email immediately after purchase. You can also schedule delivery for a specific date, such as a birthday or holiday.' },
                  { q: 'Can I purchase a gift card for a custom amount?', a: 'Yes. In addition to our preset amounts, you can enter any custom amount you would like the gift card to be valued at.' },
                  { q: 'What if my recipient loses their gift card?', a: 'No problem. Contact us and we can re-issue the gift card with the remaining balance. We keep records of all active gift cards.' },
                  { q: 'Can gift cards be combined with other offers?', a: 'Yes. Gift cards can be used in combination with any service or product. However, they cannot be redeemed for cash.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:border-gray-200 transition-all reveal shadow-sm">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'supplement-dispensary' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <button
              className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
              onClick={() => navigateTo('shop')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              <span>Back to Shop</span>
            </button>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="reveal reveal-left">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/7615571/pexels-photo-7615571.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                    alt="Professional-grade supplements and wellness products"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="reveal reveal-right delay-100">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center icon-float" style={{ backgroundColor: '#D4AF37' }}>
                    <Heart className="w-7 h-7 text-black" />
                  </div>
                </div>
                <h1 className="text-5xl font-serif font-light mb-4" style={{ color: '#D4AF37' }}>Online Supplement Dispensary</h1>
                <p className="text-lg text-gray-500 mb-6">Professional-Grade Supplements, Shipped Directly to You</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  We have partnered with a trusted online dispensary to provide our patients with access to hundreds of professional-grade supplements, vitamins, and natural health products. Browse our curated catalog, receive personalized recommendations, and have products shipped directly to your door — all through a secure, HIPAA-compliant platform.
                </p>
                <a
                  href="https://us.fullscript.com/welcome/enchantedmedicalaesthetics/store-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Visit Our Online Dispensary
                </a>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">Why Shop Through Our Dispensary?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Professional-Grade Only</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Access supplements from trusted brands that are only available through licensed healthcare practitioners — not found in regular stores.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Personalized Recommendations</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Dr. Ayupova can create customized treatment protocols and supplement plans tailored to your specific health goals and needs.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Direct to Your Door</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Order anytime and have your supplements shipped directly to your home. No need to visit the office to pick up products.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Auto-Refill Reminders</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Never run out. Set up automatic refills and receive reminders so you always have the supplements you need on hand.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Smart Search</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Search by ingredient, supplement type, or brand. Find exactly what you need from an extensive catalog of wellness products.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#D4AF37' }}>
                    <Check className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-serif font-medium mb-2 text-black">Secure & HIPAA-Compliant</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Your health information is protected. Treatment plans and orders are processed through a secure, encrypted platform.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">How It Works</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-lg font-serif font-medium text-black">1</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Visit Our Dispensary</h3>
                    <p className="text-gray-700 leading-relaxed">Click the button above to visit our online supplement storefront. Create a free account to start browsing.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-lg font-serif font-medium text-black">2</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Browse & Search</h3>
                    <p className="text-gray-700 leading-relaxed">Explore hundreds of professional-grade supplements by brand, ingredient, or category. View detailed product information and education.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-lg font-serif font-medium text-black">3</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Get Recommendations</h3>
                    <p className="text-gray-700 leading-relaxed">Dr. Ayupova can send you personalized supplement protocols directly to your account, so you know exactly what to take and why.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-6" style={{ backgroundColor: '#D4AF37' }}>
                    <span className="text-lg font-serif font-medium text-black">4</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-serif font-medium text-black mb-1">Order & Ship</h3>
                    <p className="text-gray-700 leading-relaxed">Place your order and your supplements are shipped directly to your door. Set up auto-refill to never run out.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 mb-16 reveal">
              <h2 className="text-3xl font-serif font-light text-center mb-8 text-black">What You'll Find</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { title: 'Multivitamins', desc: 'Comprehensive daily nutrition' },
                  { title: 'Immune Support', desc: 'Vitamins, minerals, and botanicals' },
                  { title: 'Digestive Health', desc: 'Probiotics, enzymes, and gut support' },
                  { title: 'Hormone Balance', desc: 'Adrenal, thyroid, and hormonal support' },
                  { title: 'Sleep & Stress', desc: 'Natural calming and sleep aids' },
                  { title: 'Joint & Muscle', desc: 'Anti-inflammatory and recovery support' },
                  { title: 'Heart Health', desc: 'Cardiovascular and circulatory support' },
                  { title: 'Energy & Metabolism', desc: 'B-vitamins, CoQ10, and mitochondrial support' }
                ].map((cat, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 text-center">
                    <h3 className="font-serif font-medium text-black mb-2" style={{ color: '#D4AF37' }}>{cat.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl font-serif font-light text-center mb-12 reveal" style={{ color: '#D4AF37' }}>
                FAQ's
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'What is the online supplement dispensary?', a: 'It is a secure online platform that gives our patients access to hundreds of professional-grade supplements, vitamins, and natural health products from trusted brands. Products are shipped directly to your door.' },
                  { q: 'Do I need an account to browse?', a: 'You can explore our storefront without an account, but you will need to create a free account to place orders. Creating an account is quick and secure.' },
                  { q: 'Are these supplements different from what I can buy at a store?', a: 'Yes. The supplements available through our dispensary are professional-grade products from trusted brands that are only available through licensed healthcare practitioners. They undergo stricter quality testing and contain higher-potency, bioavailable ingredients than typical store-bought vitamins.' },
                  { q: 'Can Dr. Ayupova recommend specific supplements for me?', a: 'Yes. Dr. Ayupova can create personalized supplement protocols and send them directly to your account. This way you know exactly which products to take, in what amount, and for how long.' },
                  { q: 'How fast is shipping?', a: 'Orders are typically processed within 1-2 business days and shipped directly to your door. Shipping times vary by location, but most orders arrive within 3-5 business days.' },
                  { q: 'Can I set up auto-refills?', a: 'Yes. You can enable auto-refill on any product so you never run out. You will receive reminders before each shipment and can pause or cancel anytime.' }
                ].map((faq, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-6 reveal">
                    <h3 className="text-lg font-serif font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-10 text-center reveal">
              <h3 className="text-3xl font-serif font-light mb-4 text-black">
                Ready to start your supplement journey?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Visit our online dispensary to browse hundreds of professional-grade supplements, or book a consultation for personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://us.fullscript.com/welcome/enchantedmedicalaesthetics/store-start"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  Visit Our Online Dispensary
                </a>
                <button
                  className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: '#D4AF37' }}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      </div>{/* end page-enter */}

      {/* Contact Banner - Always at bottom */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left mb-8">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-gray-300">(386) 347-5514</p>
                <p className="text-gray-300 text-sm">Text messages welcome</p>
                <p className="text-gray-300 text-sm">Fax: (949) 864-3080</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <MessageSquare className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Text Us</p>
                <p className="text-gray-300">(386) 347-5514</p>
                <p className="text-gray-300 text-sm">Text messages welcome</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-300">598 Sterthaus Dr</p>
                <p className="text-gray-300 text-sm">Ormond Beach, FL</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex items-start justify-center md:justify-start mb-6">
              <Clock className="w-5 h-5 mr-3 mt-1" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium mb-3">Office Hours</p>
                <div className="text-gray-300 space-y-1 text-sm">
                  <p><span className="font-medium">Monday:</span> 9 AM–5 PM in office</p>
                  <p><span className="font-medium">Tuesday:</span> Telehealth 9 AM-5 PM</p>
                  <p><span className="font-medium">Wednesday:</span> Telehealth 9 AM-5 PM</p>
                  <p><span className="font-medium">Thursday:</span> Telehealth 9 AM-5 PM</p>
                  <p><span className="font-medium">Friday:</span> 9 AM – 12:30 PM in office</p>
                  <p><span className="font-medium">Saturday:</span> Closed</p>
                  <p><span className="font-medium">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex justify-center md:justify-start">
              <a href="https://www.instagram.com/kalonhealthcare/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
