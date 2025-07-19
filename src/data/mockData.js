// Mock data for LogiSaar agency website


import biswanathImg from "../image/biswanath.png";
import chinmyaImg from "../image/chinmya.png";
import swayamImg from "../image/swayam.png";
import dibyaImg from "../image/dibya.png";
import subraImg from "../image/subra.png";
import AnubhavImg from "../image/anubhav.png";




export const projects = [
 
  {
    id: 1,
    title: "MindfulCare Mobile App",
    client: "MindfulCare Health",
    description: "Mental health and wellness mobile app with meditation guides and mood tracking",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Firebase", "Redux", "Push Notifications"],
    category: "Mobile App",
    year: "2024",
    url: "https://mindfulcare-app.com",
    results: "50K+ downloads in first month, 4.8 App Store rating",
    challenge: "Creating an intuitive mental health app with privacy-first approach",
    solution: "Developed cross-platform mobile app with end-to-end encryption",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "Stripe", "GraphQL"]
  },
   {
    id: 2,
    title: "TechFlow E-commerce Platform",
    client: "TechFlow Inc",
    description: "Modern e-commerce platform with AI-powered recommendations and seamless checkout experience",
    image: "/api/placeholder/600/400",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "AI"],
    category: "E-Commerce",
    year: "2024",
    url: "https://techflow-demo.com",
    results: "300% increase in conversion rates, 45% reduction in cart abandonment",
    challenge: "Creating a scalable e-commerce solution with personalized shopping experiences",
    solution: "Implemented microservices architecture with AI-driven product recommendations",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "TensorFlow.js", "Redis"]
  },
  {
    id: 3,
    title: "DataViz Analytics Dashboard",
    client: "DataViz Solutions",
    description: "Real-time analytics dashboard for business intelligence and data visualization",
    image: "/api/placeholder/600/400",
    tags: ["Vue.js", "Python", "PostgreSQL", "D3.js", "WebSocket"],
    category: "Web Development",
    year: "2024",
    url: "https://dataviz-dashboard.com",
    results: "90% faster data processing, 40% improvement in decision-making time",
    challenge: "Processing large datasets with real-time updates and interactive visualizations",
    solution: "Built scalable dashboard with WebSocket connections and optimized queries",
    technologies: ["Vue.js", "Python", "PostgreSQL", "D3.js", "WebSocket", "Redis"]
  },
  {
    id: 4,
    title: "EduLearn Learning Platform",
    client: "EduLearn Academy",
    description: "Interactive online learning platform with video courses and progress tracking",
    image: "/api/placeholder/600/400",
    tags: ["React", "Express", "MongoDB", "WebRTC", "AWS"],
    category: "E-Learning",
    year: "2023",
    url: "https://edulearn-platform.com",
    results: "10K+ students enrolled, 85% course completion rate",
    challenge: "Creating engaging online learning experience with video streaming",
    solution: "Implemented adaptive streaming and interactive course builder",
    technologies: ["React", "Express.js", "MongoDB", "WebRTC", "AWS S3", "FFmpeg"]
  },
  {
    id: 5,
    title: "SmartHome IoT Dashboard",
    client: "SmartHome Technologies",
    description: "IoT device management dashboard for smart home automation and monitoring",
    image: "/api/placeholder/600/400",
    tags: ["Angular", "Node.js", "MQTT", "IoT", "Socket.io"],
    category: "IoT",
    year: "2023",
    url: "https://smarthome-dashboard.com",
    results: "25% reduction in energy consumption, 99.9% uptime",
    challenge: "Managing multiple IoT devices with real-time monitoring and control",
    solution: "Created scalable IoT dashboard with MQTT protocol and real-time updates",
    technologies: ["Angular", "Node.js", "MQTT", "Socket.io", "InfluxDB", "Docker"]
  },
  {
    id: 6,
    title: "FinTech Payment Gateway",
    client: "SecurePay Solutions",
    description: "Secure payment processing system with multi-currency support and fraud detection",
    image: "/api/placeholder/600/400",
    tags: ["React", "Python", "PostgreSQL", "Stripe", "Security"],
    category: "FinTech",
    year: "2023",
    url: "https://securepay-gateway.com",
    results: "99.99% transaction success rate, 0.01% fraud rate",
    challenge: "Building secure payment system with fraud detection and compliance",
    solution: "Implemented advanced security measures and ML-based fraud detection",
    technologies: ["React", "Python", "PostgreSQL", "Stripe", "JWT", "Redis"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO",
    company: "TechFlow Inc",
    rating: 5,
    text: "LogiSaar transformed our e-commerce vision into reality. Their technical expertise and attention to detail resulted in a 300% increase in our conversion rates.",
    image: "/api/placeholder/150/150",
    projectId: 1,
    location: "Mumbai, India"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CTO",
    company: "MindfulCare Health",
    rating: 5,
    text: "The mobile app LogiSaar developed exceeded our expectations. The user experience is incredible, and we've seen amazing user engagement since launch.",
    image: "/api/placeholder/150/150",
    projectId: 2,
    location: "Bangalore, India"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Product Manager",
    company: "DataViz Solutions",
    rating: 5,
    text: "Working with LogiSaar was a game-changer. They delivered a complex analytics dashboard that has revolutionized how we make data-driven decisions.",
    image: "/api/placeholder/150/150",
    projectId: 3,
    location: "New York, USA"
  },
  {
    id: 4,
    name: "David Williams",
    position: "Founder",
    company: "EduLearn Academy",
    rating: 5,
    text: "LogiSaar's expertise in educational technology is outstanding. Our learning platform has helped thousands of students achieve their goals.",
    image: "/api/placeholder/150/150",
    projectId: 4,
    location: "London, UK"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    position: "Operations Director",
    company: "SmartHome Technologies",
    rating: 5,
    text: "The IoT dashboard LogiSaar created is incredibly intuitive and powerful. It's helped us achieve 25% energy savings across all our installations.",
    image: "/api/placeholder/150/150",
    projectId: 5,
    location: "Sydney, Australia"
  }
];

