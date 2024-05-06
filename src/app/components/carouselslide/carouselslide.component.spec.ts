import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselslideComponent } from './carouselslide.component';

describe('CarouselslideComponent', () => {
  let component: CarouselslideComponent;
  let fixture: ComponentFixture<CarouselslideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselslideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
