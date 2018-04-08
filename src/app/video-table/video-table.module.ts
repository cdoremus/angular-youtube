import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTableComponent } from './video-table.component';
import { VideoTableService } from './video-table.service';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { VideoTableDataSource } from './video-table.datasource';
import { PagedVideoDataCacheService } from './paged-videodata-cache.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    VideoTableComponent
  ],
  providers: [
    PagedVideoDataCacheService,
    VideoTableDataSource,
    VideoTableService
  ],
  exports: [
    VideoTableComponent
  ]
})
export class VideoTableModule { }
