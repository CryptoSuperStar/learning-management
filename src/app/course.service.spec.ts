import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CourseService } from './course.service';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve courses from the API via GET', () => {
    const mockCourses = [
      {
        id: 1,
        name: 'Course 1',
        imageUrl: 'image1.jpg',
        status: 'Active',
        instructors: [],
      },
      {
        id: 2,
        name: 'Course 2',
        imageUrl: 'image2.jpg',
        status: 'Inactive',
        instructors: [],
      },
    ];

    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/course_list');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should retrieve a course detail from the API via GET', () => {
    const courseId = '1';
    const mockCourse = {
      id: 1,
      name: 'Course 1',
      imageUrl: 'image1.jpg',
      status: 'Active',
      instructors: [],
    };

    service.getCourseDetail(courseId).subscribe((course) => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/api/course_detail?id=${courseId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });
});
