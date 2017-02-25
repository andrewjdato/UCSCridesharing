import { SlugRidePage } from './app.po';

describe('slug-ride App', () => {
  let page: SlugRidePage;

  beforeEach(() => {
    page = new SlugRidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
