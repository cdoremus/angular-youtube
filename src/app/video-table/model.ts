/**
 * This file holds domain model interfaces used
 * to the data table and related components, services
 * and tests.
 */

/**
 * Encapsulates video data
 *
 * @export
 * @interface Video
 */
export interface Video {
  videoId?: string; // used to fetch video content
  thumbnails: VideoThumbnail;
  title: string;
  description: string;
  publishedAt: string;
}

/**
 * Encapsulates various video thumbnail options.
 *
 * @interface VideoThumbnail
 */
interface VideoThumbnail {
  default: VideoThumbnailData;
  medium?: VideoThumbnailData;
  high?: VideoThumbnailData;
}

/**
 * Data contained within each VideoThumbnail
 * field.
 *
 * @interface VideoThumbnailData
 */
interface VideoThumbnailData {
  url: string;
  width: number;
  height: number;
}

/**
 * Encapsulates the response data from the YouTube
 * Data API.
 *
 * The nextPageToken is used to fetch the next
 * page of data, while the prevPageToken is
 * used to page the previous page.
 * @export
 * @interface YouTubeApiResponse
 */
export interface YouTubeApiResponse {
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {resultsPerPage: string, totalResults: string};
  items: YouTubeApiResponseItem[];
}

/**
 * Represents individual video data items.
 * The id field contains the videoId
 * used for in the URL pointing to a video. The
 * data displayed in the data table component
 * is contained in the snippet field.
 *
 * @export
 * @interface YouTubeApiResponseItem
 */
export interface YouTubeApiResponseItem {
  id: {kind: string, videoId: string};
  snippet: Video;
}
