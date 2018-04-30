import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductsCommentsComponent } from './user-products-comments.component';

describe('UserProductsCommentsComponent', () => {
  let component: UserProductsCommentsComponent;
  let fixture: ComponentFixture<UserProductsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
