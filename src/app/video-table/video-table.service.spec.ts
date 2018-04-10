import { TestBed, inject, getTestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VideoTableService, YOU_TUBE_API_URL, YOU_TUBE_CHANNEL_ID } from './video-table.service';
import { YouTubeApiResponse } from './model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { getApiResponse, MockVideoTableDataSource } from '../../test/testHelpers';
import { VideoTableDataSource } from './video-table.datasource';
import { PagedVideoDataCacheService } from './paged-videodata-cache.service';

describe('VideoTableService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        PagedVideoDataCacheService,
        VideoTableService
      ]
    });
  });

  it('service should be created', inject([VideoTableService],
      (service: VideoTableService) => {
    expect(service).toBeTruthy();
  }));

  it('fetchVideos should be called with null pageToken param', async(
    inject([VideoTableService, HttpTestingController],
      (service: VideoTableService, backend: HttpTestingController) => {
      const apiResponse = getApiResponse();

      service.fetchVideos('').subscribe(response => {
        expect(response.pageInfo.totalResults).toBe('100');
      });

      const mockRequest = backend.expectOne(req => req.method === 'GET' && req.url === YOU_TUBE_API_URL);
      expect(mockRequest.request.params.get('channelId')).toBe(YOU_TUBE_CHANNEL_ID);
      expect(mockRequest.request.params.get('pageToken')).toBeNull();
      mockRequest.flush(apiResponse);
      backend.verify();

    }) /* inject*/ ) /* async */
  );

  it('fetchVideos should be called with pageToken param not null', async(
    inject([VideoTableService, HttpTestingController],
      (service: VideoTableService, backend: HttpTestingController) => {
      const apiResponse = getApiResponse();
      const pageToken = 'page1'  ;

      service.fetchVideos(pageToken).subscribe(response => {
        // console.log('Service response: ', response);
        expect(response.pageInfo.totalResults).toBe('100');
        expect(response.items.length).toBe(1);
      });

      const mockRequest = backend.expectOne(req => req.method === 'GET' && req.url === YOU_TUBE_API_URL);
      expect(mockRequest.request.params.get('channelId')).toBe(YOU_TUBE_CHANNEL_ID);
      expect(mockRequest.request.params.get('pageToken')).toBe(pageToken);
      mockRequest.flush(apiResponse);
      backend.verify();

    }) /* inject*/ ) /* async */
  );

});
