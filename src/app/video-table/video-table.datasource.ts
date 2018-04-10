import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Video, YouTubeApiResponse } from './model';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';

export enum PaginationDirection {
  NEXT = 'NEXT',
  PREV = 'PREV',
  NONE = 'NONE'
}

@Injectable()
export class VideoTableDataSource implements DataSource<Video> {

  private videoFetchSubscription: Subscription;
  private videosSubject = new BehaviorSubject<Video[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  nextPageToken = '';
  prevPageToken = '';
  resultsPerPage = '10';
  totalResults = '0';

  constructor(public service: VideoTableService) {}

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    if (this.videoFetchSubscription) {
      this.videoFetchSubscription.unsubscribe();
    }
    this.videosSubject.complete();
    this.loadingSubject.complete();
  }

  fetchVideoData(paginationDirection: PaginationDirection, pageIndex?: number) {
    this.loadingSubject.next(true);
    const pageToken: string = paginationDirection === PaginationDirection.NEXT ? this.nextPageToken : this.prevPageToken;
    this.videoFetchSubscription = this.service.fetchVideoData(pageToken)
      .pipe(
        catchError((error) => {
          return ErrorObservable.create(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: YouTubeApiResponse) => {
        console.log('API Response', response);
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken;
        this.totalResults = response.pageInfo.totalResults;
        this.resultsPerPage = response.pageInfo.resultsPerPage;
        const videos: Video[] = response.items.map(item => {
          const video: Video =  item.snippet;
          // videoId used to fetch video
          video.videoId = item.id.videoId;
          // format date/time as date only
          const dateString = video.publishedAt;
          const timeSeparator = 'T'; // separates date from time part
          if (dateString.includes(timeSeparator)) {
            const date = dateString.substring(0, dateString.indexOf(timeSeparator));
            video.publishedAt = date;
          }
          return video;
        });
        return this.videosSubject.next(videos);
      }, error => {
        console.error('Problem fetching videos from data source (VideoTableDataSource#fetchVideos)', error);
        throw error;
      }
    );
  }

}
