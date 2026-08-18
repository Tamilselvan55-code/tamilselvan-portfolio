export const PROJECTS = [
  {
    id: '01',
    title: 'Grocery Store Management System',
    category: 'E-Commerce',
    shortDescription: 'A comprehensive management system for grocery stores with real-time inventory and delivery tracking.',
    description: 'A production-ready grocery e-commerce application with delivery management, order tracking, admin dashboard, inventory management, authentication, and responsive UI. It streamlines operations for local vendors while offering an intuitive shopping experience for users.',
    year: '2022',
    status: 'Completed',
    timeline: '3 Months',
    tags: ['Next.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: [
      'Real-time inventory management',
      'Live order tracking & delivery routing',
      'Comprehensive admin dashboard',
      'Secure JWT authentication',
      'Payment gateway integration'
    ],
    image: '/images/projects/media_1786892055884.png',
    images: [
      '/images/projects/media_1786892055884.png',
      '/images/projects/media_1786892065019.png',
      '/images/projects/media_1786892072616.png'
    ],
    liveUrl: 'https://pazhamudhir-solai-project.vercel.app/',
    githubUrl: 'https://github.com/Tamilselvan55-code/Pazhamudhir_Solai_Project',
    
    // Detailed Page Content
    problemStatement: 'Local grocery vendors struggle with managing inventory and tracking deliveries across multiple platforms.',
    solution: 'An all-in-one platform integrating POS, inventory management, and a customer-facing e-commerce storefront.',
    architecture: 'Microservices architecture with Next.js frontend, Express backend, and MongoDB database.',
    techStack: [
      { category: 'Frontend', technologies: ['Next.js', 'React', 'Tailwind CSS'] },
      { category: 'Backend', technologies: ['Express.js', 'Node.js'] },
      { category: 'Database', technologies: ['MongoDB', 'Mongoose'] },
      { category: 'DevOps', technologies: ['Docker', 'Vercel'] }
    ],
    challenges: 'Ensuring real-time consistency between physical store inventory and online stock without race conditions.',
    futureScope: 'Implement AI-based demand forecasting and automated supplier ordering.',
    deployment: 'Frontend on Vercel, Backend on Railway, Database on MongoDB Atlas.',
    demoVideo: '/videos/grocery-demo.mp4',
    isLive: true
  },
  {
    id: '02',
    title: 'Smart Parking Management System',
    category: 'Marketplace',
    shortDescription: 'IoT-enabled platform for locating, reserving, and managing parking spaces dynamically.',
    description: 'A parking marketplace allowing providers to list parking spaces while enabling users to locate, reserve, and manage parking efficiently using real-time availability tracking.',
    year: '2022',
    status: 'Completed',
    timeline: '4 Months',
    tags: ['React', 'Prisma', 'Tailwind CSS', 'PostgreSQL'],
    features: [
      'Real-time space availability tracking',
      'Dynamic pricing engine',
      'Automated reservation system',
      'QR code access control',
      'Provider analytics dashboard'
    ],
    image: '/images/projects/media_1786895034677.png',
    images: [
      '/images/projects/media_1786895034677.png',
      '/images/projects/media_1786895043220.png',
      '/images/projects/media_1786895051612.png'
    ],
    liveUrl: 'https://demo.example.com/parking',
    githubUrl: 'https://github.com/example/parking',
    
    // Detailed Page Content
    problemStatement: 'Urban congestion is worsened by drivers spending excessive time searching for available parking spots.',
    solution: 'A marketplace connecting private parking space owners with drivers needing spots, equipped with real-time IoT sensor data.',
    architecture: 'Monolithic API with React SPA frontend, backed by PostgreSQL and Prisma ORM for type-safe database access.',
    techStack: [
      { category: 'Frontend', technologies: ['React', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend', technologies: ['Node.js', 'Express.js'] },
      { category: 'Database', technologies: ['PostgreSQL', 'Prisma ORM'] },
      { category: 'IoT', technologies: ['Raspberry Pi', 'Ultrasonic Sensors'] }
    ],
    challenges: 'Handling concurrent bookings for the same spot and managing IoT sensor latency during peak hours.',
    futureScope: 'Integration with smart city traffic APIs and automated license plate recognition (ALPR).',
    deployment: 'Hosted on AWS EC2 with RDS for PostgreSQL.',
    demoVideo: '/videos/parking-demo.mp4',
    isLive: false
  },
  {
    id: '03',
    title: 'Smart Healthcare Appointment Management System',
    category: 'Healthcare Platform',
    shortDescription: 'End-to-end hospital administration and patient appointment scheduling system.',
    description: 'A complete hospital appointment platform featuring patient management, doctor dashboard, appointment booking, token generation, prescriptions, and admin management.',
    year: '2023',
    status: 'Completed',
    timeline: '6 Months',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    features: [
      'Smart token generation for walk-ins',
      'Doctor and Patient portals',
      'Digital prescription management',
      'Real-time queue tracking',
      'Automated SMS/Email reminders'
    ],
    image: '/images/projects/media_1786894682655.png',
    images: [
      '/images/projects/media_1786894682655.png',
      '/images/projects/media_1786894690832.png',
      '/images/projects/media_1786894695721.png'
    ],
    liveUrl: 'https://demo.example.com/health',
    githubUrl: 'https://github.com/example/health',
    
    // Detailed Page Content
    problemStatement: 'Long waiting times and inefficient queue management lead to poor patient experience in multi-specialty hospitals.',
    solution: 'A synchronized appointment system combining pre-booked slots with walk-in token generation and live queue displays.',
    architecture: 'Event-driven architecture using WebSockets for real-time queue updates, built on top of a robust SQL database.',
    techStack: [
      { category: 'Frontend', technologies: ['React', 'Material-UI', 'Socket.io-client'] },
      { category: 'Backend', technologies: ['Node.js', 'Express.js', 'Socket.io'] },
      { category: 'Database', technologies: ['PostgreSQL', 'Redis'] },
      { category: 'Services', technologies: ['Twilio API', 'SendGrid'] }
    ],
    challenges: 'Designing an algorithm that fairly balances pre-booked appointments with emergency walk-ins in real-time.',
    futureScope: 'Telemedicine video consultations integration and wearable device health data syncing.',
    deployment: 'Containerized using Docker and deployed on DigitalOcean Kubernetes.',
    demoVideo: '/videos/health-demo.mp4',
    isLive: false
  },
  {
    id: '04',
    title: 'Federated Learning-Based Privacy-Preserving Healthcare Analytics Platform',
    category: 'Healthcare AI',
    shortDescription: 'AI platform enabling hospitals to train predictive models without sharing raw patient data.',
    description: 'A privacy-focused healthcare analytics platform that applies Federated Learning to enable secure machine learning across distributed hospital networks without centralizing sensitive patient data.',
    year: '2023',
    status: 'In Progress',
    timeline: '8+ Months',
    tags: ['React', 'Python', 'Federated Learning', 'TensorFlow'],
    features: [
      'Decentralized model training',
      'Differential privacy mechanisms',
      'Cross-hospital collaboration dashboard',
      'Homomorphic encryption support',
      'Secure aggregation protocols'
    ],
    image: '/images/projects/media_1786878883864.png',
    projectImages: [
      '/images/projects/media_1786878883864.png',
      '/images/projects/media_1786879043503.png',
      '/images/projects/media_1786879158421.jpg'
    ],
    liveUrl: 'https://demo.example.com/federated',
    githubUrl: 'https://github.com/example/federated',
    
    // Detailed Page Content
    problemStatement: 'Hospitals cannot share patient data to train global AI models due to strict HIPAA/GDPR regulations.',
    solution: 'A federated learning framework where models travel to the data instead of data traveling to a central server.',
    architecture: 'Distributed client-server architecture where a central aggregator orchestrates edge training on client nodes.',
    techStack: [
      { category: 'Frontend', technologies: ['React', 'D3.js', 'Tailwind CSS'] },
      { category: 'Backend API', technologies: ['FastAPI', 'Python'] },
      { category: 'AI/ML', technologies: ['TensorFlow Federated', 'PySyft'] },
      { category: 'Infrastructure', technologies: ['gRPC', 'Kubernetes'] }
    ],
    challenges: 'Handling non-IID (Independent and Identically Distributed) data across different hospital datasets resulting in model drift.',
    futureScope: 'Blockchain-based audit trails for model weight updates and integrating fully homomorphic encryption (FHE).',
    deployment: 'Multi-cloud deployment across AWS, Azure, and on-premise hospital servers.',
    demoVideo: '/videos/federated-demo.mp4',
    isLive: false
  }
];
