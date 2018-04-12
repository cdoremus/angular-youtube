import { Video } from '../video-table/model';
import { AppAction, AppActionType } from './actions';

export interface AppState {
  currentVideo: Video;
}

export const INITIAL_STATE: AppState = {
  currentVideo: {videoId: '', title: '', description: '', publishedAt: '', thumbnails: {default: {height: 0, width: 0, url: ''}} }
};

export const rootReducer = (
  state: AppState,
  action: AppAction<any> ): AppState => {
  switch (action.type) {
    case AppActionType.SET_CURRENT_VIDEO:
      return {...state, currentVideo: action.payload};

    default:
      return state;
  }
};
