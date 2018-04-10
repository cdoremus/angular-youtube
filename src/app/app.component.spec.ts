import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './shared/material.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
      ],
      declarations: [
        AppComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();



  }));
  it('should create the app', async(() => {
    // override template
    const fixture = TestBed.overrideComponent(AppComponent, {
      set: {
          template: `<h1>Test</h1>`
      }
    }).createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a mat-card-title tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('.mat-card-title'));
    expect(el.nativeElement.textContent).toContain('YouTube Angular Channel');
  }));

});
