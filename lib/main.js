const DOMNodeCollection = require ('./dom_node_collection.js');
const readyCallbacks = [];
window.$l = function(selector){
  let elements, $elements;
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
    $elements = [].slice.call(elements);
  } else if(typeof selector === 'function'){
    if(document.readyState !== 'complete'){
      readyCallbacks.push(selector);
    }
    else{
      selector();
    }
    return;
  }
  else{
    $elements = [selector];
  }

  return new DOMNodeCollection($elements);
};

$l.extend = function(target, ...objects) {
  objects.forEach((object) => {
    Object.keys(object).forEach((key) => {
      target[key] = object[key];
    });
  });
  return target;
};

$l.ajax = function(options) {
  const defaults = {
      url: window.location.href,
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: (response) => console.log(response),
      error: (status) => console.log(status),
      data: {}
    };

  const settings = $l.extend({}, defaults, options);
  const sender = new XMLHttpRequest();

  sender.open(settings.method, settings.url);
  sender.onload = () => {
    if(sender.status === 200)
      settings.success(JSON.parse(sender.response));
    else {
      settings.error(sender.statusText);
    }
  };

  sender.send(settings.data);
};

var ready = setInterval(function () {
  if(document.readyState !== 'complete') return;
  clearInterval(ready);
  readyCallbacks.forEach( (cb) => cb());
}, 100);
