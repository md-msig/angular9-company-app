import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiViewComponent } from './liview.component';

describe('LiViewComponent', () => {
  let component: LiViewComponent;
  let fixture: ComponentFixture<LiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
