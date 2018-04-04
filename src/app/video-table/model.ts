
interface VideoThumbnail {
  default: VideoThumbnailData;
  medium: VideoThumbnailData;
  high: VideoThumbnailData;
}

export interface Video {
  thumbnails: VideoThumbnail;
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
  items: YouTubeApiResponseItem[];
}

export interface YouTubeApiResponseItem {
  snippet: Video;
}
