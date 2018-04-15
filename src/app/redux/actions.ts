import { Action } from 'redux';
import { Video, YouTubeApiResponse, YouTubeApiResponseMapEntry } from '../video-table/model';

export enum AppActionType {
  SET_CURRENT_VIDEO = 'SET_CURRENT_ACTION',
  MAP_API_RESPONSE = 'MAP_API_RESPONSE',
}

/********* Actions **********/

export interface AppAction<T> extends Action {
  type: AppActionType;
  payload?: T;
}

export interface SetCurrentVideoAction extends AppAction<Video> {
  type: AppActionType.SET_CURRENT_VIDEO;
  payload: Video;
}

export interface MapApiResponseAction extends AppAction<YouTubeApiResponseMapEntry> {
  type: AppActionType.MAP_API_RESPONSE;
  payload: YouTubeApiResponseMapEntry;
}

/********* Action Creators **********/

export const setCurrentVideoActionCreator = (video: Video): SetCurrentVideoAction => {
  return {
    type: AppActionType.SET_CURRENT_VIDEO,
    payload: video
  };
};

export const mapApiResponseActionCreator = (pageToken: string, response: YouTubeApiResponse): MapApiResponseAction => {
  return {
    type: AppActionType.MAP_API_RESPONSE,
    payload: {[pageToken]: response},
  };
};
