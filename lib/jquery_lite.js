/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__ (1);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.elements = array;
  }

  html(newhtml){
    if(newhtml === undefined){
      return this.elements[0].innerHTML;
    }
    else{
      this.elements.forEach( (element) => element.innerHTML = newhtml);
    }
  }

  empty(){
    this.html('');
  }

  append(element) {
    let html;
    if (element.constructor.name === "DOMNodeCollection") {
      let arr = element.elements.map((el) => el.outerHTML);
      html = arr.join("\n");
    }
    else if (typeof element === 'string'){
      html = element;
    } else {
      html = element.outerHTML;
    }
    this.elements.forEach( (el) => { el.innerHTML = el.innerHTML + html;});
  }

  addClass(className){
    this.elements.forEach( (el) => el.className = el.className += ` ${className}`);
  }

  removeClass(className) {
    this.elements.forEach( (el) => {
      let classNames = el.className.split(' ');
      let newClassNames = classNames.filter((el) => el != className);
      el.className = newClassNames.join(' ');
    });
  }

  attr(attribute, value) {
    if (value === undefined) {
      return this.elements[0].getAttribute(attribute);
    } else {
      this.elements.forEach((el) => {
        el.setAttribute(attribute, value);
      });
    }
  }

  children(){
    let allDaChildren = [];
    this.elements.forEach( (el) => {
      allDaChildren = allDaChildren.concat([].slice.call(el.children));
    });
   return new DOMNodeCollection(allDaChildren);
  }

  parent() {
    let allDaParents = [];
    this.elements.forEach( (el) => {
      allDaParents.push(el.parentElement);
    });
   return new DOMNodeCollection(allDaParents);
  }

  find(selector) {
    let targetElements = [];
    this.elements.forEach( (el) => {
      const query = [].slice.call(el.querySelectorAll(selector));
      targetElements = targetElements.concat(query);
    });
    return new DOMNodeCollection(targetElements);
  }

  remove() {
    this.elements.forEach( (el) =>  el.remove() );
    this.elements = [];
  }

  on(type, cb){
    this.elements.forEach( (el) => {
      el.addEventListener(type, cb);
      el[`${type}listener`] = cb;
    });
  }

  off(type){
    this.elements.forEach( (el) =>  el.removeEventListener(type, el[`${type}listener`]));
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);