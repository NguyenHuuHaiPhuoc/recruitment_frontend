import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesslicenseComponent } from './businesslicense.component';

describe('BusinesslicenseComponent', () => {
  let component: BusinesslicenseComponent;
  let fixture: ComponentFixture<BusinesslicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinesslicenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinesslicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
