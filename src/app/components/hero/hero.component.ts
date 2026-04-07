import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  
  name = 'Gabriel Castro';
  roles = ['Software Engineer', 'Angular Developer', 'Full Stack Developer', 'Data Enthusiast'];
  currentRoleIndex = 0;
  displayedRole = '';
  isTyping = true;
  
  private particles: Particle[] = [];
  private ctx!: CanvasRenderingContext2D;
  private animationId!: number;

  ngOnInit() {
    this.startTypingAnimation();
  }

  ngAfterViewInit() {
    this.initParticles();
  }

  private startTypingAnimation() {
    const typeRole = () => {
      const currentRole = this.roles[this.currentRoleIndex];
      
      if (this.isTyping) {
        if (this.displayedRole.length < currentRole.length) {
          this.displayedRole = currentRole.slice(0, this.displayedRole.length + 1);
          setTimeout(typeRole, 80);
        } else {
          this.isTyping = false;
          setTimeout(typeRole, 2000);
        }
      } else {
        if (this.displayedRole.length > 0) {
          this.displayedRole = this.displayedRole.slice(0, -1);
          setTimeout(typeRole, 40);
        } else {
          this.isTyping = true;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          setTimeout(typeRole, 500);
        }
      }
    };
    
    typeRole();
  }

  private initParticles() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    for (let i = 0; i < 80; i++) {
      this.particles.push(new Particle(canvas.width, canvas.height));
    }
    
    this.animate();
  }

  private animate = () => {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles.forEach(particle => {
      particle.update(canvas.width, canvas.height);
      particle.draw(this.ctx);
    });
    
    // Draw connections
    this.particles.forEach((p1, i) => {
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 * (1 - distance / 150)})`;
          this.ctx.lineWidth = 1;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      });
    });
    
    this.animationId = requestAnimationFrame(this.animate);
  };
}

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
    
    const colors = ['rgba(124, 58, 237, 0.6)', 'rgba(6, 182, 212, 0.6)', 'rgba(236, 72, 153, 0.6)'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update(canvasWidth: number, canvasHeight: number) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvasWidth) this.x = 0;
    if (this.x < 0) this.x = canvasWidth;
    if (this.y > canvasHeight) this.y = 0;
    if (this.y < 0) this.y = canvasHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}
