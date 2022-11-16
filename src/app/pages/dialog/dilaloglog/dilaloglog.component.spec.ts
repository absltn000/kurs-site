import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DilaloglogComponent } from './dilaloglog.component';

describe('DilaloglogComponent', () => {
  let component: DilaloglogComponent;
  let fixture: ComponentFixture<DilaloglogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DilaloglogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DilaloglogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
