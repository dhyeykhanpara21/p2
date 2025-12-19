// Replace sample data with your real content

// Certificates
window.CERTS = [
  { id: 1, title: 'Google Cloud Fundamentals', org: 'Google Cloud', year: 2024, category: 'Cloud', url: '#' },
  { id: 2, title: 'Frontend Developer', org: 'Meta', year: 2023, category: 'Development', url: '#' },
  { id: 3, title: 'Node.js Backend', org: 'Coursera', year: 2023, category: 'Development', url: '#' },
  { id: 4, title: 'Internship: Web Dev', org: 'Acme Inc.', year: 2022, category: 'Internship', url: '#' },
  { id: 5, title: 'Firebase Workshop', org: 'GDG', year: 2022, category: 'Workshop', url: '#' },
  { id: 6, title: 'SQL Advanced', org: 'HackerRank', year: 2023, category: 'Development', url: '#' },
  { id: 7, title: 'Django REST', org: 'Udemy', year: 2023, category: 'Development', url: '#' },
  { id: 8, title: 'Cloud Architecture', org: 'Google Cloud', year: 2024, category: 'Cloud', url: '#' },
];

// Projects
window.PROJECTS = [
  { id: 1, title: 'Suchi Tracker', desc: 'Full-stack inventory & sales management system for Anganwadi centers with role-based dashboards and efficient tracking.', tech: ['HTML', 'css', 'JS', 'php', 'Mysql'], image: 'assets/suchitracker.png', demo: '#', source: '#' },
  { id: 2, title: 'NixKart', desc: 'Custom eCommerce platform with secure authentication, product management, order tracking, and scalable backend.', tech: ['Html', ' css', 'Js', 'Django', 'Neo4j'], image: 'assets/nixkart.png', demo: '#', source: '#' },
  { id: 3, title: 'Cyber Security Dashboard', desc: 'Full-stack vulnerability assessment dashboard with dynamic charts, filters, and severity-based security insights.', tech: ['Python', 'Flask', 'HTML', 'css', 'JS'], image: 'assets/cybersecurity.png', demo: '#', source: '#' },
  { 
  id: 4, 
  title: 'FraudGuard', 
  desc: 'Card fraud detection system that analyzes transaction patterns in real-time to detect and prevent fraudulent activities using AI-driven risk scoring.', 
  tech: ['Python', 'Machine Learning', 'Flask', 'React', 'PostgreSQL'], 
  image: 'assets/fruadguard.png', 
  demo: '#', 
  source: '#' 
},
{ 
  id: 5, 
  title: 'Configrator', 
  desc: 'Advanced product configurator system for a Russian enterprise, allowing dynamic configuration of components, validation rules, and real-time pricing logic.', 
  tech: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'], 
  image: 'assets/Configrator.png', 
  demo: '#', 
  source: '#' 
},
{ 
  id: 6, 
  title: 'Trecly Tag', 
  desc: 'Stock and inventory management system with QR code tracking, real-time stock updates, and audit-friendly item traceability.', 
  tech: ['React', 'Django', 'PostgreSQL', 'QR Code API'], 
  image: 'assets/treclytag.png', 
  demo: '#', 
  source: '#' 
},
{ 
  id: 7, 
  title: 'FlipBook Make', 
  desc: 'Digital flipbook creation software that converts PDFs into interactive page-turning experiences with animations and sharing options.', 
  tech: ['JavaScript', 'HTML5 Canvas', 'CSS', 'Node.js'], 
  image: 'assets/flipbookmake.png', 
  demo: '#', 
  source: '#' 
},
{ 
  id: 8, 
  title: 'LuphSync', 
  desc: 'DevOps automation platform that manages CI/CD pipelines, cloud deployments, environment configs, and project go-live workflows.', 
  tech: ['django','javascript', 'GitHub Actions', 'AWS', 'Node.js'], 
  image: 'assets/luphsync.png', 
  demo: '#', 
  source: '#' 
},
{ 
  id: 9, 
  title: 'VoteSphere', 
  desc: 'Secure online voting system with user authentication, encrypted ballots, real-time result tracking, and admin-controlled elections.', 
  tech: ['php', 'html','css', 'MongoDB', 'JWT', 'Blockchain'], 
  image: 'assets/votesphere.png', 
  demo: '#', 
  source: '#' 
}

];


