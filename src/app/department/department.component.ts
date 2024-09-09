import { Component, OnInit } from '@angular/core'; //namespace
import { Department } from './department';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {

  private apiUrl = 'http://localhost:5026/api/Department';




  public columnNames: string[] = ["Id", "DepartmentName", "Actions"];
  public departments: Department[] = []; 
  public selectedDepartment: Department = { id: 0, departmentName: '' };
  public isTableVisible = true;
  public departmentForm: FormGroup;
  public isEditing = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
     this.departmentForm = this.fb.group({
          id : [],
          departmentName: []
     })
  }

  ngOnInit() {
    
    this.getDepartments();

  }

  initializeDepartmentForm() {

  }



  
  getDepartments() {
    
    this.http.get<Department[]>(this.apiUrl).subscribe((res: Department[]) => {
        this.departments = res;
    })
  }

  onCreate() {
    this.isTableVisible = false;
    this.isEditing = false;
    this.departmentForm.reset();
  }

  onCancel() {
    this.isTableVisible = true;
  }

  onSubmit() {
    console.log(this.departmentForm.value);

    this.http.post(this.apiUrl, this.departmentForm.value).subscribe(res => {
        alert('Record created successfully')
        this.isTableVisible = true;
        this.getDepartments()
    })

  }

  onDelete(department: Department) {
    console.log("Department is: ", department)

    this.http.delete(this.apiUrl + '/' + department.id).subscribe(res => {
      alert('Record delete successfully');
      this.getDepartments();
    })
  }


  onEdit(department: Department) {
    console.log("Department is: ", department)
    
    this.isTableVisible = false;
    this.departmentForm.patchValue(department)
    this.isEditing = true;
  }


  onUpdate() {
    console.log('on updated departmen form', this.departmentForm.value)
    this.http.put(this.apiUrl + '/' + this.departmentForm.value.id, this.departmentForm.value).subscribe(res => {
      alert('Record updated successfully');
      this.getDepartments();
    })

    this.isTableVisible = true;
  }

  
}


