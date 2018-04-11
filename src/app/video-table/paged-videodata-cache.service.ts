import { Injectable } from '@angular/core';
import { YouTubeApiResponse } from './model';
import { Observable } from 'rxjs/Observable';

// Set cache timeout to 1 hr
// 1000 milis/min * 60 min/hr * 24 hr/day
const MILLISECONDS_PER_DAY = 1000 * 60 * 24;
export const CACHE_TIMEOUT = MILLISECONDS_PER_DAY;

/**
 * Represents and item stored in the cache
 * including the data retrieved from the
 * YouTube API and the timestamp at
 * retrieval.
 *
 * @interface CacheItem
 */
interface CacheItem {
  data: Observable<YouTubeApiResponse>;
  timestamp: number;
}

/**
 * TODO: This is an unfinished implementation.
 *
 * Used to cache data for each page used by the
 * data table's paging component.
 *
 * @export
 * @class PagedVideoDataCacheService
 */
@Injectable()
export class PagedVideoDataCacheService {

  /**
   * Cache that is keyed by page index (in zero-based
   * order) from the YouTube API
   * (paging order is 'published at' date in
   * reverse chronological order). The cache
   *
   * @type {Map<number, CacheItem>}
   * @memberof PagedVideoDataCacheService
   */
  cache: Map<number, CacheItem> = new Map<number, CacheItem>();
  currentTimestamp: number = Date.now();

  constructor() {}

  /**
   * Adds an item to the cache, replacing an item
   * that uses the same page index key.
   *
   * @param {number} pageIndex - the page zero-based page index
   * indicating which page the data will be displayed.
   * @param {Observable<YouTubeApiResponse>} pageData - the data retrieved
   *   from the YouTube Data API.
   * @memberof PagedVideoDataCacheService
   */
  add(pageIndex: number, pageData: Observable<YouTubeApiResponse>) {
    this.cache.set(pageIndex, {data: pageData, timestamp: new Date().getTime()});
  }

  /**
   * Obtains a page's data from the cache. If the data
   * is not found in the cache, null is returned.
   *
   * @param {number} pageIndex - the page zero-based page index
   * indicating which page the data will be displayed.
   * @returns {(Observable<YouTubeApiResponse> | null)}  - the
   * cached data found at the pageIndex in the cache or null if
   * the cache does not contain the data.
   * @memberof PagedVideoDataCacheService
   */
  get(pageIndex: number): Observable<YouTubeApiResponse> | null {
    const item: CacheItem = this.cache.get(pageIndex) as CacheItem;
    // Absolute value of timestamp used to account for the fact that
    // user may have moved to another timezone where this.now
    // is an hour less than the item's timestamp
    if (item && Math.abs(item.timestamp - this.currentTimestamp) < CACHE_TIMEOUT) {
      return item.data;
    } else {
      return null;
    }
  }
}
