import { YouTubeApiResponse, Video, YouTubeApiResponseItem } from '../src/app/video-table/model';
import { Injectable, Component, NgModule } from '@angular/core';
import { VideoTableService } from '../src/app/video-table/video-table.service';
import { PaginationDirection, VideoTableDataSource } from '../src/app/video-table/video-table.datasource';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../src/app/redux/root';

export const getApiResponse = (
  nextPageToken?: string,
  items?: YouTubeApiResponseItem[],
  pageInfo?: {resultsPerPage: string, totalResults: string},
) => {
  // set defaults
  if (!pageInfo) {
    pageInfo = {resultsPerPage: '10', totalResults: '100'};
  }
  if (!items) {
    const newItems = [
      getApiResponseItem(),
    ];
    items = newItems;
  }
  const response: YouTubeApiResponse = {
    nextPageToken: nextPageToken ? nextPageToken : 'nextPage',
    pageInfo: pageInfo,
    items: items
  };
  return response;
};

export const getApiResponseItem = (
    videoId?: string,
    title?: string,
    description?: string,
    publishedAt?: string,
  ): YouTubeApiResponseItem => {
    videoId = videoId ? videoId : 'videoId';
    return {
      id: {kind: 'video', videoId: videoId},
      snippet: {
        videoId: videoId,
        title: title ? title : 'video title',
        thumbnails: {
          default: {
            url: '/vid1',
            width: 100,
            height: 200
          }
        },
        description: description ? description : 'video description',
        publishedAt: publishedAt ? publishedAt : '1970-1-1T1200',
      }
    };
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

  constructor(service = null, redux = {} as NgRedux<AppState>) {
    super(service, redux);
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
