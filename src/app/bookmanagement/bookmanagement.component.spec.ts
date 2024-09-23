import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmanagementComponent } from './bookmanagement.component';

describe('BookmanagementComponent', () => {
  let component: BookmanagementComponent;
  let fixture: ComponentFixture<BookmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmanagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
