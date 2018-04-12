import { AppState, INITIAL_STATE, rootReducer } from './root';
import { Video } from '../video-table/model';
import { setCurrentVideoActionCreator } from './actions';


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

});
