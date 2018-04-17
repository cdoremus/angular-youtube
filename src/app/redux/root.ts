import { Video, YouTubeApiResponse, YouTubeApiResponseMapEntry } from '../video-table/model';
import { AppAction, AppActionType } from './actions';
import { Reducer } from 'redux';

export interface AppState {
  currentVideo: Video;
  pageData: YouTubeApiResponseMapEntry;
}

export const INITIAL_STATE: AppState = {
  currentVideo: {videoId: '', title: '', description: '', publishedAt: '', thumbnails: {default: {height: 0, width: 0, url: ''}} },
  pageData: {} as YouTubeApiResponseMapEntry
};

export const rootReducer: Reducer<AppState> = (
  state: AppState,
  action: AppAction<any> ): AppState => {
  switch (action.type) {
    case AppActionType.SET_CURRENT_VIDEO:
      return {...state, currentVideo: action.payload};
    case AppActionType.MAP_API_RESPONSE:
      const pageDataEntry = action.payload;
      // only one entry in this object
      const pageDataEntryKey = Object.keys(pageDataEntry)[0];
      const pageDataEntryValue = pageDataEntry[pageDataEntryKey];

      const newState = Object.assign({}, state);
      newState.pageData[pageDataEntryKey] = pageDataEntryValue;
      // console.log(`MAP_API_RESPONSE reducer new state.pageData: `, newState.pageData);
      return newState;
    default:
      return state;
  }
};
