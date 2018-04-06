import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Video } from './model';
import { VideoTableService } from './video-table.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {catchError, finalize} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

export class VideoTableDataSource implements DataSource<Video> {

  private videosSubject = new BehaviorSubject<Video[]>([]);
  private fetchingSubject = new BehaviorSubject<boolean>(false);

  constructor(private service: VideoTableService) {}

  connect(collectionViewer: CollectionViewer): Observable<Video[]> {
    return this.videosSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.videosSubject.complete();
    this.fetchingSubject.complete();
  }

  fetchVideos() {
    this.fetchingSubject.next(true);
    this.service.getVideos()
      .pipe(
        catchError(() => of([])), // TODO: send message to UI
        finalize(() => this.fetchingSubject.next(false))
      )
      .subscribe(videos => {
        console.log('Videos: ', videos);
        return this.videosSubject.next(videos);
      });
  }

}
