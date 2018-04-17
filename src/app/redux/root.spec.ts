import { AppState, INITIAL_STATE, rootReducer } from './root';
import { Video, YouTubeApiResponse } from '../video-table/model';
import { setCurrentVideoActionCreator, mapApiResponseActionCreator } from './actions';
import { getApiResponse, getApiResponseItem } from '../../../test/testHelpers';


describe('Redux State and Reducers', () => {


  it(`should have SET_CURRENT_ACTION update state\'s
    currentVideo field and not change original state`, () => {
    // tslint:disable-next-line
    let state: AppState = INITIAL_STATE;
    const video: Video = {
      videoId: '1',
      description: 'Foobar',
      publishedAt: '2108-01-01',
      title: 'Foobar video',
      thumbnails: {default: {height: 100, width: 200, url: 'http://foobar'}}
    };
    const newState: AppState =
      rootReducer(state, setCurrentVideoActionCreator(video));
      expect(newState.currentVideo).toBe(video);
      // old state should not be modified
      expect(state).toBe(INITIAL_STATE);
  });

  it(`should have MAP_API_RESPONSE update state\'s
  pageData Map with a new entry and not change original state`, () => {
    // tslint:disable-next-line
    let state: AppState = INITIAL_STATE;
    const pageToken = 'page1';
    const response: YouTubeApiResponse = getApiResponse('nextPage1',
      [getApiResponseItem('id1', 'video one')]
    );
    const pageToken2 = 'page2';
    const response2: YouTubeApiResponse = getApiResponse('nextPage2',
      [getApiResponseItem('id2', 'video two')]
    );

    const newState: AppState =
      rootReducer(state, mapApiResponseActionCreator(pageToken, response));
    const newState2: AppState =
      rootReducer(newState, mapApiResponseActionCreator(pageToken2, response2));
    expect(newState2.pageData[pageToken2]).toBeTruthy();
    // console.log('MAP_API_RESPONSE test newState.pageData', newState2.pageData);
    expect(newState2.pageData[pageToken2]).toBe(response2);
    expect(Object.entries(newState2.pageData).length).toBe(2);

    // old state should not be modified
    expect(state).toBe(INITIAL_STATE);

  });
});
