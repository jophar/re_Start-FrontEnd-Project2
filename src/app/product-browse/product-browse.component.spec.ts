import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrowseComponent } from './product-browse.component';

describe('PrductBrowseComponent', () => {
  let component: ProductBrowseComponent;
  let fixture: ComponentFixture<ProductBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrowseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
