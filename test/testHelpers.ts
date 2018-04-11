import { YouTubeApiResponse } from '../src/app/video-table/model';
import { Injectable, Component, NgModule } from '@angular/core';
import { VideoTableService } from '../src/app/video-table/video-table.service';
import { PaginationDirection, VideoTableDataSource } from '../src/app/video-table/video-table.datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

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
            default: {
              url: '/vid1',
              width: 100,
              height: 200
            }
          },
          description: 'video one',
          publishedAt: '2018-4-10T0400'
        }
      },
    ]
  };
  return response;
};

@Injectable()
export class MockVideoTableService extends VideoTableService {

  constructor(http: HttpClient) {
    super(null, null);
   }

  fetchVideoData(): Observable<YouTubeApiResponse> {
    return Observable.create(observer => observer.next(getApiResponse()));
  }

}

@Injectable()
export class MockVideoTableDataSource extends VideoTableDataSource {

  constructor(service = null) {
    super(service);
  }

  fetchVideoData(paginationDirection: PaginationDirection) {
    // noop
  }
}

@Component({
  template: '<h2>MockComponent</h2>'
})
export class MockComponent {
  constructor() {}
}

@NgModule({
  imports: [],
  declarations: [MockComponent],
  exports: [MockComponent]
})
export class MockModule {}
