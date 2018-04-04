import { TestBed, inject } from '@angular/core/testing';

import { VideoTableService } from './video-table.service';

describe('VideoTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VideoTableService]
    });
  });

  it('should be created', inject([VideoTableService], (service: VideoTableService) => {
    expect(service).toBeTruthy();
  }));
});
