import { Component } from '@angular/core';
import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { PagedVideoDataCacheService, CACHE_TIMEOUT } from './paged-videodata-cache.service';
import { YouTubeApiResponse } from './model';
import { BrowserModule } from '@angular/platform-browser';

describe('PagedVideoDataCacheService', () => {
  beforeEach(() => {
  });

  it('should be created', (() => {
    const service = new PagedVideoDataCacheService();
    expect(service).toBeTruthy();
    expect(service.cache.size).toBe(0);
  }));

  it('should add an item to the cache', (() => {
    const service = new PagedVideoDataCacheService();
    const response = {} as YouTubeApiResponse;
    service.add(0, response);
    expect(service.cache.size).toBe(1);
  }));

  it('should return null if item is NOT in the cache', (() => {
    const service = new PagedVideoDataCacheService();
    const response = {} as YouTubeApiResponse;
    service.add(0, response);
    // verify item added
    expect(service.cache.size).toBe(1);
    const item = service.get(1);
    expect(item).toBeNull();
  }));

  it('should return item if it is in the cache', (() => {
    const service = new PagedVideoDataCacheService();
    const response = {} as YouTubeApiResponse;
    service.add(0, response);
    // verify item added
    expect(service.cache.size).toBe(1);
    const item = service.get(0);
    expect(item.data).toBe(response);
  }));

  it('should NOT return item if it is in the cache, but has timed out', (() => {
    // set now to something before the cache timeout
    const now = 0 - (new Date().getTime() + CACHE_TIMEOUT + 50000);
    const service = new PagedVideoDataCacheService(now);
    const response = {} as YouTubeApiResponse;
    service.add(0, response);
    // verify item added
    expect(service.cache.size).toBe(1);
    const item = service.get(0);
    expect(item).toBeNull();
  }));

  describe('Injected PagedVideoDataCacheService', () => {
    let component: MockComponent;
    let fixture: ComponentFixture<MockComponent>;
      beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
        ],
        declarations: [
          MockComponent,
        ],
        providers: [
          {provide: Number, useClass: MockNumber},
          PagedVideoDataCacheService
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(MockComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('cache should be created', inject([PagedVideoDataCacheService], (cache: PagedVideoDataCacheService) => {
      expect(cache).toBeTruthy();
    }));

    it('separate component instances should hold the same cache reference', () => {
      // tslint:disable-next-line
      let cache = component.cache;
      // verify first cache
      expect(component.cache).toBeTruthy();
      // create 2nd component instance
      const component2 = fixture.componentInstance;
      fixture.detectChanges();
      // tslint:disable-next-line
      let cache2 = component2.cache;
      expect(cache2).toBe(cache);
    });

    class MockNumber extends Number {
      constructor() {
        super(undefined);
      }
    }

    @Component({
      template: '<h1>MockComponent</h1>'
    })
    class MockComponent {
      constructor(public cache: PagedVideoDataCacheService) {}
    }
  });

});
