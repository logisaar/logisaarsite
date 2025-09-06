import React from 'react';
import '@fontsource/gloria-hallelujah'; // Regular
import { Star, Zap, Music } from 'lucide-react';
import instagram from '../image/instagram.jpeg';
import facebookImg from '../image/facebook.jpeg';
import videoImg from '../image/videomaking.png';
import bannerImg from '../image/postor.png';
import '../styles/Testimonials.css';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Pulsating Background Overlay */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.1),rgba(0,255,0,0.1),rgba(0,0,255,0.1))] animate-pulse-background"></div>

      {/* Content Overlay */}
      <div className="relative top-20 z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Heading */}
        <h1 className="font-doodle text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-teal-400 mb-12 animate-text-glow text-center">
  Ignite Your Visual Vibe!
</h1>


       <p className="font-funny text-xl md:text-2xl text-white/90 mb-16 max-w-4xl mx-auto text-center animate-fade-in-out">
  Experience the madness of Meta Ads, Video Magic, and Banner Explosions—pure visual chaos awaits!
</p>


        {/* Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl px-6">
          {/* First Pair */}
          <div className="transform rotate-6 hover:rotate-[-6deg] transition-all duration-500 animate-float-up relative">
            <img
              src={instagram}
              alt="Instagram"
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-glow-pink"
            />
            <Star className="absolute -top-5 -left-5 text-yellow-400 animate-twinkle" size={30} />
          </div>

          <div className="transform -rotate-6 hover:rotate-6 transition-all duration-500 animate-float-down relative">
            <img
              src={facebookImg}
              alt="Facebook"
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-glow-blue"
            />
            <Zap className="absolute -bottom-5 -right-5 text-blue-400 animate-pulse-fast" size={30} />
          </div>

          {/* Second Pair */}
          <div className="transform rotate-3 bottom-40 hover:rotate-[-3deg] transition-all duration-500 animate-slide-left relative">
            <img
              src={videoImg}
              alt="Video"
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-glow-green"
            />
            <Music className="absolute top-5 left-5 text-green-400 animate-spin-slow" size={30} />
          </div>

          <div className="transform bottom-10 -rotate-3 hover:rotate-3 transition-all duration-500 animate-slide-right relative">
            <img
              src={bannerImg}
              alt="Banner"
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-glow-purple"
            />
            <Star className="absolute bottom-5 right-5 text-purple-400 animate-twinkle-delay" size={30} />
          </div>
        </div>

        {/* Decorations */}
        <div className="absolute top-5 left-5 animate-orbit">
          <svg className="w-16 h-16 text-teal-500 opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-5 right-5 animate-orbit-reverse">
          <svg className="w-20 h-20 text-pink-500 opacity-40" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
          </svg>
        </div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
    </div>
  );
};

export default Testimonials;
