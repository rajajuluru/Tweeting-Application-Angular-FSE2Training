import { TestBed } from '@angular/core/testing';

import { RestApiServicesService } from './rest-api-services.service';

describe('RestApiServicesService', () => {
  let service: RestApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
