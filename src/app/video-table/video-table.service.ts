import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YouTubeApiResponse, Video } from './model';
import { PagedVideoDataCacheService } from './paged-videodata-cache.service';

// Get API key from /private/keys.js
import { secrets } from '../../../private/keys.js';

export const YOU_TUBE_CHANNEL_ID = 'UCbn1OgGei-DV7aSRo_HaAiw';
export const YOU_TUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

/**
 * Angular service that calls the YouTube Data API to get
 * data from the Angular channel.
 *
 * The Angular HttpClient class is used to do the data fetching.
 *
 * TODO: Caching with the PagedVideoDataCacheService class
 * has not been fully implemented.
 *
 * @export
 * @class VideoTableService
 */
@Injectable()
export class VideoTableService {
  private _currentVideo: Video;

  constructor(public http: HttpClient, private cache: PagedVideoDataCacheService) { }

  /**
   * Fetches information from the YouTube Data API
   * on Angular channel videos.
   *
   * As per application requirements, 10 data items are fetched per
   * each request.
   *
   * @param {string} [pageToken=''] - current page token
   * @param {number} [pageIndex] - current page index
   * @returns {Observable<YouTubeApiResponse>} - the YouTube Data API response
   * @memberof VideoTableService
   */
  fetchVideoData(pageToken: string = '', pageIndex?: number): Observable<YouTubeApiResponse> {
    let params =
      new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10') // results per page
      .set('order', 'date')
      .set('channelId', YOU_TUBE_CHANNEL_ID)
      .set('key', secrets.apikey);
      if (pageToken) {
        params = params.set('pageToken', pageToken);
      }
    return this.http.get(YOU_TUBE_API_URL, { params }) as Observable<YouTubeApiResponse>;
  }

  set currentVideo(video: Video) {
    this._currentVideo = video;
  }

  get currentVideo() {
    return this._currentVideo;
  }

}