export const team = [
  {
    id: 1,
    name: "Chinmya Kumar Panda",
    position: "Lead Full-Stack Developer &  ",
    bio: "10+ years of experience in web development with expertise in React, Node.js, and cloud technologies.",
    image: chinmyaImg,
    skills: ["React", "Node.js", "AWS", "MongoDB", "TypeScript"],
    linkedin: "https://linkedin.com/in/alexkumar",
    github: "https://github.com/alexkumar"
  },
  {
    id: 2,
    name: "Swayam Sidhart Sahoo",
    position: "Senior Mobile Developer",
    bio: "Specialized in React Native and Flutter development with 8+ years of mobile app experience.",
    image: swayamImg,
    skills: ["React Native", "Flutter", "iOS", "Android", "Firebase"],
    linkedin: "https://linkedin.com/in/priyasharma",
    github: "https://github.com/priyasharma"
  },
  {
    id: 3,
    name: "Subrajit Jena",
    position: "UI/UX Designer",
    bio: "Creative designer with expertise in modern UI/UX design, prototyping, and user research.",
    image: subraImg,
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    linkedin: "https://linkedin.com/in/rahulpatel",
    dribbble: "https://dribbble.com/rahulpatel"
  },
  {
    id: 4,
    name: "Biswanath P S Kar",
    position: "Software Engineer",
    bio: "Experienced software engineer specializing in frontend and backend development.",
    image: biswanathImg,
    skills: ["JavaScript", "React", "Node.js"],
    linkedin: "",
    github: ""
  },
  {
    id: 5,
    name: "Dibyagyani Mahanta",
    position: "Product Manager",
    bio: "Skilled product manager with a focus on agile methodologies and user-centric design.",
    image: dibyaImg,
    skills: ["Agile", "Scrum", "User Research"],
    linkedin: "",
    github: ""
  },
  {
    id: 6,
    name: "Anubhav Mohanty",
    position: "QA Engineer",
    bio: "Detail-oriented QA engineer ensuring high-quality software releases.",
    image: AnubhavImg,
    skills: ["Testing", "Automation", "Selenium"],
    linkedin: "",
    github: ""
  }
];

