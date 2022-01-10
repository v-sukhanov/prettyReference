import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarGroupItemComponent } from './side-bar-group-item.component';

describe('SideBarGroupItemComponent', () => {
  let component: SideBarGroupItemComponent;
  let fixture: ComponentFixture<SideBarGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarGroupItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
