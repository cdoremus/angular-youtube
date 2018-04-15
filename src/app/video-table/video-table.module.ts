import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoTableComponent } from './video-table.component';
import { VideoTableService } from './video-table.service';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { VideoTableDataSource } from './video-table.datasource';

/**
 * Registers imported dependencies, components,
 * services providers and exports for this module
 * encapsulating the data table used to display
 * YouTube video information.
 *
 * @export
 * @class VideoTableModule
 */
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
    VideoTableDataSource,
    VideoTableService
  ],
  exports: [
    VideoTableComponent
  ]
})
export class VideoTableModule { }
