import { TestBed, inject } from '@angular/core/testing';

import { SkycastService } from './skycast.service';

describe('SkycastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkycastService]
    });
  });

  it('should be created', inject([SkycastService], (service: SkycastService) => {
    expect(service).toBeTruthy();
  }));
});
