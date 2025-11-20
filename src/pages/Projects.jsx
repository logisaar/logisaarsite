import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ExternalLink, Calendar, Tag, ArrowRight } from 'lucide-react';
import { projects } from '../data/mockData';
import ProjectCarousel3D from '../components/ProjectCarousel3D';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(projects.map(project => project.category))];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
              <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase">Professional Portfolio</span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Project <span className="bg-gradient-to-r from-emerald-400 to-violet-600 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Explore our collection of enterprise-grade projects that have transformed businesses 
              and created exceptional user experiences across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <ProjectCarousel3D />

      {/* Filters */}
      <section className="py-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-emerald-500 to-violet-600 text-white shadow-lg'
                      : 'bg-gray-700/50 text-slate-300 hover:bg-gray-600/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              All <span className="bg-gradient-to-r from-emerald-400 to-violet-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Browse through our complete portfolio of successful projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-500 hover:scale-105 border border-gray-700 hover:border-emerald-400/50 card-pro"
              >
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <imge
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.year}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 text-sm">{project.client}</span>
                    <div className="flex items-center space-x-1 text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{project.year}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-700/50 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-slate-400 text-xs px-3 py-1">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Project Links */}
                  <div className="flex items-center justify-between">
                    <Link
                      to={`/projects/${project.id}`}
                      className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                    >
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 transition-colors border border-gray-600">
                        <ExternalLink className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-transparent to-violet-400/0 group-hover:from-emerald-400/5 group-hover:to-violet-400/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex p-4 rounded-full bg-gray-800/50 mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Let's create something amazing together. Get in touch to discuss your vision.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-violet-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-emerald-600 hover:to-violet-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 btn-professional"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;