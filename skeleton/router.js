class Router{
  constructor(node){
    this.node = node;
  }

  start(){
    this.render();
    window.addEventListener('hashchange', () => this.render());
  }

  activeRoute(){
    return window.location.hash.slice(1);
  }

  render(){
    this.node.innerHTML = '';
    let p = document.createElement('p');
    p.innerHTML = this.activeRoute();
    this.node.appendChild(p);
  }
}

module.exports = Router;
