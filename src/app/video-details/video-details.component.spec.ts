import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsComponent } from './video-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { MockModule, MockComponent, MockVideoTableService } from '../../../test/testHelpers';
import { MaterialModule } from '../shared/material.module';
import { VideoTableService } from '../video-table/video-table.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule,
        MaterialModule,
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: '', component: MockComponent }
        ]),
      ],
      declarations: [ VideoDetailsComponent ],
      providers: [
        { provide: VideoTableService, useClass: MockVideoTableService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

