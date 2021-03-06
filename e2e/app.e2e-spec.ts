import { AppPage } from './app.po';

describe('Home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page header title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('YouTube Angular Channel');
  });

  it('should display 10 rows in data table', () => {
    page.navigateTo();
    page.getTableRows().count().then(count => {
      expect(count).toEqual(10);
    });
  });

  it('should navigate to next page', () => {
    page.navigateTo();
    page.getNextButton().click().then(() => {
      page.getPageRangeLabel().getText().then(label => {
        // label is '11 - 20 of 71'
        const dash = label.indexOf(' -');
        expect(label.substring(0, dash)).toBe('11');
      });
    });
  });

  it('should navigate to next page and back to first page', () => {
    page.navigateTo();
    page.getNextButton().click().then(() => {
      // back to first page
      page.getPreviousButton().click().then(() => {
        page.getPageRangeLabel().getText().then(label => {
          // label is '1 - 10 of 71'
          const dash = label.indexOf(' -');
          expect(label.substring(0, dash)).toBe('1');
        });
      });
    });
  });

});
