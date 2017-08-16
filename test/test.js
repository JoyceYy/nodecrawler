var crawler = require('./../crawler');

crawler.crawle('https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=%E6%96%97%E5%9B%BE&oq=%E6%96%97%E5%9B%BE&rsp=-1')
		.then(function(data) {
			console.log('crawle result--------------------------------------------------crawle result');
			console.log(data);
		})