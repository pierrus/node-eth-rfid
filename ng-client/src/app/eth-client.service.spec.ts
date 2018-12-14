import { TestBed } from '@angular/core/testing';

import { EthClientService } from './eth-client.service';

describe('EthClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EthClientService = TestBed.get(EthClientService);
    expect(service).toBeTruthy();
  });
});
