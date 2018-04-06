import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Video, YouTubeApiResponseItem } from './model';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/operators/map';
import { MatPaginator } from '@angular/material/paginator';

import { VideoTableService } from './video-table.service';
import { VideoTableDataSource } from './video-table.datasource';
import { Subscription } from 'rxjs/Subscription';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss']
})
export class VideoTableComponent implements OnInit, OnDestroy, AfterViewInit {
  // videos: Video[] = [];
  // videos: Observable<Video[]>;
  httpSubscription: Subscription;

  dataSource: VideoTableDataSource;

  displayedColumns = ['thumbnail', 'title', 'description', 'publishedAt'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatTable) dataTable: MatTable<Video>;

  constructor(public service: VideoTableService) { }

  ngOnInit() {
    // this.fetchVideos();
    this.dataSource = new VideoTableDataSource(this.service);
    this.dataSource.fetchVideos();
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataTable.viewChange.subscribe(data => {
    //   console.log('Start: ', data.start);
    //   console.log('End: ', data.end);
    // });

    console.log('Paginator: ', this.paginator);
    this.httpSubscription = this.paginator.page
      .pipe(
        tap(() => this.fetchVideosPage())
      ).subscribe();
  }

  fetchVideosPage() {
    this.dataSource.fetchVideos();
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  onPageChange(event) {
    console.log('onPageChange() called', event);
  }

  // fetchVideos() {
  //   this.videos = this.service.getVideos();
  //   // this.service.videos.subscribe(videos => {
  //   //   this.videos = videos;
  //   // });
  // }

}
