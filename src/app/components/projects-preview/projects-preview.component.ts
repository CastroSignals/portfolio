import { Component, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
}

@Component({
  selector: 'app-projects-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-preview.component.html',
  styleUrl: './projects-preview.component.scss'
})
export class ProjectsPreviewComponent implements AfterViewInit {
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  projects: Project[] = [
    {
      id: 1,
      title: 'Amadeus Revenue Analytics',
      description: 'Revenue management platform used by 10+ airlines to optimise pricing strategies and monitor booking trends. Interactive dashboards navigating 100k+ documents from Oracle and MongoDB.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['Angular', 'D3.js', 'Java', 'Oracle', 'MongoDB'],
      color: '#06b6d4'
    },
    {
      id: 2,
      title: 'Zetes Logistics Platform',
      description: '8 logistics dashboards consolidated into a single Angular app using Web Components. Reusable grid component adopted across 10+ internal projects for 2 major clients and 100+ users.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
      tags: ['Angular', 'Web Components', 'C#', 'Azure DevOps'],
      color: '#7c3aed'
    },
    {
      id: 3,
      title: 'Jingle Jangle',
      description: 'Real-time audio analysis using Fourier transforms — extracts notes from a microphone stream and converts them to MIDI. Built during Erasmus at Aalto University.',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      tags: ['Python', 'React', 'D3.js', 'Fourier analysis'],
      color: '#ec4899'
    },
    {
      id: 4,
      title: 'Smart Mazda OBD Dashboard',
      description: 'OBD interface for real-time car diagnostics — speed, RPM, engine load, temperature — visualised with D3.js and streamed to a Node.js server. Personal project from Aalto.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
      tags: ['React', 'D3.js', 'Node.js', 'OBD'],
      color: '#10b981'
    }
  ];

  ngAfterViewInit() {
    this.initScrollReveal();
    this.initTiltEffect();
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

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  private initTiltEffect() {
    this.projectCards.forEach(cardRef => {
      const card = cardRef.nativeElement;
      
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }
}
