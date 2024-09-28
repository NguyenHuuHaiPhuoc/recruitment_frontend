import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerifyComponent } from './phone-verify.component';

describe('PhoneVerifyComponent', () => {
  let component: PhoneVerifyComponent;
  let fixture: ComponentFixture<PhoneVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneVerifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
