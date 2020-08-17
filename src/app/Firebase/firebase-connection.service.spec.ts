import { TestBed } from '@angular/core/testing';

import { FirebaseConnectionService } from './firebase-connection.service';

describe('FirebaseConnectionService', () => {
  let service: FirebaseConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
