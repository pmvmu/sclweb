import React, { useState, useEffect } from 'react';

// --- SVG Icons (Replaced react-icons) ---
// This removes the external dependency that was causing the error.
const IconX = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
  </svg>
);

const IconMenu = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
  </svg>
);

const IconChevronDown = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
  </svg>
);


// --- Main App Component ---
// This component assembles the entire one-page website.
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Effect to handle scroll animations on component mount
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-animate').forEach(el => {
      observer.observe(el);
    });
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-white text-gray-800 font-sinhala">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Sinhala:wght@400;700&display=swap');
        
        html { scroll-behavior: smooth; }
        body { background-color: #FFF; }
        .font-sinhala { font-family: 'Noto Serif Sinhala', serif; }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .hero-bg {
          background-image: linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.9)), url('https://placehold.co/1920x1080/EAEAEA/800000?text=පාසල්+පරිශ්‍රය');
          background-size: cover;
          background-position: center;
        }

        .section-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      
      <Header 
        onScroll={scrollToSection} 
        onPortalClick={() => setIsModalOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main>
        <Hero onScroll={scrollToSection} />
        <PrincipalMessage />
        <Associations />
        <History />
        <Programs />
      </main>
      <Contact />
      
      {isModalOpen && <PortalModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

// --- Header Component ---
const Header = ({ onScroll, onPortalClick, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navLinks = [
    { id: 'home', label: 'මුල් පිටුව' },
    { id: 'principal', label: 'විදුහල්පති පණිවිඩය' },
    { id: 'associations', label: 'සංගම්' },
    { id: 'history', label: 'ඉතිහාසය' },
    { id: 'contact', label: 'සම්බන්ධ වන්න' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto max-w-7xl flex justify-between items-center p-3 rounded-xl glass-effect shadow-md">
        <div className="text-xl md:text-2xl font-bold text-[#800000]">
          පොලේගොඩ ම.වි.
        </div>
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map(link => (
            <button key={link.id} onClick={() => onScroll(link.id)} className="text-[#800000] hover:text-[#FFD700] transition-colors duration-300">
              {link.label}
            </button>
          ))}
        </nav>
        <button onClick={onPortalClick} className="hidden lg:block bg-[#800000] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#FFD700] hover:text-[#800000] transition-all duration-300 transform hover:scale-105">
          ද්වාරය
        </button>
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-2xl text-[#800000]">
            <IconMenu />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-xl glass-effect shadow-lg">
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => onScroll(link.id)} className="text-[#800000] text-left hover:text-[#FFD700] transition-colors duration-300">
                {link.label}
              </button>
            ))}
            <button onClick={() => { onPortalClick(); setIsMobileMenuOpen(false); }} className="bg-[#800000] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#FFD700] hover:text-[#800000] transition-all duration-300">
              ද්වාරය
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const Hero = ({ onScroll }) => (
  <section id="home" className="min-h-screen flex items-center justify-center hero-bg pt-24">
    <div className="text-center section-animate">
      <h1 className="text-4xl md:text-6xl font-bold text-[#800000] leading-tight drop-shadow-md">
        පොලේගොඩ මහා විද්‍යාලයට<br/>ඔබ සාදරයෙන් පිළිගනිමු!
      </h1>
      <p className="text-lg text-gray-700 mt-4">ශිල්ප නැණස පිරිපුන්, ගුණ නුවණින් පෝෂිත දරු පරපුරක්</p>
      <button onClick={() => onScroll('principal')} className="mt-8 bg-[#800000] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#FFD700] hover:text-[#800000] transition-all duration-300 transform hover:scale-105 shadow-lg">
        වැඩිදුරටත් <IconChevronDown className="inline ml-2" />
      </button>
    </div>
  </section>
);

// --- Principal's Message Section ---
const PrincipalMessage = () => (
  <section id="principal" className="py-20 bg-gray-50">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-12 px-6 section-animate">
      <img 
        src="https://placehold.co/300x300/800000/FFFFFF?text=විදුහල්පතිතුමා" 
        alt="විදුහල්පතිතුමා" 
        className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-[#FFD700] shadow-xl"
      />
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-4">විදුහල්පති පණිවිඩය</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          ශිල්ප නැණස පිරිපුන්, ගුණ නුවණින් පෝෂිත, අභියෝග ජයගන්නා දරු පරපුරක් රටට දායාද කිරීම අපගේ ඒකායන අරමුණයි. පොලේගොඩ මහා විද්‍යාලයේ නිල වෙබ් අඩවිය වෙත ඔබ සැම සාදරයෙන් පිළිගනිමි. අපගේ දැක්ම, මෙහෙවර සහ පාසලේ ප්‍රගතිය පිළිබඳව මෙමගින් ඔබව දැනුවත් කිරීමට ලැබීම සතුටකි.
        </p>
      </div>
    </div>
  </section>
);

// --- Associations Section ---
const AssociationCard = ({ icon, title }) => (
  <div className="glass-effect p-6 rounded-xl text-center transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl">
    <div className="text-5xl text-[#800000] mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
  </div>
);

const Associations = () => (
  <section id="associations" className="py-20">
    <div className="container mx-auto max-w-6xl px-6 section-animate">
      <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-12 text-center">පාසල් සංගම් සහ ඒකක</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AssociationCard icon="☸️" title="බෞද්ධ සංගමය" />
        <AssociationCard icon="💻" title="තොරතුරු තාක්ෂණ සංගමය" />
        <AssociationCard icon="📷" title="මාධ්‍ය ඒකකය" />
        <AssociationCard icon="🎵" title="සංගීත ඒකකය" />
      </div>
    </div>
  </section>
);

// --- History Section ---
const History = () => (
  <section id="history" className="py-20 bg-gray-50">
    <div className="container mx-auto max-w-4xl px-6 text-center section-animate">
      <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-6">අපේ ඉතිහාසය</h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-8">
        වසර ගණනාවක අභිමානවත් ඉතිහාසයකට උරුමකම් කියන පොලේගොඩ මහා විද්‍යාලය, දහස් සංඛ්‍යාත දූ දරුවන්ගේ නැණස පෑදූ විදු පියසකි. ගුණාත්මක අධ්‍යාපනයක් ලබා දෙමින්, සමාජයට වැඩදායී පුරවැසියන් බිහි කිරීම අපගේ ගමන් මගේ ආරම්භයේ සිටම පරමාර්ථය විය.
      </p>
      <button className="bg-transparent border-2 border-[#800000] text-[#800000] px-8 py-3 rounded-lg font-bold text-lg hover:bg-[#800000] hover:text-white transition-all duration-300">
        සම්පූර්ණ ඉතිහාසය
      </button>
    </div>
  </section>
);

// --- Programs Section (Image Carousel) ---
const Programs = () => {
  const images = [
    'https://placehold.co/800x500/800000/FFFFFF?text=Annual+Sports+Meet',
    'https://placehold.co/800x500/FFD700/000000?text=Prize+Giving+Ceremony',
    'https://placehold.co/800x500/808080/FFFFFF?text=Science+Exhibition',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="programs" className="py-20">
      <div className="container mx-auto max-w-5xl px-6 section-animate">
        <h2 className="text-3xl md:text-4xl font-bold text-[#800000] mb-12 text-center">විශේෂ වැඩසටහන්</h2>
        <div className="relative overflow-hidden rounded-xl shadow-2xl">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((src, index) => (
              <img key={index} src={src} alt={`School Program ${index + 1}`} className="w-full flex-shrink-0" />
            ))}
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-[#800000] p-3 rounded-full shadow-md">&lt;</button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white text-[#800000] p-3 rounded-full shadow-md">&gt;</button>
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
const Contact = () => (
  <footer id="contact" className="bg-[#333] text-white py-12">
    <div className="container mx-auto max-w-6xl px-6 text-center section-animate">
      <h2 className="text-3xl font-bold text-white mb-6">සම්බන්ධ වන්න</h2>
      <p className="text-lg text-gray-300">
        පොලේගොඩ මහා විද්‍යාලය, පොලේගොඩ, ශ්‍රී ලංකාව.
      </p>
      <p className="text-lg text-gray-300 mt-2">
        විද්‍යුත් තැපෑල: <a href="mailto:info@polegodamv.edu.lk" className="text-[#FFD700] hover:underline">info@polegodamv.edu.lk</a> | දුරකථන: <span className="text-[#FFD700]">+94 XX XXX XXXX</span>
      </p>
      <div className="flex justify-center space-x-6 mt-6">
        <a href="#" className="text-2xl text-white hover:text-[#FFD700] transition-colors">FB</a>
        <a href="#" className="text-2xl text-white hover:text-[#FFD700] transition-colors">YT</a>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-6">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} පොලේගොඩ ම.වි. | සියලුම හිමිකම් ඇවිරිණි.</p>
      </div>
    </div>
  </footer>
);

// --- Portal Modal Component ---
const PortalModal = ({ onClose }) => {
  const [role, setRole] = useState('student');

  const getFormFields = () => {
    switch(role) {
      case 'teacher':
        return (
          <>
            <FormInput label="විද්‍යුත් තැපෑල (Email)" type="email" id="email" />
            <FormInput label="රහස් කේතය (Secret Code)" type="text" id="secret-code" />
            <FormInput label="මුරපදය (Password)" type="password" id="password" />
          </>
        );
      case 'parent':
        return (
          <>
            <FormInput label="විද්‍යුත් තැපෑල (Email)" type="email" id="email" />
            <FormInput label="මුරපදය (Password)" type="password" id="password" />
          </>
        );
      case 'student':
      default:
        return (
          <>
            <FormInput label="දර්ශක අංකය (Index Number)" type="text" id="index-number" />
            <FormInput label="මුරපදය (Password)" type="password" id="password" />
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div className="relative w-full max-w-md p-8 rounded-2xl glass-effect text-gray-800 mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl text-[#800000] hover:text-[#FFD700]">
          <IconX />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-[#800000]">ද්වාරය වෙත පිවිසෙන්න</h2>
          <p className="text-gray-600 mt-2">ඔබගේ ගිණුමට පිවිසීමට තොරතුරු ඇතුලත් කරන්න.</p>
        </div>
        <form className="space-y-4">
          <div className="form-group">
            <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-1">ඔබගේ කාර්යභාරය (Your Role)</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FFD700]">
              <option value="student">ශිෂ්‍ය (Student)</option>
              <option value="teacher">ගුරු (Teacher)</option>
              <option value="parent">දෙමාපිය (Parent)</option>
            </select>
          </div>
          {getFormFields()}
          <button type="submit" className="w-full mt-4 bg-[#800000] text-white p-3 rounded-lg font-bold text-lg hover:bg-[#FFD700] hover:text-[#800000] transition-all duration-300 transform hover:scale-105">
            පිවිසෙන්න (Login)
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            ගිණුමක් නැද්ද? <a href="#" className="text-[#800000] font-bold hover:underline">ලියාපදිංචි වන්න</a>
          </p>
        </form>
      </div>
    </div>
  );
};

// --- Reusable Form Input Component ---
const FormInput = ({ label, type, id }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
    <input type={type} id={id} className="w-full p-3 rounded-lg border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FFD700]" />
  </div>
);
