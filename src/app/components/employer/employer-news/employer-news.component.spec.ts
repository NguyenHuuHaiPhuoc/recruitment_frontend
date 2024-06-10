import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerNewsComponent } from './employer-news.component';

describe('EmployerNewsComponent', () => {
  let component: EmployerNewsComponent;
  let fixture: ComponentFixture<EmployerNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
