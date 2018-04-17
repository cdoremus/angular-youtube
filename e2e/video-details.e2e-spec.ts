import { browser, by, element } from 'protractor';
import { VideoDetailsPage } from './video-details.po';
import { AppPage } from './app.po';


describe('Video Details Page', () => {
  let page: VideoDetailsPage;
  let homePage: AppPage;

  beforeEach(() => {
    homePage = new AppPage();
    page = new VideoDetailsPage();
  });

  it('should display video details page with video title', () => {
    homePage.navigateTo();
    let title;
    // TODO: Use async/await to remove massive indentations
    homePage.getFirstRow()
      .then((row) => {
        row.findElements(by.css('.mat-card'))
          .then(card => {
            // first card holds title
            card[0].getText()
              .then((text) => {
                title = text;
                row.click().then(() => {
                  // we're on video details page now
                  page.getVideoTitle()
                    .then(titleText => {
                      expect(titleText).toEqual(title);
                    });
                  });
              });

          });
      });
  });
});
