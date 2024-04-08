import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMenustartComponent } from './header-menustart.component';

describe('HeaderMenustartComponent', () => {
  let component: HeaderMenustartComponent;
  let fixture: ComponentFixture<HeaderMenustartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMenustartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderMenustartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
