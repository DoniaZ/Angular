import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages403Component } from './pages403.component';

describe('Pages403Component', () => {
  let component: Pages403Component;
  let fixture: ComponentFixture<Pages403Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pages403Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pages403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
