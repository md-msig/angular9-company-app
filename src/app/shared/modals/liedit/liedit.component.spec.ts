import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiEditComponent } from './liedit.component';

describe('LiEditComponent', () => {
  let component: LiEditComponent;
  let fixture: ComponentFixture<LiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
