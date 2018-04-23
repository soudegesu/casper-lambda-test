// Simple Javascript example..
const casper = require('casper').create({
    verbose: true,
    viewportSize: {
        width: 1440,
        height: 900
    }
});

// Change browser lang
casper.on('started', function () {
    this.page.customHeaders = {
        "Accept-Language": "en-US"
    }
});

// argument from index.js
const args = {
    upload_file: casper.cli.get('upload_file'),
    tmp: casper.cli.get('tmp')
};

console.log('parameters data:', JSON.stringify(args));

// Url's to scrape.
var url1 = 'http://casperjs.org/';
var url2 = 'http://phantomjs.org';

/////
// write your logic
/////
console.log('Loading a web page: ' + url1);
casper.start(url1, function() {
    this.echo('Page title: ' + this.getTitle());
    this.capture(tmp + '01-casper.png');
});

console.log('Loading a web page: ' + url2);
casper.thenOpen(url2, function() {
    this.echo('Page title: ' + this.getTitle());
    this.capture(tmp + '02-phantom.png');
});

casper.run(function() {
    this.exit(); // close the casper instance.
});

// follow the casperjs documentation for more: http://docs.casperjs.org/en/latest/