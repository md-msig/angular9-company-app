import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComAddComponent } from './comadd.component';

describe('ComAddComponent', () => {
  let component: ComAddComponent;
  let fixture: ComponentFixture<ComAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
