import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Video, YouTubeApiResponseItem } from './model';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/operators/map';
import { MatPaginator } from '@angular/material/paginator';

import { VideoTableService } from './video-table.service';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss']
})
export class VideoTableComponent implements OnInit, OnDestroy, AfterViewInit {
  httpSubscription: Subscription;

  dataSource: VideoTableDataSource;

  displayedColumns = ['thumbnail', 'title', 'description', 'publishedAt'];

  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public service: VideoTableService, dataSource?: VideoTableDataSource) {
    if (dataSource) {
      this.dataSource = dataSource;
    }
   }

  ngOnInit() {
    if (!this.dataSource) {
      this.dataSource = new VideoTableDataSource(this.service);
    }
    this.dataSource.fetchVideos(PaginationDirection.NONE);
  }

  ngAfterViewInit() {

    // console.log('Paginator: ', this.paginator);
    this.httpSubscription = this.paginator.page
      .pipe(
        tap((event) => {
          // console.log('Paginator.page event: ', event);
          return this.fetchVideosPage();
        })
      ).subscribe();
  }

  fetchVideosPage() {
    const index = this.paginator.pageIndex;
    const pagingDirection: PaginationDirection =
      index >= this.pageIndex ? PaginationDirection.NEXT : PaginationDirection.PREV;
    this.dataSource.fetchVideos(pagingDirection, index);
    this.pageIndex = index;
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

}
