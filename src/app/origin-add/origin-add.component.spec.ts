import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginAddComponent } from './origin-add.component';

describe('OriginAddComponent', () => {
  let component: OriginAddComponent;
  let fixture: ComponentFixture<OriginAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
