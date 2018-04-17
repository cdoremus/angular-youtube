import { browser, by, element } from 'protractor';

export class VideoDetailsPage {

  navigateTo(videoId: string) {
    browser.get(`/${videoId}`);
  }

  getIframeSrc() {
    return element(by.css('iframe["src"]')).getText();
  }

  getVideoTitle() {
    return element(by.css('.video-title')).getText();
  }

}
