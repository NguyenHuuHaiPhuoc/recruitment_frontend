import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardAdminBodyComponent } from './dashboard-admin-body.component';


describe('DashboardAdminBodyComponent', () => {
  let component: DashboardAdminBodyComponent;
  let fixture: ComponentFixture<DashboardAdminBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAdminBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAdminBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
