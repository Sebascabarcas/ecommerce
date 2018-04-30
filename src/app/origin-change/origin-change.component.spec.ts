import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginChangeComponent } from './origin-change.component';

describe('OriginChangeComponent', () => {
  let component: OriginChangeComponent;
  let fixture: ComponentFixture<OriginChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
