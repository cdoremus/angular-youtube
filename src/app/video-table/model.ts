
export interface Video {
  videoId?: string; // used to fetch video content
  thumbnails: VideoThumbnail;
  title: string;
  description: string;
  publishedAt: string;
}

interface VideoThumbnail {
  default: VideoThumbnailData;
  medium?: VideoThumbnailData;
  high?: VideoThumbnailData;
}

interface VideoThumbnailData {
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
