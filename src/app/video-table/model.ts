
export interface Video {
  thumbnail: string;
  title: string;
  description: string;
  publishedAt: Date;
}

export interface YouTubeApiResponse {
  items: YouTubeApiResponseItem[];
}

export interface YouTubeApiResponseItem {
  snippet: Video;
}
