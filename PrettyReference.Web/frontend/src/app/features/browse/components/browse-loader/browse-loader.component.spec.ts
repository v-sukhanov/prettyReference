import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseLoaderComponent } from './browse-loader.component';

describe('BrowseLoaderComponent', () => {
  let component: BrowseLoaderComponent;
  let fixture: ComponentFixture<BrowseLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseLoaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
