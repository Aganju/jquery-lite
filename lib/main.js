const DOMNodeCollection = require ('./dom_node_collection.js');

window.$l = function(selector){
  let elements, $elements;
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector);
    $elements = [].slice.call(elements);
  } else {
    $elements = [selector];
  }

  return new DOMNodeCollection($elements);
};
