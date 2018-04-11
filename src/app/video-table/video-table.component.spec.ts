import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';

import { VideoTableComponent } from './video-table.component';
import { Inject, Injectable } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { YouTubeApiResponse, Video } from './model';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { getApiResponse, MockVideoTableDataSource, MockModule, MockComponent } from '../../../test/testHelpers';
import { MatPaginator, MatPaginatorIntl } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('VideoTableComponent', () => {
  let component: VideoTableComponent;
  let fixture: ComponentFixture<VideoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MockModule,
        RouterTestingModule.withRoutes([
          { path: '', component: MockComponent },
        ]),
      ],
      declarations: [ VideoTableComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: VideoTableDataSource, useValue: new MockVideoTableDataSource() }
      ]
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

  it('should call dataSource.fetchVideos when fetchVideos is invoked', () => {
    const dataSource = new VideoTableDataSource(null);
    const intl = new MatPaginatorIntl();
    const paginator = new MatPaginator(intl, null);
    const tableComponent = new VideoTableComponent(dataSource, null);
    tableComponent.paginator = paginator;
    spyOn(dataSource, 'fetchVideoData');

    tableComponent.fetchVideosPage();

    expect(dataSource.fetchVideoData).toHaveBeenCalled();
  });
});
