import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Instructor {
  name: string;
  image: string;
}

export interface Course {
  id: number;
  name: string;
  imageUrl: string;
  status: string;
  instructors: Instructor[]
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course_list`);
  }
  getCourseDetail(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/course_detail?id=${id}`);
  }
}
