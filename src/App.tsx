import { useState, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const VIDEOS = [
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4',
    label: 'Golden Hour',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4',
    label: 'Still Water',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4',
    label: 'Deep Woods',
  },
  {
    src: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4',
    label: 'Quiet Dawn',
  },
];

const NAV_LINKS = ['How It Works', 'Features', 'Pricing', 'Community'];

const OVERLAY_IMAGE =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png';

const DARK_TEXT_COLOR = '#182C41';
const DEEP_WOODS_INDEX = 2;

function App() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDark = activeVideo === DEEP_WOODS_INDEX;
  const heroTextStyle = { color: isDark ? DARK_TEXT_COLOR : '#ffffff' };

  const handleVideoSwitch = useCallback(
    (index: number) => {
      if (index === activeVideo || isTransitioning) return;
      setActiveVideo(index);
      setIsTransitioning(true);
      cooldownRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    },
    [activeVideo, isTransitioning]
  );

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* ---------------- Background video layer ---------------- */}
      {VIDEOS.map((video, index) => (
        <video
          key={video.src}
          className={`video-layer absolute inset-0 w-full h-full object-cover ${
            index === activeVideo ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          src={video.src}
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
          <span className="italic text-xl sm:text-2xl text-white">Lumora</span>

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
            <button className="bg-white text-black text-sm font-medium rounded-full px-4 py-1.5 hover:bg-white/90 transition-colors">
              Get Started
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
                className="mt-4 bg-white text-black text-base font-medium rounded-full px-8 py-3 transition-transform duration-300 hover:scale-105 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
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
            Over 10,000 minds already finding their clarity
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl transition-colors duration-700"
            style={heroTextStyle}
          >
            Clarity in an Endlessly
            <br />
            Noisy Universe
          </h1>

          <p
            className="max-w-xl leading-relaxed font-sans text-sm sm:text-base transition-colors duration-700"
            style={{ color: isDark ? DARK_TEXT_COLOR : 'rgba(255,255,255,0.85)' }}
          >
            Rise above the chaos of pings, infinite scrolling, and relentless
            demands. Discover how to protect your presence and create with
            intention.
          </p>

          {/* Email capture */}
          <div className="liquid-glass rounded-full flex items-center p-1.5 w-full max-w-[320px] sm:max-w-sm font-sans transition-colors duration-700">
            <input
              type="email"
              placeholder="Your Best Email"
              className="bg-transparent border-none outline-none flex-1 min-w-0 px-4 py-2 text-sm placeholder:opacity-60"
              style={heroTextStyle}
            />
            <button className="bg-white text-black text-sm font-medium rounded-full px-4 py-2 whitespace-nowrap hover:bg-white/90 transition-colors">
              Get Early Access
            </button>
          </div>

          {/* Video switcher */}
          <div className="flex items-center gap-4 sm:gap-6 font-sans mt-2">
            {VIDEOS.map((video, index) => {
              const isActive = index === activeVideo;
              return (
                <button
                  key={video.label}
                  onClick={() => handleVideoSwitch(index)}
                  className="text-xs sm:text-sm pb-1 border-b-2 transition-all duration-500"
                  style={{
                    color: isActive
                      ? heroTextStyle.color
                      : isDark
                      ? 'rgba(24,44,65,0.5)'
                      : 'rgba(255,255,255,0.5)',
                    borderColor: isActive ? heroTextStyle.color : 'transparent',
                    opacity: isActive ? 1 : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.opacity = '0.5';
                  }}
                >
                  {video.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- Bottom stats ---------------- */}
        <div className="flex items-center justify-center flex-wrap gap-x-2 gap-y-1 text-white/70 text-xs sm:text-sm font-sans">
          <span>60+ Deep Sessions</span>
          <span className="hidden sm:inline">|</span>
          <span>12,000+ Creators</span>
          <span className="hidden sm:inline">|</span>
          <span>4.8 User Satisfaction</span>
          <span className="hidden sm:inline">|</span>
          <span>Intentional-First Design</span>
        </div>
      </div>
    </section>
  );
}

export default App;
