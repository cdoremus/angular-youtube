import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState, INITIAL_STATE, rootReducer } from './redux/root';
import { ErrorHandlerService } from './shared/error-handler.service';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { VideoDetailsModule } from './video-details/video-details.module';
import { VideoTableModule } from './video-table/video-table.module';


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
  constructor(
    ngRedux: NgRedux<AppState>,
    devTools: DevToolsExtension) {

      const enhancers = isDevMode() && devTools.isEnabled() ? devTools.enhancer() : [];
      ngRedux.configureStore(
        rootReducer,
        INITIAL_STATE,
        [],
        enhancers
    );
  }
}
