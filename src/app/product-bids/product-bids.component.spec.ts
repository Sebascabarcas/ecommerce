import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBidsComponent } from './product-bids.component';

describe('ProductBidsComponent', () => {
  let component: ProductBidsComponent;
  let fixture: ComponentFixture<ProductBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
