import { JustArrivedWebPage } from './app.po';

describe('just-arrived-web App', function() {
  let page: JustArrivedWebPage;

  beforeEach(() => {
    page = new JustArrivedWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
