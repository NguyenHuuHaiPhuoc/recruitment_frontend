import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListNewComponent } from './job-list-new.component';

describe('JobListNewComponent', () => {
  let component: JobListNewComponent;
  let fixture: ComponentFixture<JobListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
