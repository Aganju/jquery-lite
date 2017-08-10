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

var ready = setInterval(function () {
  if(document.readyState !== 'complete') return;
  clearInterval(ready);
  readyCallbacks.forEach( (cb) => cb());
}, 100);


$l( () => console.log('ready'));
$l( () => console.log(document.readyState));
$l( () => alert('hi'));
$l( () => console.log('final'));
