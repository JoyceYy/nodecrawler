var https = require('https');
var phantom = require('phantom');
var co = require('co');
var fs = require('fs');

var defaultReg = /<img[\w\W]+?data-imgurl\s*=\s*(?:(['"])(([\/\/]||[http(?:s)?:\/\/])[\w\W]+?)\1[^>]*?\/?>)/g;
var srcs = [];
var crawler = {} ;

crawler.crawle = function(url,reg = defaultReg,resultIndex=2) {
					console.log('reg:'+reg);
					return new Promise(function(resolve,reject) {
						  reg.lastIndex = 0;
						  co(crawlerUrl(url,reg,resultIndex))
						  		.then(function(data) {
									resolve(data);
								}
						  );
					})
}

function* crawlerUrl(url,reg,resultIndex) {
    const instance = yield phantom.create();
    const page = yield instance.createPage();
    yield page.on("onResourceRequested", function(requestData) {
        // console.info('Requesting', requestData.url)
    });
 
    const status = yield page.open(url); 
    const content = yield page.property('content');
 	try {
 		console.log('status;'+status);
 		if(status=='success'){
 			let match;
		    while((match = reg.exec(content)) != null){
		      	(function(path) {
		      		srcs.push(path);
		      	})(match[resultIndex]);
		    }
		  }
		  return srcs;
		      
	} catch (e) {
		      console.error(e.message);
	}
    yield instance.exit();
};


module.exports = crawler;