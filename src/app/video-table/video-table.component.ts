import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Video, YouTubeApiResponseItem } from './model';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

import { VideoTableService } from './video-table.service';
import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss']
})
export class VideoTableComponent implements OnInit, OnDestroy, AfterViewInit {
  // data table column identifiers
  displayedColumns = ['thumbnail', 'title', 'description', 'publishedAt'];
  pageIndex = 0;
  httpSubscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public service: VideoTableService, public dataSource: VideoTableDataSource) {}

  ngOnInit() {
    this.dataSource.fetchVideos(PaginationDirection.NONE);
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
    this.dataSource.disconnect(null);
  }

  ngAfterViewInit() {
    this.httpSubscription = this.paginator.page
      .pipe(
        tap((event) => {
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

}
