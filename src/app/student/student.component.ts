import { Component, OnInit } from '@angular/core';
import { Student } from './student';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {
  private apiUrl = 'http://localhost:5026/api/Student';

  public columnNames: string[] = ["Id", "Student Name", "Department Name", "Actions"];
  public students: Student[] = []; 
  public isTableVisible = true;
  public studentForm: FormGroup;
  public isEditing = false;


  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      id : [],
      studentName: [],
      departmentId: []
    })
  }

  ngOnInit(): void {
    this.getStudents();
  }


  getStudents() {
    
    this.http.get<Student[]>(this.apiUrl).subscribe((res: Student[]) => {
        this.students = res;
    })
  }


  onCreate() {
    this.isTableVisible = false;
    this.isEditing = false;
    this.studentForm.reset();
  }


  onCancel() {
    this.isTableVisible = true;
  }

  onSubmit() {
    console.log(this.studentForm.value);

    this.http.post(this.apiUrl, this.studentForm.value).subscribe(res => {
        alert('Record created successfully')
        this.isTableVisible = true;
        this.getStudents()
    })

  }

  onUpdate() {
    console.log('on updated departmen form', this.studentForm.value)
    this.http.put(this.apiUrl + '/' + this.studentForm.value.id, this.studentForm.value).subscribe(res => {
      alert('Record updated successfully');
      this.getStudents();
    })

    this.isTableVisible = true;
  }


  onDelete(student: Student) {
    console.log("Student is: ", student)

    this.http.delete(this.apiUrl + '/' + student.id).subscribe(res => {
      alert('Record delete successfully');
      this.getStudents();
    })
  }


  onEdit(student: Student) {
    console.log("Student is: ", student)
    
    this.isTableVisible = false;
    this.studentForm.patchValue(student)
    this.isEditing = true;
  }




}
