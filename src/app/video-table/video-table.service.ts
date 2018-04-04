import { Injectable } from '@angular/core';
import { Video } from './model';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorHandlerService } from '../shared/http-error-handler.service';
import { YouTubeApiResponse } from './model';

// Gets API key from secrets.json
// const secrets = require('../../secrets.json');
const secrets = { apikey: 'AIzaSyCImn7DsUikapPFYDE4OrI5GP1heXIS8ns'};

const YOU_TUBE_CHANNEL_ID = 'UCbn1OgGei-DV7aSRo_HaAiw';
const YOU_TUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class VideoTableService {

  constructor(public http: HttpClient) { }

  fetchVideos(): Observable<YouTubeApiResponse> {
    const options = {
      params:
        new HttpParams()
          .set('part', 'snippet')
          .set('channelId', YOU_TUBE_CHANNEL_ID)
          .set('key', secrets.apikey)
    };
    return this.http.get(YOU_TUBE_API_URL, options) as Observable<YouTubeApiResponse>;
  }

}
