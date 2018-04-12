import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoTableService } from '../video-table/video-table.service';
import { Video } from '../video-table/model';

export const EMBED_VIDEO_URL = 'https://www.youtube.com/embed/';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  currentVideo: Video;
  embedUrl: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private service: VideoTableService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      const videoId = param['id'];
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${EMBED_VIDEO_URL}${videoId}`);
    });
    this.currentVideo = this.service.currentVideo;
  }

}
