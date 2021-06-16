import { TestBed } from '@angular/core/testing';

import { HoroscopeService } from './horoscope.service';

describe('HoroscopeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HoroscopeService = TestBed.get(HoroscopeService);
    expect(service).toBeTruthy();
  });
});
