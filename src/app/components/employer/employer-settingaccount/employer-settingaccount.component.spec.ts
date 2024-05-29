import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerSettingaccountComponent } from './employer-settingaccount.component';

describe('EmployerSettingaccountComponent', () => {
  let component: EmployerSettingaccountComponent;
  let fixture: ComponentFixture<EmployerSettingaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerSettingaccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerSettingaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
