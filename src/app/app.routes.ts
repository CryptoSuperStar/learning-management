import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: CourseListComponent },
  { path: 'course/:id', component: CourseDetailComponent }, // no lazy load
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
