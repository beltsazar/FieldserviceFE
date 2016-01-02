// conf.js
exports.config = {
  framework: 'jasmine',
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.48.2.jar',
  directConnect: true,
  chromeDriver: '../node_modules/protractor/selenium/chromedriver',
  baseUrl: 'http://localhost:9001',
  specs: ['protractor/spec/*.js'],
  onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
      
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
    	  displayStacktrace: 'all',
    	  colors: false
    	  }));
      // add HTML/screenshot reporter
      jasmine.getEnv().addReporter(
	        new Jasmine2HtmlReporter({
	          savePath: 'reports/protractor/',
	          screenshotsFolder: 'images/'
	        })
	      );
   },
   jasmineNodeOpts: {
	   print: function() {}
   }
}