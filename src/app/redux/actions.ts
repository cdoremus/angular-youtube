import { Action } from 'redux';
import { Video } from '../video-table/model';

export enum AppActionType {
  SET_CURRENT_VIDEO = 'SET_CURRENT_ACTION',
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

/********* Action Creators **********/

export const setCurrentVideoActionCreator = (video: Video): SetCurrentVideoAction => {
  return {
    type: AppActionType.SET_CURRENT_VIDEO,
    payload: video
  };
};

