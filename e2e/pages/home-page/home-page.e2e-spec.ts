import { HomePage } from './home-page.page-object';

describe('Home Page', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('sanity test', () => {
    page.navigateTo();
    expect(2 + 2 === 4);
  });
});
