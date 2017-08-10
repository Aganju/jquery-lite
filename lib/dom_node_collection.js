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
    const allDaChildren = [];
    this.elements.forEach( (el) => {
      allDaChildren.concat([].slice.call(el.children));
    });
   return new DOMNodeCollection(allDaChildren);
  }
}

module.exports = DOMNodeCollection;
