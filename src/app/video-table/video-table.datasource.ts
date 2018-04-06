import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Video, YouTubeApiResponse } from './model';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

export enum PaginationDirection {
  NEXT = 'NEXT',
  PREV = 'PREV',
  NONE = 'NONE'
}

export class VideoTableDataSource implements DataSource<Video> {

  private videosSubject = new BehaviorSubject<Video[]>([]);
  private fetchingSubject = new BehaviorSubject<boolean>(false);
  nextPageToken = '';
  prevPageToken = '';
  resultsPerPage = '10';
  totalResults = '0';

  constructor(private service: VideoTableService) {}

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.videosSubject.complete();
    this.fetchingSubject.complete();
  }

  fetchVideos(paginationDirection: PaginationDirection) {
    this.fetchingSubject.next(true);
    const pageToken: string = paginationDirection === PaginationDirection.NEXT ? this.nextPageToken : this.prevPageToken;
    console.log('pageToken: ', pageToken);
    this.service.fetchVideos(pageToken)
      .pipe(
        catchError(() => of([])), // TODO: send message to UI
        finalize(() => this.fetchingSubject.next(false))
      )
      .subscribe((response: YouTubeApiResponse) => {
        this.nextPageToken = response.nextPageToken;
        this.prevPageToken = response.prevPageToken;
        this.totalResults = response.pageInfo.totalResults;
        this.resultsPerPage = response.pageInfo.resultsPerPage;
        const videos: Video[] = response.items.map(item => {
          const video: Video =  item.snippet;
          video.videoId = item.id.videoId;
          return video;
        });
        console.log('Videos: ', videos);
        return this.videosSubject.next(videos);
      }, error => console.error('Probem fetching videos from data source', error)
    );
  }

}
