import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Video, YouTubeApiResponseItem } from './model';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

import { VideoTableDataSource, PaginationDirection } from './video-table.datasource';
import { CollectionViewer } from '@angular/cdk/collections';

/**
 * Component that contains the Angular Material
 * data table component used to display data
 * to the user.
 *
 * @export
 * @class VideoTableComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss']
})
export class VideoTableComponent implements OnInit, OnDestroy, AfterViewInit {
  // data table column identifiers
  displayedColumns = ['thumbnail', 'title', 'description', 'publishedAt'];
  // the current page index
  pageIndex = 0;
  // holds the substription to the paginator's page event
  pageEventSubscription: Subscription;
  // holds a reference to the paginator used by the data table
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dataSource: VideoTableDataSource) {}

  /**
   * Angular lifecycle method used here to fetch
   * the first page's data.
   *
   * @memberof VideoTableComponent
   */
  ngOnInit() {
    this.dataSource.fetchVideoData(PaginationDirection.NONE);
  }

  /**
   * Angular lifecycle method used here to cleanup
   * the page event subscription and the data source.
   *
   *
   * @memberof VideoTableComponent
   */
  ngOnDestroy() {
    if (this.pageEventSubscription) {
      this.pageEventSubscription.unsubscribe();
    }
    this.dataSource.disconnect({} as CollectionViewer);
  }

  /**
   * Angular lifecycle method used here to setup
   * a subscription to the paginator's page event
   * that is notified when the page size or
   * page index is changed. This implementation
   * calls #fetchVideosPage to refresh data
   * table data.
   *
   * @memberof VideoTableComponent
   */
  ngAfterViewInit() {
    this.pageEventSubscription = this.paginator.page
      .pipe(
        tap((event) => {
          return this.fetchVideosPage();
        })
      ).subscribe();
  }

  /**
   * Fetches a page of video data to be displayed
   * in the data table component.
   *
   * @memberof VideoTableComponent
   */
  fetchVideosPage() {
    const index = this.paginator.pageIndex;
    const pagingDirection: PaginationDirection =
      index >= this.pageIndex ? PaginationDirection.NEXT : PaginationDirection.PREV;
    this.dataSource.fetchVideoData(pagingDirection, index);
    this.pageIndex = index;
  }

}
