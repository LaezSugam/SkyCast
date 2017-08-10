import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkycastComponent } from './skycast.component';

describe('SkycastComponent', () => {
  let component: SkycastComponent;
  let fixture: ComponentFixture<SkycastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkycastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkycastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
