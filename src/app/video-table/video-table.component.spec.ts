import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';

import { VideoTableComponent } from './video-table.component';
import { CUSTOM_ELEMENTS_SCHEMA, Inject, Injectable } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { YouTubeApiResponse, Video } from './model';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VideoTableComponent', () => {
  let component: VideoTableComponent;
  let fixture: ComponentFixture<VideoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [ VideoTableComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: VideoTableService, useClass: MockVideoTableService },
        { provide: VideoTableDataSource, useClass: MockVideoTableDataSource }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // it('calling fetchVideosPage() should call dataSource.fetchVideos', () => {
  //   expect(component).toBeTruthy();
  // });

});

@Injectable()
class MockVideoTableService extends VideoTableService {

  constructor(public http: HttpClient) {
    super(http);
   }

  fetchVideos(): Observable<YouTubeApiResponse> {
    return Observable.create(observer => observer.next(getApiResponse()));
  }

}

class MockVideoTableDataSource extends VideoTableDataSource {

  constructor(@Inject(VideoTableService) service: VideoTableService) {
    super(service);
  }

  fetchVideos(paginationDirection: PaginationDirection) {
    // noop
  }
}

const getApiResponse = () => {
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
          publishedAt: new Date()
        }
      },
    ]
  };
  return response;
};
