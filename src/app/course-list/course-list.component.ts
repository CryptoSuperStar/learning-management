import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from './../course.service';
import type { Course } from '../course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent {
  courses: Course[] = [];
  selectedStatus: string = '';
  searchText: string = '';
  filteredCourses: Course[] = this.courses;

  constructor(private CourseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.CourseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.filterCourses(null);
    });
  }

  goToCourseDetail(id: number): void {
    this.router.navigate(['/course', id.toString()]);
  }

  filterCourses(e: any): void {
    this.selectedStatus = e;
    this.filteredCourses = this.courses.filter(course => {
      const matchesStatus = !this.selectedStatus || course.status === this.selectedStatus;
      const matchesSearchText = !this.searchText || course.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesStatus && matchesSearchText;
    })
  }

  onInputChange(e: any): void {
    this.searchText = e;
    this.filteredCourses = this.courses.filter(course => {
      const matchesStatus = !this.selectedStatus || course.status === this.selectedStatus;
      const matchesSearchText = !this.searchText || course.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesStatus && matchesSearchText;
    })
  }
}
