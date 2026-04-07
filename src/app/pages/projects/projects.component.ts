import { Component, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  type: 'work' | 'project' | 'education';
}

interface DetailedProject {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  color: string;
  year: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {
  scrollY = 0;
  expandedProject: number | null = null;

  timeline: TimelineItem[] = [
    {
      id: 1,
      year: '2024',
      title: 'Software Engineer',
      company: 'Zetes — Madrid',
      description: 'Sole developer on a logistics app serving 2 major clients and 100+ users. Built a reusable grid component adopted across 10+ internal projects. Pioneered LLM-assisted workflows for code review and static analysis.',
      technologies: ['Angular', 'Web Components', 'C#', 'Azure DevOps', 'SonarQube'],
      type: 'work'
    },
    {
      id: 2,
      year: '2021',
      title: 'Software Engineer',
      company: 'Alten Technologies → Amadeus — Madrid',
      description: 'Delivered frontend for a revenue management platform used by 10+ airlines. Built interactive dashboards over 100k+ documents. Backend contributions in Java, C++ and Python within a cross-functional Agile team of 10.',
      technologies: ['Angular', 'D3.js', 'Java', 'C++', 'Python', 'Oracle', 'MongoDB'],
      type: 'work'
    },
    {
      id: 3,
      year: '2020',
      title: 'Software Developer',
      company: 'UGR Vice-Rectorate for Internationalisation — Granada',
      description: 'Built a contact management tool from scratch: automated import from Excel and HTML, personalised email broadcasts to 1,000+ international contacts.',
      technologies: ['Java', 'MySQL', 'HTML', 'CSS'],
      type: 'work'
    },
    {
      id: 4,
      year: '2019',
      title: 'Erasmus — Machine Learning & Data Science',
      company: 'Aalto University — Finland',
      description: 'Macadamia programme: ML, data science, and AI coursework. Built a soccer result prediction model, a time-series analysis project, Jingle Jangle (real-time audio Fourier analysis), and Smart Mazda (OBD car diagnostics dashboard).',
      technologies: ['Python', 'React', 'D3.js', 'Node.js', 'Scikit-learn'],
      type: 'education'
    },
    {
      id: 5,
      year: '2018',
      title: 'Software Developer',
      company: 'Informática El Corte Inglés / Inetum — Madrid',
      description: 'Bash automation scripts monitoring 300+ business processes. Assisted in migration to new virtual environments.',
      technologies: ['Bash', 'Linux', 'Shell scripting'],
      type: 'work'
    },
    {
      id: 6,
      year: '2015',
      title: 'Robotics Teacher',
      company: 'Jóvenes Inventores — Madrid',
      description: 'Led 3 classes of 20–30 students (ages 9–12) in hands-on robotics. Designed the main group project: a robotic cable car built and programmed entirely by the students.',
      technologies: ['Lego Mindstorms', 'Teaching', 'Project design'],
      type: 'work'
    },
    {
      id: 7,
      year: '2015',
      title: 'Software Developer',
      company: 'Neovantas — Madrid',
      description: 'Built 5 interactive SCORM e-learning courses from PowerPoint source material, packaged for LMS deployment.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'SCORM'],
      type: 'work'
    },
    {
      id: 8,
      year: '2015',
      title: 'Software Developer',
      company: 'Rigel Technologies — Madrid',
      description: 'Java library wrapping 50+ legacy Visual Basic commands, decoupling the codebase from a brittle VB dependency and enabling incremental migration.',
      technologies: ['Java', 'Visual Basic'],
      type: 'work'
    },
    {
      id: 9,
      year: '2015',
      title: 'Software Developer',
      company: 'SIFRI — Madrid',
      description: 'Java desktop application with MySQL backend for client management and marketing operations — contact records, campaign tracking, and basic reporting.',
      technologies: ['Java', 'MySQL'],
      type: 'work'
    },
    {
      id: 10,
      year: '2012',
      title: "Bachelor's in Computer Science & Mathematics",
      company: 'Polytechnic University of Madrid (UPM)',
      description: 'Double degree covering algorithms, data structures, probability, statistics, linear algebra, and calculus. Mathematics background largely untapped in frontend work — the main motivation for moving toward data engineering.',
      technologies: ['Algorithms', 'Statistics', 'Linear Algebra', 'C++', 'Java'],
      type: 'education'
    }
  ];

  detailedProjects: DetailedProject[] = [
    {
      id: 1,
      title: 'Amadeus Revenue Analytics',
      subtitle: 'Enterprise Data Visualisation',
      description: 'Revenue management platform for airlines',
      longDescription: 'Frontend lead for a revenue management application used by 10+ airline clients to optimise pricing strategies and monitor booking trends. Built interactive dashboards and data visualisations over 100k+ documents stored in Oracle and MongoDB. Contributed to backend services in Java, C++ and Python within a cross-functional Agile team of 10.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      technologies: ['Angular', 'D3.js', 'Java', 'C++', 'Python', 'Oracle', 'MongoDB'],
      features: ['Interactive price analytics', '100k+ document navigation', 'Real-time booking trends', 'Cross-team Agile delivery'],
      color: '#06b6d4',
      year: '2021–2024'
    },
    {
      id: 2,
      title: 'Zetes Logistics Platform',
      subtitle: 'Angular Web Components Architecture',
      description: '8 dashboards, one app, shared across 10+ projects',
      longDescription: 'Designed and maintained a consolidation of 8 logistics dashboards into a single Angular application using Web Components. Built a reusable grid component with filtering, sorting, and custom features that was adopted across 10+ projects company-wide. Maintained a shared Angular component library and migrated legacy apps to Angular v17 and Node v22. Introduced LLM-assisted code review workflows — first on the team to adopt this.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop',
      technologies: ['Angular', 'Web Components', 'TypeScript', 'C#', 'Azure DevOps', 'SonarQube'],
      features: ['Shared component library', 'Reusable grid system', 'CI/CD with SonarQube', 'LLM-assisted development'],
      color: '#7c3aed',
      year: '2024–2026'
    },
    {
      id: 3,
      title: 'Jingle Jangle',
      subtitle: 'Real-Time Audio Analysis',
      description: 'Fourier-based note detection and MIDI conversion',
      longDescription: 'Real-time audio analysis tool built during Erasmus at Aalto University. Uses Fourier transforms to extract musical notes from a live microphone stream and converts them to MIDI output. Python backend for signal processing, React and D3.js for the live frequency visualisation frontend. See it live at gabcas28.github.io/visuals/',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
      technologies: ['Python', 'React', 'D3.js', 'Fourier analysis', 'Web Audio API'],
      features: ['Live microphone input', 'Fourier transform signal processing', 'Real-time frequency visualisation', 'MIDI note output'],
      color: '#ec4899',
      year: '2019–2020'
    },
    {
      id: 4,
      title: 'Smart Mazda OBD Dashboard',
      subtitle: 'Car Diagnostics Visualisation',
      description: 'Real-time OBD data streamed and visualised with D3.js',
      longDescription: 'OBD (On-Board Diagnostics) interface for real-time car telemetry. Reads speed, RPM, engine load, and temperature from the vehicle\'s OBD port and streams the data to a Node.js server. Visualised with D3.js and React. Personal project from Aalto University. Source: github.com/GabCas28/Smart-Mazda-On-Board',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop',
      technologies: ['React', 'D3.js', 'Node.js', 'OBD-II', 'WebSockets'],
      features: ['Real-time OBD telemetry', 'Live D3.js gauges and charts', 'Node.js data server', 'Open source'],
      color: '#10b981',
      year: '2019–2020'
    }
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
  }

  ngAfterViewInit() {
    this.initScrollReveal();
  }

  private initScrollReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  }

  toggleProject(id: number) {
    this.expandedProject = this.expandedProject === id ? null : id;
  }

  getTypeIcon(type: string): string {
    switch (type) {
      case 'work': return 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
      case 'project': return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4';
      case 'education': return 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z';
      default: return '';
    }
  }
}
