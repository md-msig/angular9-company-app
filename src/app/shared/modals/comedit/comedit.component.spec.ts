import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComEditComponent } from './comedit.component';

describe('ComEditComponent', () => {
  let component: ComEditComponent;
  let fixture: ComponentFixture<ComEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