// Experience
window.EXPERIENCE = [
  { role: 'DevSecOps Engineer', company: 'Aphelion Cyber', duration: 'Mar 2025 — Current', bullets: [
    'Developed full-stack web applications with React, Django, Flask, SQL, and CSS, creating user-friendly interfaces and strong backend systems.',
    'Ensured applications stayed secure by fixing vulnerabilities, following secure coding practices, and carrying out basic security testing.',
    'Worked with different teams to deliver software that was efficient, scalable, and security-focused.',
    'Used DevOps tools like Docker, CI/CD automation, and cloud monitoring to make applications more stable and easier to maintain.',
    'Communicated effectively with team members and stakeholders to understand requirements, provide updates, and ensure smooth project delivery.'
  ]},
  { role: 'Full Stack Developer Intern', company: 'WebCodeGenie', duration: 'Sep 2024 — Feb 2025', bullets: [
    'Collaborated with cross-functional agile teams to design, develop, and deploy scalable full-stack web applications.',
    'Utilized React.js for building interactive and responsive front-end components with state management and routing.',
    'Developed and integrated RESTful APIs using Django and Flask, ensuring seamless communication between frontend and backend systems.',
    'Deployed applications on cloud platforms including Google Cloud Platform (GCP), Render, and Vercel for optimal performance and availability.'
  ]},
  { role: 'Full Stack Developer Intern', company: 'Codage Habitation', duration: 'Mar 2024 — Aug 2024', bullets: [
    'Designed and developed responsive web applications using React.js for frontend and Node.js with Express for backend services.',
    'Implemented RESTful APIs and integrated MongoDB databases for efficient data storage and retrieval.',
    'Collaborated with senior developers to optimize application performance and ensure code quality through code reviews.',
    'Participated in agile development cycles, including sprint planning, daily standups, and retrospectives.',
    'Deployed applications using Docker containers and managed version control through Git workflows.'
  ]}
];

// Achievements
window.ACHIEVEMENTS = [
  'Finalist at College Hackathon 2024',
  'Top 5% in SQL Assessment on HackerRank',
  'Lead Organizer for Dev Community Workshops',
  'Published 3 technical articles on Medium'
];

// Side Projects
window.SIDE_PROJECTS = [
{
  id: 1,
  title: 'Web App Threat Scanner',
  desc: 'A visual-first security scanner built to think like an attacker',
  icon: 'shield',
  url: '#',
  details: 'Designed a single-page web security scanner that simulates real-world attack patterns to identify common vulnerabilities. Focused on clarity over complexity by visualizing risk levels, scan progress, and results using an animated, matrix-style interface. Integrated automated webhook-based scanning to enable extensibility and real-time analysis.'
},
  {
  id: 2,
  title: 'Jarvis – Voice-First AI System',
  desc: 'An AI assistant controlled by voice, not clicks',
  icon: 'mic',
  url: '#',
  details: 'Built an experimental voice-controlled AI assistant that responds to spoken commands for search, weather, time, and system-level tasks. Implemented speech recognition and text-to-speech to create a natural interaction flow. Designed the system to be modular, allowing new commands and integrations to be added with minimal effort.'
},
  {
  id: 3,
  title: 'Data Hunters (Web Scrapers)',
  desc: 'Turning messy websites into clean, usable data',
  icon: 'code',
  url: '#',
  details: 'Developed a suite of Python-based web scrapers to extract structured data from job portals, e-commerce platforms, and news websites. Implemented robust error handling, filtering, and data validation to ensure accuracy. Exported data in CSV and JSON formats for analysis, reporting, and system integration.'
},

  {
  id: 4,
  title: 'Cyber Insight Dashboard',
  desc: 'Security data that humans can actually understand',
  icon: 'bar-chart',
  url: '#',
  details: 'Created a full-stack vulnerability assessment dashboard that converts raw security findings into meaningful insights. Implemented dynamic charts, severity-based filtering, and interactive UI components to help users quickly identify and prioritize risks. Optimized the architecture for scalability and maintainability.'
},

];