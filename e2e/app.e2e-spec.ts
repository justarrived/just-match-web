import { NgCliTestScssPage } from './app.po';

describe('ng-cli-test-scss App', function() {
  let page: NgCliTestScssPage;

  beforeEach(() => {
    page = new NgCliTestScssPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
