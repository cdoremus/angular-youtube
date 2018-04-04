import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorHandlerService } from './http-error-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    HttpErrorHandlerService
  ]
})
export class SharedModule { }
