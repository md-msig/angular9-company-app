import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiAddComponent } from './liadd.component';

describe('LiAddComponent', () => {
  let component: LiAddComponent;
  let fixture: ComponentFixture<LiAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
