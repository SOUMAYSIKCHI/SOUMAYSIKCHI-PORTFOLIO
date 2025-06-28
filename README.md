# 🌌 CodeVerse - Soumay Sikchi's 3D Animated Portfolio

> *"Engineering Imagination into Code"*

A futuristic 3D animated developer portfolio that showcases Soumay Sikchi's projects, skills, and achievements through an immersive digital experience. Built with React, Three.js, and modern web technologies.

## 🚀 Features

### 🎬 Cinematic Intro Animation
- 3D robot developer with glowing AR glasses
- Holographic project previews
- Ambient particles and volumetric lighting
- Skip option after 3 seconds

### 🧍 Interactive Hero Section
- 3D avatar that follows mouse movement
- Real-time particle effects
- Social media integration
- **Hidden Easter Egg**: Click the robot's glasses to trigger "The Dev Trials" game

### 🧠 Tech Skills Sphere
- Rotating 3D sphere with technology icons
- Interactive hover effects with tooltips
- Experience level indicators
- Smooth animations and transitions

### 💼 Project Showcase
- Featured project with 3D rotating cube
- Horizontal scrolling project cards
- Interactive modals with image galleries
- Tech stack badges and live demos

### 🏅 Certifications & Achievements
- Flip card animations
- Progress bars for skill levels
- Achievement highlights
- Professional milestone tracking

### 🎮 Mini Game Zone - "Code Rush"
- Developer-themed side-scroller
- Collect tech icons, avoid bugs
- High score tracking
- Keyboard controls (WASD/Arrow Keys)

### 🥚 Easter Egg: The Dev Trials
- **5-level hidden game** triggered by clicking robot glasses
- Level 1: Bug Hunt - Click valid syntax errors
- Level 2: Stack Builder - Stack tech logos
- Level 3: Code Sprint - Platform jumping
- Level 4: Git Merge Mayhem - Resolve conflicts
- Level 5: Cloud Ascension - Jump between clouds
- **Auto-redirects to LinkedIn** upon completion

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Three.js** - 3D graphics and animations
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for Three.js
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Advanced animations
- **Tailwind CSS** - Utility-first CSS framework

### Development
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **ESLint** - Code linting
- **React Icons** - Icon library

### Deployment
- **Vercel/Netlify** - Static site hosting
- **AWS Amplify** - Alternative deployment option

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SOUMAYSIKCHI/codeverse-portfolio.git
   cd codeverse-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🗂️ Project Structure

```
codeverse-portfolio/
├── public/
│   ├── projects/          # Project screenshots
│   │   ├── certs/            # Certification images
│   │   └── icons/            # Tech stack icons
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── game/         # Easter egg game
│   │   │   ├── IntroAnimation.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── MiniGame.jsx
│   │   │   └── Footer.jsx
│   │   ├── data/             # Static data
│   │   │   ├── projects.js
│   │   │   ├── skills.js
│   │   │   ├── certifications.js
│   │   │   └── portfolioMeta.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
```

## 🎮 Easter Egg Guide

### How to Trigger
1. Load the portfolio website
2. Navigate to the Hero section
3. Look for the 3D robot avatar
4. **Click on the robot's glowing blue AR glasses**
5. The Dev Trials game will launch

### Game Levels
1. **Bug Hunt** (30s) - Click valid syntax errors
2. **Stack Builder** (45s) - Stack tech logos
3. **Code Sprint** (60s) - Platform jumping
4. **Git Merge Mayhem** (40s) - Resolve conflicts
5. **Cloud Ascension** (50s) - Jump between clouds

### Completion
- Complete all 5 levels
- Watch the congratulatory message
- **Automatic redirect to LinkedIn profile**

## 🎨 Customization

### Personal Information
Edit `src/data/portfolioMeta.js`:
```javascript
const portfolioMeta = {
  username: "Your Name",
  tagline: "Your Tagline",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  email: "your.email@example.com",
  about: "Your description...",
  location: "Your Location"
};
```

### Projects
Edit `src/data/projects.js`:
```javascript
const projects = [
  {
    name: "Project Name",
    description: "Project description",
    techStack: ["React", "Node.js"],
    taglines: ["Feature 1", "Feature 2"],
    liveLink: "https://project-url.com",
    githubLink: "https://github.com/username/project",
    imageGallery: ["/projects/image1.png"],
    featured: true,
    type: "Project Type"
  }
];
```

### Skills
Edit `src/data/skills.js`:
```javascript
const skills = [
  { name: "React", icon: "react.svg" },
  { name: "Node.js", icon: "nodejs.svg" }
];
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure build settings

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎯 Performance Optimization

- **Lazy loading** for 3D components
- **Image optimization** for project screenshots
- **Code splitting** for better load times
- **Responsive design** for all devices
- **Progressive enhancement** for accessibility

## 🌟 Key Features

### 3D Animations
- Smooth camera movements
- Particle systems
- Interactive 3D objects
- Real-time lighting effects

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Adaptive layouts
- Performance optimized

### Accessibility
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** community for 3D graphics
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **React community** for inspiration

## 📞 Contact

- **LinkedIn**: [Soumay Sikchi](https://www.linkedin.com/in/soumaysikchi/)
- **GitHub**: [SOUMAYSIKCHI](https://github.com/SOUMAYSIKCHI/)
- **Email**: soumaysikchi2@gmail.com

---

**Made with ❤️ and Three.js**

*"Engineering Imagination into Code" - Soumay Sikchi* 