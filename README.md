# Ujjawal Singh - Portfolio

A modern 3D portfolio website built with React.js (TypeScript) and Three.js, showcasing my projects, skills, and professional journey as a Software Engineer.

## About

This is my personal portfolio website featuring:

- **3D Earth Model**: Interactive Three.js canvas with a rotating Earth
- **Responsive Design**: Fully optimized for desktop and mobile viewports
- **Dark Theme**: Premium glassmorphic UI with dynamic starry background
- **Terminal Emulator**: Built-in interactive Bash terminal widget
- **Custom Tooltips**: Pure CSS-based directional tooltip system
- **Project Showcase**: Detailed project timeline with keypoint slide previews
- **Professional Journey**: Interactive career and education logs

## Tech Stack

- **Framework**: React.js 19 (TypeScript)
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Vanilla CSS, TailwindCSS (for utility layout structure)
- **Build Tool**: Vite (migrated from Create React App)
- **Deployment**: GitHub Pages

## Project Structure

```
3js-portfolio/
├── public/           # Static assets, resume, planet textures
├── src/
│   ├── components/   # React components (PascalCase)
│   │   ├── Button/   # Custom reusable glassmorphic buttons
│   │   ├── Canvas/   # 3D fiber canvases (Earth, PCD head, Stars)
│   │   ├── Console/  # Developer console utilities and notification alerts
│   │   ├── Footer/   # Footer component with custom contact tooltips
│   │   ├── HeroDetails/# Title, address metadata renderer
│   │   ├── HeroName/ # Headline name renderer
│   │   ├── Icon/     # Image wrappers supporting CSS tooltips
│   │   ├── Journey/  # Professional & academic timeline
│   │   ├── Loader/   # 3D canvas loader spinners
│   │   ├── Navbar/   # Header scroll spy navigation
│   │   ├── Socials/  # CV resume buttons & links
│   │   ├── Spacer/   # Card spacing layout divider
│   │   ├── Terminal/ # Command line bash shell emulator
│   │   └── Timeline/ # Grid timeline and modal cards for projects
│   ├── hooks/        # Custom react hooks (event listeners, scroll lock, reveal)
│   ├── lib/          # Constants, coordinates, and math utilities
│   ├── types/        # TypeScript interfaces
│   ├── App.tsx       # Main component container and grid layouts
│   ├── index.tsx     # App mount entrypoint
│   └── data.json     # Profile details local database
├── tsconfig.json     # TypeScript configuration with path aliases
└── vite.config.mts   # Vite build settings & folder alias resolutions
```

## Features

- Interactive 3D Earth model with realistic textures
- Dynamic mouse-reactive starfield background
- Mobile-responsive navigation menu with active-section scroll-spy
- Project timeline with custom grid layouts and modular previews
- Interactive developer console tools & keyboard-navigable terminal emulator
- High-performance page load times with asset decimation

## Live Demo

Visit my portfolio at: [https://lucverse.com](https://lucverse.com)

## Contact

- **Email**: [ujjw4l.singh@gmail.com](mailto:ujjw4l.singh@gmail.com)
- **LinkedIn**: [linkedin.com/in/ujjw4l](https://linkedin.com/in/ujjw4l)
- **Twitter**: [@Ujjw4lsingh](https://twitter.com/Ujjw4lsingh)
- **GitHub**: [github.com/Lucverse](https://github.com/Lucverse)
