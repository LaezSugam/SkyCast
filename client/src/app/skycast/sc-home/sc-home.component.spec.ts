import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScHomeComponent } from './sc-home.component';

describe('ScHomeComponent', () => {
  let component: ScHomeComponent;
  let fixture: ComponentFixture<ScHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
