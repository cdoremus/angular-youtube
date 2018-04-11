import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDetailsComponent } from './video-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { MockModule, MockComponent } from '../../../test/testHelpers';

describe('VideoDetailsComponent', () => {
  let component: VideoDetailsComponent;
  let fixture: ComponentFixture<VideoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockModule,
        RouterTestingModule.withRoutes([
          { path: '', component: MockComponent },
        ]),
      ],
      declarations: [ VideoDetailsComponent ]
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

