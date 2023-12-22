import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from './../course.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListComponent {
  private cdr = inject(ChangeDetectorRef);
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

  filterCourses(e: string | null): void {
    this.selectedStatus = e || '';
    this.filterCallback();
  }

  onInputChange(e: string): void {
    this.searchText = e;
    this.filterCallback();
  }

  private filterCallback(): void {
    this.filteredCourses = this.courses.filter((course) => {
      const matchesStatus =
        !this.selectedStatus || course.status === this.selectedStatus;
      const matchesSearchText =
        !this.searchText ||
        course.name.toLowerCase().includes(this.searchText.toLowerCase());

      return matchesStatus && matchesSearchText;
    });
    this.cdr.markForCheck();
  }
}
