import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAdminContentComponent } from './dashboard-admin-content.component';


describe('DashboardAdminContentComponent', () => {
  let component: DashboardAdminContentComponent;
  let fixture: ComponentFixture<DashboardAdminContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdminContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdminContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
