import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Video, YouTubeApiResponse } from './model';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

export enum PaginationDirection {
  NEXT = 'NEXT',
  PREV = 'PREV',
  NONE = 'NONE'
}

export class VideoTableDataSource implements DataSource<Video> {

  private videosSubject = new BehaviorSubject<Video[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private videoFetchSubscription: Subscription;
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

  fetchVideos(paginationDirection: PaginationDirection) {
    this.loadingSubject.next(true);
    const pageToken: string = paginationDirection === PaginationDirection.NEXT ? this.nextPageToken : this.prevPageToken;
    this.videoFetchSubscription = this.service.fetchVideos(pageToken)
      .pipe(
        catchError(() => of([])), // TODO: send message to UI
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((response: YouTubeApiResponse) => {
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken;
        this.totalResults = response.pageInfo.totalResults;
        this.resultsPerPage = response.pageInfo.resultsPerPage;
        const videos: Video[] = response.items.map(item => {
          const video: Video =  item.snippet;
          // videoId used to fetch video
          video.videoId = item.id.videoId;
          return video;
        });
        return this.videosSubject.next(videos);
      }, error => console.error('Probem fetching videos from data source', error)
    );
  }

}
