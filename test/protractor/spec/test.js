// spec.js
describe('Protractor Demo App', function() {
  it('should have a title', function() {

	browser.get('/');

    expect(element(by.className('jumbotron')).getText()).
        toContain('Allo'); 
  });
});