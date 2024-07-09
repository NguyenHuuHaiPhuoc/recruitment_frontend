import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfomationUserComponent } from './imfomation-user.component';

describe('InfomationUserComponent', () => {
  let component: InfomationUserComponent;
  let fixture: ComponentFixture<InfomationUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfomationUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfomationUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
