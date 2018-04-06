
interface VideoThumbnail {
  default: VideoThumbnailData;
  medium: VideoThumbnailData;
  high: VideoThumbnailData;
}

export interface Video {
  videoId?: string;
  thumbnails: VideoThumbnailData;
  title: string;
  description: string;
  publishedAt: Date;
}

export interface VideoThumbnailData {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeApiResponse {
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {resultsPerPage: string, totalResults: string};
  items: YouTubeApiResponseItem[];
}

export interface YouTubeApiResponseItem {
  id: {kind: string, videoId: string};
  snippet: Video;
}
