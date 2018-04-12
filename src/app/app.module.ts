import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';


import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { VideoTableModule } from './video-table/video-table.module';
import { SharedModule } from './shared/shared.module';
import { ErrorHandlerService } from './shared/error-handler.service';
import { AppRoutingModule } from './app-routing.module';
import { VideoDetailsModule } from './video-details/video-details.module';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { AppState, rootReducer, INITIAL_STATE } from './redux/root';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    VideoTableModule,
    VideoDetailsModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    NgReduxModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
