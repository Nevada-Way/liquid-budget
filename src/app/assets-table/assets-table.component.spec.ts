import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTableComponent } from './assets-table.component';

describe('AssetsTableComponent', () => {
  let component: AssetsTableComponent;
  let fixture: ComponentFixture<AssetsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
