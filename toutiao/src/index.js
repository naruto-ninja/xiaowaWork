import { request } from './utils';
import {component} from './items/component';

class Manger {
  constructor($container) {
    this.$container = $container;
  }

  init() {
    console.log('invoke-init!!!!');
    const items = res.data;
    items.forEach(item => {
      const component = new Component();
      const componetElement = component._constructoElement();
      this.$container.appendChild(componetElement);
    });
  }

  static getInstance($container) {
    return new Manger($container);
  }
}

const $container = document.getElementById('container');
const manage = Manger.getInstance($container);
manage.init();