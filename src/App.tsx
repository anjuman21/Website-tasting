import { useState, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * SERIES CONFIG
 * ------------------------------------------------------------------
 * Each entry is one tab/section of the fan hub. Swap `src` for your
 * own video file (see /public/videos) and adjust copy/colors freely.
 * No official artwork, logos, or footage is bundled here — only
 * placeholders and an original color treatment per series.
 * ------------------------------------------------------------------
 */
const SERIES = [
  {
    key: 'naruto',
    label: 'Naruto',
    tagline: 'The Path of the Ninja',
    description:
      'Follow the journey of a young shinobi chasing recognition, bonds, and the will of fire.',
    src: '/images/naruto-overlay.png',
    accent: '#FF7A29',
    textColor: '#FFF4EA',
  },
  {
    key: 'bleach',
    label: 'Bleach',
    tagline: 'Soul Reaper Chronicles',
    description:
      'A world where the line between the living and the dead is guarded by blade and soul.',
    src: '/images/bleach-overlay.png',
    accent: '#3EC6E0',
    textColor: '#EAF9FC',
  },
  {
    key: 'attack-on-titan',
    label: 'Attack on Titan',
    tagline: 'Beyond the Walls',
    description:
      'Humanity fights for survival at the edge of extinction, where every wall hides a secret.',
    src: '/images/attack-on-titan-overlay.png',
    accent: '#C94F4F',
    textColor: '#F5EBEA',
  },
  {
    key: 'one-piece',
    label: 'One Piece',
    tagline: 'Set Sail for Freedom',
    description:
      'A crew of dreamers sails the Grand Line chasing treasure, freedom, and each other.',
    src: '/images/one-piece-overlay.png',
    accent: '#2E8B8B',
    textColor: '#EAF6F4',
  },
];

const NAV_LINKS = ['Series', 'Watch Parties', 'Fan Art', 'Community'];

const OVERLAY_IMAGE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

function App() {
  const [activeSeries, setActiveSeries] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const current = SERIES[activeSeries];
  const heroTextStyle = { color: current.textColor };

  const handleSeriesSwitch = useCallback(
    (index: number) => {
      if (index === activeSeries || isTransitioning) return;
      setActiveSeries(index);
      setIsTransitioning(true);
      cooldownRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [activeSeries, isTransitioning]
  );

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* ---------------- Background video layer ---------------- */}
      {SERIES.map((series, index) => (
        <video
          key={series.key}
          className={`video-layer absolute inset-0 w-full h-full object-cover ${
            index === activeSeries ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          src={series.src}
        />
      ))}

      {/* ---------------- Transparent PNG overlay ---------------- */}
      <img
        src={OVERLAY_IMAGE}
        alt=""
        aria-hidden="true"
        className="animate-train-bob absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />

      {/* ---------------- Content layer ---------------- */}
      <div
        className="relative flex flex-col h-full w-full px-4 sm:px-8 md:px-12 pt-6 pb-6"
        style={{ zIndex: 2 }}
      >
        {/* ---------------- Navigation ---------------- */}
        <nav className="flex items-center justify-between w-full">
          <span className="italic text-xl sm:text-2xl text-white">ShonenHub</span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 liquid-glass rounded-full px-6 py-2.5 font-sans">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/90 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
            <button
              className="text-sm font-medium rounded-full px-4 py-1.5 transition-colors"
              style={{ backgroundColor: current.accent, color: '#0B0B0B' }}
            >
              Join the Crew
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden liquid-glass rounded-full p-2.5 relative w-11 h-11 flex items-center justify-center"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <Menu
              size={20}
              className="absolute text-white transition-all duration-300"
              style={{
                opacity: isMenuOpen ? 0 : 1,
                transform: isMenuOpen
                  ? 'rotate(90deg) scale(0.75)'
                  : 'rotate(0deg) scale(1)',
              }}
            />
            <X
              size={20}
              className="absolute text-white transition-all duration-300"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen
                  ? 'rotate(0deg) scale(1)'
                  : 'rotate(-90deg) scale(0.75)',
              }}
            />
          </button>
        </nav>

        {/* ---------------- Mobile menu overlay ---------------- */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center md:hidden">
            <div className="flex flex-col items-center gap-8 font-sans">
              {NAV_LINKS.map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className="mobile-link text-white text-3xl"
                  style={{
                    transitionDelay: `${100 + index * 50}ms`,
                    opacity: 1,
                    transform: 'translateY(0)',
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button
                className="mt-4 text-base font-medium rounded-full px-8 py-3 transition-transform duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: current.accent, color: '#0B0B0B' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Join the Crew
              </button>
            </div>
            <button
              className="absolute top-6 right-4 sm:right-8 liquid-glass rounded-full p-2.5 w-11 h-11 flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} className="text-white" />
            </button>
          </div>
        )}

        {/* ---------------- Hero content ---------------- */}
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
          <div
            className="liquid-glass rounded-full px-4 py-2 text-xs sm:text-sm font-sans transition-colors duration-700"
            style={heroTextStyle}
          >
            {current.tagline}
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl transition-colors duration-700"
            style={heroTextStyle}
          >
            {current.label}
          </h1>

          <p
            className="max-w-xl leading-relaxed font-sans text-sm sm:text-base transition-colors duration-700"
            style={{ color: heroTextStyle.color, opacity: 0.85 }}
          >
            {current.description}
          </p>

          {/* Email capture */}
          <div className="liquid-glass rounded-full flex items-center p-1.5 w-full max-w-[320px] sm:max-w-sm font-sans transition-colors duration-700">
            <input
              type="email"
              placeholder="Your Best Email"
              className="bg-transparent border-none outline-none flex-1 min-w-0 px-4 py-2 text-sm placeholder:opacity-60"
              style={heroTextStyle}
            />
            <button
              className="text-sm font-medium rounded-full px-4 py-2 whitespace-nowrap transition-colors"
              style={{ backgroundColor: current.accent, color: '#0B0B0B' }}
            >
              Notify Me
            </button>
          </div>

          {/* Series switcher */}
          <div className="flex items-center gap-4 sm:gap-6 font-sans mt-2 flex-wrap justify-center">
            {SERIES.map((series, index) => {
              const isActive = index === activeSeries;
              return (
                <button
                  key={series.key}
                  onClick={() => handleSeriesSwitch(index)}
                  className="text-xs sm:text-sm pb-1 border-b-2 transition-all duration-500"
                  style={{
                    color: isActive ? heroTextStyle.color : 'rgba(255,255,255,0.5)',
                    borderColor: isActive ? current.accent : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '0.5';
                  }}
                >
                  {series.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- Bottom stats ---------------- */}
        <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-white/70 text-xs sm:text-sm font-sans">
          <span>4 Featured Series</span>
          <span className="hidden sm:inline">|</span>
          <span>Weekly Watch Parties</span>
          <span className="hidden sm:inline">|</span>
          <span>Fan-Made Content Only</span>
          <span className="hidden sm:inline">|</span>
          <span>Built by Fans, for Fans</span>
        </div>
      </div>
    </section>
  );
}

export default App;
