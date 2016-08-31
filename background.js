'use strict';

var cats = [
  'https://pixabay.com/static/uploads/photo/2015/01/04/11/06/kitten-588148__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/08/05/08/48/cat-875809__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/01/30/12/16/kitten-1169507__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/11/10/01/39/cat-1036194__180.jpg',
  'https://pixabay.com/static/uploads/photo/2014/12/09/22/01/cat-562452__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/02/09/16/00/cat-1189814__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/09/02/22/21/cat-919662__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/11/15/22/09/red-1044913__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/02/09/16/00/cat-1189843__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/10/08/14/36/kitten-977834__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/07/14/20/21/kitten-1517534__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/03/09/15/56/female-1246732__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/06/29/21/14/cat-1487817__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/06/29/21/13/cat-1487815__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/03/03/12/40/cat-1234123__180.jpg',
  'https://pixabay.com/static/uploads/photo/2014/12/05/16/34/cat-558228__180.jpg',
  'https://pixabay.com/static/uploads/photo/2016/06/14/00/12/cat-1455463__180.jpg',
  'https://pixabay.com/static/uploads/photo/2013/03/15/09/00/cat-93986__180.jpg',
  'https://pixabay.com/static/uploads/photo/2013/04/01/03/45/cat-98359__180.jpg',
  'https://pixabay.com/static/uploads/photo/2014/08/02/23/52/siamese-cat-408746__180.jpg',
  'https://pixabay.com/static/uploads/photo/2015/04/16/15/21/cat-725793__180.jpg' ];
var catsLength = cats.length;
var filter = {
  urls: [ '*://*.supermercato24.it/asset/sm*' ],
  types: [ chrome.webRequest.ResourceType.IMAGE ]
};
var opt_extraInfoSpec = [ 'blocking' ];

chrome.storage.sync.get({
  like: true
}, function(items) {

  var cancel = !items.like;
  if (cancel === true) {
    chrome.webRequest.onBeforeRequest.addListener(cancelRequest, filter,
      opt_extraInfoSpec);
  } else {
    chrome.webRequest.onBeforeRequest.addListener(redirectRequest, filter,
      opt_extraInfoSpec);
  }
});

/**
 * webRequest callback for in-fly request. webRequestBlocking permission
 * 
 * @returns
 */
function cancelRequest(request) {

  return {
    cancel: true
  };
}
function redirectRequest(request) {

  return {
    redirectUrl: cats[~~(Math.random() * catsLength)]
  };
}

/**
 * onChanged storage listener. If different change global var
 * 
 * @returns
 */
chrome.storage.onChanged.addListener(function(changes) {

  if (changes.like.newValue != changes.like.oldValue) {
    var cancel = !changes.like.newValue;

    if (cancel === true) {
      chrome.webRequest.onBeforeRequest.removeListener(redirectRequest);
      chrome.webRequest.onBeforeRequest.addListener(cancelRequest, filter,
        opt_extraInfoSpec);
    } else {
      chrome.webRequest.onBeforeRequest.removeListener(cancelRequest);
      chrome.webRequest.onBeforeRequest.addListener(redirectRequest, filter,
        opt_extraInfoSpec);
    }
  }
});
