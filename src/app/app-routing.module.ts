import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoTableComponent } from './video-table/video-table.component';

const routes: Routes = [
  { path: '', component: VideoTableComponent, pathMatch: 'full' },
];

/**
 * Configures routing for this application.
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
