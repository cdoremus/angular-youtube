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
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';
import { mapApiResponseActionCreator } from '../redux/actions';

/**
 * A string-based enum representing
 * the possible pagination direction
 * options.
 *
 * @export
 * @enum {string}
 */
export enum PaginationDirection {
  NEXT = 'NEXT',
  PREV = 'PREV',
  NONE = 'NONE'
}

/**
 * Encapsulates the video data needed by the Angular Material
 * data table component used by the VideoTableComponent
 * to display YouTube video information to the user.
 *
 * @export
 * @class VideoTableDataSource
 * @implements {DataSource<Video>}
 */
@Injectable()
export class VideoTableDataSource implements DataSource<Video> {

  // Observable subscription assigned when the service is called to get videos
  private videoFetchSubscription: Subscription;
  // holds fetched videos
  private videosSubject = new BehaviorSubject<Video[]>([]);
  // used to govern display of loading indicator component
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // used in the UI for display of the Angular Material progress spinner
  loading$ = this.loadingSubject.asObservable();
  // token used to retrieve next page of data from the API
  nextPageToken = '';
  // token used to retrieve previous page of data from the API
  prevPageToken = '';
  // number of results displayed in a data table page
  resultsPerPage = '10';
  // total result count from the API query
  totalResults = '0';

  constructor(private service: VideoTableService, private redux: NgRedux<AppState>) {}

  /**
   * Implementation of DataSource#connect() to
   * return the videoSubject field as an Observable
   * to populate the data table.
   *
   * @param {CollectionViewer} collectionViewer - not used
   * @returns {Observable<Video[]>} - data that populates the
   * data table component.
   * @memberof VideoTableDataSource
   */
  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  /**
   * Implementation of DataSource#disconnect() that
   * clean ups Observable subscriptions and subjects.
   *
   * @param {CollectionViewer} collectionViewer
   * @memberof VideoTableDataSource
   */
  disconnect(collectionViewer: CollectionViewer): void {
    if (this.videoFetchSubscription) {
      this.videoFetchSubscription.unsubscribe();
    }
    this.videosSubject.complete();
    this.loadingSubject.complete();
  }

  /**
   * Does the work of fetching the video data to
   * be displayed in the Angular Material data table
   * component.
   *
   * @param {PaginationDirection} paginationDirection - paging direction
   * @param {number} [pageIndex] - the page index
   * @memberof VideoTableDataSource
   */
  fetchVideoData(paginationDirection: PaginationDirection, pageIndex?: number): void {
    this.loadingSubject.next(true);
    // get the page token for the page to be fetched
    const pageToken: string = paginationDirection === PaginationDirection.NONE ? '' :
      paginationDirection === PaginationDirection.NEXT ? this.nextPageToken : this.prevPageToken;
    // See if YouTubeApiRequest object for this page is in the store
    const storeResponse: YouTubeApiResponse = this.redux.getState().pageData[pageToken];
    // make sure the pageToken is not empty or undefined
    if (pageToken && storeResponse) {
      // If true, then populate fields from the request
      // populate fields
      const videos = this.populateFieldsFromApiResponse(storeResponse);
      this.videosSubject.next(videos);
      // finish loading
      this.loadingSubject.next(false);
      // else, call the back end API
    } else {
      this.videoFetchSubscription = this.service.fetchVideoData(pageToken)
        .pipe(
          catchError((error) => {
            return ErrorObservable.create(error);
          }),
          finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((response: YouTubeApiResponse) => {
          console.log('API Response', response);
          console.log('Page token', pageToken);
          const videos = this.populateFieldsFromApiResponse(response);
          if (pageToken) {
            this.redux.dispatch(mapApiResponseActionCreator(pageToken, response));
          }
          return this.videosSubject.next(videos);
        }, error => {
          console.error('Problem fetching videos from data source (VideoTableDataSource#fetchVideos)', error);
          throw error;
        }
      ); // end of subscribe
    } // end of else
  }

  populateFieldsFromApiResponse(response: YouTubeApiResponse): Video[] {
    this.nextPageToken = response.nextPageToken;
    if (response.prevPageToken) {
      this.prevPageToken = response.prevPageToken;
    }
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
    return videos;
}

}
