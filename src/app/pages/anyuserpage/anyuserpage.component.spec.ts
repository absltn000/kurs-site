import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnyuserpageComponent } from './anyuserpage.component';

describe('AnyuserpageComponent', () => {
  let component: AnyuserpageComponent;
  let fixture: ComponentFixture<AnyuserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnyuserpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnyuserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
