import { Injectable, Inject } from '@angular/core';
import { YouTubeApiResponse } from './model';

// 1000 milis/min * 60 min/hr * 24 hr/day
const MILLISECONDS_PER_DAY = 1000 * 60 * 24;
export const CACHE_TIMEOUT = MILLISECONDS_PER_DAY;

interface CacheItem {
  data: YouTubeApiResponse;
  timestamp: number;
}

@Injectable()
export class PagedVideoDataCacheService {

  cache: Map<number, CacheItem> = new Map<number, CacheItem>();

  constructor(private now?: number) {
    if (!now) {
      this.now = new Date().getTime();
    }
   }

  add(pageIndex: number, pageData: YouTubeApiResponse) {
    this.cache.set(pageIndex, {data: pageData, timestamp: new Date().getTime()});
  }

  get(pageIndex: number | null) {
    const item: CacheItem = this.cache.get(pageIndex);
    // Absolute value used to account for the fact that
    // user may have moved to another timezone where this.now
    // is an hour less than the item's timestamp
    if (item && Math.abs(item.timestamp - this.now) < CACHE_TIMEOUT) {
      return item;
    } else {
      return null;
    }
  }
}
