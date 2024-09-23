import { Component } from '@angular/core';
import { BookManagement } from './bookmanagement';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookmanagement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookmanagement.component.html',
  styleUrl: './bookmanagement.component.css'
})
export class BookmanagementComponent {
  private apiUrl = 'http://localhost:5026/api/BookManagement';

  public columnNames: string[] = ["Id", "Student Name", "Book Name", "BID", "ED", "RD", "FAC",  "Actions"];
  public bookManagements: BookManagement[] = []; 
  public isTableVisible = true;
  public bookManagementForm: FormGroup;
  public isEditing = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.bookManagementForm = this.fb.group({
      id: [],
      studentId: [],
      bookId: [],
      bookIssueDate: [],
      bookReturnDate: [],
      expirtyDate: [],
      finAmountCharged: [],
    })
  }

  ngOnInit(): void {
    this.getBookManagementData();
  }

  

  getBookManagementData() {
    this.http.get<BookManagement[]>(this.apiUrl).subscribe((res: BookManagement[]) => {
        this.bookManagements = res;
    })
  }


  onCreate() {
    this.isTableVisible = false;
    this.isEditing = false;
    this.bookManagementForm.reset();
  }


  onCancel() {
    this.isTableVisible = true;
  }

  onSubmit() {
    console.log(this.bookManagementForm.value);

    this.http.post(this.apiUrl, this.bookManagementForm.value).subscribe(res => {
        alert('Record created successfully')
        this.isTableVisible = true;
        this.getBookManagementData()
    })

  }

  onUpdate() {
    console.log('on updated departmen form', this.bookManagementForm.value)
    this.http.put(this.apiUrl + '/' + this.bookManagementForm.value.id, this.bookManagementForm.value).subscribe(res => {
      alert('Record updated successfully');
      this.getBookManagementData();
    })

    this.isTableVisible = true;
  }


  onDelete(bookmanagement: BookManagement) {
    console.log("Student is: ", bookmanagement)

    this.http.delete(this.apiUrl + '/' + bookmanagement.id).subscribe(res => {
      alert('Record delete successfully');
      this.getBookManagementData();
    })
  }


  onEdit(bookManagement: BookManagement) {
    console.log("BookManagement is: ", bookManagement)

    const bookIssueDate = new Date(bookManagement.bookIssueDate).toISOString().substring(0, 10);
    const bookReturnDate = (bookManagement.bookReturnDate == null) ? "" : new Date(bookManagement.bookReturnDate).toISOString().substring(0, 10);
    const expirtyDate =  new Date(bookManagement.expirtyDate).toISOString().substring(0, 10);
    
    this.isTableVisible = false;
    this.bookManagementForm.patchValue(bookManagement)

    this.bookManagementForm.get('bookIssueDate')?.patchValue(bookIssueDate)
    this.bookManagementForm.get('bookReturnDate')?.patchValue(bookReturnDate)
    this.bookManagementForm.get('expirtyDate')?.patchValue(expirtyDate)
    this.isEditing = true;
  }

}
