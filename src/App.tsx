import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
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
  Star,
  Check,
  Instagram,
  Facebook,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [homeDropdown, setHomeDropdown] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesDropdown, setMobileServicesDropdown] = useState(false);
  const [mobileHomeDropdown, setMobileHomeDropdown] = useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container') && !target.closest('.hamburger-button')) {
        setServicesDropdown(false);
        setHomeDropdown(false);
        setMobileServicesDropdown(false);
        setMobileHomeDropdown(false);
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
        { id: 'careers', label: 'Careers' }
      ]
    },
    { 
      id: 'services', 
      label: 'Services',
      dropdown: [
        { id: 'primary-care', label: 'Primary Care' },
        { id: 'iv-treatments', label: 'IV Treatments' },
        { id: 'weight-loss', label: 'Weight Loss' },
        { id: 'womens-health', label: "Women's Health" },
        { id: 'mens-health', label: "Men's Health" },
        { id: 'screenings', label: 'Screenings' }
      ]
    },
    { id: 'shop', label: 'Shop' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const toggleMobileDropdown = (type: 'services' | 'home') => {
    if (type === 'services') {
      setMobileServicesDropdown(!mobileServicesDropdown);
      setMobileHomeDropdown(false);
    } else {
      setMobileHomeDropdown(!mobileHomeDropdown);
      setMobileServicesDropdown(false);
    }
  };

  const handleMobileNavClick = (pageId: string) => {
    if (pageId === 'policies') {
      window.open('/policies.html', '_blank');
    } else {
      setCurrentPage(pageId);
    }
    setMobileMenuOpen(false);
    setMobileServicesDropdown(false);
    setMobileHomeDropdown(false);
  };

  const renderNavigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="text-3xl font-serif font-light text-black cursor-pointer tracking-wide"
            onClick={() => setCurrentPage('home')}
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
                        if (item.id === 'services') {
                          setServicesDropdown(!servicesDropdown);
                          setHomeDropdown(false);
                        } else if (item.id === 'home') {
                          setHomeDropdown(!homeDropdown);
                          setServicesDropdown(false);
                        }
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (item.id === 'services' && servicesDropdown) || (item.id === 'home' && homeDropdown) 
                            ? 'rotate-180' 
                            : ''
                        }`} 
                      />
                    </div>
                    
                    {((item.id === 'services' && servicesDropdown) || (item.id === 'home' && homeDropdown)) && (
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
                                window.open('/policies.html', '_blank');
                              } else {
                                setCurrentPage(subItem.id);
                              }
                              setServicesDropdown(false);
                              setHomeDropdown(false);
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
                    onClick={() => setCurrentPage(item.id)}
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
                      onClick={() => toggleMobileDropdown(item.id as 'services' | 'home')}
                    >
                      <span>{item.label}</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          (item.id === 'services' && mobileServicesDropdown) || (item.id === 'home' && mobileHomeDropdown) 
                            ? 'rotate-180' 
                            : ''
                        }`} 
                      />
                    </button>
                    
                    {((item.id === 'services' && mobileServicesDropdown) || (item.id === 'home' && mobileHomeDropdown)) && (
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
              <span className="text-sm">386 347 5514</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Mail className="w-4 h-4 mr-3" style={{ color: '#D4AF37' }} />
              <span className="text-sm">docayupova@gmail.com</span>
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
      {/* About Section - Now at the top */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-serif font-light mb-8" style={{ color: '#D4AF37' }}>
              About Kalon Primary Care and Wellness
            </h2>
            <p className="text-2xl text-gray-700 font-light leading-relaxed max-w-4xl mx-auto">
              Redefining wellness with exceptional primary care, aesthetics, and personalized treatments.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              At Kalon Primary Care and Wellness, we believe health is the foundation of beauty, energy, and confidence. 
              We are committed to delivering the highest quality medical care in a serene, luxury environment. From preventive 
              health screenings to advanced anti-aging treatments, every service is designed to optimize your well-being.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Our services include comprehensive primary care, women's health, men's health, medical aesthetics, IV therapy, 
              wellness programs, and advanced screenings — all tailored to meet your unique needs. We combine medical expertise 
              with a personalized touch, ensuring that every visit is both effective and restorative.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="text-2xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                Hybrid Care Model
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                We offer flexible healthcare delivery through both <strong>in-office visits</strong> and <strong>telehealth consultations</strong>, 
                providing you with convenient access to quality care when and how you need it.
              </p>
              
              {/* Weight Loss Kit */}
              <div className="bg-light-sage/20 border border-sage/30 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-serif font-medium mb-4 text-deep-sage">Weight Loss Kit 30 Day Supply</h3>
                <p className="text-warm-gray mb-6 leading-relaxed">
                  This complete 1-month program combines three key supplements designed to support fat loss, appetite control, energy, and recovery:
                </p>
                
                <div className="space-y-6">
                  {/* Naltrexone */}
                  <div className="border-l-4 border-sage pl-4">
                    <h4 className="text-lg font-serif font-medium text-charcoal mb-2">1. Naltrexone (30 Day Supply)</h4>
                    <ul className="text-warm-gray space-y-1 text-sm">
                      <li>• Nightly oral dose (LDN)</li>
                      <li>• Helps curb appetite & reduce hunger</li>
                      <li>• Supports fat burning & weight loss</li>
                      <li>• Promotes mental clarity</li>
                    </ul>
                  </div>
                  
                  {/* Sermorelin */}
                  <div className="border-l-4 border-sage pl-4">
                    <h4 className="text-lg font-serif font-medium text-charcoal mb-2">2. Sermorelin (30 Day Supply)</h4>
                    <ul className="text-warm-gray space-y-1 text-sm">
                      <li>• Nightly subcutaneous injection</li>
                      <li>• Stimulates natural growth hormone levels</li>
                      <li>• Speeds recovery from workouts</li>
                      <li>• Restores healthy sleep cycles</li>
                    </ul>
                  </div>
                  
                  {/* Lipo-Trim SL */}
                  <div className="border-l-4 border-sage pl-4">
                    <h4 className="text-lg font-serif font-medium text-charcoal mb-2">3. Lipo-Trim SL (30 Day Supply)</h4>
                    <ul className="text-warm-gray space-y-1 text-sm">
                      <li>• Daily sublingual spray (30ml)</li>
                      <li>• Contains Acetyl-L-Carnitine, B12 (Methylcobalamin), L-Leucine, L-Arginine, Inositol, L-Methionine, Betaine, Thiamine, and Folic Acid</li>
                      <li>• Boosts metabolism & energy levels</li>
                      <li>• Reduces food cravings</li>
                      <li>• Supports immune health</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-sage/10 rounded-lg">
                  <p className="text-deep-sage font-medium flex items-start">
                    <span className="text-lg mr-2">👉</span>
                    Together, this 30-day kit is designed to enhance fat burning, suppress appetite, increase energy, and support overall wellness.
                  </p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Services We Provide:</h4>
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
            
            <div className="mt-12 space-y-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center bg-gray-50 p-8 rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Shield className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                    Medical Excellence
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Medical-grade treatments delivered with precision and compassion.
                  </p>
                </div>
                
                <div className="text-center bg-gray-50 p-8 rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                    Luxury Experience
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A calm, elegant setting where your health and comfort come first.
                  </p>
                </div>
                
                <div className="text-center bg-gray-50 p-8 rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                    <Heart className="w-8 h-8 text-black" />
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
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-serif font-light mb-8 text-black">
              Experience the Kalon difference.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a 
                href="https://www.tebra.com/care/provider/nargiza-ayupova-dnp-1356796858"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 rounded-full font-medium text-black transition-all hover:opacity-90"
                style={{ backgroundColor: '#D4AF37' }}
              >
                Book a Visit
              </a>
              <button className="border-2 px-10 py-4 rounded-full font-medium text-black hover:bg-black hover:text-white transition-all"
                      style={{ borderColor: '#D4AF37' }}
                      onClick={() => setCurrentPage('contact')}>
                Text Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-serif font-light text-black mb-8 tracking-tight">
            Elevated Primary Care &<br />Holistic Wellness
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Personalized medical care and rejuvenating wellness treatments, all in one serene space in Ormond Beach, FL.
          </p>
          <div className="flex justify-center">
            <button className="border-2 text-gray-700 px-10 py-4 rounded-full font-medium hover:text-black transition-colors text-lg" style={{ borderColor: '#D4AF37' }}>
              Shop - Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'primary-care', title: 'Primary Care', description: 'Comprehensive care for your overall health', icon: Stethoscope },
              { id: 'iv-treatments', title: 'IV Therapy', description: 'Targeted wellness delivered directly to you', icon: Droplets },
              { id: 'womens-health', title: "Women's Health", description: 'Specialized care for women at every stage', icon: Heart },
              { id: 'mens-health', title: "Men's Health", description: 'Tailored healthcare solutions for men', icon: Shield },
              { id: 'screenings', title: 'Preventive Screenings', description: 'Stay ahead with proactive testing', icon: Activity }
            ].map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 p-8 rounded-lg hover:shadow-lg transition-shadow cursor-pointer group"
                   onClick={() => setCurrentPage(service.id)}>
                <service.icon className="w-12 h-12 mb-6 transition-colors" style={{ color: '#D4AF37' }} />
                <h3 className="text-2xl font-serif font-medium text-black mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center font-medium transition-colors" style={{ color: '#D4AF37' }}>
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
          <h2 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Featured Wellness Programs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Kalon Vital Reset', description: 'Primary care consult + IV hydration + nutrition plan', icon: Heart },
              { title: 'Glow from Within', description: 'Inner Beauty infusion + skin health consult', icon: Sparkles },
              { title: 'Total Health Blueprint', description: 'Labs and comprehensive health assessment', icon: Activity }
            ].map((program, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                <program.icon className="w-12 h-12 mx-auto mb-6" style={{ color: '#D4AF37' }} />
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
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'services' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Our Services</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Comprehensive healthcare and wellness services tailored to your needs.</p>
          </div>
        </div>
      )}
      {currentPage === 'iv-treatments' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>IV Therapy</h1>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Experience targeted wellness delivered directly to your bloodstream for maximum absorption and immediate benefits.
            </p>
            
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
                Kalon's IV Therapy Menu
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    name: "Kalon's All-in-One Boost IV",
                    price: "$175",
                    description: "A powerful all-in-one blend designed to boost energy, improve immunity, and enhance overall wellness."
                  },
                  {
                    name: "Kalon's B-Slim IV",
                    price: "$200",
                    description: "Formulated to support fat-burning, boost metabolism, and help you stay energized and focused."
                  },
                  {
                    name: "Kalon's White Glow IV",
                    price: "$150",
                    description: "Promotes brighter, healthier-looking skin and natural radiance from within."
                  },
                  {
                    name: "Kalon's Timeless IV",
                    price: "$175",
                    description: "Helps combat signs of aging, improve skin health, and revitalize your body."
                  },
                  {
                    name: "Kalon's Pick-Me-Up IV",
                    price: "$150",
                    description: "Perfect for restoring energy, fighting fatigue, and enhancing focus."
                  },
                  {
                    name: "Kalon's Immune IV",
                    price: "$125",
                    description: "Boosts your immune system, reduces the risk of illness, and helps you recover faster."
                  },
                  {
                    name: "Kalon's Recovery IV",
                    price: "$200",
                    description: "Designed to rehydrate your body, restore nutrients, and speed up recovery after workouts or illness."
                  }
                ].map((treatment, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-serif font-medium text-black">{treatment.name}</h3>
                      <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{treatment.price}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{treatment.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-16">
              <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
                Weight Loss Injections
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-serif font-medium text-black">B12 Injection</h3>
                    <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$30</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Boosts energy, mood, and mental clarity.</p>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-serif font-medium text-black">Lipo-C Injections</h3>
                    <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$40</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Supports fat metabolism and weight management.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-3xl font-serif font-light mb-8 text-black">
                Ready to boost your wellness?
              </h3>
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
     {currentPage === 'weight-loss' && (
       <div className="py-24 bg-white">
         <div className="max-w-6xl mx-auto px-8">
           <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Weight Loss</h1>
           <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
             Targeted weight loss solutions to support your metabolism and energy levels.
           </p>
           
          {/* Weight Loss Kit */}
          <div className="mb-16">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-8">
              <h2 className="text-4xl font-serif font-light text-center mb-8" style={{ color: '#D4AF37' }}>
                Weight Loss Kit 30 Day Supply
              </h2>
              <p className="text-lg text-gray-700 text-center mb-8 leading-relaxed">
                This complete 1-month program combines three key supplements designed to support fat loss, appetite control, energy, and recovery:
              </p>
              
              <div className="space-y-8">
                {/* Naltrexone */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="border-l-4 pl-4" style={{ borderColor: '#D4AF37' }}>
                    <h3 className="text-2xl font-serif font-medium text-black mb-4">1. Naltrexone (30 Day Supply)</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Nightly oral dose (LDN)</li>
                      <li>• Helps curb appetite & reduce hunger</li>
                      <li>• Supports fat burning & weight loss</li>
                      <li>• Promotes mental clarity</li>
                    </ul>
                  </div>
                </div>
                
                {/* Sermorelin */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="border-l-4 pl-4" style={{ borderColor: '#D4AF37' }}>
                    <h3 className="text-2xl font-serif font-medium text-black mb-4">2. Sermorelin (30 Day Supply)</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Nightly subcutaneous injection</li>
                      <li>• Stimulates natural growth hormone levels</li>
                      <li>• Speeds recovery from workouts</li>
                      <li>• Restores healthy sleep cycles</li>
                    </ul>
                  </div>
                </div>
                
                {/* Lipo-Trim SL */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="border-l-4 pl-4" style={{ borderColor: '#D4AF37' }}>
                    <h3 className="text-2xl font-serif font-medium text-black mb-4">3. Lipo-Trim SL (30 Day Supply)</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Daily sublingual spray (30ml)</li>
                      <li>• Contains Acetyl-L-Carnitine, B12 (Methylcobalamin), L-Leucine, L-Arginine, Inositol, L-Methionine, Betaine, Thiamine, and Folic Acid</li>
                      <li>• Boosts metabolism & energy levels</li>
                      <li>• Reduces food cravings</li>
                      <li>• Supports immune health</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 rounded-lg text-center" style={{ backgroundColor: '#D4AF37', color: 'black' }}>
                <p className="text-lg font-medium flex items-center justify-center">
                  <span className="text-xl mr-2">👉</span>
                  Together, this 30-day kit is designed to enhance fat burning, suppress appetite, increase energy, and support overall wellness.
                </p>
              </div>
            </div>
          </div>
          
           <div className="mb-16">
             <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
               Weight Loss Injections
             </h2>
             
             <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
               <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-2xl font-serif font-medium text-black">B12 Injection</h3>
                   <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$30</span>
                 </div>
                 <p className="text-gray-700 leading-relaxed">Boosts energy, mood, and mental clarity.</p>
               </div>
               
               <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="text-2xl font-serif font-medium text-black">Lipo-C Injections</h3>
                   <span className="text-2xl font-bold" style={{ color: '#D4AF37' }}>$40</span>
                 </div>
                 <p className="text-gray-700 leading-relaxed">Supports fat metabolism and weight management.</p>
               </div>
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
      {currentPage === 'contact' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Contact Us</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Get in touch with our team.</p>
          </div>
        </div>
      )}
      {currentPage === 'womens-health' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>
              Bio-Identical Hormones & Women's Health
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center mb-16">
                <p className="text-xl text-gray-700 leading-relaxed">
                  As women age, hormone levels naturally change. Hormones regulate growth, stress response, 
                  sexual function, and overall well-being. When production declines, imbalances can cause 
                  both physical and psychological effects.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                <h2 className="text-3xl font-serif font-medium mb-8 text-center" style={{ color: '#D4AF37' }}>
                  Key Hormones in Women's Health
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    'Estrogen',
                    'Progesterone', 
                    'Testosterone',
                    'Pregnenolone',
                    'DHEA',
                    'DHEA 7-Keto'
                  ].map((hormone, index) => (
                    <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-gray-100">
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
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      1. Pre-menopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The years before a woman's first menstrual cycle, representing normal reproductive function.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      2. Perimenopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      The transitional stage, usually between ages 35–50, lasting 2–10 years before menstruation stops. 
                      Symptoms may include hot flashes, mood swings, sleep changes, and irregular cycles.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-2xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      3. Menopause
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Marks the natural end of reproduction. Estrogen and progesterone decline, the ovaries stop 
                      releasing eggs, and pregnancy is no longer possible.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
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
                  Ready to discuss your hormonal health?
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
      {currentPage === 'reviews' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Reviews</h1>
            <p className="text-xl text-gray-600 text-center mb-12">What our patients are saying.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah M.",
                  rating: 5,
                  review: "Dr. Ayupova and her team provide exceptional care. The IV therapy sessions have completely transformed my energy levels. The office is beautiful and the staff is so welcoming.",
                  service: "IV Therapy"
                },
                {
                  name: "Michael R.",
                  rating: 5,
                  review: "Finally found a primary care provider who truly listens. The comprehensive health assessment was thorough and the personalized wellness plan is exactly what I needed.",
                  service: "Primary Care"
                },
                {
                  name: "Jennifer L.",
                  rating: 5,
                  review: "The women's health services here are outstanding. Dr. Ayupova takes time to explain everything and makes you feel comfortable discussing any concerns.",
                  service: "Women's Health"
                },
                {
                  name: "David K.",
                  rating: 5,
                  review: "Professional, knowledgeable, and caring. The men's health consultation was comprehensive and the follow-up care has been excellent. Highly recommend!",
                  service: "Men's Health"
                },
                {
                  name: "Lisa T.",
                  rating: 5,
                  review: "The Glow from Within program exceeded my expectations. Not only do I feel better internally, but my skin has never looked better. The luxury experience is unmatched.",
                  service: "Wellness Program"
                },
                {
                  name: "Robert H.",
                  rating: 5,
                  review: "Kalon offers the perfect blend of medical expertise and wellness care. The preventive screenings were thorough and the telehealth options make it so convenient.",
                  service: "Preventive Care"
                }
              ].map((review, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#D4AF37' }} />
                    ))}
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
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>
              Men's Hormonal Health & Performance Solutions
            </h1>
            
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center mb-16">
                <p className="text-xl text-gray-700 leading-relaxed mb-6">
                  As men age, their bodies naturally undergo changes. One of the most significant is the decline in 
                  hormones such as testosterone, which can affect energy, strength, mood, and sexual performance. 
                  Hormones play a key role in overall health — when levels fall out of balance, men can experience 
                  both physical and psychological effects.
                </p>
                <p className="text-xl text-gray-700 leading-relaxed">
                  The natural aging process often reduces testosterone production, leading to fatigue, loss of muscle mass, 
                  reduced libido, and other symptoms. Kalon Primary Care and Wellness provides customized solutions to 
                  restore balance and improve men's quality of life.
                </p>
              </div>
              
              <div className="border-t border-gray-200 pt-12">
                <h2 className="text-4xl font-serif font-light text-center mb-12" style={{ color: '#D4AF37' }}>
                  Hormonal Health & Treatment Options
                </h2>
                
                <div className="space-y-12">
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                      Testosterone Replacement Therapy (TRT)
                    </h3>
                    <ul className="space-y-3 text-gray-700 text-lg">
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Restores healthy testosterone levels</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Improves energy, muscle strength, and focus</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Supports healthy libido and sexual function</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 rounded-full mt-3 mr-4" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span>Enhances mood and overall well-being</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                    <h3 className="text-3xl font-serif font-medium mb-6" style={{ color: '#D4AF37' }}>
                      Trimix Injections
                    </h3>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      For men experiencing erectile dysfunction or wanting enhanced performance, Trimix injections 
                      are a reliable solution made with FDA-approved medications.
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
                  Ready to optimize your health and performance?
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
      {currentPage === 'shop' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Shop</h1>
            <p className="text-xl text-gray-600 text-center mb-12">Coming Soon - Wellness products and supplements.</p>
          </div>
        </div>
      )}
      {currentPage === 'team' && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>Our Team</h1>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src="/bd7b526b-a161-4c77-aa85-e799caa30337.jpeg" 
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
                    Payment is due at the time of service. We accept cash, credit cards, and most insurance plans. 
                    For services not covered by insurance, payment arrangements can be discussed prior to treatment.
                  </p>
                  <p>
                    Refunds for services are considered on a case-by-case basis and must be requested within 30 days 
                    of service. Refund requests should be submitted in writing to our office for review.
                  </p>
                  <p>
                    For IV therapy and injection services, refunds are not available once the service has been 
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
                    We use this information to provide healthcare services, manage appointments, process payments, 
                    send reminders, and improve your experience. We do not sell or rent your personal data. 
                    Information may only be shared with authorized healthcare providers, billing services, or when 
                    required by law.
                  </p>
                  
                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="text-xl font-serif font-medium mb-4" style={{ color: '#D4AF37' }}>
                      SMS Terms & Conditions
                    </h3>
                    <p className="mb-4">
                      By providing your phone number, you consent to receive SMS messages from us related to 
                      appointments, updates, and healthcare services. Your phone number will never be sold or 
                      shared with third parties for marketing.
                    </p>
                    
                    <p className="mb-4">
                      You may receive messages such as appointment reminders, prescription updates, and service 
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
      {!['home', 'services', 'contact', 'reviews', 'shop', 'team', 'policies', 'womens-health', 'mens-health', 'iv-treatments', 'weight-loss'].includes(currentPage) && (
        <div className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-8">
            <h1 className="text-5xl font-serif font-light text-center mb-16" style={{ color: '#D4AF37' }}>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace('-', ' ')}
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">Content coming soon.</p>
          </div>
        </div>
      )}

      {/* Contact Banner - Always at bottom */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left mb-8">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-gray-300">386 347 5514</p>
                <p className="text-gray-300 text-sm">Fax: 949 864 3080</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <Mail className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-300">docayupova@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="w-5 h-5 mr-3" style={{ color: '#D4AF37' }} />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-300">Ormond Beach, FL</p>
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
