import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScTomorrowComponent } from './sc-tomorrow.component';

describe('ScTomorrowComponent', () => {
  let component: ScTomorrowComponent;
  let fixture: ComponentFixture<ScTomorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScTomorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
