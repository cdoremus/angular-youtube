import { Injectable } from '@angular/core';
import { Video } from './model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandlerService } from '../shared/http-error-handler.service';
import { YouTubeApiResponse } from './model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Gets API key from secrets.json
// const secrets = require('../../secrets.json');
const secrets = { apikey: 'AIzaSyCImn7DsUikapPFYDE4OrI5GP1heXIS8ns'};

const YOU_TUBE_CHANNEL_ID = 'UCbn1OgGei-DV7aSRo_HaAiw';
const YOU_TUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class VideoTableService {
  _videos: BehaviorSubject<Video[]> = new BehaviorSubject<Video[]>([]);
  videoArray: Video[] = [];
  nextPageToken = '';
  prevPageToken = '';
  constructor(public http: HttpClient) { }

  fetchVideos(pageToken: string = ''): Observable<YouTubeApiResponse> {
    let params =
      new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10') // results per page
      .set('order', 'date')
      .set('channelId', YOU_TUBE_CHANNEL_ID)
      .set('key', secrets.apikey);
      if (pageToken) {
        // returned by previous page's response
        params = params.set('pageToken', pageToken);
      }
    return this.http.get(YOU_TUBE_API_URL, { params }) as Observable<YouTubeApiResponse>;
  }

  getVideos(pageToken: string = ''): Observable<Video[]> {
    this._getVideos(pageToken);
    return this._videos.asObservable();
  }

  _getVideos(pageToken: string = '') {
    this.fetchVideos(pageToken).subscribe(response => {
      console.log('Http response: ', response);
      this.nextPageToken = response.nextPageToken;
      console.log('Next page token: ', this.nextPageToken);
      if (response.prevPageToken) {
        this.prevPageToken = response.prevPageToken;
      }
      response.items.map(item => {
        const video = item.snippet;
        this.videoArray.push(video);
      });
    }, error => {
      console.error('Problem fetching videos', error);
    }, () => {
      this._videos.next(this.videoArray);
    });
  }

}
