import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api';
  private http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course_list`);
  }
  getCourseDetail(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/course_detail?id=${id}`);
  }
}
