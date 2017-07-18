import { SeaBattlePage } from './app.po';

describe('sea-battle App', () => {
  let page: SeaBattlePage;

  beforeEach(() => {
    page = new SeaBattlePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
