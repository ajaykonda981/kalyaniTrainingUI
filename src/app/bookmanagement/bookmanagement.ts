export interface BookManagement
{
    id: number,
    studentId: number,
    bookId: number,
    bookIssueDate: Date,
    bookReturnDate: Date,
    expirtyDate: Date,
    finAmountCharged: number,
    studentName: string,
    bookName: string
} 