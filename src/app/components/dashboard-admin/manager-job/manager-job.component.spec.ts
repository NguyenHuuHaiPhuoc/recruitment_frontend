import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermentjobComponent } from './manager-job.component';

describe('CodeComponent', () => {
  let component: ManagermentjobComponent;
  let fixture: ComponentFixture<ManagermentjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagermentjobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagermentjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
