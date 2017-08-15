import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSearchHistoryComponent } from './sc-search-history.component';

describe('ScSearchHistoryComponent', () => {
  let component: ScSearchHistoryComponent;
  let fixture: ComponentFixture<ScSearchHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScSearchHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScSearchHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
