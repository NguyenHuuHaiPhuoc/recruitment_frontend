import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCvComponent } from './manager.component';

describe('ManagerCvComponent', () => {
  let component: ManagerCvComponent;
  let fixture: ComponentFixture<ManagerCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
