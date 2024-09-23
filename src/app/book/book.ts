export interface Book 
{
    id: number;
    bookName: string;
    departmentId: number;
    actualStock: number;
    givenToStudents: number;
    remainingStock: number;
    departmentName: string;
}