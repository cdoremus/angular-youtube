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
import { By } from '@angular/platform-browser';
import { getApiResponse } from '../../test/testHelpers';

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

  it('component should contain display columns array', () => {
    const columns: string[] = component.displayedColumns;
    expect(columns.length).toBe(4);
    expect(columns.includes('description')).toBeTruthy();
  });

  it('component data table should contain 4 headers', () => {
    const els = fixture.debugElement.queryAll(By.css('.mat-header-cell'));
    expect(els.length).toBe(4);
  });

  it('component paginator should show 10 items per page', () => {
    const el = fixture.debugElement.query(By.css('div.mat-paginator-page-size-label + div'));
    expect(el.nativeElement.innerHTML).toBe('10');
  });

});

@Injectable()
class MockVideoTableService extends VideoTableService {

  constructor(public http: HttpClient) {
    super(http, null);
   }

  fetchVideos(): Observable<YouTubeApiResponse> {
    return Observable.create(observer => observer.next(getApiResponse()));
  }

}

@Injectable()
class MockVideoTableDataSource extends VideoTableDataSource {

  constructor(service: VideoTableService) {
    super(service);
  }

  fetchVideos(paginationDirection: PaginationDirection) {
    // noop
  }
}

// const getApiResponse = () => {
//   const response: YouTubeApiResponse = {
//     nextPageToken: 'nextPage',
//     pageInfo: {resultsPerPage: '10', totalResults: '100'},
//     items: [
//       {
//         id: {kind: 'video', videoId: 'vid1'},
//         snippet: {
//           videoId: 'vid1',
//           title: 'video1',
//           thumbnails: {
//             url: '/vid1',
//             width: 100,
//             height: 200
//           },
//           description: 'video one',
//           publishedAt: new Date().toDateString()
//         }
//       },
//     ]
//   };
//   return response;
// };
