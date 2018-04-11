// Custom Angular module that provides
// packaging of shared services and components.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ErrorHandlerService
  ]
})
export class SharedModule { }
