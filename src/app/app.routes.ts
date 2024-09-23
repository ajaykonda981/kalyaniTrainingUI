import { Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { StudentComponent } from './student/student.component';
import { BookComponent } from './book/book.component';
import { BookmanagementComponent } from './bookmanagement/bookmanagement.component';

export const routes: Routes = [

   {
      path: 'department',
      component: DepartmentComponent,
   },
   {
      path: 'student',
      component: StudentComponent,
   },
   {
      path: 'book',
      component: BookComponent,
   },
   {
      path: 'bookManagement',
      component: BookmanagementComponent
   }
];
