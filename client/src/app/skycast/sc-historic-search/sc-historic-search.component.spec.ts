import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScHistoricSearchComponent } from './sc-historic-search.component';

describe('ScHistoricSearchComponent', () => {
  let component: ScHistoricSearchComponent;
  let fixture: ComponentFixture<ScHistoricSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScHistoricSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScHistoricSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
