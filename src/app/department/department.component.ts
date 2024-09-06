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




  public columnNames: string[] = ["Id", "DepartmentName"];
  public departments: Department[] = []; 
  public selectedDepartment: Department = { id: 0, departmentName: '' };
  public isTableVisible = true;
  public departmentForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
     this.departmentForm = this.fb.group({
          id : [],
          departmentName: []
     })
  }

  ngOnInit() {
    
    this.getDepartments();



  }

  getDepartments() {
    
    this.http.get<Department[]>(this.apiUrl).subscribe((res: Department[]) => {
        this.departments = res;
    })
  }

  onClick() {
    this.isTableVisible = false;
  }

  onCancel() {
    this.isTableVisible = true;
  }

  onSubmit() {
    console.log(this.departmentForm.value);

    this.http.post(this.apiUrl, this.departmentForm.value).subscribe(res => {
        alert('Record created successfully')
    })

  }


  
}


