import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  private apiUrl = 'http://localhost:5026/api/Books';

  public columnNames: string[] = ["Id", "Book Name", "Department Name", "Actual Stock", "Remaining Stock", "GivenTo Students", "Actions"];
  public books: Book[] = []; 
  public isTableVisible = true;
  public bookForm: FormGroup;
  public isEditing = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {

    this.bookForm = this.fb.group({
      id : [],
      bookName: [],
      departmentId: [],
      actualStock: [],
      givenToStudents: [],
      remainingStock: []
    })

  }

  ngOnInit(): void {
    this.getBooks();
  }


  onCreate() {
    this.isTableVisible = false;
    this.isEditing = false;
    this.bookForm.reset();
  }

  onEdit(book: Book) {
    console.log("Book is: ", book)
    
    this.isTableVisible = false;
   this.bookForm.patchValue(book)
    this.isEditing = true;
  }

  onDelete(book: Book) {
    console.log("Book is: ", book)

    this.http.delete(this.apiUrl + '/' + book.id).subscribe(res => {
      alert('Record delete successfully');
      this.getBooks();
    })
  }

  getBooks() {
    this.http.get<Book[]>(this.apiUrl).subscribe((res: Book[]) => {
        this.books = res;
    })
  }


  onCancel() {
    this.isTableVisible = true;
  }

  onSubmit() {
    console.log(this.bookForm.value);

    this.http.post(this.apiUrl, this.bookForm.value).subscribe(res => {
        alert('Record created successfully')
        this.isTableVisible = true;
        this.getBooks()
    })

  }

  onUpdate() {
    console.log('on updated book form', this.bookForm.value)
    this.http.put(this.apiUrl + '/' + this.bookForm.value.id, this.bookForm.value).subscribe(res => {
      alert('Record updated successfully');
      this.getBooks();
    })

    this.isTableVisible = true;
  }



}
