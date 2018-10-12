import { TestBed, inject } from '@angular/core/testing';

import { HoroscopeService } from './horoscope.service';

describe('HoroscopeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoroscopeService]
    });
  });

  it('should be created', inject([HoroscopeService], (service: HoroscopeService) => {
    expect(service).toBeTruthy();
  }));
});
