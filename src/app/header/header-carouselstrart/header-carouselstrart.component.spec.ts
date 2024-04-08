import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCarouselstrartComponent } from './header-carouselstrart.component';

describe('HeaderCarouselstrartComponent', () => {
  let component: HeaderCarouselstrartComponent;
  let fixture: ComponentFixture<HeaderCarouselstrartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCarouselstrartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCarouselstrartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
