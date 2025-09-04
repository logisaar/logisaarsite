import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectCarousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  const totalSlides = projects.length;
  const anglePerSlide = 360 / totalSlides;
  const radius = 350; // Increased radius for more spacing

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + .5) % totalSlides);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isDragging, totalSlides]);

  // Touch/Mouse handlers for mobile and desktop
  const handleStart = (e) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;
    
    if (Math.abs(deltaX) > 80) {
      if (deltaX > 0) {
        setCurrentIndex((prev) => (prev - .5 + totalSlides) % totalSlides);
      } else {
        setCurrentIndex((prev) => (prev + .5) % totalSlides);
      }
      setStartX(clientX);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + .5) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - .5 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 4000);
  };

  const getCardStyle = (index) => {
    const angle = (index - currentIndex) * anglePerSlide;
    const isCenter = index === currentIndex;
    const project = projects[index];
    
    // Uniform scale, opacity, brightness for all cards
  const scale = 0.92; // Reduced scale for smaller cards
    const opacity = 1;
    const brightness = 1;
    const zTranslate = radius + 50;
    
    // Remove border for mobile app project card (id: 1)
    const border = project.id === 1 ? 'none' : (isCenter ? '2px solid rgba(16, 185, 129, 0.85)' : '1px solid rgba(100, 116, 139, 0.5)');
    
    return {
      transform: `
        rotateY(${angle}deg) 
        translateZ(${zTranslate}px) 
        scale(${scale})
      `,
      opacity: opacity,
      zIndex: isCenter ? 30 : 10,
      filter: `brightness(${brightness})`,
      border: isCenter ? '2px solid rgba(16, 185, 129, 0.85)' : 'none',
      border: border,
      transition: isDragging ? 'none' : 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 grid-pattern-pro opacity-5"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-violet-500/10 to-purple-600/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Featured Work</span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Project <span className="bg-gradient-to-r from-emerald-400 to-violet-600 bg-clip-text text-transparent">Showcase</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore our portfolio of cutting-edge projects in an immersive 3D experience.
          </p>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[650px]" style={{ perspective: '1200px' }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-30 bg-emerald-500/20 hover:bg-emerald-500/40 backdrop-blur-sm border border-emerald-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110 group shadow-lg"
          >
            <ChevronLeft className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 bg-emerald-500/20 hover:bg-emerald-500/40 backdrop-blur-sm border border-emerald-400/30 rounded-full p-4 transition-all duration-300 hover:scale-110 group shadow-lg"
          >
            <ChevronRight className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />
          </button>

          {/* 3D Carousel */}
          <div
            ref={carouselRef}
            className="relative w-64 h-80" // Reduced card container size
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${-currentIndex * anglePerSlide}deg)`,
              transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="absolute w-64 h-80 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                style={getCardStyle(index)}
                onClick={() => index !== currentIndex && goToSlide(index)}
              >
                <div className="relative w-full h-full bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-2xl overflow-hidden group hover:border-emerald-400/60 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    {/* External Link Icon at top right */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 left-3 z-20 p-2 rounded-full bg-orange-700 hover:bg-emerald-500/80 transition-colors border border-gray-600/50 shadow-lg"
                      onClick={e => e.stopPropagation()}
                      title={`Visit ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5 text-white" />
                    </a>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {project.year}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm text-emerald-400 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-400/30">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 h-48 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 text-sm font-medium">{project.client}</span>
                        <div className="flex items-center space-x-1 text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{project.year}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-gray-700/60 text-slate-300 px-2 py-1 rounded-full text-xs border border-gray-600/50 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/projects/${project.id}`}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>

                  {/* Center Card Glow Effect */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-transparent to-violet-400/5 transition-all duration-300 pointer-events-none rounded-2xl border border-emerald-400/20"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-emerald-400 to-violet-600 shadow-lg shadow-emerald-400/30'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Controls Info */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Click cards or use arrows to navigate • Auto-play: {isAutoPlaying ? 'Active' : 'Paused'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectCarousel3D;