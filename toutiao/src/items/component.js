class Component {
  constructor(props) {
    this.props = props;
  }
  
  render() {
    return '<div>基类，别轻易使用</div>'
  }
  
  _constructoElement() {
    const html = this.render();
    const $content = document.createElement('div');
    $content.innerHTML = html;
    this.el = $content;
    return this.el;
  }
}