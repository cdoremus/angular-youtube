import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video, YouTubeApiResponseItem } from './model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operators/map';

import { VideoTableService } from './video-table.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-video-table',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss']
})
export class VideoTableComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  httpSubscription: Subscription;

  constructor(public service: VideoTableService) { }

  ngOnInit() {
    this.fetchVideos();
  }

  ngOnDestroy() {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
  }

  fetchVideos() {
    this.httpSubscription = this.service.fetchVideos().subscribe(response => {
      response.items.map(item => {
        const video = item.snippet;
        // console.log('Video: ', video);
        this.videos.push(video);
      });
    });
  }

}
