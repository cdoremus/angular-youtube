import { TestBed, inject } from '@angular/core/testing';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { getApiResponse } from '../../../test/testHelpers';
import { INITIAL_STATE, AppState } from '../redux/root';
import { NgRedux } from '@angular-redux/store';

describe('VideoTableDataSource', () => {
  beforeEach(() => {
  });

  it('should call service.fetchVideos when fetchVideos is invoked and set internal properties', () => {
    const service = new VideoTableService(null, null);
    spyOn(service, 'fetchVideoData').and.callFake(() => {
      return of(getApiResponse());
    });
    const redux: NgRedux<AppState> = {getState: () => INITIAL_STATE} as NgRedux<AppState>;
    const datasource = new VideoTableDataSource(service, redux);

    datasource.fetchVideoData(PaginationDirection.NEXT);

    expect(datasource.nextPageToken).toEqual(getApiResponse().nextPageToken);
    expect(datasource.totalResults).toEqual(getApiResponse().pageInfo.totalResults);
  });
});
