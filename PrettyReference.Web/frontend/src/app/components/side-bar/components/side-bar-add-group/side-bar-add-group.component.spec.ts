import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarAddGroupComponent } from './side-bar-add-group.component';

describe('SideBarAddGroupComponent', () => {
  let component: SideBarAddGroupComponent;
  let fixture: ComponentFixture<SideBarAddGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarAddGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
