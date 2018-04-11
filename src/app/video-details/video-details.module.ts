import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoDetailsComponent } from './video-details.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [VideoDetailsComponent],
  exports: [VideoDetailsComponent]
})
export class VideoDetailsModule { }
