import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code, Zap, Star, Terminal, Braces, Binary } from 'lucide-react';

const Hero = () => {
  const canvasRef = useRef(null);
  const codeElementsRef = useRef([]);
  const animationFrameRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Real programming code snippets
    const codeSnippets = [
      'const createApp = () => {',
      '  return React.createElement(',
      '    "div",',
      '    { className: "app" },',
      '    components.map(render)',
      '  );',
      '};',
      '',
      'function* fibonacci() {',
      '  let [a, b] = [0, 1];',
      '  while (true) {',
      '    yield a;',
      '    [a, b] = [b, a + b];',
      '  }',
      '}',
      '',
      'const api = async (url) => {',
      '  const response = await fetch(url);',
      '  return response.json();',
      '};',
      '',
      'export default class AI {',
      '  constructor(model) {',
      '    this.model = model;',
      '    this.init();',
      '  }',
      '  async process(input) {',
      '    return this.model.predict(input);',
      '  }',
      '}',
      '',
      'const useEffect = (fn, deps) => {',
      '  if (changed(deps)) {',
      '    cleanup();',
      '    fn();',
      '  }',
      '};',
      '',
      'SELECT * FROM users',
      'WHERE active = true',
      'ORDER BY created_at DESC',
      'LIMIT 10;',
      '',
      'git commit -m "feat: enhance UX"',
      'git push origin main',
      'npm run deploy --production'
    ];

    // Code animation system
    class CodeElement {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fontSize = Math.random() * 8 + 10;
        this.color = this.getRandomColor();
        this.life = Math.random() * 1000 + 500;
        this.age = 0;
      }

      getRandomColor() {
        const colors = [
          '#64FFDA', // Cyan
          '#BB86FC', // Purple
          '#03DAC6', // Teal
          '#CF6679', // Pink
          '#82B1FF', // Blue
          '#69F0AE', // Green
          '#FFD54F', // Yellow
          '#FF8A65'  // Orange
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age++;
        
        // Fade out over time
        this.opacity = Math.max(0, this.opacity - 0.001);
        
        // Wrap around screen
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
        
        // Reset if too old
        if (this.age > this.life) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = this.getRandomColor();
        this.age = 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}px 'Fira Code', 'Courier New', monospace`;
        ctx.fontWeight = '300';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
      }
    }

    // Create code elements
    for (let i = 0; i < 25; i++) {
      codeElementsRef.current.push(new CodeElement());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      codeElementsRef.current.forEach(element => {
        element.update();
        element.draw();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Animated Code Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-20"
        style={{ zIndex: 1 }}
      />
      
      {/* New Subtle Gradient Glowing Shapes */}
      <div className="absolute top-16 left-12 w-72 h-72 rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 opacity-10 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-16 right-12 w-96 h-96 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-800 opacity-10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 opacity-5 blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      
      {/* Professional Floating Elements */}
      <div className="absolute top-1/4 left-1/4 animate-float">
        <Terminal className="h-10 w-10 text-emerald-400 opacity-40 filter drop-shadow-lg" />
      </div>
      <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '1s' }}>
        <Braces className="h-8 w-8 text-violet-400 opacity-40 filter drop-shadow-lg" />
      </div>
      <div className="absolute bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
        <Binary className="h-9 w-9 text-cyan-400 opacity-40 filter drop-shadow-lg" />
      </div>
      <div className="absolute top-1/2 right-1/4 animate-float" style={{ animationDelay: '3s' }}>
        <Code className="h-8 w-8 text-amber-400 opacity-40 filter drop-shadow-lg" />
      </div>

      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-slide-up">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
            <span className="text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm bg-emerald-400/5 px-4 py-2 rounded-full border border-emerald-400/20">
              Elite Development Studio
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-500 to-violet-600 bg-clip-text text-transparent filter drop-shadow-lg">
              Engineering
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent filter drop-shadow-lg">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
            Architecting next-generation digital experiences through 
            <span className="text-emerald-400 font-semibold"> advanced engineering</span>, 
            <span className="text-violet-400 font-semibold"> intelligent systems</span>, and 
            <span className="text-cyan-400 font-semibold"> precision design</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link
              to="/projects"
              className="group relative bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-800 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-emerald-500/30 flex items-center space-x-3 backdrop-blur-sm border border-emerald-400/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10">Explore Portfolio</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>
            
            <Link
              to="/contact"
              className="group relative border-2 border-emerald-400 text-emerald-400 px-10 py-5 rounded-full text-lg font-semibold hover:bg-emerald-400 hover:text-gray-900 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-emerald-400/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <span className="relative z-10">Start Project</span>
            </Link>
          </div>
          
          {/* Premium Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gradient-to-r from-transparent via-slate-700 to-transparent">
            <div className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-2 filter drop-shadow-lg">
                8+
              </div>
              <div className="text-slate-400 text-sm font-medium tracking-wide">Enterprise Projects</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-2 filter drop-shadow-lg">
                4+
              </div>
              <div className="text-slate-400 text-sm font-medium tracking-wide">Global Partners</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2 filter drop-shadow-lg">
                2+
              </div>
              <div className="text-slate-400 text-sm font-medium tracking-wide">Years Innovation</div>
            </div>
            <div className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer">
              <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2 filter drop-shadow-lg">
                99%
              </div>
              <div className="text-slate-400 text-sm font-medium tracking-wide">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

