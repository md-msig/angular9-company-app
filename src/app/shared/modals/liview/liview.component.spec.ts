import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComViewComponent } from './comview.component';

describe('ComViewComponent', () => {
  let component: ComViewComponent;
  let fixture: ComponentFixture<ComViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
