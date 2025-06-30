const BASE_URL = import.meta.env.BASE_URL;
const projects = [
  {
    name: "DevSync",
    description:
      "A full-stack platform enabling developers to connect, message, explore job opportunities, and collaborate — all in real-time with socket-based alerts and AWS-powered email notifications.",
    techStack: ["MERN Stack", "Socket.IO", "AWS EC2"],
    taglines: [
      "💬 Real-time messaging with Socket.IO",
      "📬 Email notifications via AWS SES",
      "🎯 Intelligent developer matchmaking",
      "🚀 Scalable deployment on AWS EC2"
    ],
    liveLink: "https://devsync.co.in",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/devsync-1.png",
      "/projects/devsync-2.png",
      "/projects/devsync-3.png",
      "/projects/devsync-4.png",
      "/projects/devsync-5.png",
      "/projects/devsync-6.png",
      "/projects/devsync-7.png",
      "/projects/devsync-8.png"
    ],
    featured: true,
    type: "Developer Collaboration Suite"
  },
  {
    name: "Dev Detective",
    description:
      "An intuitive GitHub profile explorer that fetches detailed user data, stats, and repositories with a clean responsive design.",
    techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    taglines: [
      "🔍 Live GitHub user search",
      "📈 Interactive stats and repo metrics",
      "🧑‍💻 Sleek and responsive UI"
    ],
    liveLink: "https://dev-detective-js.vercel.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/Devdetective-1.png",
      "/projects/Devdetective-2.png",
      "/projects/Devdetective-3.png"
    ],
    featured: false,
    type: "GitHub User Explorer"
  },
  {
    name: "Weather App",
    description:
      "A minimalist weather utility that displays real-time conditions using location-based API integration.",
    techStack: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    taglines: [
      "🌤️ City-wise weather data",
      "📍 Location-aware forecast",
      "💨 Lightweight and fast UI"
    ],
    liveLink: "https://weatherapp-js-soumayskchi.vercel.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/Weather_App-1.png",
      "/projects/Weather_App-2.png",
      "/projects/Weather_App-3.png"
    ],
    featured: false,
    type: "Weather Dashboard"
  },
  {
    name: "Todo App",
    description:
      "A clean task manager with real-time add/remove functionality, optimized for focus and productivity.",
    techStack: ["HTML", "CSS", "JavaScript"],
    taglines: [
      "📝 Add, complete, delete tasks",
      "📋 Instant state updates",
      "🧼 Clean UX focused on simplicity"
    ],
    liveLink: "http://soumaysikchi-todoapp.vercel.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/TODO_1.png",
      "/projects/TODO_2.png"
    ],
    featured: false,
    type: "Task Management Tool"
  },
  {
    name: "Musify",
    description:
      "An offline-accessible music player that reads tracks from GitHub and offers a seamless audio experience via browser.",
    techStack: ["HTML", "CSS", "JavaScript"],
    taglines: [
      "🎵 GitHub-powered audio storage",
      "📶 Offline-friendly playback",
      "🎧 Streamlined UI for music lovers"
    ],
    liveLink: "https://musify-jssoumay.vercel.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/Musify-1.png",
      "/projects/Musify-2.png"
    ],
    featured: false,
    type: "Web-based Music Player"
  },
  {
    name: "Namaste Dhaba",
    description:
      "A beautifully crafted food ordering interface with dynamic cart logic and state management using Redux Toolkit.",
    techStack: ["HTML", "CSS", "Tailwind CSS", "React.js", "Redux Toolkit"],
    taglines: [
      "🛒 Cart system with Redux state",
      "📦 Modular restaurant listing design",
      "🖥️ Tailwind-powered responsive layout"
    ],
    liveLink: "https://namaste-dhaba.vercel.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/Namaste_Dhaba-1.png",
      "/projects/Namaste_Dhaba-2.png",
      "/projects/Namaste_Dhaba-3.png",
      "/projects/Namaste-Dhaba-4.png"
    ],
    featured: true,
    type: "Interactive Food UI"
  },
  {
    name: "StreamGPT",
    description:
      "An AI-driven movie discovery portal with mood-based filtering, authentication, and multilingual support.",
    techStack: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React.js",
      "Redux Toolkit",
      "Firebase Auth"
    ],
    taglines: [
      "🎬 Smart movie suggestions by mood",
      "🔐 Secure login with Firebase",
      "🌍 Multi-language support"
    ],
    liveLink: "https://stream-gpt-1.web.app/",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/GPT-1.png",
      "/projects/GPT-2.png",
      "/projects/GPT-3.png",
      "/projects/GPT-4.png",
      "/projects/GPT-5.png",
      "/projects/GPT-6.png"
    ],
    featured: true,
    type: "AI-Powered Movie Portal"
  },
  {
    name: "DevTube",
    description:
      "A feature-rich video browsing platform with live suggestions, caching, chat system, and immersive scrolling built on modern React architecture.",
    techStack: [
      "HTML",
      "CSS",
      "Tailwind CSS",
      "React.js",
      "Redux Toolkit",
      "Firebase Auth"
    ],
    taglines: [
      "🎥 Real-time search autocomplete",
      "💬 Live chat integrated",
      "📽️ Lazy load + shimmer UI",
      "🔁 API response caching"
    ],
    liveLink:
      "https://www.linkedin.com/posts/soumaysikchi_reactjs-reduxtoolkit-youtubeclone-activity-7292107074409218049-gSt-",
    githubLink: "https://github.com/SOUMAYSIKCHI/",
    imageGallery: [
      "/projects/devtube-1.png",
      "/projects/devtube-2.png",
      "/projects/devtube-3.png"
    ],
    featured: true,
    type: "Interactive Video Portal"
  }
];

export default projects; 