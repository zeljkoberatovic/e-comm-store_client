import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  slides = [
    {
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      title: 'First slide',
      description: 'This is first slide',
    },
    {
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80',
      title: 'Second slide',
      description: 'This is second slide',
    },
    {
      image: 'https://images.unsplash.com/photo-1709884732294-90379fee354c?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: '',
      description: 'Check out the latest products in our store',
    },
  ];

  currentIndex = 0;
  private slideInterval?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }, 3000); 
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
