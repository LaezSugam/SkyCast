import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScNextWeekComponent } from './sc-next-week.component';

describe('ScNextWeekComponent', () => {
  let component: ScNextWeekComponent;
  let fixture: ComponentFixture<ScNextWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScNextWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScNextWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