export const services = [
  {
    id: 1,
    title: "Website Development",
    description: "Custom websites built with modern technologies for optimal performance and user experience",
    icon: "🌐",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Fast Loading Speed",
      "Cross-Browser Compatibility",
      "Content Management Systems",
      "E-commerce Integration"
    ],
    technologies: ["React", "Vue.js", "Angular", "Node.js", "Python", "PHP"],
    startingPrice: "₹10K – ₹3,50K+",
    deliveryTime: "4-8 weeks"
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices",
    icon: "📱",
    features: [
      "Cross-Platform Development",
      "Native Performance",
      "Push Notifications",
      "Offline Functionality",
      "App Store Optimization",
      "Analytics Integration"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    startingPrice: "₹40K – ₹1.3M+",
    deliveryTime: "8-12 weeks"
  },
  {
    id: 3,
    title: "UI/UX Design",
    description: "User-centered design solutions that create engaging and intuitive digital experiences",
    icon: "🎨",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
      "Usability Testing",
      "Design Systems"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
    startingPrice: "₹10K – ₹1L",
    deliveryTime: "2-4 weeks"
  },
  {
    id: 4,
    title: "E-Commerce Solutions",
    description: "Complete e-commerce platforms with payment processing and inventory management",
    icon: "🛒",
    features: [
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing",
      "Customer Management",
      "Analytics Dashboard",
      "Multi-vendor Support"
    ],
    technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal"],
    startingPrice: "₹75K – ₹3.5L+",
    deliveryTime: "6-10 weeks"
  },
  {
    id: 5,
    title: "SEO & Maintenance",
    description: "Ongoing optimization and maintenance services to keep your digital presence strong",
    icon: "📈",
    features: [
      "Search Engine Optimization",
      "Performance Monitoring",
      "Security Updates",
      "Content Updates",
      "Analytics Reporting",
      "24/7 Support"
    ],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "WordPress", "Monitoring Tools"],
    startingPrice: "₹9K – ₹50K+ (monthly)",
    deliveryTime: "Ongoing"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the latest trends shaping the web development landscape, from AI integration to serverless architecture.",
    content: "Web development is evolving rapidly...",
    author: "Alex Kumar",
    date: "2024-01-15",
    category: "Web Development",
    tags: ["Web Development", "Trends", "AI", "Serverless"],
    image: "/api/placeholder/800/400",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mobile App Development: Native vs Cross-Platform",
    excerpt: "A comprehensive comparison of native and cross-platform mobile development approaches.",
    content: "When deciding on mobile app development...",
    author: "Priya Sharma",
    date: "2024-01-10",
    category: "Mobile Development",
    tags: ["Mobile", "React Native", "Flutter", "iOS", "Android"],
    image: "/api/placeholder/800/400",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "UI/UX Design Best Practices for 2024",
    excerpt: "Essential design principles and practices for creating exceptional user experiences.",
    content: "Great design is about more than aesthetics...",
    author: "Rahul Patel",
    date: "2024-01-05",
    category: "Design",
    tags: ["UI/UX", "Design", "User Experience", "Figma"],
    image: "/api/placeholder/800/400",
    readTime: "6 min read"
  }
];

export const companyStats = [
  { number: "50+", label: "Projects Completed", icon: "🚀" },
  { number: "30+", label: "Happy Clients", icon: "😊" },
  { number: "5+", label: "Years Experience", icon: "⏰" },
  { number: "99%", label: "Client Satisfaction", icon: "⭐" }
];

export const technologies = [
  { name: "React", icon: "⚛️", category: "Frontend" },
  { name: "Vue.js", icon: "💚", category: "Frontend" },
  { name: "Angular", icon: "🅰️", category: "Frontend" },
  { name: "Node.js", icon: "🟢", category: "Backend" },
  { name: "Python", icon: "🐍", category: "Backend" },
  { name: "React Native", icon: "📱", category: "Mobile" },
  { name: "Flutter", icon: "🦋", category: "Mobile" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "AWS", icon: "☁️", category: "Cloud" },
  { name: "Firebase", icon: "🔥", category: "Cloud" },
  { name: "Docker", icon: "🐳", category: "DevOps" }
];