import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFromComponent } from './project-from.component';

describe('ProjectFromComponent', () => {
  let component: ProjectFromComponent;
  let fixture: ComponentFixture<ProjectFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
