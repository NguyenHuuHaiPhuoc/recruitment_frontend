import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImfomationUserComponent } from './imfomation-user.component';

describe('ImfomationUserComponent', () => {
  let component: ImfomationUserComponent;
  let fixture: ComponentFixture<ImfomationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImfomationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImfomationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
