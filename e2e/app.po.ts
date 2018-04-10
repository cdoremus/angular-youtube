import { browser, by, element } from 'protractor';

enum NavigationDirection {
  NEXT = 'next',
  PREVIOUS = 'previous'
}

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle() {
    return element(by.css('header .mat-card-title')).getText();
  }

  getTableRows() {
    return element.all(by.css('.mat-row'));
  }

  getPageRangeLabel() {
    return element(by.css('.mat-paginator-range-label'));
  }

  getNextButton() {
    return this.getNavigationButton(NavigationDirection.NEXT);
  }

  getNavigationButton(direction: NavigationDirection) {
    return element(by.css(`button.mat-paginator-navigation-${direction}`));
  }

  getPreviousButton() {
    return this.getNavigationButton(NavigationDirection.PREVIOUS);
  }

}
