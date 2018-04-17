import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoTableService } from '../video-table/video-table.service';
import { Video } from '../video-table/model';
import { select, NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/root';

export const EMBED_VIDEO_URL = 'https://www.youtube.com/embed/';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  @select(['currentVideo', 'title']) title: string;
  @select(['currentVideo', 'description']) description: string;
  embedUrl: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.route.params.subscribe(param => {
      const videoId = param['id'];
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${EMBED_VIDEO_URL}${videoId}`);
    });
  }

}
