import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/mockData';

const FeaturedProjects = () => {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover some of our most successful projects that have transformed businesses and delighted users.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-900/70 transition-all duration-500 hover:scale-105 border border-slate-700 hover:border-cyan-400/50"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.year}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
                  <span className="text-slate-400 text-sm">{project.client}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
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
                      className="bg-slate-800/80 text-slate-300 px-3 py-1 rounded-full text-xs font-medium border border-slate-600"
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
                    className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                  >
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors border border-slate-600">
                      <ExternalLink className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-transparent to-purple-400/0 group-hover:from-cyan-400/5 group-hover:to-purple-400/5 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
          >
            <span>View All Projects</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;