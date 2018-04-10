import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YouTubeApiResponse } from './model';
import { PagedVideoDataCacheService } from './paged-videodata-cache.service';

// Get API key from /private/keys.js
import { secrets } from '../../../private/keys.js';

export const YOU_TUBE_CHANNEL_ID = 'UCbn1OgGei-DV7aSRo_HaAiw';
export const YOU_TUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class VideoTableService {

  constructor(public http: HttpClient, private cache: PagedVideoDataCacheService) { }

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

}
