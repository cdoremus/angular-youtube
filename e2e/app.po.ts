import { browser, by, element } from 'protractor';

enum NavigationDirection {
  NEXT = 'next',
  PREVIOUS = 'previous'
}

/**
 * This is the page object class for the
 * home page holding the data table.
 */
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

  getFirstRow() {
    return this.getTableRows().getWebElements()
      .then(rows => {
        return rows[0];
      });
  }
}
