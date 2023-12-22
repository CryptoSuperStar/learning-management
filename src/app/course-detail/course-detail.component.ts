import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './../course.service';
import {
  IDropdownSettings,
  NgMultiSelectDropDownModule,
} from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Course } from '../models/course.model';
import { Instructor } from '../models/instructor.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent {
  private cdr = inject(ChangeDetectorRef);
  courseDetail: Course = {} as Course;

  dropdownList: Instructor[] = [];
  selectedItems: Instructor[] = [];
  dropdownSettings: IDropdownSettings = {} as IDropdownSettings; //typed

  constructor(
    private CourseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      console.log('ID parameter is null');
      return;
    }

    this.CourseService.getCourseDetail(id).subscribe((courseDetail) => {
      this.courseDetail = courseDetail;
      this.selectedItems = courseDetail.instructors;
      this.dropdownList = courseDetail.instructors;
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      };
      this.cdr.markForCheck();
    });
  }
}
