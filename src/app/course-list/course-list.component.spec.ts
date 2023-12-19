import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import { CourseService } from '../course.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    mockCourseService = jasmine.createSpyObj('CourseService', ['getCourses']);
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      providers: [{ provide: CourseService, useValue: mockCourseService }],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    mockCourseService.getCourses.and.returnValue(
      of([
        {
          id: 1,
          name: 'Course 1',
          imageUrl: 'image1.jpg',
          status: 'DRAFT',
          instructors: [],
        },
        {
          id: 2,
          name: 'Course 2',
          imageUrl: 'image2.jpg',
          status: 'PUBLISHED',
          instructors: [],
        },
      ])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch courses on init', () => {
    expect(mockCourseService.getCourses).toHaveBeenCalled();
    expect(component.courses.length).toBe(2);
  });

  it('should filter courses based on search text', () => {
    component.searchText = 'Course 1';
    component.onInputChange('Course 1');
    expect(component.filteredCourses.length).toBe(1);
    expect(component.filteredCourses[0].name).toContain('Course 1');
  });
  it('should filter courses based on status', () => {
    component.selectedStatus = 'DRAFT';
    component.filterCourses("DRAFT");
    expect(component.filteredCourses.length).toBe(1);
    expect(component.filteredCourses[0].name).toContain('Course 1');
  });
});
