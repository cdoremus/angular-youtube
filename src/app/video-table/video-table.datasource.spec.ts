import { TestBed, inject } from '@angular/core/testing';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { getApiResponse } from '../../../test/testHelpers';

describe('VideoTableDataSource', () => {
  beforeEach(() => {
  });

  it('should call service.fetchVideos when fetchVideos is invoked and set internal properties', () => {
    const service = new VideoTableService(null, null);
    spyOn(service, 'fetchVideos').and.callFake(() => {
      return of(getApiResponse());
    });
    const datasource = new VideoTableDataSource(service);

    datasource.fetchVideos(PaginationDirection.NEXT);

    expect(datasource.nextPageToken).toEqual(getApiResponse().nextPageToken);
    expect(datasource.totalResults).toEqual(getApiResponse().pageInfo.totalResults);
  });
});
