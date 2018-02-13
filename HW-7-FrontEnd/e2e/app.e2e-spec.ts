import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('draft-front-end App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Register a new user', () => {
    page.navigateTo();
    element(by.id('registerLink')).click();
    let registerForm = element.all(by.css('.registerForm'));
    registerForm.get(0).sendKeys('su01');
    registerForm.get(1).sendKeys('su01');
    registerForm.get(2).sendKeys('su01@rice.edu');
    registerForm.get(3).sendKeys('02-04-1994');
    registerForm.get(4).sendKeys('77030');
    registerForm.get(5).sendKeys('123-123-1234');
    registerForm.get(6).sendKeys('three-word-passphrase');
    registerForm.get(7).sendKeys('three-word-passphrase');
    element(by.id('submitBtn')).click();
    expect(element(by.css('.title')).getText()).toEqual('Aniki Land');
  });

  it('Log in as your test user', () => {
      let loginForm = element.all(by.css('.loginForm'));
      loginForm.get(0).sendKeys('zh20');
      loginForm.get(1).sendKeys('three-word-passphrase');
      element(by.css('.loginBtn')).click();
      expect(element(by.css('.userName')).getText()).toEqual('zh20');
  })

  it('Create a new article and validate the article appears in the feed', () => {
      element(by.css('.inputTxt')).sendKeys('new post');
      element(by.css('.postBtn')).click();
      expect(element.all(by.css('.postContent')).get(0).getText()).toEqual('new post');
  })

  it('Edit an article and validate the article text has updated', () => {
      element.all(by.css('.postInput')).get(0).sendKeys('text change test');
      element.all(by.css('.postEditBtn')).get(0).click();
      expect(element.all(by.css('.postContent')).get(0).getText()).toEqual('text change test');
  })

  it('Update the status headline and verify the change', () => {
      element(by.id('statusInput')).sendKeys('headline change test');
      element(by.id('statusBtn')).click();
      expect(element(by.css('.userStatus')).getText()).toEqual('headline change test');
  })

  it('Count the number of followed users', () => {
      element.all(by.css('.floName')).count()
      .then(size => {
          expect(size).toEqual(0);
      });
  })

  it('Add the user "Follower" to the list of followed users and verify the count increases by one', () => {
      element(by.css('.addName')).sendKeys('wl49');
      element(by.css('.addFloBtn')).click();
      element.all(by.css('.floName')).count()
      .then(size => {
          expect(size).toEqual(1);
      });
  })

  it('Remove the user "Follower" from the list of followed users and verify the count decreases by one', () => {
      element.all(by.css('.followers button')).get(0).click();
      element.all(by.css('.floName')).count()
      .then(size => {
          expect(size).toEqual(0);
      });
  })

  it('Search for Only One Article Like This and verify only one article shows, and verify the author', () => {
      element(by.css('.searchArea input')).sendKeys('Vivamus');
      element.all(by.css('.postContent')).count()
      .then(size => {
          expect(size).toEqual(1);
      });
      expect(element(by.css('.postAuthor')).getText()).toEqual('zh20');
  })

  it("Navigate to the profile view, Update the user's email and verify", () => {
      element.all(by.css('.logLink a')).get(0).click();
      element.all(by.css('.updaTbl input')).get(2).sendKeys('EmailChangeTest@rice.edu');
      element(by.css('.updaTbl button')).click();
      expect(element.all(by.css('.currTbl td')).get(5).getText()).toEqual('EmailChangeTest@rice.edu');
  })

  it("Navigate to the profile view, Update the user's zipcode and verify", () => {
      element.all(by.css('.updaTbl input')).get(4).sendKeys('12345');
      element(by.css('.updaTbl button')).click();
      expect(element.all(by.css('.currTbl td')).get(9).getText()).toEqual('12345');
  })

  //Change the password and logout, then login with the new password
  it("Navigate to the profile view, Update the user's password and verify", () => {
      element.all(by.css('.updaTbl input')).get(5).sendKeys('password-change-test');
      element(by.css('.updaTbl button')).click();
      element(by.css('.mainLink a')).click();
      element.all(by.css('.logLink a')).get(1).click();
      element.all(by.css('.logTbl input')).get(0).sendKeys('zh20');
      element.all(by.css('.logTbl input')).get(1).sendKeys('password-change-test');
      element(by.css('.loginBtn')).click();
      expect(element(by.css('.userName')).getText()).toEqual('zh20');
  })
});
