import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackClientsComponent } from './feedback-clients.component';

describe('FeedbackClientsComponent', () => {
  let component: FeedbackClientsComponent;
  let fixture: ComponentFixture<FeedbackClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
