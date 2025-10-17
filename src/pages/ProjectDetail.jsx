import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, Users, Award, TrendingUp } from 'lucide-react';
import { projects } from '../data/mockData';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-slate-400 mb-8">The project you're looking for doesn't exist.</p>
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.category}
                </span>
                <span className="text-slate-400">{project.year}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {project.title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <span className="text-slate-300">Client: {project.client}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-400" />
                  <span className="text-slate-300">Year: {project.year}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                >
                  <span>View Live Site</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center space-x-2 border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-full font-medium hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
                >
                  <span>Similar Project</span>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-8 left-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">300%</div>
                    <div className="text-slate-400 text-sm">ROI Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">99%</div>
                    <div className="text-slate-400 text-sm">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Challenge */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white mb-6">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Challenge</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Solution</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>

            {/* Results */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Results</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.results}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Technologies <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Used</span>
            </h2>
            <p className="text-xl text-slate-300">
              The powerful tech stack that brought this project to life.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 text-center group"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-slate-300 font-medium group-hover:text-cyan-400 transition-colors">
                  {tech}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Related <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3).map((relatedProject) => (
              <Link
                key={relatedProject.id}
                to={`/projects/${relatedProject.id}`}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 border border-slate-700 hover:border-cyan-400/50"
              >
                <div className="relative">
                  <img
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {relatedProject.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-2">
                    {relatedProject.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;