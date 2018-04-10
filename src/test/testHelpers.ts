import { YouTubeApiResponse } from '../app/video-table/model';
import { Injectable } from '@angular/core';
import { VideoTableService } from '../app/video-table/video-table.service';
import { PaginationDirection, VideoTableDataSource } from '../app/video-table/video-table.datasource';

export const getApiResponse = () => {
  const response: YouTubeApiResponse = {
    nextPageToken: 'nextPage',
    pageInfo: {resultsPerPage: '10', totalResults: '100'},
    items: [
      {
        id: {kind: 'video', videoId: 'vid1'},
        snippet: {
          videoId: 'vid1',
          title: 'video1',
          thumbnails: {
            url: '/vid1',
            width: 100,
            height: 200
          },
          description: 'video one',
          publishedAt: new Date().toDateString()
        }
      },
    ]
  };
  return response;
};

@Injectable()
export class MockVideoTableDataSource extends VideoTableDataSource {

  constructor(service = null) {
    super(service);
  }

  fetchVideos(paginationDirection: PaginationDirection) {
    // noop
  }
}
