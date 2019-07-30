import { TestBed } from '@angular/core/testing';

import { HttpConnectHandlerService } from '../services/http-connect-handler.service';

describe('HttpConnectHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpConnectHandlerService = TestBed.get(HttpConnectHandlerService);
    expect(service).toBeTruthy();
  });
});
