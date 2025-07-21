// Mock data for LogiSaar agency website


import biswanathImg from "../image/biswanath.png";
import chinmyaImg from "../image/chinmya.png";
import swayamImg from "../image/swayam.png";
import dibyaImg from "../image/dibya.png";
import subraImg from "../image/subra.png";
import AnubhavImg from "../image/anubhav.png";
import swosticonsultancyImg from "../image/swostic_consultancy.png";
import Infinity_RehabImg from "../image/Infinity_Rehab.png";
import krishnacatpetshopImg from "../image/krishna_cat.jpg";
import Brew_Haven_CoffeeImg from "../image/Brew_Haven_Coffee_Shop.jpg";
import go_poochImg from "../image/go_pooch.png";
import LogiSaarImg from "../image/logisaar.png";





export const projects = [
 
  
  {
  id: 1,
  title: "Infinity Rehab Website",
  client: "Infinity Rehab & Wellness",
  description: "Professional physiotherapy and rehabilitation website offering personalized treatment programs and online appointment booking.",
  image:Infinity_RehabImg,
  tags: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  category: "Healthcare Website",
  year: "2024",
  url: "https://infinityrehab.in",
  results: "Increased patient engagement by 60% and improved appointment booking efficiency.",
  challenge: "Designing a modern, informative, and user-friendly website for healthcare services.",
  solution: "Built a fully responsive web platform with dynamic content, contact forms, and patient-focused UI.",
  technologies: ["Node.js", "Express", "EJS", "MongoDB", "Bootstrap", "Formspree"]
},
 {
  id: 2,
  title: "Swosti Consultancy Website",
  client: "Swosti Consultancy",
  description: "Corporate consultancy website providing expert business solutions, career guidance, and project management services.",
  image: swosticonsultancyImg, 
  tags: [ "Node.js", "Express", "MongoDB" ,"HTML", "CSS", "JavaScript",],
  category: "Website",
  year: "2024",
  url: "https://www.swosticonsultancy.com/",
  results: "Improved online presence and 2x increase in client inquiries within 3 months.",
  challenge: "Creating a professional, responsive, and SEO-optimized consultancy website.",
  solution: "Designed and developed a fast, mobile-first website with backend integration and contact forms.",
  technologies: ["Node.js", "Express", "EJS", "MongoDB", "Bootstrap", "SEO Tools"]
},

  {
  id: 3,
  title: "Krishna Cat Pet Shop Website",
  client: "Krishna Chandra Behera",
  description: "A dedicated cat breeding and adoption website, connecting loving families with beautiful, healthy cats.",
  image: krishnacatpetshopImg, 
  tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "SEO"],
  category: "Pet Shop Website",
  year: "2024",
  url: "https://krishnacatpetshop.com", 
  results: "Enhanced local visibility and 3x increase in pet adoption inquiries within 2 months.",
  challenge: "Designing a visually appealing, mobile-friendly site to build trust with pet lovers.",
  solution: "Built an intuitive, responsive web layout with clear navigation, gallery, and contact sections.",
  technologies: ["HTML", "CSS", "JavaScript", "Bootstrap", "Google Maps API"]
}
,
  {
  id: 4,
  title: "Brew Haven Coffee Shop Website",
  client: "Brew Haven",
  description: "A modern and inviting website for Brew Haven, a specialty coffee shop offering a rich menu and a cozy café experience.",
  image: Brew_Haven_CoffeeImg, 
  tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "UI/UX"],
  category: "Restaurant/Café Website",
  year: "2024",
  url: "https://brewhaven.com", 
  results: "Attracted 3x more online visitors and boosted in-store foot traffic through engaging web presence.",
  challenge: "Designing a visually appealing and functional site to reflect Brew Haven’s unique coffee culture.",
  solution: "Built a responsive website with intuitive navigation, interactive menu, and offer section.",
  technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "AOS Animations"]
}
,
  {
  id: 5,
  title: "Go Pooch! Pet Grooming Website",
  client: "Go Pooch!",
  description: "A cheerful and professional website for pet grooming services, offering expert care for furry friends along with an online shop.",
  image: go_poochImg , 
  tags: ["React", "CSS Modules", "Responsive Design", "Animations", "E-Commerce"],
  category: "Pet Services Website",
  year: "2024",
  url: "https://go-pooch.com", 
  results: "Boosted customer bookings and improved online brand visibility by 70% within 2 months.",
  challenge: "Creating a playful and professional UI that appeals to pet lovers and builds trust.",
  solution: "Built a clean, responsive website with animated pet visuals and seamless navigation.",
  technologies: ["React", "React Router", "CSS Modules", "Framer Motion", "Tailwind CSS"]
}
,
 {
  id: 6,
  title: "Professional Services Platform",
  client: "Logishaan Technology Solutions",
  description: "Comprehensive digital solutions engineered for enterprise-grade performance and scalability.",
  image: LogiSaarImg, 
  tags: ["Web Engineering", "Mobile Solutions", "Experience Design"],
  category: "IT Services",
  year: "2024",
  url: "https://infinityrehab.in/", 
  results: "Improved client efficiency by 60%, enabled scalable digital transformation across industries.",
  challenge: "Delivering versatile and enterprise-grade tech services that scale and adapt to modern business needs.",
  solution: "Developed a service platform featuring modern web/mobile engineering and intuitive UX design systems.",
  technologies: [
    "Microservices Architecture",
    "Advanced SEO",
    "Cloud Integration",
    "Cross-Platform Development",
    "Real-time Sync",
    "AI Integration",
    "User Research",
    "Interaction Design"
  ]
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
    position: "Lead Full-Stack Developer",
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