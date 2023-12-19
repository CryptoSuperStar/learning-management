import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from './../course.service';
import {
  NgMultiSelectDropDownModule,
  IDropdownSettings,
} from 'ng-multiselect-dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Instructor, Course } from './../course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [NgMultiSelectDropDownModule, CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {
  courseDetail: Course = {
    id: 0,
    name: '',
    imageUrl: '',
    status: '',
    instructors: [],
  };

  dropdownList: Instructor[] = [];
  selectedItems: Instructor[] = [];
  dropdownSettings = {};

  constructor(
    private CourseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
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
          allowSearchFilter: true
        };
        console.log(courseDetail.instructors);
      });
    } else {
      console.log('ID parameter is null');
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
