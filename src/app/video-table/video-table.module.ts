import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTableComponent } from './video-table.component';
import { VideoTableService } from './video-table.service';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

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
    VideoTableService
  ],
  exports: [
    VideoTableComponent
  ]
})
export class VideoTableModule { }
